'use client'

import React from "react"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

interface Client {
  id: string
  name: string
}

interface Invoice {
  id: string
  invoice_number: string
  total: number
}

export default function CreateRecurringPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const [form, setForm] = useState({
    client_id: '',
    template_invoice_id: '',
    frequency: 'monthly',
    start_date: '',
    end_date: '',
    auto_send: false,
    auto_pay_reminder: true,
    reminder_days_before: 5,
  })

  useEffect(() => {
    fetchClients()
    fetchInvoices()
  }, [])

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/clients')
      const data = await res.json()
      setClients(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load clients',
        variant: 'destructive',
      })
    }
  }

  const fetchInvoices = async () => {
    try {
      const res = await fetch('/api/invoices')
      const data = await res.json()
      setInvoices(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load invoices',
        variant: 'destructive',
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/recurring', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Failed to create')

      toast({
        title: 'Success',
        description: 'Recurring invoice created',
      })
      router.push('/dashboard/recurring')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create recurring invoice',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/recurring">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Create Recurring Invoice</h1>
          <p className="text-slate-400">Set up automated billing</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Client</label>
            <select
              required
              value={form.client_id}
              onChange={(e) => setForm({ ...form, client_id: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white"
            >
              <option value="">Select client</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Template Invoice
            </label>
            <select
              value={form.template_invoice_id}
              onChange={(e) =>
                setForm({ ...form, template_invoice_id: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white"
            >
              <option value="">Select template (optional)</option>
              {invoices.map((i) => (
                <option key={i.id} value={i.id}>
                  Invoice {i.invoice_number} - ${i.total.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Frequency</label>
            <select
              value={form.frequency}
              onChange={(e) => setForm({ ...form, frequency: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white"
            >
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annually">Annually</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Start Date
              </label>
              <input
                type="date"
                required
                value={form.start_date}
                onChange={(e) =>
                  setForm({ ...form, start_date: e.target.value })
                }
                className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                End Date (Optional)
              </label>
              <input
                type="date"
                value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.auto_send}
                onChange={(e) =>
                  setForm({ ...form, auto_send: e.target.checked })
                }
                className="w-4 h-4 rounded"
              />
              <span className="text-sm">Auto-send invoice</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.auto_pay_reminder}
                onChange={(e) =>
                  setForm({ ...form, auto_pay_reminder: e.target.checked })
                }
                className="w-4 h-4 rounded"
              />
              <span className="text-sm">Auto payment reminders</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Reminder Days Before Due
            </label>
            <input
              type="number"
              value={form.reminder_days_before}
              onChange={(e) =>
                setForm({
                  ...form,
                  reminder_days_before: parseInt(e.target.value),
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Recurring Invoice'}
          </Button>
          <Link href="/dashboard/recurring">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
