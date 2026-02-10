'use client'

import { useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/dashboard/sidebar'
import TopBar from '@/components/dashboard/topbar'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push('/auth/login')
      } else {
        setUser(data.session.user)
      }
      setLoading(false)
    })
  }, [router])

  if (loading) return <div>Loading...</div>

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto bg-slate-800">
          {children}
        </main>
      </div>
    </div>
  )
}
