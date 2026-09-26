const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

interface ApiResponse<T> {
  success?: boolean
  data?: T
  error?: string
  message?: string
}

class ApiClient {
  private getHeaders() {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken")
      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }
    }

    return headers
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`
    const headers = this.getHeaders()

    try {
      const response = await fetch(url, {
        ...options,
        headers: { ...headers, ...options.headers },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "API request failed")
      }

      return data
    } catch (error: any) {
      console.error(`API Error: ${endpoint}`, error)
      throw error
    }
  }

  // Auth
  async register(email: string, password: string, name: string, whatsapp?: string) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name, whatsapp }),
    })
  }

  async login(email: string, password: string) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  async logout() {
    return this.request("/auth/logout", { method: "POST" })
  }

  // Transactions
  async getTransactions(type?: string, category?: string) {
    const params = new URLSearchParams()
    if (type) params.append("type", type)
    if (category) params.append("category", category)

    const query = params.toString() ? `?${params.toString()}` : ""
    return this.request(`/transactions${query}`)
  }

  async createTransaction(
    value: number,
    type: "income" | "expense",
    category: string,
    description: string,
    date: string,
    account?: string
  ) {
    return this.request("/transactions", {
      method: "POST",
      body: JSON.stringify({ value, type, category, description, date, account }),
    })
  }

  // Accounts
  async getAccounts() {
    return this.request("/accounts")
  }

  async createAccount(name: string, type: string, balance?: number, bank_id?: string) {
    return this.request("/accounts", {
      method: "POST",
      body: JSON.stringify({ name, type, balance, bank_id }),
    })
  }
}

export const apiClient = new ApiClient()
