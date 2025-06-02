// components/dashboard/QuickActions.tsx
"use client";
import { Plus, Upload, Download, Settings } from "lucide-react";
import Link from "next/link";

export default function QuickActions() {
  const actions = [
    {
      label: "Nuevo Proyecto",
      icon: Plus,
      href: "/projects/new",
      className: "bg-yellow-400 hover:bg-yellow-500 text-black",
    },
    {
      label: "Importar",
      icon: Upload,
      href: "/import",
      className: "bg-gray-700 hover:bg-gray-600 text-white",
    },
    {
      label: "Exportar",
      icon: Download,
      href: "/export",
      className: "bg-gray-700 hover:bg-gray-600 text-white",
    },
    {
      label: "Configuración",
      icon: Settings,
      href: "/settings",
      className: "bg-gray-700 hover:bg-gray-600 text-white",
    },
  ];

  return (
    <div className="col-span-1">
      <h2 className="text-lg font-bold text-white mb-4">Acciones Rápidas</h2>
      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              href={action.href}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${action.className}`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{action.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}