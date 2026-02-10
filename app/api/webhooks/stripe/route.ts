import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
})

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature') || ''

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || '',
    )

    // Handle checkout session completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const invoiceId = session.metadata?.invoiceId
      const userId = session.metadata?.userId

      if (invoiceId && userId) {
        // Update invoice status to paid
        const { error: updateError } = await supabase
          .from('invoices')
          .update({ status: 'paid' })
          .eq('id', invoiceId)
          .eq('user_id', userId)

        if (updateError) {
          console.error('Error updating invoice:', updateError)
          return NextResponse.json({ error: updateError.message }, { status: 500 })
        }

        // Create payment record
        await supabase.from('payments').insert({
          invoice_id: invoiceId,
          amount: session.amount_total ? session.amount_total / 100 : 0,
          payment_date: new Date().toISOString(),
          method: 'stripe',
          stripe_payment_id: session.payment_intent as string,
          status: 'completed',
        })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
