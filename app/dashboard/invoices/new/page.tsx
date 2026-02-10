'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2, Plus } from 'lucide-react'

interface LineItem {
  id: string
  description: string
  quantity: number
  rate: number
}

export default function NewInvoicePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: '1', description: '', quantity: 1, rate: 0 },
  ])

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    invoiceNumber: 'INV-2024-005',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    currency: 'USD',
    notes: '',
  })

  const handleAddLineItem = () => {
    setLineItems([...lineItems, { id: Date.now().toString(), description: '', quantity: 1, rate: 0 }])
  }

  const handleRemoveLineItem = (id: string) => {
    setLineItems(lineItems.filter((item) => item.id !== id))
  }

  const handleLineItemChange = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(lineItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Submit invoice to API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push('/dashboard/invoices')
    } catch (error) {
      console.error('Error creating invoice:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const subtotal = lineItems.reduce((sum, item) => sum + item.quantity * item.rate, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  return (
    <div className="p-8 space-y-8">
      <div>
        <Link href="/dashboard/invoices" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
          ← Back to Invoices
        </Link>
        <h1 className="text-3xl font-bold text-white">Create New Invoice</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Invoice Details */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">Invoice Details</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Invoice Number</label>
              <Input
                type="text"
                value={formData.invoiceNumber}
                onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Currency</label>
              <select className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Issue Date</label>
              <Input type="date" value={formData.issueDate} className="bg-slate-700 border-slate-600 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Due Date</label>
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>
        </div>

        {/* Client Details */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">Client Details</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Client Name</label>
              <Input
                type="text"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="Acme Corporation"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <Input
                type="email"
                value={formData.clientEmail}
                onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                placeholder="contact@acme.com"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Line Items</h2>
            <button
              type="button"
              onClick={handleAddLineItem}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              <Plus className="w-4 h-4" />
              Add Item
            </button>
          </div>

          <div className="space-y-4">
            {lineItems.map((item, index) => (
              <div key={item.id} className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                  <Input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleLineItemChange(item.id, 'description', e.target.value)}
                    placeholder="Service or product description"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Qty</label>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleLineItemChange(item.id, 'quantity', parseInt(e.target.value))}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="w-32">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Rate</label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.rate}
                    onChange={(e) => handleLineItemChange(item.id, 'rate', parseFloat(e.target.value))}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="w-32">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Amount</label>
                  <div className="px-4 py-2 bg-slate-700 rounded-lg border border-slate-600 text-white">
                    ${(item.quantity * item.rate).toFixed(2)}
                  </div>
                </div>
                {lineItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveLineItem(item.id)}
                    className="p-2 text-red-400 hover:bg-red-900/20 rounded transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="space-y-3 max-w-sm ml-auto">
            <div className="flex justify-between text-slate-300">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-slate-600 pt-3 flex justify-between text-xl font-bold text-white">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">Notes (Optional)</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Add any additional notes or terms..."
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg resize-none"
            rows={4}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Invoice'}
          </Button>
          <Link href="/dashboard/invoices">
            <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700 bg-transparent">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
