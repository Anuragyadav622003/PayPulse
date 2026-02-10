import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { XCircle, FileText, Home } from 'lucide-react'

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-md">
        <div className="flex justify-center">
          <XCircle className="h-24 w-24 text-red-400" />
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl font-bold">Payment Cancelled</h1>
          <p className="text-lg text-slate-400">
            Your payment was cancelled. You can try again or contact support for assistance.
          </p>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
          <p className="text-sm text-yellow-200">
            Your invoice is still pending. Please complete the payment to mark it as paid.
          </p>
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
          Need help? <a href="mailto:support@paypulse.com" className="text-blue-400 hover:text-blue-300">Contact support</a>
        </p>
      </div>
    </div>
  )
}
