'use client'

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Calendar, DollarSign, Users } from 'lucide-react'

const revenueData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 2000 },
  { month: 'Apr', revenue: 2780 },
  { month: 'May', revenue: 1890 },
  { month: 'Jun', revenue: 2390 },
]

const invoiceData = [
  { month: 'Jan', invoices: 12 },
  { month: 'Feb', invoices: 19 },
  { month: 'Mar', invoices: 15 },
  { month: 'Apr', invoices: 25 },
  { month: 'May', invoices: 22 },
  { month: 'Jun', invoices: 28 },
]

const statusData = [
  { name: 'Paid', value: 65, color: '#22c55e' },
  { name: 'Pending', value: 20, color: '#eab308' },
  { name: 'Overdue', value: 15, color: '#ef4444' },
]

export default function AnalyticsPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Analytics & Reports</h1>
        <p className="text-slate-400 mt-2">Comprehensive insights into your business performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-slate-400 text-sm">Total Revenue</p>
            <DollarSign className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white">$18,060</p>
          <p className="text-sm text-green-400 mt-2">+12.5% from last month</p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-slate-400 text-sm">Total Invoices</p>
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-white">121</p>
          <p className="text-sm text-blue-400 mt-2">+28 this month</p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-slate-400 text-sm">Active Clients</p>
            <Users className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-3xl font-bold text-white">24</p>
          <p className="text-sm text-cyan-400 mt-2">+3 new clients</p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-slate-400 text-sm">Payment Rate</p>
            <Calendar className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-white">87%</p>
          <p className="text-sm text-purple-400 mt-2">On-time payments</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-6">Revenue Trend (6 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '0.5rem',
                }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Invoice Chart */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-6">Invoices Sent (6 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={invoiceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '0.5rem',
                }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Bar dataKey="invoices" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart - Invoice Status */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-6">Invoice Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}%`} outerRadius={100}>
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '0.5rem',
                }}
                labelStyle={{ color: '#e2e8f0' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Key Insights */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-6">Key Insights</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-1 bg-green-400 rounded-full flex-shrink-0"></div>
              <div>
                <p className="font-semibold text-white">Strong Revenue Growth</p>
                <p className="text-sm text-slate-400">Your revenue increased by 12.5% compared to last month.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1 bg-blue-400 rounded-full flex-shrink-0"></div>
              <div>
                <p className="font-semibold text-white">Increasing Invoice Volume</p>
                <p className="text-sm text-slate-400">You sent 28 invoices this month, up from 22 last month.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1 bg-cyan-400 rounded-full flex-shrink-0"></div>
              <div>
                <p className="font-semibold text-white">Client Base Expansion</p>
                <p className="text-sm text-slate-400">Added 3 new active clients in the last 30 days.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1 bg-yellow-400 rounded-full flex-shrink-0"></div>
              <div>
                <p className="font-semibold text-white">Payment Efficiency</p>
                <p className="text-sm text-slate-400">87% of invoices are paid on time or early.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Table */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-6">Top Clients by Revenue</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Client Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Total Invoices</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Revenue</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Payment Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-700/50 hover:bg-slate-700/20">
                <td className="py-4 px-4 text-white font-medium">Acme Corporation</td>
                <td className="py-4 px-4 text-slate-300">12</td>
                <td className="py-4 px-4 text-white font-semibold">$8,500</td>
                <td className="py-4 px-4 text-green-400">100%</td>
              </tr>
              <tr className="border-b border-slate-700/50 hover:bg-slate-700/20">
                <td className="py-4 px-4 text-white font-medium">Global Solutions</td>
                <td className="py-4 px-4 text-slate-300">8</td>
                <td className="py-4 px-4 text-white font-semibold">$5,200</td>
                <td className="py-4 px-4 text-green-400">88%</td>
              </tr>
              <tr className="border-b border-slate-700/50 hover:bg-slate-700/20">
                <td className="py-4 px-4 text-white font-medium">Tech Startup Inc</td>
                <td className="py-4 px-4 text-slate-300">5</td>
                <td className="py-4 px-4 text-white font-semibold">$3,600</td>
                <td className="py-4 px-4 text-yellow-400">75%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
