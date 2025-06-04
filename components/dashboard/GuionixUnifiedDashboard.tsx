"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  BarChart3, Bell, Film, FolderOpen, Home, Menu, Settings, Users,
  Search, X, Cog, LogOut, ChevronDown, Sun, Moon, Target
} from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Modular Components - Cada sección como componente separado
import DashboardPrincipal from "./sections/DashboardPrincipal";
import GestionProyectos from "./sections/GestionProyectos";
import ScriptStudioIntegrado from "./sections/ScriptStudioIntegrado";
import AnalyticsIntelligence from "./sections/AnalyticsIntelligence";
import TeamManagement from "./sections/TeamManagement";
import SystemConfig from "./sections/SystemConfig";

// ====== TIPOS COMPARTIDOS ======
export interface DashboardMetrics {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  aiUsage: {
    monthly: number;
    limit: number;
    cost: number;
    breakdown: { xai: number; openai: number; claude: number; };
  };
  avgQualityScore: number;
  culturalAuthScore: number;
  teamMembers: number;
  pendingApprovals: number;
  activeCollaborations: number;
  revenue: { monthly: number; growth: number; };
  efficiency: { avgCompletionTime: number; productivity: number; };
  railwayStatus: {
    uptime: number;
    services: { total: number; online: number; };
  };
}

export interface Project {
  id: string;
  title: string;
  status: 'development' | 'review' | 'production' | 'archived';
  category: 'dramabox' | 'feature' | 'webseries' | 'shorts';
  progress: number;
  phase: 1 | 2 | 3 | 4;
  lastModified: string;
  genre: string;
  pages: number;
  duration: number; // en minutos
  qualityScore: number;
  culturalAuth: number;
  team: TeamMember[];
  collaboration: {
    activeUsers: number;
    pendingApprovals: number;
  };
  deadline: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  template: string;
  aiCost: number;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'SUPER_ADMIN' | 'DIRECTOR' | 'SUPERVISOR' | 'EDITOR' | 'VIEWER';
  status: 'active' | 'offline' | 'busy';
  lastSeen: string;
  projects: string[];
  permissions: string[];
}

// ====== COMPONENTE PRINCIPAL ======
const GuionixUnifiedDashboard = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Datos compartidos entre componentes
  const [dashboardMetrics] = useState<DashboardMetrics>({
    totalProjects: 47,
    activeProjects: 12,
    completedProjects: 35,
    aiUsage: {
      monthly: 347.50,
      limit: 500.00,
      cost: 89.32,
      breakdown: { xai: 127.20, openai: 156.80, claude: 63.50 }
    },
    avgQualityScore: 87,
    culturalAuthScore: 91,
    teamMembers: 18,
    pendingApprovals: 3,
    activeCollaborations: 6,
    revenue: { monthly: 12450.00, growth: 15.7 },
    efficiency: { avgCompletionTime: 14.2, productivity: 89 },
    railwayStatus: { uptime: 99.9, services: { total: 6, online: 6 } }
  });

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <Film className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Cargando GUIONIX Dashboard Unificado...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      {/* Header Principal GUIONIX */}
      <header className="bg-slate-950/90 backdrop-blur-sm border-b border-red-500/30 px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl shadow-lg">
                <Film className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">GUIONIX</h1>
                <p className="text-xs text-gray-400">Dashboard Unificado</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Búsqueda Global */}
            <div className="hidden md:flex items-center gap-2">
              <Input
                placeholder="Buscar proyectos, scripts, colaboradores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-80 bg-slate-800 border-gray-600 focus:border-red-500"
              />
              <Button variant="outline" size="sm" className="border-red-500/50 hover:bg-red-500/20">
                <Search className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Notificaciones */}
            <Button variant="outline" size="sm" className="relative border-red-500/50 hover:bg-red-500/20">
              <Bell className="w-4 h-4" />
              {dashboardMetrics.pendingApprovals > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-xs">
                  {dashboardMetrics.pendingApprovals}
                </Badge>
              )}
            </Button>
            
            {/* Menu Usuario */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user?.email || ""} alt={session.user?.name || ""} />
                    <AvatarFallback className="bg-red-500 text-white">
                      {session.user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setActiveTab('config')}>
                  <Cog className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab('team')}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Equipo</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Sistema de Tabs Unificado */}
      <div className="px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800/50 p-1 rounded-xl">
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-red-500 data-[state=active]:text-white rounded-lg transition-all"
            >
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="proyectos" 
              className="data-[state=active]:bg-red-500 data-[state=active]:text-white rounded-lg transition-all"
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              Proyectos
            </TabsTrigger>
            <TabsTrigger 
              value="studio" 
              className="data-[state=active]:bg-red-500 data-[state=active]:text-white rounded-lg transition-all"
            >
              <Target className="w-4 h-4 mr-2" />
              Studio
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:bg-red-500 data-[state=active]:text-white rounded-lg transition-all"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger 
              value="team" 
              className="data-[state=active]:bg-red-500 data-[state=active]:text-white rounded-lg transition-all"
            >
              <Users className="w-4 h-4 mr-2" />
              Equipo
            </TabsTrigger>
            <TabsTrigger 
              value="config" 
              className="data-[state=active]:bg-red-500 data-[state=active]:text-white rounded-lg transition-all"
            >
              <Settings className="w-4 h-4 mr-2" />
              Config
            </TabsTrigger>
          </TabsList>

          {/* Renderizado de cada sección como componente separado */}
          <TabsContent value="dashboard" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DashboardPrincipal 
                metrics={dashboardMetrics} 
                onNavigate={setActiveTab}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="proyectos" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GestionProyectos 
                searchQuery={searchQuery}
                onNavigate={setActiveTab}
                metrics={dashboardMetrics}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="studio" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ScriptStudioIntegrado 
                metrics={dashboardMetrics}
                onNavigate={setActiveTab}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnalyticsIntelligence 
                metrics={dashboardMetrics}
                onNavigate={setActiveTab}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TeamManagement 
                metrics={dashboardMetrics}
                searchQuery={searchQuery}
                onNavigate={setActiveTab}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="config" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SystemConfig 
                onNavigate={setActiveTab}
              />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GuionixUnifiedDashboard; 