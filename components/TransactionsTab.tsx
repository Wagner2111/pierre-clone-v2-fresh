'use client'

import { useTransactions } from '@/hooks/useTransactions'

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

interface TransactionsTabProps {
  transactions: Transaction[]
}

export function TransactionsTab({ transactions }: TransactionsTabProps) {
  const {
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
  } = useTransactions(transactions)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Transações</h2>
        <button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-2 rounded transition flex items-center gap-2">
          ➕ Nova Transação
        </button>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar transações..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setCurrentPage(1)
          }}
          className="bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-green-500"
        />

        <select
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value)
            setCurrentPage(1)
          }}
          className="bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-green-500"
        >
          <option value="all">Todas as transações</option>
          <option value="income">Apenas receitas</option>
          <option value="expense">Apenas despesas</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value)
            setCurrentPage(1)
          }}
          className="bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-green-500"
        >
          <option value="all">Todas as categorias</option>
          <option value="Compras">Compras</option>
          <option value="Transferências">Transferências</option>
          <option value="Utensílios">Utensílios</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Despesas</p>
          <p className="text-2xl font-bold text-red-500">R$ {stats.totalExpense.toFixed(2)}</p>
        </div>
        <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Receitas</p>
          <p className="text-2xl font-bold text-green-500">R$ {stats.totalIncome.toFixed(2)}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-950 border border-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-900">
                <th className="text-left text-gray-400 text-sm font-medium p-4">DESCRIÇÃO</th>
                <th className="text-left text-gray-400 text-sm font-medium p-4">CATEGORIA</th>
                <th className="text-left text-gray-400 text-sm font-medium p-4">CONTA</th>
                <th className="text-left text-gray-400 text-sm font-medium p-4">DATA</th>
                <th className="text-right text-gray-400 text-sm font-medium p-4">VALOR</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length > 0 ? (
                paginated.map(tx => (
                  <tr key={tx.id} className="border-b border-gray-800 last:border-b-0 hover:bg-gray-900 transition">
                    <td className="p-4">
                      <div className="flex gap-2 items-center">
                        <span>{tx.icon}</span>
                        <span className="font-medium">{tx.description}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-400 text-sm">{tx.category}</td>
                    <td className="p-4 text-gray-400 text-sm">{tx.account}</td>
                    <td className="p-4 text-gray-400 text-sm">{tx.date}</td>
                    <td className={`p-4 text-right font-semibold ${tx.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                      {tx.type === 'income' ? '+' : ''}R$ {Math.abs(tx.value).toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400">
                    Nenhuma transação encontrada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {paginated.length > 0 && (
          <div className="border-t border-gray-800 p-4 flex justify-between items-center">
            <p className="text-sm text-gray-400">
              Mostrando {((currentPage - 1) * 5) + 1} a {Math.min(currentPage * 5, stats.total)} de {stats.total}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border border-gray-800 text-gray-400 disabled:opacity-50 hover:border-green-500 transition"
              >
                ← Anterior
              </button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded border transition ${
                      currentPage === page
                        ? 'border-green-500 bg-green-500/10 text-green-500'
                        : 'border-gray-800 text-gray-400 hover:border-green-500'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border border-gray-800 text-gray-400 disabled:opacity-50 hover:border-green-500 transition"
              >
                Próxima →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
