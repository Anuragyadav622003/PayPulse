'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, Trash2, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Currency {
  id: string
  code: string
  name: string
  symbol: string
  exchange_rate: number
  is_primary: boolean
}

const AVAILABLE_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
]

export default function CurrenciesPage() {
  const [currencies, setCurrencies] = useState<Currency[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchCurrencies()
  }, [])

  const fetchCurrencies = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/currencies')
      const data = await res.json()
      setCurrencies(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load currencies',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const addCurrency = async (currencyCode: string) => {
    try {
      const res = await fetch('/api/currencies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currency_code: currencyCode }),
      })

      if (!res.ok) throw new Error()

      const newCurrency = await res.json()
      setCurrencies([...currencies, newCurrency])
      toast({
        title: 'Success',
        description: 'Currency added',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add currency',
        variant: 'destructive',
      })
    }
  }

  const removeCurrency = async (id: string) => {
    try {
      await fetch(`/api/currencies/${id}`, { method: 'DELETE' })
      setCurrencies(currencies.filter((c) => c.id !== id))
      toast({
        title: 'Success',
        description: 'Currency removed',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove currency',
        variant: 'destructive',
      })
    }
  }

  const setPrimary = async (id: string) => {
    try {
      await fetch(`/api/currencies/${id}/set-primary`, { method: 'POST' })
      setCurrencies(
        currencies.map((c) => ({
          ...c,
          is_primary: c.id === id,
        }))
      )
      toast({
        title: 'Success',
        description: 'Primary currency updated',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to set primary currency',
        variant: 'destructive',
      })
    }
  }

  const unusedCurrencies = AVAILABLE_CURRENCIES.filter(
    (ac) => !currencies.some((c) => c.code === ac.code)
  )

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
            <h1 className="text-3xl font-bold">Currency Settings</h1>
            <p className="text-slate-400">Manage your supported currencies</p>
          </div>
        </div>
      </div>

      {/* Active Currencies */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your Currencies</h2>
        {loading ? (
          <p className="text-slate-400">Loading...</p>
        ) : currencies.length === 0 ? (
          <p className="text-slate-400">
            No currencies added yet. Add at least one to get started.
          </p>
        ) : (
          <div className="space-y-3">
            {currencies.map((currency) => (
              <div
                key={currency.id}
                className="flex items-center justify-between p-4 bg-slate-700/20 rounded border border-slate-700"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div>
                    <p className="font-semibold">
                      {currency.symbol} {currency.code}
                    </p>
                    <p className="text-sm text-slate-400">{currency.name}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-sm text-slate-400">Exchange Rate</p>
                    <p className="font-mono">1 {currency.code} = {currency.exchange_rate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {currency.is_primary ? (
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded">
                      <Check className="h-4 w-4 inline mr-1" />
                      Primary
                    </span>
                  ) : (
                    <button
                      onClick={() => setPrimary(currency.id)}
                      className="px-3 py-1 border border-slate-600 hover:bg-slate-700 rounded text-sm"
                    >
                      Set Primary
                    </button>
                  )}
                  <button
                    onClick={() => removeCurrency(currency.id)}
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

      {/* Add Currency */}
      {unusedCurrencies.length > 0 && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Add Currency</h2>
          <div className="grid grid-cols-2 gap-3">
            {unusedCurrencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => addCurrency(currency.code)}
                className="flex items-center justify-between p-4 bg-slate-700/20 hover:bg-slate-700/40 rounded border border-slate-700 transition"
              >
                <div className="text-left">
                  <p className="font-semibold">{currency.symbol} {currency.code}</p>
                  <p className="text-sm text-slate-400">{currency.name}</p>
                </div>
                <Plus className="h-4 w-4 text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
