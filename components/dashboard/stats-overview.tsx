'use client'

import { DollarSign, FileText, Users, TrendingUp } from 'lucide-react'

const stats = [
  {
    label: 'Total Revenue',
    value: '$12,450',
    change: '+12.5%',
    icon: DollarSign,
    color: 'text-green-400',
  },
  {
    label: 'Invoices Sent',
    value: '48',
    change: '+5 this month',
    icon: FileText,
    color: 'text-blue-400',
  },
  {
    label: 'Active Clients',
    value: '12',
    change: '+2 new',
    icon: Users,
    color: 'text-cyan-400',
  },
  {
    label: 'Paid on Time',
    value: '92%',
    change: '+3% from last month',
    icon: TrendingUp,
    color: 'text-purple-400',
  },
]

export default function StatsOverview() {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.label} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 bg-slate-700/50 rounded-lg ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              <span className="text-sm text-green-400">{stat.change}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
