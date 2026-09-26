import { NextResponse } from 'next/server'

const API = 'https://api.pluggy.ai'

export async function GET() {
  const clientId = process.env.PLUGGY_CLIENT_ID
  const clientSecret = process.env.PLUGGY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    console.error('Credenciais não configuradas')
    return NextResponse.json({ error: 'Credenciais não configuradas' }, { status: 503 })
  }

  try {
    console.log('Autenticando com Pluggy...')
    // Autenticar
    const authRes = await fetch(`${API}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId, clientSecret }),
      cache: 'no-store'
    })

    if (!authRes.ok) {
      const authErr = await authRes.text()
      console.error('Auth falhou:', authRes.status, authErr)
      return NextResponse.json({ error: 'Auth falhou', detail: authErr }, { status: 502 })
    }

    const { apiKey } = await authRes.json()
    console.log('Autenticado! Buscando contas...')

    // Tentar buscar contas diretamente
    const accRes = await fetch(`${API}/accounts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey
      },
      cache: 'no-store'
    })

    if (!accRes.ok) {
      const accErr = await accRes.text()
      console.error('Buscar contas falhou:', accRes.status, accErr)
      return NextResponse.json({ error: 'Falha ao buscar contas', detail: accErr }, { status: 502 })
    }

    const accData = await accRes.json()
    console.log('Dados recebidos:', accData)

    const accounts = []
    const accs = accData.results || accData.accounts || []

    for (const acc of accs) {
      accounts.push({
        name: acc.institution?.name || acc.institution || acc.name || 'Conta conectada',
        type: acc.type || 'Conta bancária',
        balance: `R$ ${Number(acc.balance || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
      })
    }

    console.log('Contas formatadas:', accounts)
    return NextResponse.json({ accounts })
  } catch (error) {
    console.error('Erro sync:', error)
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 })
  }
}
