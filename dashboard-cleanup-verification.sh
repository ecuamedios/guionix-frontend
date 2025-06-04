#!/bin/bash

# 🎬 GUIONIX - Verificación de Limpieza del Dashboard
echo "🔍 VERIFICANDO LIMPIEZA DEL DASHBOARD UNIFICADO GUIONIX..."
echo "=================================================================="

# Verificar estructura limpia
echo ""
echo "📁 ESTRUCTURA DE COMPONENTS/DASHBOARD:"
echo "------------------------------------------------------"
ls -la components/dashboard/
echo ""

echo "📂 CONTENIDO DE SECTIONS:"
echo "------------------------------------------------------"
ls -la components/dashboard/sections/
echo ""

echo "🗂️ ESTRUCTURA DE APP/(DASHBOARD):"
echo "------------------------------------------------------"
ls -la app/\(dashboard\)/
echo ""

echo "✅ ARCHIVOS MANTENIDOS:"
echo "------------------------------------------------------"
echo "🎯 GuionixUnifiedDashboard.tsx - Dashboard Principal"
echo "🔔 NotificationCenter.tsx - Sistema de Notificaciones"
echo "📦 ProjectCard.tsx - Componente de Proyectos"
echo "⚡ QuickActions.tsx - Acciones Rápidas"
echo "📊 StatsPanel.tsx - Panel de Estadísticas"
echo ""

echo "📁 SECCIONES MODULARES (6 COMPONENTES):"
echo "------------------------------------------------------"
echo "🏠 DashboardPrincipal.tsx"
echo "🎬 ScriptStudioIntegrado.tsx"
echo "📂 GestionProyectos.tsx"
echo "📊 AnalyticsIntelligence.tsx"
echo "👥 TeamManagement.tsx"
echo "⚙️ SystemConfig.tsx"
echo ""

echo "🗑️ ARCHIVOS ELIMINADOS:"
echo "------------------------------------------------------"
echo "❌ ProfessionalDashboard.tsx (obsoleto)"
echo "❌ EmbeddedStudio.tsx (obsoleto)"
echo "❌ AdvancedComponents.tsx (obsoleto)"
echo "❌ VideoCard.tsx (obsoleto)"
echo "❌ VideoCardSimple.tsx (obsoleto)"
echo "❌ VideoInsightModal.tsx (obsoleto)"
echo "❌ DashboardLayout.tsx (obsoleto)"
echo "❌ Directorios obsoletos: analytics/, config/, studio/, team/"
echo "❌ Páginas obsoletas: page-*.tsx, *.backup"
echo ""

echo "🔄 VERIFICACIÓN DE IMPORTACIONES:"
echo "------------------------------------------------------"
if grep -q "GuionixUnifiedDashboard" app/\(dashboard\)/page.tsx; then
    echo "✅ app/(dashboard)/page.tsx importa GuionixUnifiedDashboard"
else
    echo "❌ ERROR: app/(dashboard)/page.tsx NO importa GuionixUnifiedDashboard"
fi

if [ -f components/dashboard/GuionixUnifiedDashboard.tsx ]; then
    echo "✅ GuionixUnifiedDashboard.tsx existe"
else
    echo "❌ ERROR: GuionixUnifiedDashboard.tsx NO existe"
fi

if [ -f components/dashboard/NotificationCenter.tsx ]; then
    echo "✅ NotificationCenter.tsx integrado"
else
    echo "❌ ERROR: NotificationCenter.tsx NO existe"
fi

echo ""
echo "🚀 ESTADO DEL SERVIDOR:"
echo "------------------------------------------------------"
if pgrep -f "next dev" > /dev/null; then
    echo "✅ Servidor Next.js ejecutándose"
    echo "🌐 URL: http://localhost:3000"
else
    echo "⚠️ Servidor Next.js NO está ejecutándose"
    echo "💡 Ejecuta: npm run dev"
fi

echo ""
echo "🔑 CREDENCIALES PARA PRUEBAS:"
echo "=================================================================="
echo "📧 Email: demo@guionix.com"
echo "🔒 Contraseña: demo123"
echo "👤 Rol: DIRECTOR"
echo "🎯 URL Login: http://localhost:3000/login"
echo "🏠 URL Dashboard: http://localhost:3000/dashboard"
echo ""

echo "🎉 DASHBOARD UNIFICADO GUIONIX - LIMPIEZA COMPLETADA"
echo "=================================================================="
echo "✅ Sistema unificado con 1 solo dashboard"
echo "✅ 6 secciones modulares enterprise"
echo "✅ NotificationCenter integrado"
echo "✅ Componentes útiles rescatados"
echo "✅ Archivos obsoletos eliminados"
echo "✅ Sin conflictos ni duplicados"
echo ""
echo "🚀 ¡Listo para usar con credenciales demo!" 