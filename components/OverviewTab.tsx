"use client"

import { SimpleLineChart } from "./SimpleLineChart"
import { Heatmap } from "./Heatmap"

interface OverviewTabProps {
  stats: {
    gastoSetembro: number
    comparacaoAnterior: number
    maiorGasto: string
  }
  topCategories: Array<{
    name: string
    value: number
    percentage: number
  }>
  chartData: Array<{ day: string; thisMont: number; lastMonth: number }>
  heatmapData: Array<{ day: string; value: number }>
  accounts: Array<{ name: string; type: string; balance: number }>
  transactions: Array<{
    id: number
    icon: string
    description: string
    category: string
    date: string
    value: number
    type: string
  }>
}

export function OverviewTab({
  stats,
  topCategories,
  chartData,
  heatmapData,
  accounts,
  transactions,
}: OverviewTabProps) {
  return (
    <div className="space-y-4">
      <section>
        <h2 className="text-3xl font-semibold text-emerald-400 mb-2">Vamos descobrir para onde seu dinheiro está indo?</h2>
        <p className="text-gray-400 mb-6">
          Wagner, você está mandando bem! Gastou 49% menos que no mês passado. Parabéns!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div className="bg-[#101012] border border-zinc-800 rounded-xl p-4">
            <h3 className="text-gray-400 text-sm font-medium">GASTO EM SETEMBRO</h3>
            <p className="text-3xl font-bold mt-2">R$ {stats.gastoSetembro.toFixed(2)}</p>
          </div>
          <div className="bg-[#101012] border border-zinc-800 rounded-xl p-4">
            <h3 className="text-gray-400 text-sm font-medium">VS. MÊS ANTERIOR</h3>
            <p className="text-3xl font-bold mt-2 text-green-500">📉 {stats.comparacaoAnterior}%</p>
          </div>
          <div className="bg-[#101012] border border-zinc-800 rounded-xl p-4">
            <h3 className="text-gray-400 text-sm font-medium">MAIOR GASTO</h3>
            <p className="text-2xl font-bold mt-2">🏠 {stats.maiorGasto}</p>
          </div>
        </div>

        <div className="bg-gray-950 border border-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-bold mb-6">📊 PRINCIPAIS CATEGORIAS</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-gray-400 text-sm font-medium pb-3">CATEGORIA</th>
                  <th className="text-right text-gray-400 text-sm font-medium pb-3">REAL</th>
                  <th className="text-right text-gray-400 text-sm font-medium pb-3">USO %</th>
                </tr>
              </thead>
              <tbody>
                {topCategories.map((cat, idx) => (
                  <tr key={idx} className="border-b border-gray-800 last:border-b-0 hover:bg-gray-900 transition">
                    <td className="py-3 text-white">{cat.name}</td>
                    <td className="text-right text-green-500 font-semibold">R$ {cat.value.toFixed(2)}</td>
                    <td className="text-right">
                      <span className="text-xs text-gray-400">{cat.percentage}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-950 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">📈 Ritmo de Gastos</h3>
            <SimpleLineChart data={chartData} />
          </div>

          <div className="bg-gray-950 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">🔥 Mapa de Calor</h3>
            <Heatmap data={heatmapData} />
          </div>
        </div>

        <div className="bg-gray-950 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">📝 TRANSAÇÕES RECENTES</h3>
          <div className="space-y-3">
            {transactions.slice(0, 5).map(tx => (
              <div key={tx.id} className="flex justify-between items-center pb-3 border-b border-gray-800 last:border-b-0">
                <div className="flex gap-3 items-center">
                  <span className="text-2xl">{tx.icon}</span>
                  <div>
                    <p className="font-medium text-sm">{tx.description}</p>
                    <p className="text-xs text-gray-400">{tx.category} • {tx.date}</p>
                  </div>
                </div>
                <p className={`font-semibold ${tx.type === "income" ? "text-green-500" : "text-red-500"}`}>
                  {tx.type === "income" ? "+" : ""}R$ {Math.abs(tx.value).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
