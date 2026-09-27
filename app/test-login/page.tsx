'use client'

import { useState } from 'react'

export default function TestLogin() {
  const [email, setEmail] = useState('pluggy-test@example.com')
  const [password, setPassword] = useState('pluggy123')
  const [log, setLog] = useState<string[]>([])

  const addLog = (msg: string) => {
    setLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`])
  }

  const testLogin = async () => {
    try {
      addLog('Starting login test...')
      addLog(`API URL: ${process.env.NEXT_PUBLIC_API_URL}`)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      )

      addLog(`Response status: ${response.status}`)
      const data = await response.json()
      addLog(`Response data: ${JSON.stringify(data, null, 2)}`)

      if (data.data?.accessToken) {
        addLog('✅ TOKEN RECEIVED!')
        addLog(`Token: ${data.data.accessToken.substring(0, 20)}...`)
        localStorage.setItem('accessToken', data.data.accessToken)
        localStorage.setItem('user', JSON.stringify(data.data.user))
        addLog('✅ Saved to localStorage')
      } else {
        addLog('❌ No token in response!')
      }
    } catch (err) {
      addLog(`❌ Error: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">🧪 Test Login Page</h1>

        <div className="bg-gray-900 rounded-lg p-6 mb-6 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700"
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700"
            placeholder="Password"
          />
          <button
            onClick={testLogin}
            className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded"
          >
            Test Login
          </button>
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-white font-bold mb-4">Debug Log:</h2>
          <div className="bg-black p-4 rounded text-green-400 font-mono text-sm max-h-96 overflow-y-auto space-y-1">
            {log.length === 0 ? (
              <p className="text-gray-500">Click "Test Login" to start...</p>
            ) : (
              log.map((line, i) => <div key={i}>{line}</div>)
            )}
          </div>
        </div>

        <div className="mt-6 text-gray-400 text-sm">
          <p>Este é um page de teste para debugar o login. Acesse em /test-login</p>
        </div>
      </div>
    </div>
  )
}
