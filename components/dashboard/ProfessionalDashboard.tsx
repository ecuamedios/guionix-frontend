"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Bell,
  BookOpen,
  Brain,
  Calendar,
  ChevronDown,
  Clock,
  Cog,
  Film,
  FolderOpen,
  Globe,
  Home,
  Layers,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  PenTool,
  Plus,
  Search,
  Sparkles,
  Star,
  Sun,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
  Activity,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  Download,
  Edit,
  Eye,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Types
interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalPages: number;
  aiUsage: {
    monthly: number;
    limit: number;
    cost: number;
  };
  blakeSnyderCompliance: number;
  teamMembers: number;
  recentActivity: number;
}

interface Project {
  id: string;
  title: string;
  status: 'draft' | 'in-progress' | 'review' | 'completed';
  progress: number;
  lastModified: string;
  genre: string;
  pages: number;
  blakeSnyderValid: boolean;
  aiCost: number;
  team: { name: string; avatar: string; role: string }[];
}

interface MenuItem {
  name: string;
  icon: React.ComponentType<any>;
  href: string;
  active?: boolean;
  badge?: string | number;
  comingSoon?: boolean;
}

interface Activity {
  id: string;
  type: 'created' | 'edited' | 'exported' | 'ai_generated';
  message: string;
  time: string;
  user: string;
  project?: string;
}

const ProfessionalDashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with real API calls
  const [stats] = useState<DashboardStats>({
    totalProjects: 24,
    activeProjects: 7,
    completedProjects: 17,
    totalPages: 2847,
    aiUsage: {
      monthly: 347.50,
      limit: 500.00,
      cost: 89.32
    },
    blakeSnyderCompliance: 92,
    teamMembers: 12,
    recentActivity: 18
  });

  const [recentProjects] = useState<Project[]>([
    {
      id: "1",
      title: "El Último Samurai Digital",
      status: "in-progress",
      progress: 68,
      lastModified: "hace 2 horas",
      genre: "Ciencia Ficción",
      pages: 89,
      blakeSnyderValid: true,
      aiCost: 23.45,
      team: [
        { name: "Ana García", avatar: "/avatars/ana.jpg", role: "Director" },
        { name: "Luis Pérez", avatar: "/avatars/luis.jpg", role: "Guionista" }
      ]
    },
    {
      id: "2",
      title: "Misterio en la Selva",
      status: "review",
      progress: 95,
      lastModified: "hace 1 día",
      genre: "Thriller",
      pages: 112,
      blakeSnyderValid: true,
      aiCost: 45.67,
      team: [
        { name: "María López", avatar: "/avatars/maria.jpg", role: "Productora" },
        { name: "Carlos Ruiz", avatar: "/avatars/carlos.jpg", role: "Editor" }
      ]
    },
    {
      id: "3",
      title: "Comedia Urbana",
      status: "completed",
      progress: 100,
      lastModified: "hace 3 días",
      genre: "Comedia",
      pages: 98,
      blakeSnyderValid: true,
      aiCost: 12.34,
      team: [
        { name: "Diana Silva", avatar: "/avatars/diana.jpg", role: "Directora" }
      ]
    }
  ]);

  const [recentActivity] = useState<Activity[]>([
    {
      id: "1",
      type: "ai_generated",
      message: "IA generó 3 beats para 'El Último Samurai Digital'",
      time: "hace 30 min",
      user: "Ana García",
      project: "El Último Samurai Digital"
    },
    {
      id: "2",
      type: "exported",
      message: "Exportación PDF completada para 'Misterio en la Selva'",
      time: "hace 1 hora",
      user: "María López",
      project: "Misterio en la Selva"
    },
    {
      id: "3",
      type: "edited",
      message: "Beat 7 editado en 'Comedia Urbana'",
      time: "hace 2 horas",
      user: "Diana Silva",
      project: "Comedia Urbana"
    }
  ]);

  const menuItems: MenuItem[] = [
    { name: "Dashboard", icon: Home, href: "/dashboard", active: activeTab === 'overview' },
    { name: "Proyectos", icon: FolderOpen, href: "/projects", badge: stats.activeProjects },
    { name: "Nuevo Proyecto", icon: Plus, href: "/studio?mode=new" },
    { name: "IA Assistant", icon: Brain, href: "/ai", badge: "Pro" },
    { name: "Equipo", icon: Users, href: "/team", badge: stats.teamMembers },
    { name: "Analytics", icon: BarChart3, href: "/analytics" },
    { name: "Exportar", icon: Download, href: "/export" },
    { name: "Blake Snyder", icon: BookOpen, href: "/methodology" },
    { name: "Configuración", icon: Settings, href: "/settings" }
  ];

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'review': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'in-progress': return 'En Progreso';
      case 'review': return 'En Revisión';
      default: return 'Borrador';
    }
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'ai_generated': return <Brain className="w-4 h-4 text-purple-500" />;
      case 'exported': return <Download className="w-4 h-4 text-green-500" />;
      case 'edited': return <Edit className="w-4 h-4 text-blue-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <Film className="w-16 h-16 text-amber-500 mx-auto mb-4 animate-pulse" />
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Cargando GUIONIX...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className="fixed inset-y-0 left-0 z-50 w-72 bg-gray-950 border-r border-gray-800 lg:translate-x-0 lg:static lg:inset-0"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
              <Film className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">GUIONIX</h1>
              <p className="text-xs text-gray-400">Script Studio Pro</p>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                item.active
                  ? 'bg-gradient-to-r from-amber-500/20 to-orange-600/20 text-amber-400 border border-amber-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
              {item.badge && (
                <Badge 
                  variant="secondary" 
                  className="ml-auto bg-amber-500/20 text-amber-400 border-amber-500/30"
                >
                  {item.badge}
                </Badge>
              )}
              {item.comingSoon && (
                <Badge variant="outline" className="ml-auto text-xs">
                  Próximamente
                </Badge>
              )}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={session.user?.name ? `/avatars/${session.user.name.toLowerCase()}.jpg` : ""} />
              <AvatarFallback className="bg-amber-500 text-white">
                {session.user?.name?.charAt(0).toUpperCase() || session.user?.email?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {session.user?.name || session.user?.email}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {session.user?.email}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Cog className="w-4 h-4 mr-2" />
                  Configuración
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleTheme}>
                  {theme === 'dark' ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                  {theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Bienvenido de vuelta, {session.user?.name || 'Usuario'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button 
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Proyecto
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Proyectos Totales</CardTitle>
                <FolderOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProjects}</div>
                <p className="text-xs text-muted-foreground">
                  +12% desde el mes pasado
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Proyectos Activos</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeProjects}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.completedProjects} completados
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Uso de IA</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.aiUsage.monthly}</div>
                <Progress 
                  value={(stats.aiUsage.monthly / stats.aiUsage.limit) * 100} 
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  de ${stats.aiUsage.limit} mensuales
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Blake Snyder</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.blakeSnyderCompliance}%</div>
                <p className="text-xs text-muted-foreground">
                  Cumplimiento promedio
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="projects">Proyectos</TabsTrigger>
              <TabsTrigger value="activity">Actividad</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Projects */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FolderOpen className="w-5 h-5" />
                      Proyectos Recientes
                    </CardTitle>
                    <CardDescription>
                      Tus proyectos más activos
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentProjects.slice(0, 3).map((project) => (
                      <div key={project.id} className="flex items-center gap-4 p-3 rounded-lg border">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{project.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{project.genre}</span>
                            <span>•</span>
                            <span>{project.pages} páginas</span>
                            {project.blakeSnyderValid && (
                              <>
                                <span>•</span>
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              </>
                            )}
                          </div>
                          <Progress value={project.progress} className="mt-2" />
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{project.progress}%</p>
                          <p className="text-xs text-muted-foreground">{project.lastModified}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Activity Feed */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Actividad Reciente
                    </CardTitle>
                    <CardDescription>
                      Últimas acciones en tus proyectos
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className="mt-1">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">{activity.message}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <span>{activity.user}</span>
                            <span>•</span>
                            <span>{activity.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentProjects.map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className={`${getStatusColor(project.status)} text-white border-0`}>
                          {getStatusText(project.status)}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <ChevronDown className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              Ver
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Exportar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription>{project.genre} • {project.pages} páginas</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progreso</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} />
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Costo IA: ${project.aiCost}</span>
                        {project.blakeSnyderValid && (
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle2 className="w-4 h-4" />
                            Blake Snyder
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Equipo:</span>
                        <div className="flex -space-x-2">
                          {project.team.slice(0, 3).map((member, index) => (
                            <Avatar key={index} className="w-6 h-6 border-2 border-background">
                              <AvatarFallback className="text-xs">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {project.team.length > 3 && (
                            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">
                              +{project.team.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Registro de Actividad Completo</CardTitle>
                  <CardDescription>
                    Historial detallado de todas las acciones en tus proyectos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-4 p-4 rounded-lg border">
                        <div className="flex-shrink-0">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{activity.message}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <span>{activity.user}</span>
                            {activity.project && (
                              <>
                                <span>•</span>
                                <span>{activity.project}</span>
                              </>
                            )}
                            <span>•</span>
                            <span>{activity.time}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ArrowUpRight className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfessionalDashboard; 