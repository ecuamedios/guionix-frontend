// app/(dashboard)/layout.tsx (SUPER AVANZADO)
// filepath: app/(dashboard)/layout.tsx
import type { ReactNode } from "react";
import { Film } from "lucide-react";
import Link from "next/link";

export default function DashboardRootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <header className="flex items-center gap-3 px-6 py-4 bg-gray-950/80 border-b border-gray-800 shadow-lg z-20">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Film className="w-7 h-7 text-yellow-400" />
          <span className="text-xl font-bold text-white tracking-wide">GUIONIX</span>
        </Link>
        <span className="ml-auto text-gray-400 text-xs font-mono tracking-widest">
          Plataforma de guionistas avanzada
        </span>
      </header>
      <main className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
      <footer className="w-full py-4 text-center text-gray-500 text-xs border-t border-gray-800">
        &copy; {new Date().getFullYear()} GUIONIX. Todos los derechos reservados.
      </footer>
    </div>
  );
}