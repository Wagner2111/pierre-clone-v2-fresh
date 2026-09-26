import { useState, useMemo } from 'react'

interface Parcelamento {
  id: number
  icon: string
  name: string
  parcels: string
  monthly: number
  remaining: number
  status: 'ongoing' | 'finished'
  startDate: string
}

type SortOption = 'data' | 'valor' | 'nome'

export function useParcelamentos(parcelamentos: Parcelamento[]) {
  const [tabStatus, setTabStatus] = useState<'ongoing' | 'finished'>('ongoing')
  const [sortBy, setSortBy] = useState<SortOption>('data')

  const filtered = useMemo(() => {
    return parcelamentos.filter(p => p.status === tabStatus)
  }, [parcelamentos, tabStatus])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'valor':
          return b.monthly - a.monthly
        case 'nome':
          return a.name.localeCompare(b.name)
        case 'data':
        default:
          return new Date(a.startDate.split('/').reverse().join('-')).getTime() -
                 new Date(b.startDate.split('/').reverse().join('-')).getTime()
      }
    })
  }, [filtered, sortBy])

  const stats = {
    total: filtered.length,
    totalValue: filtered.reduce((a, p) => a + p.monthly, 0),
  }

  return {
    sorted,
    stats,
    tabStatus,
    setTabStatus,
    sortBy,
    setSortBy,
  }
}
