import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle, FileText, Home } from 'lucide-react'

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-md">
        <div className="flex justify-center">
          <CheckCircle className="h-24 w-24 text-green-400 animate-bounce" />
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl font-bold">Payment Successful!</h1>
          <p className="text-lg text-slate-400">
            Thank you for your payment. Your invoice has been marked as paid.
          </p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-left">
          <p className="text-sm text-slate-400 mb-2">Payment Details</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Transaction ID:</span>
              <span className="font-mono text-sm">TXN-2024-001</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Amount Paid:</span>
              <span className="font-semibold">$2,500.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Status:</span>
              <span className="text-green-400 font-semibold">Completed</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Link href="/dashboard/invoices">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <FileText className="mr-2 h-4 w-4" />
              View Invoices
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-800 bg-transparent">
              <Home className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <p className="text-sm text-slate-400">
          A receipt has been sent to your email address.
        </p>
      </div>
    </div>
  )
}
