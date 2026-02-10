'use client'

import { Bell, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function TopBar() {
  return (
    <div className="h-16 border-b border-slate-700 bg-slate-800/50 flex items-center justify-between px-8">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <Input
            placeholder="Search invoices, clients..."
            className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-400 hover:text-white transition">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </div>
  )
}
