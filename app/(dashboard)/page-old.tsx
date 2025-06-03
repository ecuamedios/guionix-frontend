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
  Palette
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

interface IdeaSuggestion {
  id: string;
  title: string;
  genre: string;
  description: string;
  trending: boolean;
}

interface MenuItem {
  name: string;
  icon: React.ComponentType<any>;
  href?: string;
  comingSoon?: boolean;
  subItems?: MenuItem[];
  expanded?: boolean;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({});

  // Mock data
  const stats: DashboardStats = {
    totalProjects: 8,
    activeProjects: 3,
    completedProjects: 5,
    totalPages: 247,
    weeklyProgress: 15,
    aiIdeasGenerated: 24
  };

  const projects: Project[] = [
    {
      id: "1",
      title: "El Secreto de la Hacienda",
      status: 'in-progress',
      progress: 65,
      lastModified: "Hace 2 horas",
      genre: "Drama",
      pages: 45
    },
    {
      id: "2", 
      title: "Corazones en Guerra",
      status: 'review',
      progress: 90,
      lastModified: "Hace 1 día",
      genre: "Romance",
      pages: 78
    },
    {
      id: "3",
      title: "La Venganza del Patrón",
      status: 'draft',
      progress: 25,
      lastModified: "Hace 3 días",
      genre: "Thriller",
      pages: 23
    }
  ];

  const ideaSuggestions: IdeaSuggestion[] = [
    {
      id: "1",
      title: "El Heredero Perdido",
      genre: "Drama Familiar",
      description: "Un joven descubre que es heredero de un imperio tequilero, pero debe luchar contra su familia adoptiva.",
      trending: true
    },
    {
      id: "2",
      title: "Amor en Tiempos de Cartel",
      genre: "Romance/Suspense",
      description: "Una reportera se enamora del hermano del capo que investiga, sin saber su verdadera identidad.",
      trending: false
    },
    {
      id: "3",
      title: "La Reina del Mezcal",
      genre: "Drama Empresarial",
      description: "Una mujer lucha por mantener el negocio familiar mientras enfrenta traiciones y competencia desleal.",
      trending: true
    }
  ];

  const menuItems: MenuItem[] = [
    {
      name: "Crear nuevo guión",
      icon: Plus,
      href: "/studio/new/phase/1"
    },
    {
      name: "Proyectos",
      icon: FolderOpen,
      subItems: [
        { name: "Mis Proyectos", icon: FileText, href: "/projects" },
        { name: "Compartidos", icon: Users, comingSoon: true },
        { name: "Plantillas", icon: Award, comingSoon: true }
      ]
    },
    {
      name: "Actores",
      icon: User,
      comingSoon: true
    },
    {
      name: "Locaciones", 
      icon: MapPin,
      comingSoon: true
    },
    {
      name: "Configuración",
      icon: Settings,
      comingSoon: true
    }
  ];

