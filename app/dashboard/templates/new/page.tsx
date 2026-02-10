'use client'

import React from "react"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

export default function CreateTemplatePage() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    description: '',
    logo_url: '',
    brand_color: '#3b82f6',
    font_family: 'Arial',
    layout_style: 'modern',
    header_text: '',
    footer_text: '',
    terms_conditions: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Failed to create')

      toast({
        title: 'Success',
        description: 'Template created successfully',
      })
      router.push('/dashboard/templates')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create template',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/templates">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Create Invoice Template</h1>
          <p className="text-slate-400">Design your custom invoice layout</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Template Name
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white"
              placeholder="e.g., Professional Modern"
            />
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
              className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white min-h-24"
              placeholder="Describe this template"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Brand Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={form.brand_color}
                  onChange={(e) =>
                    setForm({ ...form, brand_color: e.target.value })
                  }
                  className="w-16 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={form.brand_color}
                  onChange={(e) =>
                    setForm({ ...form, brand_color: e.target.value })
                  }
                  className="flex-1 bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Font Family
              </label>
              <select
                value={form.font_family}
                onChange={(e) =>
                  setForm({ ...form, font_family: e.target.value })
                }
                className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white"
              >
                <option>Arial</option>
                <option>Helvetica</option>
                <option>Times New Roman</option>
                <option>Georgia</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Layout Style
            </label>
            <select
              value={form.layout_style}
              onChange={(e) =>
                setForm({ ...form, layout_style: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white"
            >
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
              <option value="minimal">Minimal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Logo URL</label>
            <input
              type="url"
              value={form.logo_url}
              onChange={(e) => setForm({ ...form, logo_url: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white"
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Header Text
            </label>
            <textarea
              value={form.header_text}
              onChange={(e) =>
                setForm({ ...form, header_text: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white min-h-20"
              placeholder="Invoice header content"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Footer Text
            </label>
            <textarea
              value={form.footer_text}
              onChange={(e) =>
                setForm({ ...form, footer_text: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white min-h-20"
              placeholder="Invoice footer content"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Terms & Conditions
            </label>
            <textarea
              value={form.terms_conditions}
              onChange={(e) =>
                setForm({ ...form, terms_conditions: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white min-h-24"
              placeholder="Default terms and conditions"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Template'}
          </Button>
          <Link href="/dashboard/templates">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
