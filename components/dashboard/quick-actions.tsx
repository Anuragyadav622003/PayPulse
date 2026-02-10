'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, Mail, Settings } from 'lucide-react'

export default function QuickActions() {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 h-fit">
      <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
      
      <div className="space-y-3">
        <Link href="/dashboard/invoices/new" className="block">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
            <Plus className="w-4 h-4 mr-2" />
            Create Invoice
          </Button>
        </Link>

        <Link href="/dashboard/clients/new" className="block">
          <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-700 bg-transparent">
            <Plus className="w-4 h-4 mr-2" />
            Add Client
          </Button>
        </Link>

        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition">
          <Mail className="w-4 h-4" />
          Send Reminders
        </button>

        <Link href="/dashboard/settings" className="block">
          <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-700 bg-transparent">
            <Settings className="w-4 h-4 mr-2" />
            Account Settings
          </Button>
        </Link>
      </div>

      <div className="mt-8 p-4 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-600/30 rounded-lg">
        <h3 className="font-semibold text-white mb-2">Upgrade to Pro</h3>
        <p className="text-sm text-slate-300 mb-3">Get advanced features and unlimited invoices</p>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-sm">Upgrade Now</Button>
      </div>
    </div>
  )
}
