'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, Edit2, Trash2, Eye } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Template {
  id: string
  name: string
  description: string
  layout_style: string
  is_default: boolean
  created_at: string
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/templates')
      const data = await res.json()
      setTemplates(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load templates',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const deleteTemplate = async (id: string) => {
    try {
      await fetch(`/api/templates/${id}`, { method: 'DELETE' })
      setTemplates(templates.filter((t) => t.id !== id))
      toast({
        title: 'Success',
        description: 'Template deleted',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete template',
        variant: 'destructive',
      })
    }
  }

  const setDefault = async (id: string) => {
    try {
      await fetch(`/api/templates/${id}/set-default`, { method: 'POST' })
      setTemplates(
        templates.map((t) => ({
          ...t,
          is_default: t.id === id,
        }))
      )
      toast({
        title: 'Success',
        description: 'Default template updated',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to set default template',
        variant: 'destructive',
      })
    }
  }

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
            <h1 className="text-3xl font-bold">Invoice Templates</h1>
            <p className="text-slate-400">Customize your invoice designs</p>
          </div>
        </div>
        <Link href="/dashboard/templates/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Template
          </Button>
        </Link>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-slate-400">
            Loading templates...
          </div>
        ) : templates.length === 0 ? (
          <div className="col-span-full text-center text-slate-400">
            No templates yet. Create your first template to get started.
          </div>
        ) : (
          templates.map((template) => (
            <div
              key={template.id}
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{template.name}</h3>
                  <p className="text-slate-400 text-sm mt-1">
                    {template.description}
                  </p>
                </div>
                {template.is_default && (
                  <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded">
                    Default
                  </span>
                )}
              </div>

              <p className="text-slate-400 text-sm mb-4 capitalize">
                Style: {template.layout_style}
              </p>

              <div className="flex gap-2">
                <Link href={`/dashboard/templates/${template.id}`}>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </Link>
                <button
                  onClick={() => setDefault(template.id)}
                  className="flex-1 px-3 py-2 text-sm rounded border border-slate-700 hover:bg-slate-700 transition"
                >
                  {template.is_default ? 'Default' : 'Set Default'}
                </button>
                <button
                  onClick={() => deleteTemplate(template.id)}
                  className="px-3 py-2 text-sm rounded border border-red-700/50 hover:bg-red-500/10 text-red-400 transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
