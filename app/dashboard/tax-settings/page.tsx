'use client'

import React from "react"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, Edit2, Trash2, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface TaxProfile {
  id: string
  name: string
  tax_type: string
  tax_id: string
  tax_rate: number
  is_default: boolean
  country: string
  state: string
}

export default function TaxSettingsPage() {
  const [profiles, setProfiles] = useState<TaxProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const { toast } = useToast()

  const [form, setForm] = useState({
    name: '',
    tax_type: 'GST',
    tax_id: '',
    tax_rate: 0,
    country: '',
    state: '',
  })

  useEffect(() => {
    fetchTaxProfiles()
  }, [])

  const fetchTaxProfiles = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/tax-profiles')
      const data = await res.json()
      setProfiles(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load tax profiles',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/tax-profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error()

      const newProfile = await res.json()
      setProfiles([...profiles, newProfile])
      setForm({
        name: '',
        tax_type: 'GST',
        tax_id: '',
        tax_rate: 0,
        country: '',
        state: '',
      })
      setShowForm(false)
      toast({
        title: 'Success',
        description: 'Tax profile created',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create tax profile',
        variant: 'destructive',
      })
    }
  }

  const deleteProfile = async (id: string) => {
    try {
      await fetch(`/api/tax-profiles/${id}`, { method: 'DELETE' })
      setProfiles(profiles.filter((p) => p.id !== id))
      toast({
        title: 'Success',
        description: 'Tax profile deleted',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete profile',
        variant: 'destructive',
      })
    }
  }

  const setDefault = async (id: string) => {
    try {
      await fetch(`/api/tax-profiles/${id}/set-default`, { method: 'POST' })
      setProfiles(
        profiles.map((p) => ({
          ...p,
          is_default: p.id === id,
        }))
      )
      toast({
        title: 'Success',
        description: 'Default tax profile updated',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to set default profile',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/settings">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Tax Settings</h1>
            <p className="text-slate-400">Manage GST and tax profiles</p>
          </div>
        </div>
      </div>

      {/* Tax Profiles */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Tax Profiles</h2>
          <Button onClick={() => setShowForm(!showForm)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Profile
          </Button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 bg-slate-700/20 rounded border border-slate-700 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Profile Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white"
                  placeholder="e.g., India GST"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Tax Type
                </label>
                <select
                  value={form.tax_type}
                  onChange={(e) =>
                    setForm({ ...form, tax_type: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white"
                >
                  <option>GST</option>
                  <option>VAT</option>
                  <option>Sales Tax</option>
                  <option>Custom</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Tax ID / Registration Number
                </label>
                <input
                  type="text"
                  value={form.tax_id}
                  onChange={(e) => setForm({ ...form, tax_id: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white"
                  placeholder="e.g., 27AAFCT1234F1Z0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={form.tax_rate}
                  onChange={(e) =>
                    setForm({ ...form, tax_rate: parseFloat(e.target.value) })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white"
                  placeholder="e.g., 18"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Country
                </label>
                <input
                  type="text"
                  value={form.country}
                  onChange={(e) =>
                    setForm({ ...form, country: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white"
                  placeholder="e.g., India"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  State (Optional)
                </label>
                <input
                  type="text"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white"
                  placeholder="e.g., Maharashtra"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" size="sm">
                Create Profile
              </Button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-slate-700 rounded hover:bg-slate-800"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <p className="text-slate-400">Loading...</p>
        ) : profiles.length === 0 ? (
          <p className="text-slate-400">
            No tax profiles yet. Create one to enable tax calculations.
          </p>
        ) : (
          <div className="space-y-3">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="flex items-center justify-between p-4 bg-slate-700/20 rounded border border-slate-700"
              >
                <div className="flex-1">
                  <p className="font-semibold">{profile.name}</p>
                  <p className="text-sm text-slate-400">
                    {profile.tax_type} - {profile.tax_rate}% - {profile.country}
                    {profile.state && ` (${profile.state})`}
                  </p>
                  {profile.tax_id && (
                    <p className="text-xs text-slate-500">ID: {profile.tax_id}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {profile.is_default ? (
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded">
                      <Check className="h-4 w-4 inline mr-1" />
                      Default
                    </span>
                  ) : (
                    <button
                      onClick={() => setDefault(profile.id)}
                      className="px-3 py-1 border border-slate-600 hover:bg-slate-700 rounded text-sm"
                    >
                      Set Default
                    </button>
                  )}
                  <button
                    onClick={() => deleteProfile(profile.id)}
                    className="p-2 hover:bg-red-500/20 rounded text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
