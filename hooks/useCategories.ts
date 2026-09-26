import { useState } from 'react'

export function useCategories() {
  const [currentMonth, setCurrentMonth] = useState(9)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]

  const currentMonthName = monthNames[currentMonth - 1] || 'Setembro'

  const nextMonth = () => setCurrentMonth(prev => Math.min(12, prev + 1))
  const prevMonth = () => setCurrentMonth(prev => Math.max(1, prev - 1))

  return {
    currentMonth,
    setCurrentMonth,
    currentMonthName,
    nextMonth,
    prevMonth,
    expandedCategory,
    setExpandedCategory,
  }
}
