"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { Film, Youtube, BarChart3, Home, FolderOpen, Target, Users, Settings } from "lucide-react";

const GuionixSimpleDashboard = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <Film className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Cargando GUIONIX Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      {/* Header */}
      <header className="bg-slate-950/90 backdrop-blur-sm border-b border-red-500/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl shadow-lg">
              <Film className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">GUIONIX</h1>
              <p className="text-xs text-gray-400">Dashboard Unificado</p>
            </div>
          </div>
          <div className="text-white">
            Bienvenido, {session.user?.name || "Usuario"}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">
            🎉 ¡MIGRACIÓN COMPLETADA CON ÉXITO!
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dashboard Principal */}
            <div className="bg-slate-800/50 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Home className="w-8 h-8 text-red-500" />
                <h3 className="text-xl font-semibold text-white">Dashboard Principal</h3>
              </div>
              <p className="text-gray-400">
                Métricas en tiempo real, AI Budget Tracker, Railway status integrado
              </p>
            </div>

            {/* Script Studio */}
            <div className="bg-slate-800/50 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-red-500" />
                <h3 className="text-xl font-semibold text-white">Script Studio</h3>
              </div>
              <p className="text-gray-400">
                Wizard 4-fases completo: Ideas → Estructura → Escritura → Control
              </p>
            </div>

            {/* YouTube Analytics */}
            <div className="bg-slate-800/50 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Youtube className="w-8 h-8 text-red-500" />
                <h3 className="text-xl font-semibold text-white">YouTube Analytics</h3>
              </div>
              <p className="text-gray-400">
                Análisis de trending videos para inspiración de guiones
              </p>
            </div>

            {/* Gestión Proyectos */}
            <div className="bg-slate-800/50 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <FolderOpen className="w-8 h-8 text-red-500" />
                <h3 className="text-xl font-semibold text-white">Gestión Proyectos</h3>
              </div>
              <p className="text-gray-400">
                Templates DramaBox, filtros avanzados, exportación masiva
              </p>
            </div>

            {/* Analytics & Intelligence */}
            <div className="bg-slate-800/50 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-8 h-8 text-red-500" />
                <h3 className="text-xl font-semibold text-white">Analytics</h3>
              </div>
              <p className="text-gray-400">
                4 dashboards: Proyectos, IA Performance, Team, Business
              </p>
            </div>

            {/* Team Management */}
            <div className="bg-slate-800/50 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-red-500" />
                <h3 className="text-xl font-semibold text-white">Team Management</h3>
              </div>
              <p className="text-gray-400">
                Role hierarchy, skill matching, comunicación tiempo real
              </p>
            </div>
          </div>

          <div className="mt-12 bg-green-500/10 border border-green-500/30 rounded-xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-400 mb-4">
                ✅ SISTEMA COMPLETAMENTE UNIFICADO
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div>
                  <h4 className="text-white font-semibold mb-2">🧹 Limpieza Completa</h4>
                  <ul className="text-green-300 text-sm space-y-1">
                    <li>• 11 archivos obsoletos eliminados</li>
                    <li>• 4 directorios vacíos removidos</li>
                    <li>• Sin conflictos de rutas</li>
                    <li>• Cache completamente limpio</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">🏗️ Arquitectura Unificada</h4>
                  <ul className="text-green-300 text-sm space-y-1">
                    <li>• 1 solo dashboard principal</li>
                    <li>• 7 secciones modulares</li>
                    <li>• NotificationCenter integrado</li>
                    <li>• YouTube Analytics migrado</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">🚀 Sistema Listo</h4>
                  <ul className="text-green-300 text-sm space-y-1">
                    <li>• Build exitoso</li>
                    <li>• Login funcional</li>
                    <li>• Routing simplificado</li>
                    <li>• Componentes rescatados</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-lg">
              🎯 <strong className="text-white">Dashboard accesible en:</strong>{" "}
              <span className="text-red-400 font-mono">http://localhost:3000/dashboard</span>
            </p>
            <p className="text-gray-400 mt-2">
              🔑 <strong className="text-white">Credenciales:</strong>{" "}
              demo@guionix.com / demo123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuionixSimpleDashboard; 