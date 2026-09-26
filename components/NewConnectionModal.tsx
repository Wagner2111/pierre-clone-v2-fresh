'use client'

import { useState, useCallback } from 'react'

type ConnectionStep = 'initial' | 'selecting' | 'data' | 'security' | 'authenticating' | 'success'

interface Institution {
  id: string
  name: string
  icon: string
  category: 'personal' | 'business' | 'brokerage'
}

const INSTITUTIONS: Institution[] = [
  { id: 'wise', name: 'Wise', icon: '🌍', category: 'personal' },
  { id: 'itau', name: 'Itaú', icon: '🏦', category: 'personal' },
  { id: 'xp', name: 'XP Banking', icon: '📊', category: 'personal' },
  { id: 'bradesco', name: 'Bradesco', icon: '🏧', category: 'personal' },
  { id: 'mercado-pago', name: 'Mercado Pago', icon: '🟢', category: 'personal' },
  { id: 'nubank', name: 'Nubank', icon: '🟪', category: 'personal' },
  { id: 'inter', name: 'Inter', icon: '🟠', category: 'personal' },
  { id: 'santander', name: 'Santander', icon: '🔴', category: 'personal' },
]

interface NewConnectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (connection: any) => void
}

export function NewConnectionModal({ isOpen, onClose, onSuccess }: NewConnectionModalProps) {
  const [step, setStep] = useState<ConnectionStep>('initial')
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null)
  const [cpfInput, setCpfInput] = useState('')
  const [progress, setProgress] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredInstitutions = INSTITUTIONS.filter(inst =>
    inst.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const simulateProgress = () => {
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += Math.random() * 40
      if (currentProgress >= 100) {
        currentProgress = 100
        clearInterval(interval)
      }
      setProgress(Math.round(currentProgress))
    }, 300)
  }

  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 11)
    if (cleaned.length <= 3) return cleaned
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`
    if (cleaned.length <= 9) return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9)}`
  }

  const isValidCPF = (cpf: string) => {
    const cleaned = cpf.replace(/\D/g, '')
    return cleaned.length === 11
  }

  const handleSelectInstitution = (institution: Institution) => {
    setSelectedInstitution(institution)
    setStep('data')
  }

  const handleCPFSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValidCPF(cpfInput)) {
      setStep('security')
    }
  }

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpfInput(formatCPF(e.target.value))
  }

  const handleSecurityConfirm = async () => {
    // Redirecionar para o Pluggy com os parâmetros
    const params = new URLSearchParams({
      institution: selectedInstitution?.id || '',
      cpf: cpfInput,
      return_url: `${typeof window !== 'undefined' ? window.location.origin : ''}/dashboard`,
    })

    // Salvar dados no sessionStorage para recuperar após retorno
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('pluggy_connection', JSON.stringify({
        institution: selectedInstitution?.name,
        cpf: cpfInput
      }))

      // Redirecionar para o Pluggy
      window.location.href = `https://meu.pluggy.ai/connections?${params.toString()}`
    }
  }

  const handleClose = () => {
    setCpfInput('')
    setSearchTerm('')
    setProgress(0)
    setStep('initial')
    setSelectedInstitution(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b">
          {step !== 'initial' && step !== 'selecting' && (
            <button
              onClick={() => {
                if (step === 'data') setStep('selecting')
                else if (step === 'security') setStep('data')
                else if (step === 'authenticating') return
              }}
              className="text-gray-600 hover:text-gray-900"
              disabled={step === 'authenticating'}
            >
              ←
            </button>
          )}
          <div className="text-center flex-1">
            <img src="/images/pierre-logo-minimal.png" alt="Pierre" className="w-8 h-8 mx-auto mb-2" />
          </div>
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-900"
            disabled={step === 'authenticating'}
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Initial - Security Info */}
          {step === 'initial' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Meu Pluggy usa a Pluggy para se conectar às suas contas</h2>

              <div className="space-y-3 mt-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Segurança</h3>
                  <p className="text-sm text-gray-600">
                    Nossa conexão é criptografada e segue os mais altos padrões do mercado.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Privacidade</h3>
                  <p className="text-sm text-gray-600">
                    Suas credenciais de acesso nunca serão compartilhadas com terceiros.
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-6">
                Ao selecionar "Continuar", você concorda com os Termos e condições e Política de privacidade
              </p>
            </div>
          )}

          {/* Select Institution */}
          {step === 'selecting' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900">Selecione a instituição</h2>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Encontre a sua instituição"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <span className="absolute right-3 top-3 text-gray-400">🔍</span>
              </div>

              <div className="space-y-2 max-h-80 overflow-y-auto">
                {filteredInstitutions.map(inst => (
                  <button
                    key={inst.id}
                    onClick={() => handleSelectInstitution(inst)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition text-left"
                  >
                    <span className="text-2xl">{inst.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{inst.name}</p>
                      {inst.id === 'wise' && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Beta</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CPF Input */}
          {step === 'data' && selectedInstitution && (
            <form onSubmit={handleCPFSubmit} className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900">Conecte a sua conta</h2>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl">{selectedInstitution.icon}</span>
                <p className="font-medium text-gray-900">{selectedInstitution.name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CPF</label>
                <input
                  type="text"
                  value={cpfInput}
                  onChange={handleCPFChange}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${
                    cpfInput && !isValidCPF(cpfInput)
                      ? 'border-red-400 focus:border-red-500'
                      : 'border-blue-400 focus:border-blue-500'
                  }`}
                />
                {cpfInput && !isValidCPF(cpfInput) && (
                  <p className="text-xs text-red-500 mt-1">CPF inválido. Digite os 11 dígitos.</p>
                )}
              </div>

              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                ❓ Perguntas frequentes
              </a>
            </form>
          )}

          {/* Security Confirmation */}
          {step === 'security' && selectedInstitution && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900">Verificação de Segurança</h2>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4">
                <span className="text-2xl">{selectedInstitution.icon}</span>
                <p className="font-medium text-gray-900">{selectedInstitution.name}</p>
              </div>

              <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                <p className="text-sm text-gray-700">
                  Ao clicar em conectar, você será redirecionado para o seu banco com a segurança do Open Finance.
                </p>
              </div>

              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                ℹ️ Saiba mais sobre dados
              </a>
            </div>
          )}

          {/* Authenticating */}
          {step === 'authenticating' && selectedInstitution && (
            <div className="space-y-4 text-center">
              <h2 className="text-lg font-bold text-gray-900">Autenticando a sua conta</h2>

              <div className="flex items-center justify-center gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="text-2xl">{selectedInstitution.icon}</span>
                <p className="font-medium text-gray-900">{selectedInstitution.name}</p>
              </div>

              <div className="py-8">
                <div className="text-3xl font-bold text-gray-900 mb-4">{progress}%</div>
                <div className="w-full bg-gray-300 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-lg mt-1">⏳</span>
                <p className="text-sm text-gray-600">Os dados da conta bancária estão sendo coletados.</p>
              </div>
            </div>
          )}

          {/* Success */}
          {step === 'success' && selectedInstitution && (
            <div className="space-y-4 text-center">
              <h2 className="text-lg font-bold text-gray-900">Autenticando a sua conta</h2>

              <div className="flex items-center justify-center gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="text-2xl">{selectedInstitution.icon}</span>
                <p className="font-medium text-gray-900">{selectedInstitution.name}</p>
              </div>

              <div className="py-8">
                <div className="text-3xl font-bold text-gray-900 mb-4">100%</div>
                <div className="w-full bg-gray-300 rounded-full h-2">
                  <div className="bg-green-500 h-full rounded-full"></div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                <span className="text-lg">✓</span>
                <p className="text-sm text-gray-700">Seus dados foram coletados com sucesso.</p>
              </div>

              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 inline-block">
                Faça a gestão dos seus consentimentos no portal Meu Pluggy
              </a>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t p-6 flex gap-3">
          {step === 'initial' && (
            <button
              onClick={() => setStep('selecting')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
            >
              Continuar
            </button>
          )}

          {step === 'data' && (
            <button
              onClick={handleCPFSubmit}
              disabled={!isValidCPF(cpfInput)}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
            >
              Conectar
            </button>
          )}

          {step === 'security' && (
            <button
              onClick={handleSecurityConfirm}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
            >
              Conectar
            </button>
          )}

          {step === 'success' && (
            <button
              onClick={handleClose}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
            >
              Fechar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
