'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Mail, Phone, MapPin, Edit, Trash2 } from 'lucide-react'

const clients = [
  {
    id: '1',
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business St, New York, NY 10001',
    invoicesCount: 12,
  },
  {
    id: '2',
    name: 'Tech Startup Inc',
    email: 'info@techstartup.com',
    phone: '+1 (555) 234-5678',
    address: '456 Innovation Ave, San Francisco, CA 94102',
    invoicesCount: 5,
  },
  {
    id: '3',
    name: 'Global Solutions',
    email: 'sales@globalsolutions.com',
    phone: '+1 (555) 345-6789',
    address: '789 Corporate Blvd, Chicago, IL 60601',
    invoicesCount: 8,
  },
]

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Clients</h1>
          <p className="text-slate-400 mt-2">Manage and organize your client information</p>
        </div>
        <Link href="/dashboard/clients/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Client
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div>
        <Input
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
        />
      </div>

      {/* Clients Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div key={client.id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-white">{client.name}</h3>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-700 rounded transition">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href={`mailto:${client.email}`} className="hover:text-blue-400 truncate">
                  {client.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href={`tel:${client.phone}`} className="hover:text-blue-400">
                  {client.phone}
                </a>
              </div>
              <div className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-1" />
                <span className="text-sm">{client.address}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700">
              <p className="text-sm text-slate-400 mb-3">
                <strong className="text-white">{client.invoicesCount}</strong> invoices
              </p>
              <Link href={`/dashboard/invoices?client=${client.id}`}>
                <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-700 bg-transparent">
                  View Invoices
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No clients found</p>
        </div>
      )}
    </div>
  )
}
