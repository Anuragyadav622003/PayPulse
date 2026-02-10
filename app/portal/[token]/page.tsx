'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Download, Eye, ArrowRight } from 'lucide-react'

interface ClientPortalInvoice {
  id: string
  invoice_number: string
  amount: number
  status: string
  issue_date: string
  due_date: string
}

export default function ClientPortalPage({ params }: { params: { token: string } }) {
  const [invoices, setInvoices] = useState<ClientPortalInvoice[]>([])
  const [loading, setLoading] = useState(true)
  const [clientName, setClientName] = useState('')

  useEffect(() => {
    // Mock client data based on token
    const mockInvoices: ClientPortalInvoice[] = [
      {
        id: '1',
        invoice_number: 'INV-001',
        amount: 2500,
        status: 'paid',
        issue_date: '2024-01-15',
        due_date: '2024-02-15',
      },
      {
        id: '2',
        invoice_number: 'INV-002',
        amount: 1800,
        status: 'pending',
        issue_date: '2024-02-01',
        due_date: '2024-03-01',
      },
      {
        id: '3',
        invoice_number: 'INV-003',
        amount: 3200,
        status: 'pending',
        issue_date: '2024-02-10',
        due_date: '2024-03-10',
      },
    ]
    setClientName('Acme Corporation')
    setInvoices(mockInvoices)
    setLoading(false)
  }, [params.token])

  const paidInvoices = invoices.filter((inv) => inv.status === 'paid').length
  const pendingInvoices = invoices.filter((inv) => inv.status === 'pending').length
  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0)

  const getStatusColor = (status: string) => {
    if (status === 'paid') return 'bg-green-500/10 text-green-700 border-green-500/20'
    if (status === 'pending') return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20'
    return 'bg-red-500/10 text-red-700 border-red-500/20'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center">
        <div className="text-slate-400">Loading invoices...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-12 w-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center font-bold">
              PP
            </div>
            <span className="text-xl font-semibold">PayPulse</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Your Invoices</h1>
          <p className="text-slate-400">
            {clientName} - View and manage your invoices
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <p className="text-slate-400 text-sm mb-2">Total Invoices</p>
              <p className="text-3xl font-bold">{invoices.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <p className="text-slate-400 text-sm mb-2">Paid</p>
              <p className="text-3xl font-bold text-green-400">${invoices
                .filter((inv) => inv.status === 'paid')
                .reduce((sum, inv) => sum + inv.amount, 0)
                .toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <p className="text-slate-400 text-sm mb-2">Outstanding</p>
              <p className="text-3xl font-bold text-yellow-400">${invoices
                .filter((inv) => inv.status === 'pending')
                .reduce((sum, inv) => sum + inv.amount, 0)
                .toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Invoices Table */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>View and pay your outstanding invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {invoices.length === 0 ? (
                <p className="text-slate-400 text-center py-8">No invoices found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 text-slate-400 font-medium">Invoice</th>
                        <th className="text-center py-3 text-slate-400 font-medium">Amount</th>
                        <th className="text-center py-3 text-slate-400 font-medium">Status</th>
                        <th className="text-center py-3 text-slate-400 font-medium">Due Date</th>
                        <th className="text-center py-3 text-slate-400 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((invoice) => (
                        <tr key={invoice.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition">
                          <td className="py-3 text-white font-medium">{invoice.invoice_number}</td>
                          <td className="text-center py-3 text-white">${invoice.amount.toFixed(2)}</td>
                          <td className="text-center py-3">
                            <Badge variant="outline" className={getStatusColor(invoice.status)}>
                              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="text-center py-3 text-slate-400">
                            {new Date(invoice.due_date).toLocaleDateString()}
                          </td>
                          <td className="text-center py-3">
                            <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Outstanding Invoices */}
        {pendingInvoices > 0 && (
          <Card className="bg-yellow-500/10 border-yellow-500/20 mt-8">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold mb-1">You have {pendingInvoices} outstanding invoice{pendingInvoices !== 1 ? 's' : ''}</p>
                  <p className="text-sm text-slate-400">
                    Total amount due: ${invoices
                      .filter((inv) => inv.status === 'pending')
                      .reduce((sum, inv) => sum + inv.amount, 0)
                      .toFixed(2)}
                  </p>
                </div>
                <Button className="bg-yellow-600 hover:bg-yellow-700">
                  Pay Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-slate-700 text-center text-slate-400 text-sm">
          <p>
            Questions about your invoices?{' '}
            <a href="mailto:support@paypulse.com" className="text-blue-400 hover:text-blue-300">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
