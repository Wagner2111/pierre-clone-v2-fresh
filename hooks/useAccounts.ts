import { useState, useEffect } from 'react'

interface Account {
  id?: string
  name: string
  type: string
  balance?: string
}

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([])

  useEffect(() => {
    const loadAccounts = () => {
      const raw = localStorage.getItem('pierre_accounts')
      if (raw) {
        try {
          setAccounts(JSON.parse(raw))
        } catch {
          setAccounts([])
        }
      }
    }

    loadAccounts()

    const handleStorageChange = () => loadAccounts()
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return {
    accounts,
    setAccounts,
  }
}
