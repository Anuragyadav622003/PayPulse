import { supabase } from '@/lib/supabase'
import StatsOverview from '@/components/dashboard/stats-overview'
import RecentInvoices from '@/components/dashboard/recent-invoices'
import QuickActions from '@/components/dashboard/quick-actions'

export default async function DashboardPage() {
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Welcome back, {user?.user_metadata?.full_name || 'User'}</h1>
        <p className="text-slate-400 mt-2">Here's your business overview</p>
      </div>

      {/* Stats Grid */}
      <StatsOverview />

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Recent Invoices - Takes 2 columns */}
        <div className="md:col-span-2">
          <RecentInvoices />
        </div>

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </div>
  )
}
