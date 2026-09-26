'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AuthLayout } from '@/components/AuthLayout'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (!email) {
        setError('Email é obrigatório')
        return
      }

      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitted(true)
    } catch (err) {
      setError('Erro ao enviar email')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <AuthLayout>
        <div className="space-y-6 text-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Email enviado! ✅</h1>
            <p className="text-gray-400">
              Verifique seu email para as instruções de recuperação de senha.
            </p>
          </div>

          <Link href="/login">
            <Button type="button" variant="primary">
              Voltar ao login
            </Button>
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Recuperar Senha</h1>
          <p className="text-gray-400">
            Digite seu email para receber um link de recuperação
          </p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError('')
            }}
          />

          <Button
            type="submit"
            variant="primary"
            disabled={loading || !email}
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </Button>
        </form>

        <div className="text-center text-sm">
          <Link href="/login" className="text-gray-400 hover:text-white underline">
            Voltar ao login
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}
