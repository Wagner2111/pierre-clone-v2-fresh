import { NextResponse } from 'next/server'

const API = 'https://api.pluggy.ai'

export async function GET() {
  const clientId = process.env.PLUGGY_CLIENT_ID
  const clientSecret = process.env.PLUGGY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'Credenciais não configuradas' }, { status: 503 })
  }

  try {
    console.log('Autenticando...')
    const authRes = await fetch(`${API}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId, clientSecret }),
      cache: 'no-store'
    })

    if (!authRes.ok) {
      const err = await authRes.text()
      console.error('Auth falhou:', err)
      return NextResponse.json({ error: 'Auth falhou' }, { status: 502 })
    }

    const { apiKey } = await authRes.json()
    console.log('Autenticado!')

    // Tenta buscar items (conexões) recentes
    console.log('Buscando items...')
    const itemsRes = await fetch(`${API}/items?sort=-createdAt&limit=100`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey
      },
      cache: 'no-store'
    })

    if (!itemsRes.ok) {
      const itemsErr = await itemsRes.text()
      console.error('Erro buscando items:', itemsErr)
      // Continua mesmo se falhar
    } else {
      const itemsData = await itemsRes.json()
      console.log('Items encontrados:', itemsData)

      const items = itemsData.results || itemsData.items || []
      const accounts = []

      // Busca contas para cada item
      for (const item of items.slice(0, 10)) {
        try {
          const accRes = await fetch(`${API}/accounts?itemId=${item.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-API-KEY': apiKey
            },
            cache: 'no-store'
          })

          if (accRes.ok) {
            const accData = await accRes.json()
            const accs = accData.results || accData.accounts || []

            accs.forEach((acc: any) => {
              accounts.push({
                name: item.institution?.name || item.name || 'Conta conectada',
                type: acc.type || 'Conta',
                balance: `R$ ${Number(acc.balance || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                accountNumber: acc.number
              })
            })
          }
        } catch (e) {
          console.error(`Erro item ${item.id}:`, e)
        }
      }

      if (accounts.length > 0) {
        return NextResponse.json({ accounts })
      }
    }

    return NextResponse.json({ accounts: [] })
  } catch (error) {
    console.error('Erro geral:', error)
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 })
  }
}
