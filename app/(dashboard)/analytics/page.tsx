// app/(dashboard)/analytics/page.tsx (SUPER AVANZADO)
// filepath: app/(dashboard)/analytics/page.tsx
"use client";
import { useEffect, useState } from "react";
import { BarChart2, Users, FileText, Sparkles } from "lucide-react";

interface AnalyticsData {
  totalProjects: number;
  totalBeats: number;
  totalUsers: number;
  aiUsage: number;
  mostActiveUser?: string;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    // Simulación: reemplaza por fetch real a tu API de analytics
    setTimeout(() => {
      setData({
        totalProjects: 42,
        totalBeats: 380,
        totalUsers: 12,
        aiUsage: 120000,
        mostActiveUser: "sofia@guionix.com",
      });
    }, 800);
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <BarChart2 className="w-7 h-7 text-yellow-400" /> Analytics de GUIONIX
      </h1>
      {!data ? (
        <div className="text-gray-400 animate-pulse">Cargando métricas...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-xl p-6 flex flex-col items-center shadow border border-gray-800">
            <Users className="w-8 h-8 text-yellow-400 mb-2" />
            <div className="text-3xl font-bold text-white">{data.totalUsers}</div>
            <div className="text-gray-400 text-sm">Usuarios registrados</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 flex flex-col items-center shadow border border-gray-800">
            <FileText className="w-8 h-8 text-yellow-400 mb-2" />
            <div className="text-3xl font-bold text-white">{data.totalProjects}</div>
            <div className="text-gray-400 text-sm">Proyectos creados</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 flex flex-col items-center shadow border border-gray-800">
            <Sparkles className="w-8 h-8 text-yellow-400 mb-2" />
            <div className="text-3xl font-bold text-white">{data.aiUsage.toLocaleString()}</div>
            <div className="text-gray-400 text-sm">Tokens IA usados</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 flex flex-col items-center shadow border border-gray-800">
            <FileText className="w-8 h-8 text-yellow-400 mb-2" />
            <div className="text-3xl font-bold text-white">{data.totalBeats}</div>
            <div className="text-gray-400 text-sm">Beats escritos</div>
          </div>
        </div>
      )}
      {data?.mostActiveUser && (
        <div className="mt-8 text-center text-gray-400 text-sm">
          Usuario más activo: <span className="text-yellow-400 font-bold">{data.mostActiveUser}</span>
        </div>
      )}
    </div>
  );
}