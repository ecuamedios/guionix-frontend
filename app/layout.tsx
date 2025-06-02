import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GUIONIX - Sistema de Guiones con IA',
  description: 'Plataforma profesional para generación de guiones cinematográficos con inteligencia artificial',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <head />
      <body className={`${inter.className} bg-slate-900 text-white antialiased`}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
