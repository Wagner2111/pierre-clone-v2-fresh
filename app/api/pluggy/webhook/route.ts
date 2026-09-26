import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Arquivo para armazenar dados de webhook (alternativa a banco de dados)
const WEBHOOK_DATA_FILE = path.join(process.cwd(), '.webhook_accounts.json')

function saveAccounts(accounts: any[]) {
  try {
    fs.writeFileSync(WEBHOOK_DATA_FILE, JSON.stringify({ accounts, timestamp: new Date().toISOString() }, null, 2))
    console.log('Contas salvas:', accounts.length)
  } catch (e) {
    console.error('Erro ao salvar:', e)
  }
}

function getAccounts() {
  try {
    if (fs.existsSync(WEBHOOK_DATA_FILE)) {
      const data = fs.readFileSync(WEBHOOK_DATA_FILE, 'utf-8')
      return JSON.parse(data).accounts || []
    }
  } catch (e) {
    console.error('Erro ao ler:', e)
  }
  return []
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('=== WEBHOOK PLUGGY ===')
    console.log('Evento recebido:', body)

    const accounts = []

    // Pluggy pode enviar dados de diferentes formas
    // Formato 1: { accounts: [...] }
    if (body.accounts && Array.isArray(body.accounts)) {
      body.accounts.forEach((acc: any) => {
        accounts.push({
          name: acc.institution?.name || acc.institutionName || acc.name || 'Conta conectada',
          type: acc.type || acc.accountType || 'Conta bancária',
          balance: typeof acc.balance === 'string'
            ? acc.balance
            : `R$ ${Number(acc.balance || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          accountNumber: acc.number || acc.accountNumber
        })
      })
    }

    // Formato 2: { item: { ... }, data: { accounts: [...] } }
    if (body.data?.accounts && Array.isArray(body.data.accounts)) {
      body.data.accounts.forEach((acc: any) => {
        accounts.push({
          name: body.item?.institution?.name || body.item?.name || acc.name || 'Conta conectada',
          type: acc.type || 'Conta bancária',
          balance: typeof acc.balance === 'string'
            ? acc.balance
            : `R$ ${Number(acc.balance || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          accountNumber: acc.number
        })
      })
    }

    // Formato 3: Evento de item com informações básicas
    if (body.item && !accounts.length) {
      console.log('Item recebido:', body.item)
      accounts.push({
        name: body.item.institution?.name || body.item.name || 'Conta conectada',
        type: body.item.type || 'Conta bancária',
        balance: body.item.balance ? `R$ ${Number(body.item.balance).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'R$ 0,00'
      })
    }

    // Se recebeu contas, salva
    if (accounts.length > 0) {
      const existing = getAccounts()
      const all = [...existing, ...accounts]
      // Remove duplicatas pelo nome
      const unique = Array.from(new Map(all.map(a => [a.name, a])).values())
      saveAccounts(unique)
      console.log('Contas armazenadas:', unique.length)
    }

    return NextResponse.json({ success: true, accountsReceived: accounts.length })
  } catch (error) {
    console.error('Erro webhook:', error)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}

// GET para verificar contas armazenadas
export async function GET() {
  const accounts = getAccounts()
  return NextResponse.json({
    message: 'Webhook endpoint ready',
    storedAccounts: accounts.length,
    accounts
  })
}
