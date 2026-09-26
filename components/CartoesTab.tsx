"use client"

import { InvoiceBarChart } from "./InvoiceBarChart"

interface Card {
  id: number
  name: string
  lastDigits: string
  limitTotal: number
  limitUsed: number
  dueDate: string
  brand: string
}

interface Invoice {
  month: string
  amount: number
}

export function CartoesTab({ cards, invoices }: { cards: Card[]; invoices: Invoice[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Cartões</h2>

      {cards.map(card => (
        <div key={card.id} className="space-y-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-sm opacity-80">CARTÃO</p>
                <p className="text-2xl font-bold">{card.name}</p>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-80">VENCE EM</p>
                <p className="text-lg font-bold">{card.dueDate}</p>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <p className="text-lg tracking-wider">•••• •••• •••• {card.lastDigits}</p>
              <p className="text-sm">{card.brand}</p>
            </div>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <p className="text-sm text-orange-400">
              ⚠️ Fatura estimada para o mês: <span className="font-semibold">R$ {card.limitUsed.toFixed(2)}</span>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-2">Limite total</p>
              <p className="text-2xl font-bold">R$ {(card.limitTotal / 1000).toFixed(1)}k</p>
            </div>
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-2">Usado</p>
              <p className="text-2xl font-bold">R$ {(card.limitUsed / 1000).toFixed(1)}k</p>
            </div>
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-2">Disponível</p>
              <p className="text-2xl font-bold text-green-500">R$ {((card.limitTotal - card.limitUsed) / 1000).toFixed(1)}k</p>
            </div>
          </div>

          <div className="bg-gray-950 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-6">Faturas Anteriores</h3>
            <InvoiceBarChart data={invoices} />
          </div>

          <div className="border-b border-gray-800 my-8"></div>
        </div>
      ))}
    </div>
  )
}
