'use client'

import React from "react"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, Clock } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface TimeEntry {
  id: string
  project_name: string
  description: string
  date: string
  hours: number
  rate: number
  is_billable: boolean
  client_name: string
}

export default function TimeTrackingPage() {
  const [entries, setEntries] = useState<TimeEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const { toast } = useToast()

  const [form, setForm] = useState({
    client_id: '',
    project_name: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    hours: 0,
    rate: 0,
    is_billable: true,
  })

  useEffect(() => {
    fetchTimeEntries()
  }, [])

  const fetchTimeEntries = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/time-entries')
      const data = await res.json()
      setEntries(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load time entries',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/time-entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error()

      const newEntry = await res.json()
      setEntries([newEntry, ...entries])
      setForm({
        client_id: '',
        project_name: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        hours: 0,
        rate: 0,
        is_billable: true,
      })
      setShowForm(false)
      toast({
        title: 'Success',
        description: 'Time entry logged',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create time entry',
        variant: 'destructive',
      })
    }
  }

  const totalBillable = entries
    .filter((e) => e.is_billable)
    .reduce((sum, e) => sum + e.hours * e.rate, 0)
  const totalHours = entries.reduce((sum, e) => sum + e.hours, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Time Tracking</h1>
            <p className="text-slate-400">Track billable hours and projects</p>
          </div>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Log Time
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <p className="text-slate-400 text-sm">Total Hours</p>
          <p className="text-2xl font-bold">{totalHours.toFixed(1)}h</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <p className="text-slate-400 text-sm">Billable Amount</p>
          <p className="text-2xl font-bold">${totalBillable.toFixed(2)}</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <p className="text-slate-400 text-sm">Entries</p>
          <p className="text-2xl font-bold">{entries.length}</p>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  required
                  value={form.project_name}
                  onChange={(e) =>
                    setForm({ ...form, project_name: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white"
                  placeholder="Project name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white min-h-20"
                placeholder="Work description"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Hours</label>
                <input
                  type="number"
                  step="0.5"
                  required
                  value={form.hours}
                  onChange={(e) =>
                    setForm({ ...form, hours: parseFloat(e.target.value) })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Hourly Rate
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={form.rate}
                  onChange={(e) =>
                    setForm({ ...form, rate: parseFloat(e.target.value) })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Billable
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.is_billable}
                    onChange={(e) =>
                      setForm({ ...form, is_billable: e.target.checked })
                    }
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm">Mark as billable</span>
                </label>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit">Log Time Entry</Button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-slate-700 rounded hover:bg-slate-800"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Entries List */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading...</div>
        ) : entries.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            No time entries yet. Start logging your work.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-700 bg-slate-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Hours
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Rate
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-slate-700/20">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold">{entry.project_name}</p>
                        <p className="text-sm text-slate-400">
                          {entry.description}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">{entry.hours}h</td>
                    <td className="px-6 py-4">${entry.rate.toFixed(2)}</td>
                    <td className="px-6 py-4 font-semibold">
                      ${(entry.hours * entry.rate).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      {entry.is_billable ? (
                        <span className="px-2 py-1 rounded text-sm bg-green-500/20 text-green-400">
                          Billable
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded text-sm bg-slate-500/20 text-slate-400">
                          Non-billable
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
