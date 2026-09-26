"use client"

import { useRouter } from "next/navigation"

interface Account {
  name: string
  type: string
}

interface DashboardLayoutProps {
  children: React.ReactNode
  user: { name: string }
  accounts: Account[]
  activeTab: string
  sidebarExpanded: boolean
  profileOpen: boolean
  accountMenuOpen: boolean
  onToggleSidebar: () => void
  onToggleProfile: () => void
  onToggleAccountMenu: () => void
  onLogout: () => void
  onTabChange: (tab: string) => void
}

export function DashboardLayout({
  children,
  user,
  accounts,
  activeTab,
  sidebarExpanded,
  profileOpen,
  accountMenuOpen,
  onToggleSidebar,
  onToggleProfile,
  onToggleAccountMenu,
  onLogout,
  onTabChange,
}: DashboardLayoutProps) {
  const router = useRouter()
  const tabPaths: Record<string, string> = {
    overview: "/dashboard",
    transactions: "/dashboard/transactions",
    parcelamentos: "/dashboard/recurring",
    assinaturas: "/dashboard/subscriptions",
    categorias: "/dashboard/categories",
    cartoes: "/dashboard/credit-cards",
  }

  const tabs = [
    { id: "overview", label: "✅ Visão geral" },
    { id: "transactions", label: "📋 Transações" },
    { id: "parcelamentos", label: "🔄 Parcelamentos" },
    { id: "assinaturas", label: "🔔 Assinaturas" },
    { id: "categorias", label: "📊 Categorias" },
    { id: "cartoes", label: "💳 Cartões" },
  ]

  return (
    <div className={`min-h-screen bg-[#09090b] text-white ${sidebarExpanded ? "pl-[280px]" : "pl-14"}`}>
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 bottom-0 border-r border-zinc-800 bg-black z-30 transition-all ${sidebarExpanded ? "w-[280px] px-4" : "w-14 px-2"}`}>
        <div className="flex items-center justify-between py-5">
          <img src="/images/pierre-logo-minimal.png" alt="Pierre" className="w-9 h-9 object-contain" />
          <button aria-label="Recolher barra lateral" onClick={onToggleSidebar} className="rounded-full border border-zinc-800 bg-zinc-950 p-3 text-zinc-300">▣</button>
        </div>
        <div className="relative mt-auto">
          {profileOpen && (
            <div className="absolute bottom-10 left-10 w-40 rounded-lg border border-zinc-800 bg-zinc-950 p-2 shadow-xl">
              <button onClick={() => router.push("/my-account")} className="block w-full rounded px-3 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-800">Minha conta</button>
              <button onClick={onLogout} className="block w-full rounded px-3 py-2 text-left text-sm text-red-400 hover:bg-zinc-800">Sair</button>
            </div>
          )}
          <button aria-label="Abrir perfil" onClick={onToggleProfile} className="flex items-center gap-3 rounded-full ring-1 ring-zinc-700 hover:ring-emerald-400 transition">
            <img src="/images/pierre-logo-minimal.png" alt="Perfil" className="w-7 h-7 rounded-full object-cover" />
            {sidebarExpanded && <span className="text-sm font-semibold">{user.name}</span>}
          </button>
        </div>
      </aside>

      {/* Header */}
      <header className="h-16 bg-transparent sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-end">
          <div className="flex items-center gap-6">
            <button onClick={onLogout} className="text-sm text-gray-400 hover:text-red-400 transition font-medium">
              ← Sair
            </button>
          </div>
          <div className="relative">
            {accounts.length > 0 && (
              <button aria-label="Selecionar contas" onClick={onToggleAccountMenu} className="flex items-center gap-0 rounded-full border border-zinc-800 bg-zinc-950 px-2 py-1.5 hover:border-zinc-600 transition">
                {accounts.slice(0, 2).map((account, idx) => (
                  <span key={idx} className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${idx === 0 ? "border border-white bg-black" : "-ml-1 bg-white text-violet-600"}`}>
                    {account.name.slice(0, 2).toUpperCase()}
                  </span>
                ))}
                <span className="ml-2 text-zinc-400">⌄</span>
              </button>
            )}
            {accountMenuOpen && (
              <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-zinc-800 bg-[#09090b] p-4 shadow-2xl">
                {accounts.length > 0 ? (
                  <>
                    {accounts.map((account, idx) => (
                      <div key={idx} className="flex items-center gap-3 py-2">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-bold text-violet-600">
                          {account.name.slice(0, 2).toUpperCase()}
                        </span>
                        <div className="flex-1">
                          <p className="font-medium">{account.name}</p>
                          <p className="text-sm text-zinc-500">{account.type}</p>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-sm text-zinc-400">Nenhuma conta conectada</p>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="bg-transparent sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto justify-center">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  onTabChange(tab.id)
                  router.push(tabPaths[tab.id])
                }}
                className={`px-5 py-2.5 rounded-full border font-medium transition whitespace-nowrap text-sm ${
                  activeTab === tab.id
                    ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-400 shadow-[0_0_18px_rgba(16,185,129,.2)]"
                    : "border-zinc-800 text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1280px] mx-auto px-6 py-6">
        {children}
      </main>
    </div>
  )
}
