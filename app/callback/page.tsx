'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { processOAuthCallback, saveAuthData } from '@/lib/oauth'

export const dynamic = 'force-dynamic'

export default function CallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Processar callback do OAuth
    const result = processOAuthCallback(searchParams)

    if (result.isSuccess && result.code) {
      // Salvar dados de autenticação
      saveAuthData({
        code: result.code,
        idToken: result.idToken || undefined,
        bankName: 'Nubank',
        userCPF: '•••.317.273-••', // Em produção, viria do JWT
        connectedAt: new Date().toISOString(),
      })

      setStatus('success')
      setMessage('Conta conectada com sucesso! Redirecionando...')

      // Redirecionar para dashboard após 2 segundos
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } else if (result.error) {
      setStatus('error')
      setMessage(`Erro: ${result.errorDescription || result.error}`)
    } else {
      setStatus('error')
      setMessage('Nenhum código de autorização recebido')
    }
  }, [searchParams, router])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        {status === 'loading' && (
          <>
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h1 className="text-2xl font-bold">Processando autenticação...</h1>
            <p className="text-gray-400">Aguarde enquanto conectamos sua conta ao Pierre</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="text-6xl">✅</div>
            <h1 className="text-2xl font-bold text-green-500">Sucesso!</h1>
            <p className="text-gray-400">{message}</p>
            <p className="text-sm text-gray-500">Redirecionando em breve...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="text-6xl">❌</div>
            <h1 className="text-2xl font-bold text-red-500">Erro na autenticação</h1>
            <p className="text-gray-400">{message}</p>
            <button
              onClick={() => router.push('/dashboard')}
              className="mt-6 px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition"
            >
              Voltar ao Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  )
}
