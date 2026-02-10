'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Bell, Check, Clock, AlertCircle } from 'lucide-react'

const reminders = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-002',
    client: 'Tech Startup Inc',
    amount: '$1,800.00',
    reminderType: 'initial',
    scheduledDate: '2024-02-06',
    status: 'sent',
    sendDate: '2024-02-06',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-004',
    client: 'Innovation Labs',
    amount: '$1,500.00',
    reminderType: 'followup',
    scheduledDate: '2024-02-10',
    status: 'pending',
    sendDate: null,
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    client: 'Global Solutions',
    amount: '$3,200.00',
    reminderType: 'final',
    scheduledDate: '2024-02-15',
    status: 'pending',
    sendDate: null,
  },
]

const statusIcons = {
  sent: <Check className="w-4 h-4 text-green-400" />,
  pending: <Clock className="w-4 h-4 text-yellow-400" />,
  failed: <AlertCircle className="w-4 h-4 text-red-400" />,
}

const statusColors = {
  sent: 'bg-green-500/20 text-green-300',
  pending: 'bg-yellow-500/20 text-yellow-300',
  failed: 'bg-red-500/20 text-red-300',
}

export default function RemindersPage() {
  const [remindersList, setRemindersList] = useState(reminders)

  const handleSendReminder = async (reminderId: string) => {
    try {
      const reminder = remindersList.find((r) => r.id === reminderId)
      if (reminder) {
        // Send reminder
        await fetch('/api/reminders/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ invoiceId: reminder.invoiceNumber }),
        })

        // Update local state
        setRemindersList(
          remindersList.map((r) =>
            r.id === reminderId
              ? { ...r, status: 'sent', sendDate: new Date().toISOString().split('T')[0] }
              : r,
          ),
        )
      }
    } catch (error) {
      console.error('Error sending reminder:', error)
    }
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Email Reminders</h1>
          <p className="text-slate-400 mt-2">Manage payment reminders sent to clients</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm mb-2">Total Reminders</p>
          <p className="text-3xl font-bold text-white">{remindersList.length}</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm mb-2">Sent</p>
          <p className="text-3xl font-bold text-green-400">{remindersList.filter((r) => r.status === 'sent').length}</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm mb-2">Pending</p>
          <p className="text-3xl font-bold text-yellow-400">{remindersList.filter((r) => r.status === 'pending').length}</p>
        </div>
      </div>

      {/* Reminders Table */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800/50">
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Invoice</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Client</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Amount</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Type</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Scheduled</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {remindersList.map((reminder) => (
                <tr key={reminder.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition">
                  <td className="py-4 px-6 text-white font-medium">{reminder.invoiceNumber}</td>
                  <td className="py-4 px-6 text-slate-300">{reminder.client}</td>
                  <td className="py-4 px-6 text-white font-semibold">{reminder.amount}</td>
                  <td className="py-4 px-6 text-slate-400 capitalize">{reminder.reminderType}</td>
                  <td className="py-4 px-6 text-slate-400">{reminder.scheduledDate}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {statusIcons[reminder.status as keyof typeof statusIcons]}
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColors[reminder.status as keyof typeof statusColors]}`}>
                        {reminder.status.charAt(0).toUpperCase() + reminder.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {reminder.status === 'pending' && (
                      <Button
                        onClick={() => handleSendReminder(reminder.id)}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Bell className="w-4 h-4 mr-1" />
                        Send Now
                      </Button>
                    )}
                    {reminder.status === 'sent' && <span className="text-slate-400 text-sm">Sent on {reminder.sendDate}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Automation Info */}
      <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-6">
        <h2 className="text-lg font-bold text-white mb-4">Automated Reminders</h2>
        <p className="text-slate-300 mb-4">
          Enable automatic reminders to be sent to clients on a schedule. Reminders will be sent:
        </p>
        <ul className="space-y-2 text-slate-400">
          <li>• Initial reminder: 1 day after invoice is sent</li>
          <li>• Follow-up reminder: 3 days before due date</li>
          <li>• Final reminder: On the due date</li>
        </ul>
      </div>
    </div>
  )
}
