export interface ValidationError {
  field: string
  message: string
}

export interface FormValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateInvoice = (data: {
  invoice_number?: string
  client_name?: string
  client_email?: string
  amount?: number | string
  due_date?: string
}): FormValidationResult => {
  const errors: ValidationError[] = []

  if (!data.invoice_number || data.invoice_number.trim() === '') {
    errors.push({ field: 'invoice_number', message: 'Invoice number is required' })
  }

  if (!data.client_name || data.client_name.trim() === '') {
    errors.push({ field: 'client_name', message: 'Client name is required' })
  }

  if (!data.client_email || data.client_email.trim() === '') {
    errors.push({ field: 'client_email', message: 'Client email is required' })
  } else if (!validateEmail(data.client_email)) {
    errors.push({ field: 'client_email', message: 'Please enter a valid email' })
  }

  const amount = typeof data.amount === 'string' ? parseFloat(data.amount) : data.amount
  if (!amount || amount <= 0) {
    errors.push({ field: 'amount', message: 'Amount must be greater than 0' })
  }

  if (!data.due_date) {
    errors.push({ field: 'due_date', message: 'Due date is required' })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const validateClient = (data: {
  name?: string
  email?: string
  phone?: string
}): FormValidationResult => {
  const errors: ValidationError[] = []

  if (!data.name || data.name.trim() === '') {
    errors.push({ field: 'name', message: 'Client name is required' })
  }

  if (!data.email || data.email.trim() === '') {
    errors.push({ field: 'email', message: 'Email is required' })
  } else if (!validateEmail(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email' })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
