import { NextResponse } from 'next/server'

const API = 'https://api.pluggy.ai'

export async function POST() {
  const clientId = process.env.PLUGGY_CLIENT_ID
  const clientSecret = process.env.PLUGGY_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'Pluggy não configurada. Defina PLUGGY_CLIENT_ID e PLUGGY_CLIENT_SECRET no servidor.' }, { status: 503 })
  }
  try {
    const auth = await fetch(`${API}/auth`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ clientId, clientSecret }), cache: 'no-store' })
    if (!auth.ok) return NextResponse.json({ error: 'Falha ao autenticar na Pluggy.' }, { status: 502 })
    const { apiKey } = await auth.json()
    const token = await fetch(`${API}/connect_token`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-API-KEY': apiKey }, body: JSON.stringify({ }), cache: 'no-store' })
    if (!token.ok) return NextResponse.json({ error: 'Falha ao gerar Connect Token.' }, { status: 502 })
    const data = await token.json()
    return NextResponse.json({ accessToken: data.accessToken || data.connectToken })
  } catch {
    return NextResponse.json({ error: 'Serviço Open Finance indisponível.' }, { status: 502 })
  }
}
