"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { DashboardLayout } from "./DashboardLayout"
import { OverviewTab } from "./OverviewTab"
import { TransactionsTab } from "./TransactionsTab"
import { ParcelamentosTab } from "./ParcelamentosTab"
import { AssinaturasTab } from "./AssinaturasTab"
import { CategoriasTab } from "./CategoriasTab"
import { CartoesTab } from "./CartoesTab"
import { ChatWidget } from "./ChatWidget"
import { useDashboard } from "@/hooks/useDashboard"
import { useAccounts } from "@/hooks/useAccounts"
import {
  mockStats,
  mockTopCategories,
  mockChartData,
  mockHeatmapData,
  mockAccounts,
  mockTransactions,
  mockParcelamentos,
  mockCategories,
  mockSubscriptions,
  mockCards,
  mockCardInvoices,
} from "@/lib/mockData"

type Tab = "overview" | "transactions" | "parcelamentos" | "assinaturas" | "categorias" | "cartoes"

export function DashboardContainer() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)

  const {
    activeTab,
    setActiveTab,
    sidebarExpanded,
    setSidebarExpanded,
    profileOpen,
    setProfileOpen,
    accountMenuOpen,
    setAccountMenuOpen,
  } = useDashboard("overview" as Tab)

  const { accounts } = useAccounts()

  useEffect(() => {
    const initialTab: Tab = pathname.endsWith("/transactions")
      ? "transactions"
      : pathname.endsWith("/recurring")
      ? "parcelamentos"
      : pathname.endsWith("/subscriptions")
      ? "assinaturas"
      : pathname.endsWith("/categories")
      ? "categorias"
      : pathname.endsWith("/credit-cards")
      ? "cartoes"
      : "overview"

    setActiveTab(initialTab)

    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [pathname, router, setActiveTab])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  if (!user) return null

  const renderTab = () => {
    switch (activeTab) {
      case "overview":
        return (
          <OverviewTab
            stats={mockStats}
            topCategories={mockTopCategories}
            chartData={mockChartData}
            heatmapData={mockHeatmapData}
            accounts={mockAccounts}
            transactions={mockTransactions}
          />
        )
      case "transactions":
        return <TransactionsTab transactions={mockTransactions} />
      case "parcelamentos":
        return <ParcelamentosTab parcelamentos={mockParcelamentos} />
      case "assinaturas":
        return <AssinaturasTab subscriptions={mockSubscriptions} />
      case "categorias":
        return <CategoriasTab categories={mockCategories} />
      case "cartoes":
        return <CartoesTab cards={mockCards} invoices={mockCardInvoices} />
      default:
        return null
    }
  }

  return (
    <>
      <DashboardLayout
        user={user}
        accounts={accounts}
        activeTab={activeTab}
        sidebarExpanded={sidebarExpanded}
        profileOpen={profileOpen}
        accountMenuOpen={accountMenuOpen}
        onToggleSidebar={() => setSidebarExpanded(v => !v)}
        onToggleProfile={() => setProfileOpen(v => !v)}
        onToggleAccountMenu={() => setAccountMenuOpen(v => !v)}
        onLogout={handleLogout}
        onTabChange={(tab) => {
          setActiveTab(tab as Tab)
          router.push(`/dashboard${tab === "overview" ? "" : `/${tab}`}`)
        }}
      >
        {renderTab()}
      </DashboardLayout>
      <ChatWidget />
    </>
  )
}
