'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, Calendar } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ReportData {
  total_invoiced: number
  total_paid: number
  total_outstanding: number
  total_expenses: number
  profitability: number
  invoice_count: number
  paid_invoices: number
  overdue_invoices: number
  average_invoice_value: number
  payment_success_rate: number
  cash_flow: {
    month: string
    income: number
    expenses: number
    net: number
  }[]
  top_clients: {
    name: string
    total_invoiced: number
    paid: number
  }[]
  invoice_aging: {
    current: number
    thirty: number
    sixty: number
    ninety_plus: number
  }
}

export default function ReportsPage() {
  const [report, setReport] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), 0, 1)
      .toISOString()
      .split('T')[0],
    end: new Date().toISOString().split('T')[0],
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchReport()
  }, [dateRange])

  const fetchReport = async () => {
    try {
      setLoading(true)
      const res = await fetch(
        `/api/reports?start=${dateRange.start}&end=${dateRange.end}`
      )
      const data = await res.json()
      setReport(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load report',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const exportPDF = async () => {
    try {
      const res = await fetch(
        `/api/reports/export-pdf?start=${dateRange.start}&end=${dateRange.end}`
      )
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Report-${new Date().toLocaleDateString()}.pdf`
      a.click()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to export report',
        variant: 'destructive',
      })
    }
  }

  if (loading) return <div className="text-center py-8 text-slate-400">Loading report...</div>

  if (!report) return <div className="text-center py-8 text-slate-400">No data available</div>

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
            <h1 className="text-3xl font-bold">Financial Reports</h1>
            <p className="text-slate-400">
              Comprehensive business analytics and reporting
            </p>
          </div>
        </div>
        <Button onClick={exportPDF}>
          <Download className="h-4 w-4 mr-2" />
          Export PDF
        </Button>
      </div>

      {/* Date Range */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex items-end gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Start Date</label>
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) =>
              setDateRange({ ...dateRange, start: e.target.value })
            }
            className="bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">End Date</label>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) =>
              setDateRange({ ...dateRange, end: e.target.value })
            }
            className="bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white"
          />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm mb-2">Total Invoiced</p>
          <p className="text-3xl font-bold">${report.total_invoiced.toFixed(2)}</p>
          <p className="text-xs text-slate-500 mt-2">
            {report.invoice_count} invoices
          </p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm mb-2">Total Paid</p>
          <p className="text-3xl font-bold">${report.total_paid.toFixed(2)}</p>
          <p className="text-xs text-green-400 mt-2">
            {report.payment_success_rate.toFixed(1)}% success rate
          </p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm mb-2">Outstanding</p>
          <p className="text-3xl font-bold text-yellow-400">
            ${report.total_outstanding.toFixed(2)}
          </p>
          <p className="text-xs text-slate-500 mt-2">
            {report.overdue_invoices} overdue
          </p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm mb-2">Net Profit</p>
          <p
            className={`text-3xl font-bold ${
              report.profitability >= 0 ? 'text-green-400' : 'text-red-400'
            }`}
          >
            ${report.profitability.toFixed(2)}
          </p>
          <p className="text-xs text-slate-500 mt-2">
            Invoiced - Expenses
          </p>
        </div>
      </div>

      {/* Income vs Expenses */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Cash Flow Analysis</h2>
        <div className="space-y-2">
          {report.cash_flow.map((month, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-slate-700/20 rounded"
            >
              <span className="font-medium">{month.month}</span>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs text-slate-400">Income</p>
                  <p className="font-semibold text-green-400">
                    ${month.income.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Expenses</p>
                  <p className="font-semibold text-red-400">
                    ${month.expenses.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Net</p>
                  <p
                    className={`font-semibold ${
                      month.net >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    ${month.net.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Clients */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Top Clients</h2>
        <div className="space-y-2">
          {report.top_clients.map((client, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-slate-700/20 rounded"
            >
              <span className="font-medium">{client.name}</span>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs text-slate-400">Invoiced</p>
                  <p className="font-semibold">
                    ${client.total_invoiced.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Paid</p>
                  <p className="font-semibold text-green-400">
                    ${client.paid.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invoice Aging */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Invoice Aging Analysis</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-slate-700/20 p-4 rounded text-center">
            <p className="text-slate-400 text-sm mb-2">Current</p>
            <p className="text-2xl font-bold text-green-400">
              ${report.invoice_aging.current.toFixed(2)}
            </p>
          </div>
          <div className="bg-slate-700/20 p-4 rounded text-center">
            <p className="text-slate-400 text-sm mb-2">30+ Days</p>
            <p className="text-2xl font-bold text-yellow-400">
              ${report.invoice_aging.thirty.toFixed(2)}
            </p>
          </div>
          <div className="bg-slate-700/20 p-4 rounded text-center">
            <p className="text-slate-400 text-sm mb-2">60+ Days</p>
            <p className="text-2xl font-bold text-orange-400">
              ${report.invoice_aging.sixty.toFixed(2)}
            </p>
          </div>
          <div className="bg-slate-700/20 p-4 rounded text-center">
            <p className="text-slate-400 text-sm mb-2">90+ Days</p>
            <p className="text-2xl font-bold text-red-400">
              ${report.invoice_aging.ninety_plus.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
