// components/studio/StudioLayout.tsx (SUPER AVANZADO)
// filepath: components/studio/StudioLayout.tsx
"use client";
import { ReactNode } from "react";
import { Film, Menu, UserCircle } from "lucide-react";
import Link from "next/link";

interface StudioLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  topbar?: ReactNode;
}

export default function StudioLayout({ children, sidebar, topbar }: StudioLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-gray-800">
      {/* Topbar */}
      <header className="flex items-center justify-between px-6 py-4 bg-gray-950/80 border-b border-gray-800 shadow-lg z-20">
        <div className="flex items-center gap-3">
          <Menu className="w-6 h-6 text-yellow-400 md:hidden" aria-label="Abrir menú" />
          <Link href="/dashboard" className="flex items-center gap-2">
            <Film className="w-7 h-7 text-yellow-400" />
            <span className="text-xl font-bold text-white tracking-wide">GUIONIX Studio</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {topbar}
          <UserCircle className="w-8 h-8 text-gray-400" />
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