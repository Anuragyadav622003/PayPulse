import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertCircle, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-md">
        <div className="flex justify-center">
          <AlertCircle className="h-24 w-24 text-yellow-400 opacity-20" />
        </div>
        <div className="space-y-3">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            404
          </h1>
          <p className="text-2xl font-semibold">Page not found</p>
          <p className="text-slate-400">The page you're looking for doesn't exist or has been moved.</p>
        </div>
        <div className="flex flex-col gap-3 pt-4">
          <Link href="/dashboard">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-800 bg-transparent">
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
