'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function PluggyForm({ onSave }: { onSave: (account: any) => void }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (searchParams.get('from') === 'pluggy') {
      // Tenta puxar dados do sessionStorage/localStorage do Pluggy
      const pluggyData = sessionStorage.getItem('pluggy_accounts') ||
                         localStorage.getItem('pluggy_accounts') ||
                         sessionStorage.getItem('contas_cadastradas')

      if (pluggyData) {
        try {
          const contas = JSON.parse(pluggyData)
          if (Array.isArray(contas) && contas.length > 0) {
            contas.forEach((conta: any) => {
              const novaContaPluggy = {
                name: conta.name || conta.institution || conta.accountName || 'Conta conectada',
                type: conta.type || conta.subtype || conta.accountType || 'Conta bancária',
                balance: typeof conta.balance === 'string'
                  ? conta.balance
                  : `R$ ${Number(conta.balance || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
              }
              onSave(novaContaPluggy)
            })
            router.push('/my-account')
            // Fecha a aba do Pluggy após 1 segundo
            setTimeout(() => {
              if (window.opener) {
                window.close()
              }
            }, 1000)
            return
          }
        } catch (e) {
          console.log('Erro ao parsear dados do Pluggy:', e)
        }
      }

      // Tenta via window.pluggy ou dados globais
      if (typeof window !== 'undefined' && (window as any).pluggy_accounts) {
        const contas = (window as any).pluggy_accounts
        if (Array.isArray(contas) && contas.length > 0) {
          contas.forEach((conta: any) => {
            onSave({
              name: conta.name || conta.institution || 'Conta conectada',
              type: conta.type || conta.subtype || 'Conta bancária',
              balance: typeof conta.balance === 'string'
                ? conta.balance
                : `R$ ${Number(conta.balance || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
            })
          })
          router.push('/my-account')
          // Fecha a aba do Pluggy após 1 segundo
          setTimeout(() => {
            if (window.opener) {
              window.close()
            }
          }, 1000)
        }
      }
    }
  }, [searchParams, router, onSave])

  return null
}
