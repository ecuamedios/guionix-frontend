"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
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
  Edit,
  Eye,
  Sun,
  Moon,
  Menu,
  X,
  Home,
  PenTool,
  Briefcase,
  UserCheck,
  Building,
  Cog,
  LogOut,
  Search,
  Bell,
  Zap,
  Target,
  BookOpen,
  Palette,
  Monitor,
  Star,
  Clock3,
  Layers,
  Brain
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

interface MenuItem {
  name: string;
  icon: React.ComponentType<any>;
  href?: string;
  comingSoon?: boolean;
  active?: boolean;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data con datos más realistas
  const [stats] = useState<DashboardStats>({
    totalProjects: 24,
    activeProjects: 8,
    completedProjects: 16,
    totalPages: 1847,
    weeklyProgress: 67,
    aiIdeasGenerated: 156
  });

  const [projects] = useState<Project[]>([
    {
      id: "1",
      title: "El Último Verano",
      status: "in-progress",
      progress: 75,
      lastModified: "Hace 2 horas",
      genre: "Drama",
      pages: 89
    },
    {
      id: "2", 
      title: "Noches de Medianoche",
      status: "review",
      progress: 100,
      lastModified: "Hace 1 día",
      genre: "Thriller",
      pages: 112
    },
    {
      id: "3",
      title: "Corazón Rebelde",
      status: "draft",
      progress: 45,
      lastModified: "Hace 3 días",
      genre: "Romance",
      pages: 67
    }
  ]);

  const [aiSuggestions] = useState([
    { id: 1, title: "Desarrollar conflicto interno del protagonista", type: "trending", category: "Desarrollo de personajes" },
    { id: 2, title: "Añadir subplot romántico en segundo acto", type: "new", category: "Estructura narrativa" },
    { id: 3, title: "Mejorar diálogos en escenas de confrontación", type: "trending", category: "Diálogos" },
    { id: 4, title: "Explorar backstory del antagonista", type: "new", category: "Desarrollo de personajes" }
  ]);

