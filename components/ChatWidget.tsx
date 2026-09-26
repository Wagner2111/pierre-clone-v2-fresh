'use client'

import { useState } from 'react'

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot'; text: string }>>([
    {
      type: 'bot',
      text: 'Olá! Sou o Pierre, seu assistente de finanças. Como posso te ajudar?',
    },
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return

    setMessages([...messages, { type: 'user', text: input }])
    setInput('')

    // Simular resposta do bot
    setTimeout(() => {
      const responses = [
        'Entendi! Vou analisar seus gastos...',
        'Ótimo! Vou te ajudar com isso.',
        'Claro, deixa eu calcular para você!',
        'Entendido. Baseado nos seus dados, sugiro...',
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setMessages(prev => [...prev, { type: 'bot', text: randomResponse }])
    }, 500)
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg transition z-40"
      >
        💬
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-gray-950 border border-gray-800 rounded-lg shadow-2xl z-40 flex flex-col max-h-96">
          {/* Header */}
          <div className="bg-green-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div>
              <p className="font-bold">Pierre</p>
              <p className="text-xs opacity-90">Assistente de IA</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-green-600 px-2 py-1 rounded"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-800 text-gray-200'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-gray-800 p-4 bg-gray-900">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500"
              />
              <button
                onClick={handleSend}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm font-medium transition"
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
