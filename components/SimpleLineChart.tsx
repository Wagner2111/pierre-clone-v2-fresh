'use client'

interface ChartData {
  day: number
  thisMont: number
  lastMonth: number
}

interface SimpleLineChartProps {
  data: ChartData[]
}

export function SimpleLineChart({ data }: SimpleLineChartProps) {
  const maxValue = Math.max(...data.flatMap(d => [d.thisMont, d.lastMonth]))
  const scale = 300 / (maxValue || 1)

  return (
    <div className="w-full bg-gray-950 border border-gray-800 rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">RITMO DE GASTOS</h3>
        <a href="#" className="text-green-500 text-sm hover:text-green-400">
          ver todas →
        </a>
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">R$ 206,99 abaixo</span>
          <span className="text-green-500">-47.8% vs R$ 433,14 mês anterior</span>
        </div>
      </div>

      {/* SVG Chart */}
      <svg viewBox="0 0 400 250" className="w-full h-64 mb-4">
        {/* Grid */}
        {[0, 1, 2, 3, 4].map(i => (
          <line
            key={`grid-${i}`}
            x1="50"
            y1={50 + i * 50}
            x2="380"
            y2={50 + i * 50}
            stroke="#333333"
            strokeDasharray="2,2"
            strokeWidth="0.5"
          />
        ))}

        {/* Y Axis Labels */}
        <text x="45" y="200" fontSize="10" fill="#999999" textAnchor="end">
          R$ 0
        </text>
        <text x="45" y="150" fontSize="10" fill="#999999" textAnchor="end">
          R$300
        </text>
        <text x="45" y="100" fontSize="10" fill="#999999" textAnchor="end">
          R$600
        </text>
        <text x="45" y="50" fontSize="10" fill="#999999" textAnchor="end">
          R$900
        </text>

        {/* X Axis */}
        <line x1="50" y1="220" x2="380" y2="220" stroke="#666666" strokeWidth="1" />
        <line x1="50" y1="50" x2="50" y2="220" stroke="#666666" strokeWidth="1" />

        {/* Last Month Line (Gray) */}
        <polyline
          points={data
            .map((d, i) => `${50 + (i / (data.length - 1)) * 330},${220 - d.lastMonth * scale}`)
            .join(' ')}
          fill="none"
          stroke="#6b7280"
          strokeWidth="2"
        />

        {/* This Month Line (Green) */}
        <polyline
          points={data
            .map((d, i) => `${50 + (i / (data.length - 1)) * 330},${220 - d.thisMont * scale}`)
            .join(' ')}
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
        />

        {/* Day Labels */}
        {data.map((d, i) => (
          <text
            key={`day-${i}`}
            x={50 + (i / (data.length - 1)) * 330}
            y="240"
            fontSize="10"
            fill="#999999"
            textAnchor="middle"
          >
            {d.day}
          </text>
        ))}
      </svg>

      {/* Legend */}
      <div className="flex gap-6 justify-center text-sm">
        <div className="flex gap-2 items-center">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-400">Este mês</span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
          <span className="text-gray-400">Mês passado</span>
        </div>
      </div>
    </div>
  )
}
