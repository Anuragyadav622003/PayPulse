'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AlertCircle, Check } from 'lucide-react'

export default function SettingsPage() {
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    stripeKey: '',
    invoiceTemplate: 'standard',
    taxRate: 10,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('Settings updated successfully!')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div className="p-8 space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 mt-2">Manage your account and business settings</p>
      </div>

      {message && (
        <div className="bg-green-900/20 border border-green-600 text-green-400 px-4 py-3 rounded-lg flex items-center gap-2">
          <Check className="w-4 h-4" />
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Settings */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">Profile Settings</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
              <Input
                name="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Company Name</label>
              <Input
                name="companyName"
                type="text"
                placeholder="Your Company"
                value={formData.companyName}
                onChange={handleChange}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <Input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Invoice Settings */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">Invoice Settings</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Invoice Template</label>
              <select
                name="invoiceTemplate"
                value={formData.invoiceTemplate}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg"
              >
                <option value="standard">Standard</option>
                <option value="minimal">Minimal</option>
                <option value="detailed">Detailed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Default Tax Rate (%)</label>
              <Input
                name="taxRate"
                type="number"
                min="0"
                max="100"
                value={formData.taxRate}
                onChange={handleChange}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">Payment Settings</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Stripe API Key</label>
              <div className="flex gap-4">
                <Input
                  name="stripeKey"
                  type="password"
                  placeholder="sk_live_..."
                  value={formData.stripeKey}
                  onChange={handleChange}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                />
                <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700 bg-transparent">
                  Connect Stripe
                </Button>
              </div>
              <p className="text-sm text-slate-400 mt-2">Your API key is encrypted and never stored in plain text.</p>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-slate-800/50 border border-red-600/30 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            Danger Zone
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-white mb-2">Delete Account</h3>
              <p className="text-slate-400 text-sm mb-4">Once you delete your account, there is no going back. Please be certain.</p>
              <Button variant="outline" className="border-red-600/50 text-red-400 hover:bg-red-900/20 bg-transparent">
                Delete Account
              </Button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-4">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Save Settings
          </Button>
          <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700 bg-transparent">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
