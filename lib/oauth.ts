// OAuth Nubank Configuration
export const NUBANK_CONFIG = {
  clientId: '27276142351691',
  redirectUri: typeof window !== 'undefined'
    ? `${window.location.origin}/callback`
    : 'http://localhost:3000/callback',
  authorizationEndpoint: 'https://nuapp.nubank.com.br/open-banking/authorize',
  pluggyRedirectUri: 'https://data.of.pluggy.ai/cb',
}

// Escopos de permissão
export const OAUTH_SCOPES = [
  'openid',
  'consent:urn:nubank:6aac5438-e7dd-4270-af09-310b4da29ff2',
  'accounts',
  'credit-cards-accounts',
  'bank-fixed-incomes',
  'credit-fixed-incomes',
  'variable-incomes',
  'treasure-titles',
  'funds',
  'customers',
  'loans',
  'financings',
  'unarranged-accounts-overdraft',
  'invoice-financings',
  'resources',
]

// Montar URL de autenticação OAuth
export function buildNubankAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: NUBANK_CONFIG.clientId,
    scope: OAUTH_SCOPES.join(' '),
    response_type: 'code id_token',
    redirect_uri: NUBANK_CONFIG.pluggyRedirectUri,
    // Em produção, você usaria um JWT signed request_uri
    // Por enquanto, usando apenas os parâmetros básicos
  })

  return `${NUBANK_CONFIG.authorizationEndpoint}?${params.toString()}`
}

// Processar callback do Nubank
export function processOAuthCallback(searchParams: URLSearchParams) {
  const code = searchParams.get('code')
  const idToken = searchParams.get('id_token')
  const state = searchParams.get('state')
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  return {
    code,
    idToken,
    state,
    error,
    errorDescription,
    isSuccess: !!code && !error,
  }
}

// Salvar auth data no localStorage
export function saveAuthData(data: {
  code?: string
  idToken?: string
  bankName: string
  userCPF: string
  connectedAt: string
}) {
  const authData = {
    ...data,
    connectedBanks: [
      ...(JSON.parse(localStorage.getItem('bankAuth') || '{}').connectedBanks || []),
      data,
    ],
  }
  localStorage.setItem('bankAuth', JSON.stringify(authData))
  return authData
}

// Obter auth data
export function getAuthData() {
  if (typeof window === 'undefined') return null
  return JSON.parse(localStorage.getItem('bankAuth') || 'null')
}

// Limpar auth data
export function clearAuthData() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('bankAuth')
  }
}
