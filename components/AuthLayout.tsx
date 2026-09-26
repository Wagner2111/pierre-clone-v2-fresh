import React from 'react'

interface AuthLayoutProps {
  children: React.ReactNode
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grid grid-cols-1 lg:grid-cols-[52%_48%] min-h-screen">
        {/* Formulário */}
        <div className="flex items-center justify-center p-6 sm:p-12 lg:p-20">
          <div className="w-full max-w-[416px]">
            {/* Logo */}
            <div className="mb-8 flex items-center">
              <img src="/images/pierre-logo-minimal.png" alt="Pierre" className="w-14 h-14 object-contain" />
            </div>
            {children}
          </div>
        </div>

        {/* Imagem (escondida em mobile) */}
        <div className="hidden lg:flex items-center justify-center p-3 bg-black">
          <div className="w-full h-full rounded-[28px] overflow-hidden bg-[#c49a6c]">
            <img src="/images/pierre-login-emblem.png" alt="Pierre" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  )
}
