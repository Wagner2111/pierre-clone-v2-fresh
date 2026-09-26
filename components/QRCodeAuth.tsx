'use client'

import { useState, useEffect } from 'react'
import QRCode from 'qrcode.react'
import { generateQRCode, PLUGGY_BANKS } from '@/lib/pluggy'

interface QRCodeAuthProps {
  bankId: string
  onSuccess?: (connectionId: string) => void
  onError?: (error: Error) => void
  onClose?: () => void
}

export function QRCodeAuth({ bankId, onSuccess, onError, onClose }: QRCodeAuthProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')
  const [connectionId, setConnectionId] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [polling, setPolling] = useState(false)

  const bank = Object.values(PLUGGY_BANKS).find(b => b.id === bankId)

  useEffect(() => {
    const generateQR = async () => {
      try {
        setLoading(true)
        setError('')
        const result = await generateQRCode(bankId)

        console.log('QR Code generated:', result)

        if (!result.qrCode && !result.url) {
          throw new Error('QR Code não foi gerado corretamente')
        }

        setQrCodeUrl(result.qrCode || result.url)
        setConnectionId(result.connectionId || '')
        setPolling(true)
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Erro ao gerar QR Code'
        console.error('QR Code error:', errorMsg)
        setError(errorMsg)
        if (onError) onError(new Error(errorMsg))
      } finally {
        setLoading(false)
      }
    }

    if (bankId) {
      generateQR()
    }
  }, [bankId, onError])

  // Polling para verificar se o usuário autorizou
  useEffect(() => {
    if (!polling || !connectionId) return

    const checkConnection = async () => {
      try {
        const response = await fetch(`/api/connections/${connectionId}`, {
          method: 'GET',
        })

        if (response.ok) {
          const data = await response.json()
          if (data.status === 'success' || data.connected) {
            setPolling(false)
            onSuccess?.(connectionId)
          }
        }
      } catch (err) {
        console.error('Error checking connection:', err)
      }
    }

    const interval = setInterval(checkConnection, 2000)
    return () => clearInterval(interval)
  }, [polling, connectionId, onSuccess])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-950 rounded-lg p-8 max-w-md w-full mx-4 border border-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Conectar {bank?.name}</h2>
            <p className="text-sm text-gray-400 mt-1">Escaneie o código QR com seu celular</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition text-2xl"
          >
            ✕
          </button>
        </div>

        {/* QR Code Container */}
        <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-gray-800 rounded-lg p-8 mb-6 flex items-center justify-center min-h-72">
          {loading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin w-12 h-12 border-4 border-green-500/20 border-t-green-500 rounded-full"></div>
              <p className="text-gray-400 text-sm">Gerando QR Code...</p>
            </div>
          ) : error ? (
            <div className="text-center space-y-3">
              <div className="text-red-500 text-4xl">⚠️</div>
              <p className="text-red-500 text-sm">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="text-green-500 hover:text-green-400 text-sm font-medium"
              >
                Tentar novamente
              </button>
            </div>
          ) : qrCodeUrl ? (
            <div className="flex flex-col items-center gap-3">
              <QRCode
                value={qrCodeUrl}
                size={256}
                level="H"
                includeMargin
                fgColor="#10b981"
                bgColor="#0f172a"
              />
              {polling && (
                <p className="text-green-500 text-xs animate-pulse">Aguardando confirmação...</p>
              )}
            </div>
          ) : null}
        </div>

        {/* Info Cards */}
        <div className="space-y-3 mb-6">
          <div className="bg-gray-900 border border-gray-800 rounded p-4">
            <p className="text-xs text-gray-400 mb-1">PASSO 1</p>
            <p className="text-sm text-white">Abra o app do {bank?.name} no seu celular</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded p-4">
            <p className="text-xs text-gray-400 mb-1">PASSO 2</p>
            <p className="text-sm text-white">Procure por "QR Code" ou "Vincular app"</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded p-4">
            <p className="text-xs text-gray-400 mb-1">PASSO 3</p>
            <p className="text-sm text-white">Escaneie o código e faça login</p>
          </div>
        </div>

        {/* Buttons */}
        <button
          onClick={onClose}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 rounded transition border border-gray-800"
        >
          Cancelar
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Sua senha e dados nunca são compartilhados conosco
        </p>
      </div>
    </div>
  )
}
