export type User = {
  id: string
  email: string
  full_name: string
  company_name: string | null
  created_at: string
}

export type Client = {
  id: string
  user_id: string
  name: string
  email: string
  phone: string | null
  address: string | null
  created_at: string
}

export type Invoice = {
  id: string
  user_id: string
  client_id: string
  invoice_number: string
  amount: number
  currency: string
  due_date: string
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  description: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export type Payment = {
  id: string
  invoice_id: string
  amount: number
  payment_date: string
  method: 'stripe' | 'bank' | 'cash' | 'check'
  stripe_payment_id: string | null
  status: 'pending' | 'completed' | 'failed'
  created_at: string
}

export type EmailReminder = {
  id: string
  invoice_id: string
  reminder_type: 'initial' | 'followup' | 'final'
  scheduled_date: string
  sent_date: string | null
  status: 'pending' | 'sent' | 'failed'
  created_at: string
}

export type AuthResponse = {
  user: User | null
  session: any | null
  error: string | null
}
