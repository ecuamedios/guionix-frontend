import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SessionProvider from '@/components/providers/SessionProvider'

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
    <html lang="es" className="dark" suppressHydrationWarning>
      <head />
      <body className={`${inter.className} bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white antialiased transition-colors duration-300`}>
        <SessionProvider>
          <div className="min-h-screen">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
