"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  DollarSign, FolderOpen, Award, Server, Brain, Sparkles,
  TrendingUp, Users, Film, BarChart3, Plus, Zap, Activity,
  CheckCircle, AlertCircle, Clock, Target, Gauge
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { DashboardMetrics } from "../GuionixUnifiedDashboard";

interface DashboardPrincipalProps {
  metrics: DashboardMetrics;
  onNavigate: (tab: string) => void;
}

const DashboardPrincipal = ({ metrics, onNavigate }: DashboardPrincipalProps) => {
  const router = useRouter();

  const aiProviders = [
    {
      name: "X.AI/Grok",
      status: "online" as const,
      usage: metrics.aiUsage.breakdown.xai,
      cost: 42.30,
      specialty: "Generación de Ideas",
      performance: 94,
      responseTime: 1.2
    },
    {
      name: "ChatGPT-4",
      status: "online" as const, 
      usage: metrics.aiUsage.breakdown.openai,
      cost: 31.40,
      specialty: "Estructura Narrativa",
      performance: 91,
      responseTime: 0.8
    },
    {
      name: "Claude",
      status: "online" as const,
      usage: metrics.aiUsage.breakdown.claude,
      cost: 15.62,
      specialty: "Escritura Profesional",
      performance: 96,
      responseTime: 1.5
    }
  ];

  const recentActivities = [
    {
      id: "1",
      type: "ai_generated",
      message: "IA generó 3 beats para 'La Venganza del Patrón'",
      time: "hace 30 min",
      user: "Ana García",
      project: "La Venganza del Patrón"
    },
    {
      id: "2",
      type: "collaboration",
      message: "Luis Pérez colaboró en Fase 2",
      time: "hace 1 hora",
      user: "Luis Pérez",
      project: "Corazones Divididos"
    },
    {
      id: "3",
      type: "export",
      message: "Exportación PDF completada",
      time: "hace 2 horas",
      user: "María López",
      project: "Secretos de Familia"
    }
  ];

  return (
    <div className="space-y-6">
      {/* 📊 Métricas en Tiempo Real */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Proyectos Activos */}
        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30 hover:border-blue-400 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-400 flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              Proyectos Activos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{metrics.activeProjects}</div>
            <p className="text-xs text-blue-300">de {metrics.totalProjects} totales</p>
            <div className="mt-3">
              <Progress value={(metrics.activeProjects / metrics.totalProjects) * 100} className="h-2" />
            </div>
            <div className="mt-2 text-xs text-blue-200">
              {metrics.completedProjects} completados este mes
            </div>
          </CardContent>
        </Card>

        {/* Budget IA */}
        <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30 hover:border-green-400 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-400 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Budget IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              ${metrics.aiUsage.monthly.toFixed(0)}
            </div>
            <p className="text-xs text-green-300">de ${metrics.aiUsage.limit} límite</p>
            <div className="mt-3">
              <Progress value={(metrics.aiUsage.monthly / metrics.aiUsage.limit) * 100} className="h-2" />
            </div>
            <div className="mt-2 text-xs text-green-200">
              {((metrics.aiUsage.monthly / metrics.aiUsage.limit) * 100).toFixed(1)}% usado
            </div>
          </CardContent>
        </Card>

        {/* Score Calidad */}
        <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30 hover:border-purple-400 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-purple-400 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Score Calidad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{metrics.avgQualityScore}/100</div>
            <p className="text-xs text-purple-300">Promedio equipo</p>
            <div className="mt-3">
              <Progress value={metrics.avgQualityScore} className="h-2" />
            </div>
            <div className="mt-2 text-xs text-purple-200">
              Cultural: {metrics.culturalAuthScore}/100
            </div>
          </CardContent>
        </Card>

        {/* Railway Status */}
        <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-orange-500/30 hover:border-orange-400 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-orange-400 flex items-center gap-2">
              <Server className="w-4 h-4" />
              Railway Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-semibold">Operacional</span>
            </div>
            <p className="text-xs text-orange-300">{metrics.railwayStatus.services.online}/{metrics.railwayStatus.services.total} servicios activos</p>
            <div className="mt-3">
              <Progress value={(metrics.railwayStatus.services.online / metrics.railwayStatus.services.total) * 100} className="h-2" />
            </div>
            <div className="mt-2 text-xs text-orange-200">
              Uptime: {metrics.railwayStatus.uptime}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 📈 AI Budget Tracker Detallado */}
      <Card className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            AI Budget Tracker - ${metrics.aiUsage.monthly.toFixed(2)} / ${metrics.aiUsage.limit}
          </CardTitle>
          <CardDescription className="text-gray-300">
            Desglose por proveedor de IA - {((metrics.aiUsage.monthly / metrics.aiUsage.limit) * 100).toFixed(1)}% usado este mes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {aiProviders.map((provider) => (
              <div key={provider.name} className="p-4 bg-slate-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-white">{provider.name}</span>
                  <Badge 
                    variant={provider.status === 'online' ? 'default' : 'destructive'}
                    className={provider.status === 'online' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500'}
                  >
                    {provider.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-300">{provider.specialty}</div>
                  <div className="text-xl font-bold text-white">${provider.usage.toFixed(2)}</div>
                  <div className="text-xs text-gray-400">Costo: ${provider.cost.toFixed(2)}</div>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>Performance: {provider.performance}%</span>
                    <span>Resp: {provider.responseTime}s</span>
                  </div>
                  <div className="mt-2">
                    <Progress value={provider.performance} className="h-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button onClick={() => onNavigate('config')} variant="outline" className="border-purple-500/50 hover:bg-purple-500/20">
              <Brain className="w-4 h-4 mr-2" />
              Configurar Proveedores IA
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 🚀 Quick Actions */}
      <Card className="bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-400" />
            Quick Actions - Productividad Diaria
          </CardTitle>
          <CardDescription className="text-gray-300">
            Acciones rápidas para impulsar tu flujo creativo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="h-20 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white flex flex-col items-center justify-center"
              onClick={() => onNavigate('studio')}
            >
              <Plus className="w-8 h-8 mb-2" />
              <div className="text-center">
                <div className="text-sm font-semibold">Nuevo DramaBox</div>
                <div className="text-xs opacity-90">110min exactos</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 border-purple-500/50 hover:bg-purple-500/20 flex flex-col items-center justify-center"
              onClick={() => onNavigate('analytics')}
            >
              <BarChart3 className="w-8 h-8 mb-2" />
              <div className="text-center">
                <div className="text-sm font-semibold">Ver Analytics</div>
                <div className="text-xs opacity-90">Métricas avanzadas</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 border-orange-500/50 hover:bg-orange-500/20 flex flex-col items-center justify-center"
              onClick={() => onNavigate('team')}
            >
              <Users className="w-8 h-8 mb-2" />
              <div className="text-center">
                <div className="text-sm font-semibold">Gestionar Equipo</div>
                <div className="text-xs opacity-90">Colaboración</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 📋 Actividad Reciente */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-slate-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-400" />
              Actividad Reciente
            </CardTitle>
            <CardDescription className="text-gray-300">
              Últimas acciones del equipo y sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-slate-800 rounded-lg">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    {activity.type === 'ai_generated' && <Brain className="w-4 h-4 text-purple-400" />}
                    {activity.type === 'collaboration' && <Users className="w-4 h-4 text-green-400" />}
                    {activity.type === 'export' && <CheckCircle className="w-4 h-4 text-blue-400" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.message}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                      <span>{activity.user}</span>
                      <span>•</span>
                      <span>{activity.time}</span>
                      {activity.project && (
                        <>
                          <span>•</span>
                          <span className="text-blue-400">{activity.project}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm">
                Ver toda la actividad
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 💡 Inspiración Diaria */}
        <Card className="bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-amber-500/30">
          <CardHeader>
            <CardTitle className="text-amber-400 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Inspiración Diaria
            </CardTitle>
            <CardDescription className="text-amber-300">
              Generado por X.AI para motivar tu creatividad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <blockquote className="text-white italic text-base mb-4">
              "El guión perfecto no nace de la perfección técnica, sino de la autenticidad emocional que conecta con el corazón latino."
            </blockquote>
            <p className="text-amber-300 text-sm mb-4">— Filosofía GUIONIX para DramaBox</p>
            <div className="space-y-2">
              <Button 
                className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white"
                onClick={() => onNavigate('studio')}
              >
                <Film className="w-4 h-4 mr-2" />
                Crear Proyecto
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-amber-500/50 hover:bg-amber-500/20"
                  onClick={() => onNavigate('analytics')}
                >
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Progreso
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-purple-500/50 hover:bg-purple-500/20"
                  onClick={() => onNavigate('team')}
                >
                  <Users className="w-4 h-4 mr-1" />
                  Colaborar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Métricas Adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900/50 border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2">
              <Gauge className="w-5 h-5 text-green-400" />
              Productividad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-2">{metrics.efficiency.productivity}%</div>
            <p className="text-sm text-gray-300 mb-2">Tiempo promedio: {metrics.efficiency.avgCompletionTime} días</p>
            <Progress value={metrics.efficiency.productivity} className="h-2" />
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              Ingresos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-2">${metrics.revenue.monthly.toLocaleString()}</div>
            <p className="text-sm text-green-400 mb-2">+{metrics.revenue.growth}% este mes</p>
            <div className="text-xs text-gray-400">
              Proyección anual: ${(metrics.revenue.monthly * 12).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-400" />
              Goals Mensuales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Proyectos</span>
                <span className="text-white">{metrics.activeProjects}/15</span>
              </div>
              <Progress value={(metrics.activeProjects / 15) * 100} className="h-2" />
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Calidad</span>
                <span className="text-white">{metrics.avgQualityScore}/95</span>
              </div>
              <Progress value={(metrics.avgQualityScore / 95) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPrincipal; 