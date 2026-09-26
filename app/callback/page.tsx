'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { processOAuthCallback, saveAuthData } from '@/lib/oauth'

export default function CallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code')
        const state = searchParams.get('state')

        if (!code) {
          setError('Falha na autenticação')
          return
        }

        await processOAuthCallback(code, state)
        await saveAuthData()

        router.push('/dashboard')
      } catch (error) {
        console.error('Erro no callback:', error)
        setError('Falha ao processar autenticação')
      } finally {
        setLoading(false)
      }
    }

    handleCallback()
  }, [searchParams, router])

  if (loading) return <div className="flex items-center justify-center h-screen">Processando...</div>
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>

  return null
}
