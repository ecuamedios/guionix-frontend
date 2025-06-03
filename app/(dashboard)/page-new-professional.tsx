"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  Film, 
  Plus, 
  FileText,
  Users,
  Clock,
  MapPin,
  Settings,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Activity,
  Play,
  Lightbulb,
  Calendar,
  Award,
  BarChart3,
  User,
  FolderOpen,
  ExternalLink,
  Menu,
  Home,
  Folder,
  Star,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Target,
  Zap,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  title: string;
  status: 'draft' | 'in-progress' | 'review' | 'completed';
  progress: number;
  lastModified: string;
  genre: string;
  pages: number;
}

interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalPages: number;
  weeklyProgress: number;
  aiIdeasGenerated: number;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data para el dashboard
  const stats: DashboardStats = {
    totalProjects: 12,
    activeProjects: 5,
    completedProjects: 7,
    totalPages: 284,
    weeklyProgress: 15,
    aiIdeasGenerated: 23
  };

  const projects: Project[] = [
    {
      id: "1",
      title: "El Último Algoritmo",
      status: 'in-progress',
      progress: 67,
      lastModified: "Hace 2 horas",
      genre: "Thriller Tech",
      pages: 45
    },
    {
      id: "2", 
      title: "Memorias del Futuro",
      status: 'review',
      progress: 95,
      lastModified: "Hace 1 día",
      genre: "Sci-Fi Drama",
      pages: 120
    },
    {
      id: "3",
      title: "La Red Invisible",
      status: 'draft',
      progress: 25,
      lastModified: "Hace 3 días",
      genre: "Cyberpunk",
      pages: 23
    }
  ];

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Home, 
      href: '/dashboard',
      active: true 
    },
    { 
      id: 'new-script', 
      label: 'Crear nuevo guión', 
      icon: Plus, 
      href: '/studio/new/phase/1' 
    },
    { 
      id: 'projects', 
      label: 'Proyectos', 
      icon: FolderOpen, 
      href: '/projects' 
    },
    { 
      id: 'actors', 
      label: 'Actores', 
      icon: Users, 
      href: '#',
      badge: 'Próximamente',
      disabled: true 
    },
    { 
      id: 'locations', 
      label: 'Locaciones', 
      icon: MapPin, 
      href: '#',
      badge: 'Próximamente',
      disabled: true 
    },
    { 
      id: 'settings', 
      label: 'Configuración', 
      icon: Settings, 
      href: '#',
      badge: 'Próximamente',
      disabled: true 
    }
  ];

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin');
    }
  }, [session, router]);

  if (!session) {
    return (
      <div className="min-h-screen bg-[#17202a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cb4335] mx-auto mb-4"></div>
          <p className="text-white">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#17202a] flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-[#17202a] border-r border-gray-800 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#cb4335] rounded-lg">
                <Film className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">GUIONIX</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (!item.disabled) {
                      router.push(item.href);
                      setSidebarOpen(false);
                    }
                  }}
                  disabled={item.disabled}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors
                    ${item.active 
                      ? 'bg-[#cb4335] text-white' 
                      : item.disabled 
                        ? 'text-gray-500 cursor-not-allowed' 
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge 
                      variant="secondary" 
                      className="bg-gray-700 text-gray-300 text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#cb4335] rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {session.user?.name || 'Usuario'}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {session.user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-[#17202a] border-b border-gray-800 sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-white">
                Dashboard
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => router.push('/studio/new/phase/1')}
                className="bg-[#cb4335] hover:bg-[#cb4335]/90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Guión
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              ¡Hola, {session.user?.name?.split(' ')[0] || 'Escritor'}! 👋
            </h2>
            <p className="text-gray-400 text-lg">
              Aquí tienes un resumen de tu actividad en GUIONIX
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  Total de Proyectos
                </CardTitle>
                <FolderOpen className="h-4 w-4 text-[#cb4335]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.totalProjects}</div>
                <p className="text-xs text-gray-500">
                  {stats.activeProjects} activos
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  Proyectos Completados
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.completedProjects}</div>
                <p className="text-xs text-gray-500">
                  +2 este mes
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  Progreso Semanal
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.weeklyProgress}%</div>
                <p className="text-xs text-gray-500">
                  vs. semana anterior
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  Total de Páginas
                </CardTitle>
                <FileText className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.totalPages}</div>
                <p className="text-xs text-gray-500">
                  Escritas hasta ahora
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  Ideas IA Generadas
                </CardTitle>
                <Lightbulb className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.aiIdeasGenerated}</div>
                <p className="text-xs text-gray-500">
                  En los últimos 30 días
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  En Progreso
                </CardTitle>
                <Activity className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.activeProjects}</div>
                <p className="text-xs text-gray-500">
                  Proyectos activos
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Projects */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Proyectos Recientes</h3>
              <Button 
                variant="outline" 
                onClick={() => router.push('/projects')}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Ver todos
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="bg-gray-900 border-gray-800 hover:border-[#cb4335]/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">
                        {project.title}
                      </CardTitle>
                      <Badge 
                        variant="secondary"
                        className={`
                          ${project.status === 'completed' && 'bg-green-500/20 text-green-400'}
                          ${project.status === 'in-progress' && 'bg-blue-500/20 text-blue-400'}
                          ${project.status === 'review' && 'bg-yellow-500/20 text-yellow-400'}
                          ${project.status === 'draft' && 'bg-gray-500/20 text-gray-400'}
                        `}
                      >
                        {project.status === 'completed' && 'Completado'}
                        {project.status === 'in-progress' && 'En Progreso'}
                        {project.status === 'review' && 'En Revisión'}
                        {project.status === 'draft' && 'Borrador'}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-400">
                      {project.genre} • {project.pages} páginas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Progreso</span>
                        <span className="text-white font-semibold">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="bg-[#cb4335] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      
                      <p className="text-sm text-gray-500">
                        Actualizado {project.lastModified}
                      </p>
                      
                      <div className="flex space-x-2 pt-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-[#cb4335] hover:bg-[#cb4335]/90 text-white"
                          onClick={() => router.push(`/studio/${project.id}`)}
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-gray-700 text-gray-300 hover:bg-gray-800"
                          onClick={() => router.push(`/studio/${project.id}/preview`)}
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* AI Ideas Suggestion */}
          <Card className="bg-gradient-to-r from-[#cb4335]/10 to-purple-500/10 border-[#cb4335]/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-[#cb4335]" />
                  Sugerencias de IA
                </CardTitle>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-gray-400 hover:text-white"
                >
                  Ver más
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                  <h4 className="font-semibold text-white mb-2">Thriller Psicológico</h4>
                  <p className="text-sm text-gray-400 mb-3">
                    Un detective investiga crímenes que parecen copiar sus propios sueños...
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-[#cb4335]/20 text-[#cb4335] border-[#cb4335]/30">
                      Trending
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-[#cb4335] hover:text-[#cb4335]/80"
                    >
                      Usar idea
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                  <h4 className="font-semibold text-white mb-2">Sci-Fi Drama</h4>
                  <p className="text-sm text-gray-400 mb-3">
                    Una familia descubre que su hogar inteligente desarrolló conciencia...
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      Nuevo
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-[#cb4335] hover:text-[#cb4335]/80"
                    >
                      Usar idea
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
