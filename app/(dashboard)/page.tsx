// app/(dashboard)/page.tsx
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  Film, 
  Plus, 
  TrendingUp, 
  Users, 
  Clock, 
  FileText,
  Award,
  Activity,
  Calendar,
  Star,
  Download,
  Edit3,
  Play,
  Settings,
  Bell,
  Search,
  Sparkles,
  Zap,
  Target,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Project {
  id: string;
  title: string;
  status: 'draft' | 'in-progress' | 'review' | 'completed';
  progress: number;
  collaborators: number;
  lastModified: string;
  beats: number;
  wordCount: number;
  genre: string;
}

interface DashboardStats {
  totalProjects: number;
  activeCollaborators: number;
  scriptsInProgress: number;
  hoursThisWeek: number;
  completionRate: number;
  activeDeadlines: number;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const stats: DashboardStats = {
    totalProjects: 24,
    activeCollaborators: 8,
    scriptsInProgress: 12,
    hoursThisWeek: 32,
    completionRate: 85,
    activeDeadlines: 3
  };

  const projects: Project[] = [
    {
      id: "1",
      title: "Ecos del Algoritmo",
      status: 'in-progress',
      progress: 67,
      collaborators: 3,
      lastModified: "Hace 2 horas",
      beats: 24,
      wordCount: 28500,
      genre: "Thriller Tech"
    },
    {
      id: "2", 
      title: "La Última Transmisión",
      status: 'review',
      progress: 95,
      collaborators: 2,
      lastModified: "Hace 1 día",
      beats: 30,
      wordCount: 35200,
      genre: "Sci-Fi Drama"
    },
    {
      id: "3",
      title: "Memorias Sintéticas",
      status: 'draft',
      progress: 25,
      collaborators: 1,
      lastModified: "Hace 3 días",
      beats: 8,
      wordCount: 12400,
      genre: "Cyberpunk"
    }
  ];

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin');
    }
  }, [session, router]);

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900">
      {/* Header mejorado */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/50 border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg">
                <Film className="w-8 h-8 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  GUIONIX
                </h1>
                <p className="text-sm text-gray-400 flex items-center">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI-Powered Screenwriting
                </p>
              </div>
            </div>
            
            {/* Search bar modernizado */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Buscar proyectos, colaboradores..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 bg-slate-800/50 border-white/20 text-white placeholder:text-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20 rounded-xl"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button size="sm" variant="ghost" className="relative text-gray-400 hover:text-white">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                <Settings className="w-5 h-5" />
              </Button>
              <Avatar className="h-10 w-10 ring-2 ring-yellow-400/50">
                <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold">
                  {session.user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section mejorado */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-3">
            Bienvenido de nuevo, {session.user?.name?.split(' ')[0] || 'Guionista'}
          </h2>
          <p className="text-xl text-gray-400 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-400" />
            Continúa creando historias extraordinarias con el poder de la IA
          </p>
        </div>

        {/* Stats Grid modernizado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Proyectos</p>
                  <p className="text-3xl font-bold text-white">{stats.totalProjects}</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <FileText className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Colaboradores</p>
                  <p className="text-3xl font-bold text-white">{stats.activeCollaborators}</p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">En Progreso</p>
                  <p className="text-3xl font-bold text-white">{stats.scriptsInProgress}</p>
                </div>
                <div className="p-3 bg-orange-500/20 rounded-xl">
                  <Edit3 className="w-6 h-6 text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Horas/Semana</p>
                  <p className="text-3xl font-bold text-white">{stats.hoursThisWeek}</p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Clock className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Completados</p>
                  <p className="text-3xl font-bold text-white">{stats.completionRate}%</p>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Deadlines</p>
                  <p className="text-3xl font-bold text-white">{stats.activeDeadlines}</p>
                </div>
                <div className="p-3 bg-red-500/20 rounded-xl">
                  <Calendar className="w-6 h-6 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions mejorado */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Target className="w-6 h-6 mr-3 text-yellow-400" />
            Acciones Rápidas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Button 
              className="h-24 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-lg shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105"
              onClick={() => router.push('/studio/new')}
            >
              <div className="flex flex-col items-center">
                <Plus className="w-8 h-8 mb-2" />
                <span>Nuevo Guión</span>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 border-white/20 text-white hover:bg-slate-800/50 backdrop-blur-xl font-semibold text-lg"
              onClick={() => router.push('/projects')}
            >
              <div className="flex flex-col items-center">
                <FileText className="w-8 h-8 mb-2" />
                <span>Ver Proyectos</span>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 border-white/20 text-white hover:bg-slate-800/50 backdrop-blur-xl font-semibold text-lg"
              onClick={() => router.push('/studio')}
            >
              <div className="flex flex-col items-center">
                <Edit3 className="w-8 h-8 mb-2" />
                <span>Editor Studio</span>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 border-white/20 text-white hover:bg-slate-800/50 backdrop-blur-xl font-semibold text-lg"
              onClick={() => router.push('/integration-dashboard')}
            >
              <div className="flex flex-col items-center">
                <Activity className="w-8 h-8 mb-2" />
                <span>Sistema Status</span>
              </div>
            </Button>
          </div>
        </div>

        {/* Recent Projects mejorado */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <BarChart3 className="w-6 h-6 mr-3 text-yellow-400" />
              Proyectos Recientes
            </h3>
            <Button variant="outline" size="sm" className="border-white/20 text-gray-300 hover:bg-slate-800/50">
              Ver Todos
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="bg-slate-900/50 border border-white/10 backdrop-blur-xl hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105 group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg group-hover:text-yellow-400 transition-colors">{project.title}</CardTitle>
                    <Badge 
                      className={`
                        ${project.status === 'completed' ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}
                        ${project.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : ''}
                        ${project.status === 'review' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : ''}
                        ${project.status === 'draft' ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : ''}
                        backdrop-blur-sm border
                      `}
                    >
                      {project.status === 'completed' && 'Completado'}
                      {project.status === 'in-progress' && 'En Progreso'}
                      {project.status === 'review' && 'En Revisión'}
                      {project.status === 'draft' && 'Borrador'}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-400">
                    {project.genre} • {project.lastModified}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Progreso</span>
                      <span className="text-white font-semibold">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {project.collaborators}
                      </span>
                      <span>{project.beats} beats</span>
                      <span>{project.wordCount.toLocaleString()} palabras</span>
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold"
                        onClick={() => router.push(`/studio/${project.id}`)}
                      >
                        <Edit3 className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-white/20 text-gray-300 hover:bg-slate-800/50"
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
      </div>
    </div>
  );
}