"use client"

interface Subscription {
  id: number
  icon: string
  name: string
  value: number
  nextBilling: string
  category: string
}

export function AssinaturasTab({ subscriptions }: { subscriptions: Subscription[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Assinaturas Ativas</h2>
      {subscriptions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subscriptions.map(sub => (
            <div key={sub.id} className="bg-gray-950 border border-gray-800 rounded-lg p-5 hover:border-green-500/50 transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-3 flex-1">
                  <span className="text-3xl">{sub.icon}</span>
                  <div className="flex-1">
                    <p className="font-bold text-lg">{sub.name}</p>
                    <p className="text-xs text-gray-400">{sub.category}</p>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Valor mensal</span>
                  <span className="font-semibold">R$ {sub.value.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Próxima cobrança</span>
                  <span className="text-sm font-medium">{sub.nextBilling}</span>
                </div>
                <button className="w-full mt-2 text-xs border border-gray-700 rounded py-2 text-gray-400 hover:text-red-400 hover:border-red-500 transition">
                  Cancelar assinatura
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-950 border border-gray-800 rounded-lg p-12 text-center">
          <p className="text-gray-400 mb-2">Nenhuma assinatura detectada</p>
          <p className="text-gray-500 text-sm">Assinaturas como Netflix, Spotify e outras serão detectadas automaticamente.</p>
        </div>
      )}
    </div>
  )
}
