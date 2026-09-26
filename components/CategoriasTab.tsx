"use client"

import { useCategories } from "@/hooks/useCategories"
import { DonutChart } from "./DonutChart"

interface Category {
  icon: string
  name: string
  value: number
  percentage: number
  subcategories?: Array<{ name: string; value: number }>
}

export function CategoriasTab({ categories }: { categories: Category[] }) {
  const { currentMonthName, nextMonth, prevMonth, expandedCategory, setExpandedCategory } = useCategories()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Categorias</h2>
        <div className="flex items-center justify-between mb-8">
          <button onClick={prevMonth} className="text-gray-400 hover:text-white transition">←</button>
          <p className="text-lg font-semibold">{currentMonthName} De 2026</p>
          <button onClick={nextMonth} className="text-gray-400 hover:text-white transition">→</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-950 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-6">Distribuição de Gastos</h3>
            <DonutChart
              data={categories.map(cat => ({
                name: cat.name,
                value: cat.value,
                percentage: cat.percentage
              }))}
            />
          </div>

          <div className="bg-gray-950 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">Resumo</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total gasto</p>
                <p className="text-3xl font-bold">R$ {categories.reduce((a, b) => a + b.value, 0).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-gray-950 border border-gray-800 rounded-lg">
              <button
                onClick={() => setExpandedCategory(expandedCategory === cat.name ? null : cat.name)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-900 transition"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{cat.icon}</span>
                  <div className="text-left">
                    <p className="font-bold">{cat.name}</p>
                    <p className="text-sm text-gray-400">R$ {cat.value.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-400">{cat.percentage}%</p>
                  </div>
                  <span className="text-gray-400">{expandedCategory === cat.name ? "▼" : "▶"}</span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
