'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, Edit2, Trash2, Play, Pause } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface RecurringInvoice {
  id: string
  client_id: string
  client_name: string
  frequency: string
  amount: number
  next_invoice_date: string
  is_active: boolean
}

export default function RecurringInvoicesPage() {
  const [recurring, setRecurring] = useState<RecurringInvoice[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchRecurringInvoices()
  }, [])

  const fetchRecurringInvoices = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/recurring')
      const data = await res.json()
      setRecurring(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load recurring invoices',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      await fetch(`/api/recurring/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !isActive }),
      })
      setRecurring(
        recurring.map((r) =>
          r.id === id ? { ...r, is_active: !isActive } : r
        )
      )
      toast({
        title: 'Success',
        description: `Recurring invoice ${!isActive ? 'activated' : 'paused'}`,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update recurring invoice',
        variant: 'destructive',
      })
    }
  }

  const deleteRecurring = async (id: string) => {
    try {
      await fetch(`/api/recurring/${id}`, { method: 'DELETE' })
      setRecurring(recurring.filter((r) => r.id !== id))
      toast({
        title: 'Success',
        description: 'Recurring invoice deleted',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete recurring invoice',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Recurring Invoices</h1>
            <p className="text-slate-400">Manage automated billing cycles</p>
          </div>
        </div>
        <Link href="/dashboard/recurring/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Recurring
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <p className="text-slate-400 text-sm">Active</p>
          <p className="text-2xl font-bold">
            {recurring.filter((r) => r.is_active).length}
          </p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <p className="text-slate-400 text-sm">Inactive</p>
          <p className="text-2xl font-bold">
            {recurring.filter((r) => !r.is_active).length}
          </p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <p className="text-slate-400 text-sm">Total</p>
          <p className="text-2xl font-bold">{recurring.length}</p>
        </div>
      </div>

      {/* List */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading...</div>
        ) : recurring.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            No recurring invoices yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-700 bg-slate-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Frequency
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Next Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {recurring.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-700/20">
                    <td className="px-6 py-4">{item.client_name}</td>
                    <td className="px-6 py-4 capitalize">{item.frequency}</td>
                    <td className="px-6 py-4 font-semibold">
                      ${item.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(item.next_invoice_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          item.is_active
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-slate-500/20 text-slate-400'
                        }`}
                      >
                        {item.is_active ? 'Active' : 'Paused'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => toggleActive(item.id, item.is_active)}
                        className="inline-block p-2 hover:bg-slate-700 rounded"
                      >
                        {item.is_active ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </button>
                      <Link href={`/dashboard/recurring/${item.id}`}>
                        <button className="inline-block p-2 hover:bg-slate-700 rounded">
                          <Edit2 className="h-4 w-4" />
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteRecurring(item.id)}
                        className="inline-block p-2 hover:bg-red-500/20 rounded text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
