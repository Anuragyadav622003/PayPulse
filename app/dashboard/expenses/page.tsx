'use client'

import React from "react"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Expense {
  id: string
  category: string
  description: string
  amount: number
  currency_code: string
  date: string
  is_billable: boolean
  client_name: string
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const { toast } = useToast()

  const [form, setForm] = useState({
    category: 'Other',
    description: '',
    amount: 0,
    currency_code: 'USD',
    date: new Date().toISOString().split('T')[0],
    is_billable: false,
    client_id: '',
  })

  useEffect(() => {
    fetchExpenses()
  }, [])

  const fetchExpenses = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/expenses')
      const data = await res.json()
      setExpenses(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load expenses',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error()

      const newExpense = await res.json()
      setExpenses([newExpense, ...expenses])
      setForm({
        category: 'Other',
        description: '',
        amount: 0,
        currency_code: 'USD',
        date: new Date().toISOString().split('T')[0],
        is_billable: false,
        client_id: '',
      })
      setShowForm(false)
      toast({
        title: 'Success',
        description: 'Expense recorded',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create expense',
        variant: 'destructive',
      })
    }
  }

  const deleteExpense = async (id: string) => {
    try {
      await fetch(`/api/expenses/${id}`, { method: 'DELETE' })
      setExpenses(expenses.filter((e) => e.id !== id))
      toast({
        title: 'Success',
        description: 'Expense deleted',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete expense',
        variant: 'destructive',
      })
    }
  }

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)
  const billableExpenses = expenses
    .filter((e) => e.is_billable)
    .reduce((sum, e) => sum + e.amount, 0)

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
            <h1 className="text-3xl font-bold">Expense Tracking</h1>
            <p className="text-slate-400">Record and manage business expenses</p>
          </div>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <p className="text-slate-400 text-sm">Total Expenses</p>
          <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <p className="text-slate-400 text-sm">Billable Amount</p>
          <p className="text-2xl font-bold">${billableExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <p className="text-slate-400 text-sm">Entries</p>
          <p className="text-2xl font-bold">{expenses.length}</p>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white"
                >
                  <option>Travel</option>
                  <option>Equipment</option>
                  <option>Software</option>
                  <option>Meals</option>
                  <option>Office</option>
                  <option>Utilities</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                required
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white min-h-20"
                placeholder="Expense details"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={form.amount}
                  onChange={(e) =>
                    setForm({ ...form, amount: parseFloat(e.target.value) })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Currency
                </label>
                <select
                  value={form.currency_code}
                  onChange={(e) =>
                    setForm({ ...form, currency_code: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white"
                >
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>INR</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Billable
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.is_billable}
                    onChange={(e) =>
                      setForm({ ...form, is_billable: e.target.checked })
                    }
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm">Mark as billable</span>
                </label>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit">Record Expense</Button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-slate-700 rounded hover:bg-slate-800"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Expenses List */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading...</div>
        ) : expenses.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            No expenses recorded yet. Start tracking your expenses.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-700 bg-slate-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Amount
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
                {expenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-slate-700/20">
                    <td className="px-6 py-4">{expense.description}</td>
                    <td className="px-6 py-4 capitalize">{expense.category}</td>
                    <td className="px-6 py-4">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      {expense.currency_code} {expense.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      {expense.is_billable ? (
                        <span className="px-2 py-1 rounded text-sm bg-green-500/20 text-green-400">
                          Billable
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded text-sm bg-slate-500/20 text-slate-400">
                          Non-billable
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => deleteExpense(expense.id)}
                        className="p-2 hover:bg-red-500/20 rounded text-red-400"
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
