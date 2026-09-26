import { useState, useMemo } from 'react'

interface Transaction {
  id: number
  icon: string
  description: string
  category: string
  account: string
  date: string
  value: number
  type: 'income' | 'expense'
}

const ITEMS_PER_PAGE = 5

export function useTransactions(transactions: Transaction[]) {
  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = useMemo(() => {
    return transactions.filter(t => {
      if (typeFilter !== 'all' && t.type !== typeFilter) return false
      if (categoryFilter !== 'all' && !t.category.includes(categoryFilter)) return false
      if (search && !t.description.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [transactions, typeFilter, categoryFilter, search])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const stats = {
    total: filtered.length,
    totalExpense: filtered
      .filter(t => t.type === 'expense')
      .reduce((a, t) => a + t.value, 0),
    totalIncome: filtered
      .filter(t => t.type === 'income')
      .reduce((a, t) => a + t.value, 0),
  }

  return {
    filtered,
    paginated,
    stats,
    totalPages,
    currentPage,
    setCurrentPage,
    typeFilter,
    setTypeFilter,
    categoryFilter,
    setCategoryFilter,
    search,
    setSearch,
  }
}
