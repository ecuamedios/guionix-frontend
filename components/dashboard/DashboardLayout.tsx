// components/dashboard/DashboardLayout.tsx (SUPER AVANZADO)
// filepath: components/dashboard/DashboardLayout.tsx
"use client";
import { ReactNode } from "react";
import { Film, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

interface DashboardLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  topbar?: ReactNode;
}

export default function DashboardLayout({ children, sidebar, topbar }: DashboardLayoutProps) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-gray-800">
      {/* Topbar */}
      <header className="flex items-center justify-between px-6 py-4 bg-gray-950/80 border-b border-gray-800 shadow-lg z-20">
        <Link href="/projects" className="flex items-center gap-2">
          <Film className="w-7 h-7 text-yellow-400" />
          <span className="text-xl font-bold text-white tracking-wide">GUIONIX Dashboard</span>
        </Link>
        <div className="flex items-center gap-4">
          {topbar}
          <span className="text-gray-300 text-sm">{user?.email}</span>
          <button
            onClick={() => logout()}
            className="flex items-center gap-1 text-gray-400 hover:text-yellow-400 transition"
            aria-label="Cerrar sesión"
          >
            <LogOut className="w-5 h-5" />
            Salir
          </button>
        </div>
      </header>
      {/* Main layout */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-gray-900 border-r border-gray-800 p-4 space-y-4 z-10">
          {sidebar}
        </aside>
        {/* Content */}
        <main className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}