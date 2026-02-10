'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Download, Send, Printer, Eye } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Invoice {
  id: string
  invoice_number: string
  client_name: string
  client_email: string
  amount: number
  status: string
  issue_date: string
  due_date: string
  description: string
  items: Array<{
    description: string
    quantity: number
    rate: number
    amount: number
  }>
}

export default function InvoiceDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock invoice data
    const mockInvoice: Invoice = {
      id: params.id,
      invoice_number: `INV-${params.id.slice(0, 8).toUpperCase()}`,
      client_name: 'Acme Corporation',
      client_email: 'billing@acme.com',
      amount: 2500,
      status: 'pending',
      issue_date: '2024-02-01',
      due_date: '2024-03-01',
      description: 'Professional Services - Website Development',
      items: [
        {
          description: 'Frontend Development (40 hours)',
          quantity: 40,
          rate: 50,
          amount: 2000,
        },
        {
          description: 'UI/UX Design Consultation',
          quantity: 1,
          rate: 500,
          amount: 500,
        },
      ],
    }
    setInvoice(mockInvoice)
    setLoading(false)
  }, [params.id])

  const handleDownloadPDF = () => {
    toast({
      title: 'Download Started',
      description: 'Invoice PDF is being generated and downloaded.',
    })
  }

  const handleSendEmail = () => {
    toast({
      title: 'Email Sent',
      description: `Invoice sent to ${invoice?.client_email}`,
    })
  }

  const handlePrint = () => {
    window.print()
  }

  const handlePayment = () => {
    toast({
      title: 'Redirecting to Payment',
      description: 'Opening secure payment gateway...',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-400">Loading invoice...</div>
      </div>
    )
  }

  if (!invoice) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Invoice not found</p>
          <Link href="/dashboard/invoices">
            <Button variant="outline">Back to Invoices</Button>
          </Link>
        </div>
      </div>
    )
  }

  const statusColor =
    invoice.status === 'paid'
      ? 'bg-green-500/10 text-green-700 border-green-500/20'
      : invoice.status === 'pending'
        ? 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20'
        : 'bg-red-500/10 text-red-700 border-red-500/20'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/invoices">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{invoice.invoice_number}</h1>
            <p className="text-slate-400">Invoice details and payment options</p>
          </div>
        </div>
        <Badge variant="outline" className={statusColor}>
          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Invoice Content */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">Invoice Details</CardTitle>
                  <CardDescription>
                    Issue Date: {new Date(invoice.issue_date).toLocaleDateString()}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Client Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Bill To</p>
                  <div>
                    <p className="font-semibold">{invoice.client_name}</p>
                    <p className="text-slate-400">{invoice.client_email}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Due Date</p>
                  <p className="font-semibold">{new Date(invoice.due_date).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Description */}
              <div className="py-4 border-t border-slate-700">
                <p className="text-sm text-slate-400 mb-2">Description</p>
                <p className="text-white">{invoice.description}</p>
              </div>

              {/* Line Items */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-2 text-slate-400 font-medium">Description</th>
                      <th className="text-center py-2 text-slate-400 font-medium">Quantity</th>
                      <th className="text-right py-2 text-slate-400 font-medium">Rate</th>
                      <th className="text-right py-2 text-slate-400 font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item, idx) => (
                      <tr key={idx} className="border-b border-slate-700/50">
                        <td className="py-3 text-white">{item.description}</td>
                        <td className="text-center py-3 text-white">{item.quantity}</td>
                        <td className="text-right py-3 text-white">${item.rate.toFixed(2)}</td>
                        <td className="text-right py-3 text-white">${item.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total */}
              <div className="flex justify-end">
                <div className="w-64 bg-slate-700/50 rounded-lg p-4">
                  <div className="flex justify-between mb-3 text-slate-400">
                    <span>Subtotal</span>
                    <span>${invoice.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-3 text-slate-400">
                    <span>Tax (0%)</span>
                    <span>$0.00</span>
                  </div>
                  <div className="border-t border-slate-600 pt-3 flex justify-between font-bold text-white">
                    <span>Total Due</span>
                    <span className="text-blue-400">${invoice.amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-2 flex-wrap">
            <Button onClick={handleSendEmail} variant="outline" className="border-slate-600 bg-transparent">
              <Send className="h-4 w-4 mr-2" />
              Send Email
            </Button>
            <Button onClick={handleDownloadPDF} variant="outline" className="border-slate-600 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button onClick={handlePrint} variant="outline" className="border-slate-600 bg-transparent">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Payment Card */}
          {invoice.status !== 'paid' && (
            <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 border-0">
              <CardHeader>
                <CardTitle className="text-white">Payment</CardTitle>
                <CardDescription className="text-blue-100">
                  Amount due: ${invoice.amount.toFixed(2)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handlePayment} className="w-full bg-white text-blue-600 hover:bg-slate-100 mb-2">
                  <Eye className="h-4 w-4 mr-2" />
                  Pay Now
                </Button>
                <p className="text-xs text-blue-100 text-center">Secured by Stripe</p>
              </CardContent>
            </Card>
          )}

          {/* Status Card */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-slate-400 mb-2">Current Status</p>
                <Badge variant="outline" className={statusColor}>
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </Badge>
              </div>
              {invoice.status === 'pending' && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                  <p className="text-sm text-yellow-200">
                    This invoice is pending payment. Send a reminder to your client.
                  </p>
                </div>
              )}
              {invoice.status === 'paid' && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <p className="text-sm text-green-200">
                    Payment received on {new Date().toLocaleDateString()}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
