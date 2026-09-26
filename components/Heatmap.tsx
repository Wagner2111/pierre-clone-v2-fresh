'use client'

interface HeatmapData {
  day: number
  value: number
}

interface HeatmapProps {
  data: HeatmapData[]
}

export function Heatmap({ data }: HeatmapProps) {
  const maxValue = Math.max(...data.map(d => d.value)) || 1

  const getColor = (value: number) => {
    const percentage = value / maxValue
    if (percentage === 0) return '#1a1a1a'
    if (percentage < 0.2) return '#064e3b'
    if (percentage < 0.4) return '#10b981'
    if (percentage < 0.6) return '#34d399'
    if (percentage < 0.8) return '#6ee7b7'
    return '#a7f3d0'
  }

  return (
    <div className="w-full bg-gray-950 border border-gray-800 rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">MAPA DE CALOR</h3>
        <a href="#" className="text-green-500 text-sm hover:text-green-400">
          ver mais →
        </a>
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">R$ 226,15</span>
          <span className="text-gray-400">Média diária: R$ 113,07</span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="mb-6 bg-gray-900 rounded p-4">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
            <div key={i} className="text-center text-gray-400 text-xs py-1">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {data.slice(0, 16).map((item, i) => (
            <div
              key={i}
              className="aspect-square rounded flex items-center justify-center text-xs font-medium cursor-pointer hover:ring-2 ring-white transition"
              style={{ backgroundColor: getColor(item.value) }}
              title={`Dia ${item.day}: R$ ${item.value.toFixed(2)}`}
            >
              {item.day <= 7 ? item.day : (item.day % 7 || 7)}
            </div>
          ))}
        </div>
      </div>

      {/* Legend and Info */}
      <div className="space-y-4">
        <div className="flex gap-3 items-center justify-between">
          <div className="flex gap-2 items-center">
            <span className="text-gray-400 text-sm">Menos</span>
            <div className="flex gap-1">
              {['#1a1a1a', '#064e3b', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0'].map((color, i) => (
                <div key={i} className="w-3 h-3 rounded" style={{ backgroundColor: color }}></div>
              ))}
            </div>
            <span className="text-gray-400 text-sm">Mais</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded p-3">
          <p className="text-sm">
            <span className="text-gray-400">Maior gasto: </span>
            <span className="font-bold">R$ 156,17</span>
            <span className="text-gray-400"> dia 12</span>
          </p>
        </div>
      </div>
    </div>
  )
}
