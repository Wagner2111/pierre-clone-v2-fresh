"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/AuthContext"
import { useRouter } from "next/navigation"
import { Button } from "@/components/Button"

export default function PluggyPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
      return
    }

    loadAccounts()
  }, [isAuthenticated, router])

  const loadAccounts = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/pluggy/accounts`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      if (response.ok) {
        const data = await response.json()
        setAccounts(data)
      }
    } catch (err) {
      console.error("Error loading accounts:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleConnect = async () => {
    try {
      alert("Redirecting to Pluggy OAuth...")
    } catch (err) {
      console.error("Error:", err)
    }
  }

  const handleSync = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/pluggy/sync`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      if (response.ok) {
        alert("Transações sincronizadas!")
        await loadAccounts()
      }
    } catch (err) {
      console.error("Error syncing:", err)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return <div className="p-8 text-center">Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Integração Bancária</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Button onClick={handleConnect} variant="primary" disabled={loading}>
            Conectar Conta Bancária
          </Button>
          <Button onClick={handleSync} variant="secondary" disabled={loading}>
            Sincronizar Transações
          </Button>
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Contas Conectadas</h2>
          {accounts.length === 0 ? (
            <p className="text-gray-400">Nenhuma conta bancária conectada</p>
          ) : (
            <div className="space-y-4">
              {accounts.map((account: any) => (
                <div key={account.id} className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-white font-medium">{account.bank_name}</p>
                  <p className="text-gray-400 text-sm">{account.pluggy_name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
