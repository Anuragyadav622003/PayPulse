import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: userData, error: authError } = await supabase.auth.getUser(
      token
    )

    if (authError || !userData.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const url = new URL(request.url)
    const startDate = url.searchParams.get('start') || '2024-01-01'
    const endDate = url.searchParams.get('end') || new Date().toISOString().split('T')[0]

    // Fetch invoices
    const { data: invoices } = await supabase
      .from('invoices')
      .select('id, total, status, created_at, due_date')
      .eq('user_id', userData.user.id)
      .gte('created_at', startDate)
      .lte('created_at', endDate)

    // Fetch expenses
    const { data: expenses } = await supabase
      .from('expenses')
      .select('amount')
      .eq('user_id', userData.user.id)
      .gte('date', startDate)
      .lte('date', endDate)

    // Calculate metrics
    const total_invoiced = invoices?.reduce((sum, inv) => sum + inv.total, 0) || 0
    const total_paid = invoices?.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0) || 0
    const total_outstanding = invoices?.filter(inv => inv.status !== 'paid').reduce((sum, inv) => sum + inv.total, 0) || 0
    const total_expenses = expenses?.reduce((sum, exp) => sum + exp.amount, 0) || 0
    const profitability = total_paid - total_expenses
    const payment_success_rate = invoices?.length ? (invoices.filter(inv => inv.status === 'paid').length / invoices.length) * 100 : 0

    const report = {
      total_invoiced,
      total_paid,
      total_outstanding,
      total_expenses,
      profitability,
      invoice_count: invoices?.length || 0,
      paid_invoices: invoices?.filter(inv => inv.status === 'paid').length || 0,
      overdue_invoices: invoices?.filter(inv => new Date(inv.due_date) < new Date() && inv.status !== 'paid').length || 0,
      average_invoice_value: invoices?.length ? total_invoiced / invoices.length : 0,
      payment_success_rate,
      cash_flow: generateCashFlow(invoices || [], expenses || []),
      top_clients: [],
      invoice_aging: calculateInvoiceAging(invoices || []),
    }

    return NextResponse.json(report)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch report' },
      { status: 500 }
    )
  }
}

function generateCashFlow(invoices: any[], expenses: any[]) {
  const months = []
  const now = new Date()
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const month = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0)

    const income = invoices
      .filter(inv => new Date(inv.created_at) >= monthStart && new Date(inv.created_at) <= monthEnd && inv.status === 'paid')
      .reduce((sum, inv) => sum + inv.total, 0)

    const monthExpenses = expenses
      .filter(exp => new Date(exp.date) >= monthStart && new Date(exp.date) <= monthEnd)
      .reduce((sum, exp) => sum + exp.amount, 0)

    months.push({
      month,
      income,
      expenses: monthExpenses,
      net: income - monthExpenses,
    })
  }
  return months
}

function calculateInvoiceAging(invoices: any[]) {
  const now = new Date()
  return {
    current: invoices
      .filter(inv => inv.status !== 'paid' && new Date(inv.due_date) >= now)
      .reduce((sum, inv) => sum + inv.total, 0),
    thirty: invoices
      .filter(inv => {
        const days = Math.floor((now.getTime() - new Date(inv.due_date).getTime()) / (1000 * 60 * 60 * 24))
        return inv.status !== 'paid' && days >= 30 && days < 60
      })
      .reduce((sum, inv) => sum + inv.total, 0),
    sixty: invoices
      .filter(inv => {
        const days = Math.floor((now.getTime() - new Date(inv.due_date).getTime()) / (1000 * 60 * 60 * 24))
        return inv.status !== 'paid' && days >= 60 && days < 90
      })
      .reduce((sum, inv) => sum + inv.total, 0),
    ninety_plus: invoices
      .filter(inv => {
        const days = Math.floor((now.getTime() - new Date(inv.due_date).getTime()) / (1000 * 60 * 60 * 24))
        return inv.status !== 'paid' && days >= 90
      })
      .reduce((sum, inv) => sum + inv.total, 0),
  }
}
