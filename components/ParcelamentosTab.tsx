"use client"

import { useParcelamentos } from "@/hooks/useParcelamentos"

interface Parcelamento {
  id: number
  icon: string
  name: string
  parcels: string
  monthly: number
  remaining: number
  status: "ongoing" | "finished"
  startDate: string
}

interface ParcelamentosTabProps {
  parcelamentos: Parcelamento[]
}

export function ParcelamentosTab({ parcelamentos }: ParcelamentosTabProps) {
  const { sorted, stats, tabStatus, setTabStatus, sortBy, setSortBy } = useParcelamentos(parcelamentos)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Parcelamentos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sorted.map(parc => (
          <div key={parc.id} className="bg-gray-950 border border-gray-800 rounded-lg p-5 hover:border-green-500/50 transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-3">
                <span className="text-3xl">{parc.icon}</span>
                <div>
                  <p className="font-bold text-lg">{parc.name}</p>
                  <p className="text-sm text-gray-400">{parc.parcels}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-800">
              <div>
                <p className="text-xs text-gray-400 mb-1">Valor/mês</p>
                <p className="font-semibold">R$ {parc.monthly.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Restante</p>
                <p className="font-semibold text-green-500">R$ {parc.remaining.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
