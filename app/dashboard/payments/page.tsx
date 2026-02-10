'use client'

import { Download, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'

const payments = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    client: 'Acme Corporation',
    amount: '$2,500.00',
    method: 'Stripe',
    paymentDate: '2024-02-08',
    status: 'completed',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-003',
    client: 'Global Solutions',
    amount: '$3,200.00',
    method: 'Stripe',
    paymentDate: '2024-02-05',
    status: 'completed',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-002',
    client: 'Tech Startup Inc',
    amount: '$1,800.00',
    method: 'Stripe',
    paymentDate: '2024-02-01',
    status: 'pending',
  },
]

const statusColors = {
  completed: 'bg-green-500/20 text-green-300',
  pending: 'bg-yellow-500/20 text-yellow-300',
  failed: 'bg-red-500/20 text-red-300',
}

export default function PaymentsPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Payment History</h1>
        <p className="text-slate-400 mt-2">Track all payments received through PayPulse</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm mb-2">Total Received</p>
          <p className="text-3xl font-bold text-green-400">$7,500.00</p>
          <p className="text-slate-400 text-sm mt-2">This month</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm mb-2">Completed Payments</p>
          <p className="text-3xl font-bold text-white">2</p>
          <p className="text-slate-400 text-sm mt-2">Successfully processed</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm mb-2">Pending Payments</p>
          <p className="text-3xl font-bold text-yellow-400">1</p>
          <p className="text-slate-400 text-sm mt-2">Awaiting confirmation</p>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800/50">
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Invoice</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Client</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Amount</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Payment Method</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Date</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition">
                  <td className="py-4 px-6 text-white font-medium">{payment.invoiceNumber}</td>
                  <td className="py-4 px-6 text-slate-300">{payment.client}</td>
                  <td className="py-4 px-6 text-white font-semibold">{payment.amount}</td>
                  <td className="py-4 px-6 text-slate-400">{payment.method}</td>
                  <td className="py-4 px-6 text-slate-400">{payment.paymentDate}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColors[payment.status as keyof typeof statusColors]}`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-700 rounded transition">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-700 rounded transition">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