  const toggleMenu = (menuName: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session, router]);

  if (!session) {
    return (
      <div className="min-h-screen bg-[#17202a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cb4335] mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#17202a] flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#1a252f] border-r border-gray-700 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#cb4335] rounded-lg flex items-center justify-center">
              <Film className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">GUIONIX</h1>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <div key={item.name}>
              {item.subItems ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className="w-full flex items-center justify-between p-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                      {item.comingSoon && (
                        <Badge className="bg-[#cb4335] text-white text-xs px-2 py-0.5">
                          Próximamente
                        </Badge>
                      )}
                    </div>
                    {expandedMenus[item.name] ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  
                  {expandedMenus[item.name] && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.subItems.map((subItem) => (
                        <button
                          key={subItem.name}
                          onClick={() => !subItem.comingSoon && subItem.href && router.push(subItem.href)}
                          className={`w-full flex items-center space-x-3 p-2 text-sm rounded-lg transition-colors ${
                            subItem.comingSoon 
                              ? 'text-gray-500 cursor-not-allowed' 
                              : 'text-gray-400 hover:text-white hover:bg-gray-700'
                          }`}
                          disabled={subItem.comingSoon}
                        >
                          <subItem.icon className="w-4 h-4" />
                          <span>{subItem.name}</span>
                          {subItem.comingSoon && (
                            <Badge className="bg-gray-600 text-gray-300 text-xs px-1.5 py-0.5">
                              Próximamente
                            </Badge>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => !item.comingSoon && item.href && router.push(item.href)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    item.comingSoon 
                      ? 'text-gray-500 cursor-not-allowed' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                  disabled={item.comingSoon}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                  {item.comingSoon && (
                    <Badge className="bg-gray-600 text-gray-300 text-xs px-2 py-0.5 ml-auto">
                      Próximamente
                    </Badge>
                  )}
                </button>
              )}
            </div>
          ))}
        </nav>

        {/* User info */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#cb4335] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {session.user?.name?.charAt(0) || 'U'}
              </span>
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[#1a252f] border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Panel Principal</h1>
              <p className="text-gray-400">Bienvenido de nuevo, {session.user?.name?.split(' ')[0] || 'Guionista'}</p>
            </div>
            <Button 
              onClick={() => router.push('/studio/new/phase/1')}
              className="bg-[#cb4335] hover:bg-[#a93529] text-white font-semibold px-6"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Proyecto
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-[#1a252f] border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-[#cb4335]" />
                  Proyectos Activos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-1">{stats.activeProjects}</div>
                <p className="text-gray-400 text-sm">{stats.totalProjects} producciones en total</p>
                <Button variant="ghost" className="text-[#cb4335] hover:text-white mt-2 p-0 h-auto">
                  Ver todos <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[#1a252f] border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg flex items-center">
                  <Award className="w-5 h-5 mr-2 text-[#cb4335]" />
                  Guiones Completados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-1">{stats.completedProjects}</div>
                <p className="text-gray-400 text-sm">{stats.totalPages} páginas escritas</p>
                <Button variant="ghost" className="text-[#cb4335] hover:text-white mt-2 p-0 h-auto">
                  Ver archivo <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[#1a252f] border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-[#cb4335]" />
                  Progreso Semanal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-1">{stats.weeklyProgress}</div>
                <p className="text-gray-400 text-sm">páginas esta semana</p>
                <Button variant="ghost" className="text-[#cb4335] hover:text-white mt-2 p-0 h-auto">
                  Ver estadísticas <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[#1a252f] border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg flex items-center">
                  <Users className="w-5 h-5 mr-2 text-[#cb4335]" />
                  Elenco Principal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-1">12</div>
                <p className="text-gray-400 text-sm">actores registrados</p>
                <Button variant="ghost" className="text-[#cb4335] hover:text-white mt-2 p-0 h-auto">
                  Ver elenco <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[#1a252f] border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-[#cb4335]" />
                  Locaciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-1">8</div>
                <p className="text-gray-400 text-sm">ubicaciones confirmadas</p>
                <Button variant="ghost" className="text-[#cb4335] hover:text-white mt-2 p-0 h-auto">
                  Administrar <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[#1a252f] border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-[#cb4335]" />
                  Ideas Generadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-1">{stats.aiIdeasGenerated}</div>
                <p className="text-gray-400 text-sm">ideas por IA esta semana</p>
                <Button variant="ghost" className="text-[#cb4335] hover:text-white mt-2 p-0 h-auto">
                  Explorar ideas <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Projects */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-[#cb4335]" />
                Proyectos Recientes
              </h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <Card key={project.id} className="bg-[#1a252f] border-gray-700 hover:border-[#cb4335] transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-white">{project.title}</h3>
                        <Badge 
                          className={`
                            ${project.status === 'completed' ? 'bg-green-900 text-green-300 border-green-700' : ''}
                            ${project.status === 'in-progress' ? 'bg-blue-900 text-blue-300 border-blue-700' : ''}
                            ${project.status === 'review' ? 'bg-yellow-900 text-yellow-300 border-yellow-700' : ''}
                            ${project.status === 'draft' ? 'bg-gray-700 text-gray-300 border-gray-600' : ''}
                          `}
                        >
                          {project.status === 'completed' && 'Completado'}
                          {project.status === 'in-progress' && 'En Progreso'}
                          {project.status === 'review' && 'En Revisión'}
                          {project.status === 'draft' && 'Borrador'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                        <span>{project.genre}</span>
                        <span>{project.pages} páginas</span>
                        <span>{project.lastModified}</span>
                      </div>

                      <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                        <div 
                          className="bg-[#cb4335] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>

                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-[#cb4335] hover:bg-[#a93529] text-white"
                          onClick={() => router.push(`/studio/${project.id}`)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* AI Ideas */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-[#cb4335]" />
                Ideas de IA
              </h2>
              <div className="space-y-4">
                {ideaSuggestions.map((idea) => (
                  <Card key={idea.id} className="bg-[#1a252f] border-gray-700 hover:border-[#cb4335] transition-colors cursor-pointer group">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-white group-hover:text-[#cb4335] transition-colors">
                          {idea.title}
                        </h3>
                        {idea.trending && (
                          <Badge className="bg-[#cb4335] text-white">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-3">{idea.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {idea.genre}
                        </Badge>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-[#cb4335] hover:text-white"
                          onClick={() => router.push('/studio/new/phase/1')}
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Crear guión
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
