'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

const recentInvoices = [
  {
    id: '1',
    client: 'Acme Corporation',
    amount: '$2,500',
    status: 'paid',
    date: '2024-02-08',
  },
  {
    id: '2',
    client: 'Tech Startup Inc',
    amount: '$1,800',
    status: 'pending',
    date: '2024-02-05',
  },
  {
    id: '3',
    client: 'Global Solutions',
    amount: '$3,200',
    status: 'sent',
    date: '2024-02-01',
  },
  {
    id: '4',
    client: 'Innovation Labs',
    amount: '$1,500',
    status: 'overdue',
    date: '2024-01-25',
  },
]

const statusColors = {
  paid: 'bg-green-500/20 text-green-300',
  pending: 'bg-yellow-500/20 text-yellow-300',
  sent: 'bg-blue-500/20 text-blue-300',
  overdue: 'bg-red-500/20 text-red-300',
}

export default function RecentInvoices() {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Recent Invoices</h2>
        <Link href="/dashboard/invoices">
          <Button variant="ghost" className="text-blue-400 hover:text-blue-300">
            View All
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Client</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Amount</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Date</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentInvoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition">
                <td className="py-4 px-4 text-white">{invoice.client}</td>
                <td className="py-4 px-4 text-white font-semibold">{invoice.amount}</td>
                <td className="py-4 px-4 text-slate-400">{invoice.date}</td>
                <td className="py-4 px-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColors[invoice.status as keyof typeof statusColors]}`}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