  const menuItems: MenuItem[] = [
    {
      name: "Dashboard",
      icon: Home,
      href: "/",
      active: true
    },
    {
      name: "Crear nuevo guión",
      icon: PenTool,
      href: "/studio/new/phase/1"
    },
    {
      name: "Proyectos",
      icon: Briefcase,
      href: "/projects"
    },
    {
      name: "Actores",
      icon: UserCheck,
      comingSoon: true
    },
    {
      name: "Locaciones",
      icon: Building,
      comingSoon: true
    },
    {
      name: "Configuración",
      icon: Cog,
      comingSoon: true
    }
  ];

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session, router]);

  if (!session) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#17202a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cb4335] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#17202a] flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-white dark:bg-[#1a252f] border-r border-gray-200 dark:border-gray-700 
        flex flex-col shadow-xl lg:shadow-none
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#cb4335] to-[#a93226] rounded-xl flex items-center justify-center shadow-lg">
                <Film className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">GUIONIX</h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                if (!item.comingSoon && item.href) {
                  router.push(item.href);
                  setSidebarOpen(false);
                }
              }}
              className={`
                w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group
                ${item.active 
                  ? 'bg-gradient-to-r from-[#cb4335] to-[#a93226] text-white shadow-lg' 
                  : item.comingSoon 
                    ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                }
              `}
              disabled={item.comingSoon}
            >
              <item.icon className={`w-5 h-5 ${item.active ? 'text-white' : ''}`} />
              <span className="font-medium">{item.name}</span>
              {item.comingSoon && (
                <Badge className="bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs px-2 py-0.5 ml-auto">
                  Próximamente
                </Badge>
              )}
            </button>
          ))}
        </nav>

        {/* Theme Toggle & User info */}
        <div className="p-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center space-x-3 p-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-5 h-5" />
                <span className="font-medium">Modo Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-5 h-5" />
                <span className="font-medium">Modo Oscuro</span>
              </>
            )}
          </button>

          {/* User info */}
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-100 dark:bg-gray-700">
            <div className="w-8 h-8 bg-gradient-to-br from-[#cb4335] to-[#a93226] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {session.user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {session.user?.name || 'Usuario'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {session.user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-[#1a252f] border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Panel Principal</h1>
                <p className="text-gray-600 dark:text-gray-400">Bienvenido de nuevo, {session.user?.name?.split(' ')[0] || 'Guionista'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline"
                size="sm"
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
              >
                <Bell className="w-4 h-4" />
              </Button>
              <Button 
                onClick={() => router.push('/studio/new/phase/1')}
                className="bg-gradient-to-r from-[#cb4335] to-[#a93226] hover:from-[#a93226] hover:to-[#922b21] text-white font-semibold px-6 shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Proyecto
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50 dark:bg-[#17202a]">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white dark:bg-[#1a252f] border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-gray-900 dark:text-white text-lg flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-[#cb4335]" />
                  Proyectos Totales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.totalProjects}</div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{stats.activeProjects} activos</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                  <div 
                    className="bg-gradient-to-r from-[#cb4335] to-[#a93226] h-2 rounded-full"
                    style={{ width: `${(stats.activeProjects / stats.totalProjects) * 100}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-[#1a252f] border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-gray-900 dark:text-white text-lg flex items-center">
                  <Award className="w-5 h-5 mr-2 text-[#cb4335]" />
                  Proyectos Completados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.completedProjects}</div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">de {stats.totalProjects} totales</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                    style={{ width: `${(stats.completedProjects / stats.totalProjects) * 100}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-[#1a252f] border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-gray-900 dark:text-white text-lg flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-[#cb4335]" />
                  Progreso Semanal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.weeklyProgress}</div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">páginas esta semana</p>
                <div className="flex items-center mt-2 text-sm text-green-600 dark:text-green-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +23% vs semana anterior
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-[#1a252f] border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-gray-900 dark:text-white text-lg flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-[#cb4335]" />
                  Total de Páginas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.totalPages}</div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">páginas escritas</p>
                <div className="flex items-center mt-2 text-sm text-blue-600 dark:text-blue-400">
                  <Layers className="w-4 h-4 mr-1" />
                  ~15.4 guiones promedio
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-[#1a252f] border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-gray-900 dark:text-white text-lg flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-[#cb4335]" />
                  Ideas Generadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.aiIdeasGenerated}</div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">ideas por IA</p>
                <div className="flex items-center mt-2 text-sm text-purple-600 dark:text-purple-400">
                  <Zap className="w-4 h-4 mr-1" />
                  42 ideas esta semana
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-[#1a252f] border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-gray-900 dark:text-white text-lg flex items-center">
                  <Clock3 className="w-5 h-5 mr-2 text-[#cb4335]" />
                  En Progreso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.activeProjects}</div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">proyectos activos</p>
                <div className="flex items-center mt-2 text-sm text-orange-600 dark:text-orange-400">
                  <Activity className="w-4 h-4 mr-1" />
                  Próxima entrega en 3 días
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Projects */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-[#cb4335]" />
                Proyectos Recientes
              </h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <Card key={project.id} className="bg-white dark:bg-[#1a252f] border-gray-200 dark:border-gray-700 hover:border-[#cb4335] transition-all duration-200 hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{project.title}</h3>
                        <Badge 
                          className={`
                            ${project.status === 'completed' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700' : ''}
                            ${project.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-700' : ''}
                            ${project.status === 'review' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700' : ''}
                            ${project.status === 'draft' ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600' : ''}
                          `}
                        >
                          {project.status === 'completed' && 'Completado'}
                          {project.status === 'in-progress' && 'En Progreso'}
                          {project.status === 'review' && 'En Revisión'}
                          {project.status === 'draft' && 'Borrador'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <span className="flex items-center">
                          <Palette className="w-4 h-4 mr-1" />
                          {project.genre}
                        </span>
                        <span className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          {project.pages} páginas
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {project.lastModified}
                        </span>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progreso</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-[#cb4335] to-[#a93226] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-gradient-to-r from-[#cb4335] to-[#a93226] hover:from-[#a93226] hover:to-[#922b21] text-white"
                          onClick={() => router.push(`/studio/${project.id}`)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* AI Suggestions */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-[#cb4335]" />
                Sugerencias de IA
              </h2>
              <div className="space-y-4">
                {aiSuggestions.map((suggestion) => (
                  <Card key={suggestion.id} className="bg-white dark:bg-[#1a252f] border-gray-200 dark:border-gray-700 hover:border-[#cb4335] transition-all duration-200 cursor-pointer group hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#cb4335] transition-colors">
                          {suggestion.title}
                        </h3>
                        {suggestion.type === 'trending' && (
                          <Badge className="bg-gradient-to-r from-[#cb4335] to-[#a93226] text-white border-0">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                        {suggestion.type === 'new' && (
                          <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700">
                            <Star className="w-3 h-3 mr-1" />
                            Nuevo
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">
                          {suggestion.category}
                        </Badge>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-[#cb4335] hover:text-white hover:bg-[#cb4335] transition-colors"
                          onClick={() => router.push('/studio/new/phase/1')}
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Aplicar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
