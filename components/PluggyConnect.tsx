'use client'

import { useState } from 'react'
import { PLUGGY_BANKS, generateQRCode } from '@/lib/pluggy'
import QRCode from 'qrcode.react'

interface PluggyConnectProps {
  onSuccess?: (connectionId: string) => void
  onClose?: () => void
}

export function PluggyConnect({ onSuccess, onClose }: PluggyConnectProps) {
  const [step, setStep] = useState<'select' | 'qrcode'>('select')
  const [selectedBank, setSelectedBank] = useState<string>('')
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')

  const banks = Object.values(PLUGGY_BANKS)
  const filteredBanks = banks.filter(bank =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectBank = async (bankId: string) => {
    setSelectedBank(bankId)
    setLoading(true)
    setError('')

    try {
      const result = await generateQRCode(bankId)
      setQrCodeUrl(result.qrCode || result.url || '')
      setStep('qrcode')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao gerar QR Code'
      setError(msg)
      console.error('QR Code error:', msg)
    } finally {
      setLoading(false)
    }
  }

  const bankInfo = banks.find(b => b.id === selectedBank)

  return (
    <div className="w-full space-y-6">
      {/* SELECT BANK STEP */}
      {step === 'select' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Selecione seu banco</h2>
            <p className="text-gray-400 mb-4">Integração via QR Code - 30+ bancos suportados</p>
          </div>

          <input
            type="text"
            placeholder="Procure seu banco..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500"
          />

          <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto">
            {filteredBanks.map(bank => (
              <button
                key={bank.id}
                onClick={() => handleSelectBank(bank.id)}
                disabled={loading}
                className="bg-gray-900 hover:bg-gray-800 disabled:opacity-50 border border-gray-800 hover:border-green-500 rounded-lg p-3 text-left transition flex items-center gap-3"
              >
                <span className="text-2xl">{bank.icon}</span>
                <span className="font-medium text-white flex-1">{bank.name}</span>
                <span className="text-gray-500">→</span>
              </button>
            ))}
          </div>

          {filteredBanks.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">Nenhum banco encontrado</p>
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full py-2 bg-gray-900 hover:bg-gray-800 text-gray-400 border border-gray-800 rounded-lg transition"
          >
            Cancelar
          </button>
        </div>
      )}

      {/* QR CODE STEP */}
      {step === 'qrcode' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Conectar {bankInfo?.name}</h2>
              <p className="text-gray-400 text-sm mt-1">Escaneie com o seu celular</p>
            </div>
            <button
              onClick={() => {
                setStep('select')
                setSelectedBank('')
                setQrCodeUrl('')
              }}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ✕
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-gray-800 rounded-lg p-8 flex flex-col items-center justify-center min-h-80">
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
                  onClick={() => {
                    setStep('select')
                    setSelectedBank('')
                    setError('')
                  }}
                  className="text-green-500 hover:text-green-400 text-sm font-medium"
                >
                  Voltar
                </button>
              </div>
            ) : qrCodeUrl ? (
              <QRCode
                value={qrCodeUrl}
                size={256}
                level="H"
                includeMargin
                fgColor="#10b981"
                bgColor="#0f172a"
              />
            ) : null}
          </div>

          <div className="space-y-3 bg-gray-900 border border-gray-800 rounded-lg p-4">
            <p className="text-sm text-white font-medium mb-3">Como funciona:</p>
            <div className="space-y-2 text-sm text-gray-400">
              <div>1. Abra o app do {bankInfo?.name} no seu celular</div>
              <div>2. Procure por "QR Code" ou "Vincular app"</div>
              <div>3. Escaneie o código acima</div>
              <div>4. Faça login e autorize o acesso</div>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Sua senha nunca é compartilhada. Autenticação via protocolo Open Finance.
          </p>
        </div>
      )}
    </div>
  )
}
