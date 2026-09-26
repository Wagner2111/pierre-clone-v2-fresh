import { useState } from 'react'

type Tab = 'overview' | 'transactions' | 'parcelamentos' | 'assinaturas' | 'categorias' | 'cartoes'

export function useDashboard(initialTab: Tab = 'overview') {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab)
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [profileOpen, setProfileOpen] = useState(false)
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)

  return {
    activeTab,
    setActiveTab,
    sidebarExpanded,
    setSidebarExpanded,
    profileOpen,
    setProfileOpen,
    accountMenuOpen,
    setAccountMenuOpen,
  }
}
