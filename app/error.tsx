'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[v0] Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-md">
        <div className="flex justify-center">
          <AlertTriangle className="h-24 w-24 text-red-400 opacity-20" />
        </div>
        <div className="space-y-3">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">
            500
          </h1>
          <p className="text-2xl font-semibold">Something went wrong</p>
          <p className="text-slate-400">
            An unexpected error occurred. Our team has been notified. Please try again or contact support.
          </p>
        </div>
        <div className="flex flex-col gap-3 pt-4">
          <Button onClick={reset} className="w-full bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Link href="/dashboard">
            <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-800 bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
