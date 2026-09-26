'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export function PluggyReturnHandler({ onSave }: { onSave: (account: any) => void }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const fromParam = searchParams.get('from')
    if (fromParam === 'pluggy') {
      // Busca dados em múltiplas localizações
      const pluggyData =
        sessionStorage.getItem('pluggy_accounts') ||
        localStorage.getItem('pluggy_accounts') ||
        sessionStorage.getItem('contas_cadastradas') ||
        (window as any).pluggy_accounts

      if (pluggyData) {
        try {
          const dataToProcess = typeof pluggyData === 'string' ? JSON.parse(pluggyData) : pluggyData
          if (Array.isArray(dataToProcess) && dataToProcess.length > 0) {
            dataToProcess.forEach((conta: any) => {
              onSave({
                name: conta.name || conta.institution || conta.accountName || 'Conta conectada',
                type: conta.type || conta.subtype || conta.accountType || 'Conta bancária',
                balance: typeof conta.balance === 'string'
                  ? conta.balance
                  : `R$ ${Number(conta.balance || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
              })
            })

            // Limpa os dados após processar
            sessionStorage.removeItem('pluggy_accounts')
            localStorage.removeItem('pluggy_accounts')
            sessionStorage.removeItem('contas_cadastradas')

            // Redireciona e fecha a aba
            router.replace('/my-account')
            setTimeout(() => {
              if (window.opener) {
                window.close()
              }
            }, 500)
          }
        } catch (e) {
          console.error('Erro processando Pluggy:', e)
        }
      }
    }
  }, [searchParams, onSave, router])

  return null
}
