import { NextResponse } from 'next/server'

const API = 'https://api.pluggy.ai'

export async function GET() {
  const clientId = process.env.PLUGGY_CLIENT_ID
  const clientSecret = process.env.PLUGGY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'Credenciais Pluggy não configuradas' }, { status: 503 })
  }

  try {
    // Autenticar na Pluggy
    const authRes = await fetch(`${API}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId, clientSecret }),
      cache: 'no-store'
    })

    if (!authRes.ok) {
      console.error('Auth Pluggy falhou:', authRes.status)
      return NextResponse.json({ error: 'Falha ao autenticar' }, { status: 502 })
    }

    const { apiKey } = await authRes.json()

    // Buscar contas/conexões
    const connRes = await fetch(`${API}/connections`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey
      },
      cache: 'no-store'
    })

    if (!connRes.ok) {
      console.error('Buscar conexões falhou:', connRes.status)
      return NextResponse.json({ error: 'Falha ao buscar conexões' }, { status: 502 })
    }

    const connData = await connRes.json()
    const connections = Array.isArray(connData.results) ? connData.results : (Array.isArray(connData) ? connData : [])

    // Buscar contas para cada conexão
    const allAccounts: any[] = []
    for (const conn of connections) {
      try {
        const accRes = await fetch(`${API}/accounts?connectionId=${conn.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': apiKey
          },
          cache: 'no-store'
        })

        if (accRes.ok) {
          const accData = await accRes.json()
          const accounts = Array.isArray(accData.results) ? accData.results : (Array.isArray(accData.accounts) ? accData.accounts : [])

          accounts.forEach((acc) => {
            allAccounts.push({
              name: conn.institution?.name || conn.name || 'Conta conectada',
              institution: conn.institution?.name,
              type: acc.type || 'Conta',
              balance: acc.balance || 0,
              accountNumber: acc.number,
              connectionId: conn.id
            })
          })
        }
      } catch (e) {
        console.error(`Erro ao buscar contas de ${conn.id}:`, e)
      }
    }

    return NextResponse.json({ accounts: allAccounts })
  } catch (error) {
    console.error('Erro ao buscar dados do Pluggy:', error)
    return NextResponse.json({ error: 'Serviço indisponível' }, { status: 502 })
  }
}
