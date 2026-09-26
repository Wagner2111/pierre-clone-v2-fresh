"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { apiClient } from "@/lib/api"

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string, whatsapp?: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Verificar se há token ao carregar
  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    const userData = localStorage.getItem("user")

    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("user")
      }
    }

    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const response = await apiClient.login(email, password)
      
      if (response.data) {
        const { user: userData, accessToken, refreshToken } = response.data

        localStorage.setItem("accessToken", accessToken)
        localStorage.setItem("refreshToken", refreshToken)
        localStorage.setItem("user", JSON.stringify(userData))

        setUser(userData)
        router.push("/dashboard")
      }
    } catch (error: any) {
      throw new Error(error.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  const register = async (
    email: string,
    password: string,
    name: string,
    whatsapp?: string
  ) => {
    setLoading(true)
    try {
      const response = await apiClient.register(email, password, name, whatsapp)

      if (response.data) {
        const { user: userData, accessToken, refreshToken } = response.data

        localStorage.setItem("accessToken", accessToken)
        localStorage.setItem("refreshToken", refreshToken)
        localStorage.setItem("user", JSON.stringify(userData))

        setUser(userData)
        router.push("/dashboard")
      }
    } catch (error: any) {
      throw new Error(error.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await apiClient.logout()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("user")
      setUser(null)
      router.push("/login")
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
