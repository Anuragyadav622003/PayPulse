import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: userData, error: authError } = await supabase.auth.getUser(
      token
    )

    if (authError || !userData.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('user_currencies')
      .select(
        `
        id,
        is_primary,
        currency:currencies(id, code, name, symbol, exchange_rate)
      `
      )
      .eq('user_id', userData.user.id)

    if (error) throw error

    return NextResponse.json(
      data.map((uc: any) => ({
        id: uc.id,
        is_primary: uc.is_primary,
        ...uc.currency,
      }))
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch currencies' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: userData, error: authError } = await supabase.auth.getUser(
      token
    )

    if (authError || !userData.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // Find currency by code
    const { data: currencyData, error: currencyError } = await supabase
      .from('currencies')
      .select('id')
      .eq('code', body.currency_code)
      .single()

    if (currencyError) throw currencyError

    const { data, error } = await supabase
      .from('user_currencies')
      .insert([
        {
          user_id: userData.user.id,
          currency_id: currencyData.id,
        },
      ])
      .select()

    if (error) throw error

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add currency' },
      { status: 500 }
    )
  }
}
