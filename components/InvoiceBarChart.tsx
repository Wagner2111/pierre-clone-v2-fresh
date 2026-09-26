interface InvoiceBarChartProps {
  data: Array<{
    month: string
    amount: number
  }>
}

export function InvoiceBarChart({ data }: InvoiceBarChartProps) {
  const maxAmount = Math.max(...data.map(d => d.amount))

  return (
    <div className="flex items-end justify-center gap-2 h-64">
      {data.map((item, idx) => {
        const height = (item.amount / maxAmount) * 100
        return (
          <div key={idx} className="flex flex-col items-center gap-2">
            <div
              className="w-12 bg-green-500 rounded transition hover:bg-green-400"
              style={{ height: `${height}%` }}
              title={`R$ ${item.amount.toFixed(2)}`}
            ></div>
            <span className="text-xs text-gray-400">{item.month}</span>
          </div>
        )
      })}
    </div>
  )
}
