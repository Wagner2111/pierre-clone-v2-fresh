import { useState, useCallback } from "react"
import { apiClient } from "@/lib/api"

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(async (fn: () => Promise<any>) => {
    setLoading(true)
    setError(null)
    try {
      const result = await fn()
      setData(result.data)
      return result.data
    } catch (err: any) {
      const errorMsg = err.message || "An error occurred"
      setError(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, execute }
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTransactions = useCallback(async (type?: string, category?: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await apiClient.getTransactions(type, category)
      setTransactions(response.data || [])
      return response.data
    } catch (err: any) {
      setError(err.message || "Failed to fetch transactions")
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const createTransaction = useCallback(
    async (
      value: number,
      type: "income" | "expense",
      category: string,
      description: string,
      date: string,
      account?: string
    ) => {
      try {
        const response = await apiClient.createTransaction(
          value,
          type,
          category,
          description,
          date,
          account
        )
        setTransactions([response.data, ...transactions])
        return response.data
      } catch (err: any) {
        setError(err.message || "Failed to create transaction")
        throw err
      }
    },
    [transactions]
  )

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    createTransaction,
  }
}

export function useAccounts() {
  const [accounts, setAccounts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAccounts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await apiClient.getAccounts()
      setAccounts(response.data || [])
      return response.data
    } catch (err: any) {
      setError(err.message || "Failed to fetch accounts")
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const createAccount = useCallback(
    async (name: string, type: string, balance?: number, bank_id?: string) => {
      try {
        const response = await apiClient.createAccount(name, type, balance, bank_id)
        setAccounts([...accounts, response.data])
        return response.data
      } catch (err: any) {
        setError(err.message || "Failed to create account")
        throw err
      }
    },
    [accounts]
  )

  return {
    accounts,
    loading,
    error,
    fetchAccounts,
    createAccount,
  }
}
