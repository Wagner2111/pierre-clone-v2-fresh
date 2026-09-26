import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const WEBHOOK_DATA_FILE = path.join(process.cwd(), '.webhook_accounts.json')

export async function GET() {
  try {
    if (fs.existsSync(WEBHOOK_DATA_FILE)) {
      const data = fs.readFileSync(WEBHOOK_DATA_FILE, 'utf-8')
      const parsed = JSON.parse(data)
      return NextResponse.json({ accounts: parsed.accounts || [] })
    }
    return NextResponse.json({ accounts: [] })
  } catch (error) {
    console.error('Erro ao buscar contas:', error)
    return NextResponse.json({ error: 'Erro ao buscar' }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    if (fs.existsSync(WEBHOOK_DATA_FILE)) {
      fs.unlinkSync(WEBHOOK_DATA_FILE)
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao deletar:', error)
    return NextResponse.json({ error: 'Erro ao deletar' }, { status: 500 })
  }
}
