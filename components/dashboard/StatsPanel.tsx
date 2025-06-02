// components/dashboard/StatsPanel.tsx
"use client";
import { Film, Users, FileText, TrendingUp } from "lucide-react";

export default function StatsPanel() {
  const stats = [
    {
      label: "Proyectos Activos",
      value: "12",
      icon: Film,
      change: "+2 este mes",
      changeType: "positive" as const,
    },
    {
      label: "Colaboradores",
      value: "8",
      icon: Users,
      change: "+1 esta semana",
      changeType: "positive" as const,
    },
    {
      label: "Guiones Completados",
      value: "5",
      icon: FileText,
      change: "+1 este mes",
      changeType: "positive" as const,
    },
    {
      label: "Horas de Trabajo",
      value: "127",
      icon: TrendingUp,
      change: "+15% vs mes anterior",
      changeType: "positive" as const,
    },
  ];

  return (
    <div className="col-span-1 md:col-span-2">
      <h2 className="text-lg font-bold text-white mb-4">Estadísticas</h2>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-5 h-5 text-yellow-400" />
                <span className="text-2xl font-bold text-white">{stat.value}</span>
              </div>
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className={`text-xs ${
                stat.changeType === "positive" ? "text-green-400" : "text-red-400"
              }`}>
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}