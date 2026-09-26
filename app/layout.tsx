import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "@/lib/AuthContext"

export const metadata: Metadata = {
  title: "Pierre | Assistente de IA para Finanças Pessoais",
  description: "Gerencie suas finanças pessoais com IA",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
