// Authentication Service
interface User {
  id: string
  name: string
  email: string
  cpf?: string
  avatar?: string
  connectedBanks?: string[]
}

interface AuthToken {
  access_token: string
  refresh_token?: string
  expires_in: number
  user: User
}

class AuthService {
  private readonly STORAGE_KEY = 'auth_token'
  private readonly USER_KEY = 'auth_user'

  // Check if user is authenticated
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false
    const token = localStorage.getItem(this.STORAGE_KEY)
    return !!token && !this.isTokenExpired(token)
  }

  // Get current user
  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null
    const userStr = localStorage.getItem(this.USER_KEY)
    return userStr ? JSON.parse(userStr) : null
  }

  // Login with email and password
  async login(email: string, password: string): Promise<AuthToken> {
    // In production, call your backend API
    // For demo: simulate login with test credentials
    if (email === 'test@test.com' && password === 'teste123') {
      const user: User = {
        id: 'user_' + Date.now(),
        name: 'Wagner',
        email: 'contasdigitalwagner@gmail.com',
        cpf: '•••.317.273-••',
        avatar: 'W',
      }

      const token: AuthToken = {
        access_token: this.generateToken(),
        refresh_token: this.generateToken(),
        expires_in: 86400, // 24 hours
        user,
      }

      this.saveToken(token)
      return token
    }

    throw new Error('Invalid credentials')
  }

  // Register new user
  async register(name: string, email: string, password: string): Promise<AuthToken> {
    // In production, call your backend API
    const user: User = {
      id: 'user_' + Date.now(),
      name,
      email,
      avatar: name.charAt(0).toUpperCase(),
    }

    const token: AuthToken = {
      access_token: this.generateToken(),
      refresh_token: this.generateToken(),
      expires_in: 86400,
      user,
    }

    this.saveToken(token)
    return token
  }

  // Logout
  logout(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(this.STORAGE_KEY)
    localStorage.removeItem(this.USER_KEY)
  }

  // Refresh token
  async refreshToken(): Promise<AuthToken | null> {
    if (typeof window === 'undefined') return null

    const tokenStr = localStorage.getItem(this.STORAGE_KEY)
    if (!tokenStr) return null

    const token = JSON.parse(tokenStr)
    // In production, call your backend API to refresh
    // For demo: generate new token
    const newToken: AuthToken = {
      ...token,
      access_token: this.generateToken(),
      expires_in: 86400,
    }

    this.saveToken(newToken)
    return newToken
  }

  // Private methods
  private saveToken(token: AuthToken): void {
    if (typeof window === 'undefined') return
    const expiresAt = Date.now() + token.expires_in * 1000
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify({ ...token, expiresAt }))
    localStorage.setItem(this.USER_KEY, JSON.stringify(token.user))
  }

  private isTokenExpired(tokenStr: string): boolean {
    try {
      const token = JSON.parse(tokenStr)
      return token.expiresAt < Date.now()
    } catch {
      return true
    }
  }

  private generateToken(): string {
    // In production, this would come from your backend
    return 'token_' + Math.random().toString(36).substring(2, 15)
  }
}

export const authService = new AuthService()
