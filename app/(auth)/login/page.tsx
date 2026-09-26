"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/AuthContext"
import { AuthLayout } from "@/components/AuthLayout"
import { Input } from "@/components/Input"
import { Button } from "@/components/Button"

export default function LoginPage() {
  const { login, loading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      await login(email, password)
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login")
    }
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Bem-vindo de volta!</h1>
          <p className="text-gray-400">Acesse sua conta do Pierre</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError("")
            }}
            disabled={loading}
          />

          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError("")
            }}
            disabled={loading}
          />

          <Button
            type="submit"
            variant="primary"
            disabled={loading || !email || !password}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-400">
            Não tem uma conta?{" "}
            <Link href="/register" className="text-white hover:text-gray-300 underline font-medium">
              Criar conta
            </Link>
          </span>
        </div>
      </div>
    </AuthLayout>
  )
}
