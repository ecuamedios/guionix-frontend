import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SessionProvider from '@/components/providers/SessionProvider'
import { RefineProvider } from '@/providers/RefineProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GUIONIX - Plataforma de Creación de Guiones con IA',
  description: 'Crea guiones profesionales para DramaBox, largometrajes y series web usando inteligencia artificial avanzada.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body className={`${inter.className} antialiased`}>
        <SessionProvider>
          <RefineProvider>
            {children}
          </RefineProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
