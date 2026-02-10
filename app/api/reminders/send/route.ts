import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { invoiceId } = body

    // Get invoice details
    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .select('*, clients(*)')
      .eq('id', invoiceId)
      .eq('user_id', user.id)
      .single()

    if (invoiceError || !invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
    }

    // Prepare email content
    const emailContent = {
      to: invoice.client_email,
      subject: `Reminder: Invoice ${invoice.invoice_number} is due on ${invoice.due_date}`,
      html: `
        <h2>Payment Reminder</h2>
        <p>Dear ${invoice.client_name},</p>
        <p>This is a friendly reminder that invoice <strong>${invoice.invoice_number}</strong> is due on <strong>${invoice.due_date}</strong>.</p>
        <p>Amount due: <strong>${invoice.currency} ${invoice.amount}</strong></p>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/pay/${invoice.id}">Pay Now</a></p>
        <p>Thank you for your business!</p>
      `,
    }

    // Send email (using Resend, SendGrid, or similar)
    // For now, this is a placeholder that logs the email
    console.log('Sending reminder email:', emailContent)

    // Create reminder record
    const { data: reminder, error: reminderError } = await supabase
      .from('email_reminders')
      .insert({
        invoice_id: invoiceId,
        reminder_type: 'followup',
        scheduled_date: new Date().toISOString(),
        status: 'sent',
        sent_date: new Date().toISOString(),
      })
      .select()

    if (reminderError) throw reminderError

    return NextResponse.json(reminder, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
