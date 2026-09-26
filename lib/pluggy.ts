// Pluggy Open Banking Integration
// Docs: https://docs.pluggy.ai/

const API_BASE = 'https://api.pluggy.ai'
const SANDBOX_BASE = 'https://sandbox.pluggy.ai'

export const PLUGGY_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_PLUGGY_CLIENT_ID || '',
  apiKey: process.env.PLUGGY_API_KEY || '',
  environment: process.env.PLUGGY_ENVIRONMENT || 'sandbox',
}

const getApiBase = () => PLUGGY_CONFIG.environment === 'production' ? API_BASE : SANDBOX_BASE

export const PLUGGY_BANKS = {
  NUBANK: { id: '1', name: 'Nubank', icon: '🟣', color: '#8B5CF6' },
  INTER: { id: '60', name: 'Inter', icon: '🟠', color: '#FF6B00' },
  ITAU: { id: '21', name: 'Itaú', icon: '🔵', color: '#0066CC' },
  BRADESCO: { id: '27', name: 'Bradesco', icon: '🔴', color: '#CC0000' },
  SANTANDER: { id: '33', name: 'Santander', icon: '🟡', color: '#FFC72C' },
  CAIXA: { id: '104', name: 'Caixa', icon: '🟦', color: '#003DA5' },
}

// Criar conexão e gerar QR Code
export async function generateQRCode(bankId: string) {
  try {
    const redirectUri = process.env.NEXT_PUBLIC_PRODUCTION_REDIRECT_URI || 'http://localhost:3000/callback'

    const response = await fetch(`${getApiBase()}/connections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PLUGGY_CONFIG.apiKey}`,
      },
      body: JSON.stringify({
        connectorId: parseInt(bankId),
        redirectUrl: redirectUri,
        clientId: PLUGGY_CONFIG.clientId,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Pluggy API error:', error)
      throw new Error(`Failed to generate QR code: ${error.message || response.statusText}`)
    }

    const data = await response.json()
    return {
      qrCode: data.qrCode || data.url,
      url: data.url,
      connectionId: data.id,
    }
  } catch (error) {
    console.error('Error generating QR code:', error)
    throw error
  }
}

// Buscar dados da conexão
export async function fetchConnectionData(connectionId: string) {
  try {
    const response = await fetch(`${getApiBase()}/connections/${connectionId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PLUGGY_CONFIG.apiKey}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch connection data')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching connection data:', error)
    throw error
  }
}

// Buscar contas da conexão
export async function fetchAccounts(connectionId: string) {
  try {
    const response = await fetch(`${getApiBase()}/accounts?connectorId=${connectionId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PLUGGY_CONFIG.apiKey}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch accounts')
    }

    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error fetching accounts:', error)
    throw error
  }
}

// Buscar transações
export async function fetchTransactions(accountId: string) {
  try {
    const response = await fetch(`${getApiBase()}/transactions?accountId=${accountId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PLUGGY_CONFIG.apiKey}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch transactions')
    }

    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error fetching transactions:', error)
    throw error
  }
}

// Desconectar/deletar conexão
export async function disconnectAccount(connectionId: string) {
  try {
    const response = await fetch(`${getApiBase()}/connections/${connectionId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${PLUGGY_CONFIG.apiKey}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to disconnect account')
    }

    return true
  } catch (error) {
    console.error('Error disconnecting account:', error)
    throw error
  }
}
