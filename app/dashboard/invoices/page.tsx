'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Download, Eye, Edit, Trash2, Filter } from 'lucide-react'

const invoices = [
  {
    id: '1',
    number: 'INV-2024-001',
    client: 'Acme Corporation',
    amount: '$2,500.00',
    status: 'paid',
    dueDate: '2024-02-15',
    sentDate: '2024-02-01',
  },
  {
    id: '2',
    number: 'INV-2024-002',
    client: 'Tech Startup Inc',
    amount: '$1,800.00',
    status: 'pending',
    dueDate: '2024-02-20',
    sentDate: '2024-02-05',
  },
  {
    id: '3',
    number: 'INV-2024-003',
    client: 'Global Solutions',
    amount: '$3,200.00',
    status: 'sent',
    dueDate: '2024-02-28',
    sentDate: '2024-02-08',
  },
  {
    id: '4',
    number: 'INV-2024-004',
    client: 'Innovation Labs',
    amount: '$1,500.00',
    status: 'overdue',
    dueDate: '2024-01-25',
    sentDate: '2024-01-10',
  },
]

const statusColors = {
  paid: 'bg-green-500/20 text-green-300',
  pending: 'bg-yellow-500/20 text-yellow-300',
  sent: 'bg-blue-500/20 text-blue-300',
  overdue: 'bg-red-500/20 text-red-300',
  draft: 'bg-gray-500/20 text-gray-300',
}

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch = invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || invoice.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Invoices</h1>
          <p className="text-slate-400 mt-2">Manage and track all your invoices</p>
        </div>
        <Link href="/dashboard/invoices/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Invoice
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <Input
          placeholder="Search by invoice number or client..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg"
        >
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      {/* Invoices Table */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800/50">
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Invoice #</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Client</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Amount</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Due Date</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition">
                  <td className="py-4 px-6 text-white font-medium">{invoice.number}</td>
                  <td className="py-4 px-6 text-slate-300">{invoice.client}</td>
                  <td className="py-4 px-6 text-white font-semibold">{invoice.amount}</td>
                  <td className="py-4 px-6 text-slate-400">{invoice.dueDate}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColors[invoice.status as keyof typeof statusColors]}`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-700 rounded transition" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-700 rounded transition" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded transition" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredInvoices.length === 0 && (
          <div className="py-12 text-center text-slate-400">
            <p>No invoices found</p>
          </div>
        )}
      </div>
    </div>
  )
}
