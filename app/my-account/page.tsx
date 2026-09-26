'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function MyAccountPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [user, setUser] = useState<{name?: string; email?: string}>({})
  const [accounts, setAccounts] = useState(() => {
    if (typeof window === 'undefined') return []
    const raw = localStorage.getItem('pierre_accounts')
    try {
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    const raw = localStorage.getItem('user')
    if (!raw) router.push('/login')
    else setUser(JSON.parse(raw))
  }, [router])

  useEffect(() => {
    if (accounts.length > 0) {
      localStorage.setItem('pierre_accounts', JSON.stringify(accounts))
    }
  }, [accounts])

  // Detecta retorno do Pluggy
  useEffect(() => {
    if (searchParams?.get('from') !== 'pluggy') return

    const syncFromPluggy = async () => {
      try {
        // 1. Tenta buscar contas armazenadas pelo webhook
        console.log('Buscando contas do webhook...')
        const res = await fetch('/api/pluggy/stored')
        if (res.ok) {
          const data = await res.json()
          if (data.accounts && Array.isArray(data.accounts) && data.accounts.length > 0) {
            console.log('Contas encontradas via webhook:', data.accounts)
            const current = JSON.parse(localStorage.getItem('pierre_accounts') || '[]')
            const allAccounts = [...current, ...data.accounts]
            localStorage.setItem('pierre_accounts', JSON.stringify(allAccounts))
            setAccounts(allAccounts)

            // Limpa o arquivo de webhook após carregar
            await fetch('/api/pluggy/stored', { method: 'DELETE' })
          }
        }
      } catch (e) {
        console.error('Erro sync webhook:', e)
      }

      // Limpa storage local
      sessionStorage.removeItem('pluggy_accounts')
      localStorage.removeItem('pluggy_accounts')
      sessionStorage.removeItem('contas_cadastradas')

      // Remove query param
      window.history.replaceState({}, '', '/my-account')

      // Fecha aba do Pluggy
      setTimeout(() => {
        if (window.opener) window.close()
      }, 1500)
    }

    syncFromPluggy()
  }, [searchParams])

  const removeAccount = (index: number, accountName: string) => {
    const confirmRemove = window.confirm(`Tem certeza que deseja remover "${accountName}" permanentemente? Esta ação não pode ser desfeita.`)
    if (confirmRemove) {
      setAccounts(prev => prev.filter((_, idx) => idx !== index))
    }
  }

  const syncWithPluggy = async () => {
    try {
      const res = await fetch('/api/pluggy/fetch')
      if (res.ok) {
        const data = await res.json()
        if (data.accounts && Array.isArray(data.accounts) && data.accounts.length > 0) {
          const current = JSON.parse(localStorage.getItem('pierre_accounts') || '[]')
          const allAccounts = [...current, ...data.accounts]
          const unique = Array.from(new Map(allAccounts.map((a: any) => [a.name, a])).values())
          localStorage.setItem('pierre_accounts', JSON.stringify(unique))
          setAccounts(unique)
          alert(`✅ ${data.accounts.length} conta(s) sincronizada(s) com sucesso!`)
        } else {
          alert('❌ Nenhuma conta encontrada no Pluggy')
        }
      }
    } catch (e) {
      console.error('Erro ao sincronizar:', e)
      alert('❌ Erro ao sincronizar com Pluggy')
    }
  }

  return (
    <main className="min-h-screen bg-[#09090b] text-white pl-14">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <button onClick={() => router.push('/dashboard')} className="text-sm text-zinc-400 hover:text-white mb-8">← Voltar ao dashboard</button>
        <h1 className="text-3xl font-semibold mb-2">Minha conta</h1>
        <p className="text-zinc-400 mb-8">{user.name || 'Usuário'} · Gerencie seu perfil e suas contas conectadas</p>

        <section className="rounded-2xl border border-zinc-800 bg-[#101012] p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Informações pessoais</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div><span className="text-xs text-zinc-500">Nome</span><p>{user.name || 'Wagner'}</p></div>
            <div><span className="text-xs text-zinc-500">E-mail</span><p>{user.email || 'Não informado'}</p></div>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-800 bg-[#101012] p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-medium">Contas bancárias</h2>
              <p className="text-sm text-zinc-400">Acompanhe seus saldos em um só lugar.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={syncWithPluggy}
                className="rounded-lg border border-blue-500 px-4 py-2 text-sm font-medium text-blue-400 hover:bg-blue-500/10"
              >
                Sincronizar
              </button>
              <button
                onClick={() => {
                  const returnUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/my-account?from=pluggy&t=${Date.now()}`
                  // Abre Pluggy com instruções de retorno
                  const pluggyUrl = `https://meu.pluggy.ai/?return_url=${encodeURIComponent(returnUrl)}`
                  window.open(pluggyUrl, '_blank')
                }}
                className="rounded-lg border border-emerald-500 px-4 py-2 text-sm font-medium text-emerald-400 hover:bg-emerald-500/10"
              >
                Adicionar conta
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {accounts.length > 0 ? (
              accounts.map((a, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border border-zinc-800 p-4">
                  <div>
                    <p className="font-medium">{a.name}</p>
                    <p className="text-xs text-zinc-500">{a.type}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-semibold">{a.balance}</p>
                    <button
                      aria-label={`Remover ${a.name}`}
                      onClick={() => removeAccount(i, a.name)}
                      className="text-xs text-zinc-500 hover:text-red-400 transition-colors"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-500">Nenhuma conta conectada. Clique em "Adicionar conta" para começar.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
