interface DonutChartProps {
  data: Array<{
    name: string
    value: number
    percentage: number
  }>
}

export function DonutChart({ data }: DonutChartProps) {
  const colors = ['#10b981', '#6366f1', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

  let currentAngle = -90
  const paths: Array<{ path: string; color: string; label: string; percentage: number }> = []

  data.forEach((item, idx) => {
    const sliceAngle = (item.percentage / 100) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + sliceAngle

    const startAngleRad = (startAngle * Math.PI) / 180
    const endAngleRad = (endAngle * Math.PI) / 180

    const x1 = 60 + 50 * Math.cos(startAngleRad)
    const y1 = 60 + 50 * Math.sin(startAngleRad)
    const x2 = 60 + 50 * Math.cos(endAngleRad)
    const y2 = 60 + 50 * Math.sin(endAngleRad)

    const ix1 = 60 + 30 * Math.cos(startAngleRad)
    const iy1 = 60 + 30 * Math.sin(startAngleRad)
    const ix2 = 60 + 30 * Math.cos(endAngleRad)
    const iy2 = 60 + 30 * Math.sin(endAngleRad)

    const largeArc = sliceAngle > 180 ? 1 : 0
    const path = `M ${ix1} ${iy1} L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} L ${ix2} ${iy2} A 30 30 0 ${largeArc} 0 ${ix1} ${iy1} Z`

    paths.push({
      path,
      color: colors[idx % colors.length],
      label: item.name,
      percentage: item.percentage
    })

    currentAngle = endAngle
  })

  const total = data.reduce((a, b) => a + b.value, 0)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center">
        <svg width="200" height="200" viewBox="0 0 120 120">
          {paths.map((p, idx) => (
            <path key={idx} d={p.path} fill={p.color} opacity="0.8" />
          ))}
          <circle cx="60" cy="60" r="30" fill="rgb(9, 9, 11)" />
          <text x="60" y="65" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">
            {total.toFixed(0)}
          </text>
        </svg>
      </div>
      <div className="space-y-2">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: colors[idx % colors.length] }}></div>
              <span className="text-gray-400">{item.name}</span>
            </div>
            <span className="font-semibold">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
