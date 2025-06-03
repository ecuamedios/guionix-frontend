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
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Project {
  id: string;
  title: string;
  genre: string;
  progress: number;
  lastModified: Date;
  status: 'draft' | 'in-progress' | 'completed';
  collaborators: number;
  beats: number;
  wordCount: number;
}

interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalWords: number;
  aiGenerations: number;
  collaborations: number;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 12,
    activeProjects: 8,
    completedProjects: 4,
    totalWords: 45280,
    aiGenerations: 156,
    collaborations: 23
  });

  // Mock projects data
  useEffect(() => {
    setProjects([
      {
        id: '1',
        title: 'El Último Algoritmo',
        genre: 'Sci-Fi Thriller',
        progress: 75,
        lastModified: new Date(),
        status: 'in-progress',
        collaborators: 3,
        beats: 12,
        wordCount: 8950
      },
      {
        id: '2',
        title: 'Sombras del Pasado',
        genre: 'Drama Psicológico',
        progress: 45,
        lastModified: new Date(Date.now() - 86400000),
        status: 'in-progress',
        collaborators: 2,
        beats: 8,
        wordCount: 5420
      },
      {
        id: '3',
        title: 'Código Rojo',
        genre: 'Acción',
        progress: 100,
        lastModified: new Date(Date.now() - 172800000),
        status: 'completed',
        collaborators: 1,
        beats: 15,
        wordCount: 12500
      },
      {
        id: '4',
        title: 'La Casa del Lago',
        genre: 'Terror',
        progress: 20,
        lastModified: new Date(Date.now() - 259200000),
        status: 'draft',
        collaborators: 4,
        beats: 3,
        wordCount: 1200
      }
    ]);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
        <div className="flex flex-col items-center space-y-4">
          <Film className="w-12 h-12 text-yellow-400 animate-pulse" />
          <p className="text-white text-lg">Cargando GUIONIX...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'in-progress': return 'En Progreso';
      case 'draft': return 'Borrador';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Film className="w-8 h-8 text-yellow-400" />
              <h1 className="text-2xl font-bold text-white">GUIONIX</h1>
              <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                Professional
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Buscar proyectos..." 
                  className="pl-10 w-64 bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                <Bell className="w-5 h-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                <Settings className="w-5 h-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-yellow-500 text-black">
                  {session.user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Bienvenido de nuevo, {session.user?.name || 'Guionista'}
          </h2>
          <p className="text-gray-400 text-lg">
            Continúa creando historias extraordinarias con el poder de la IA
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Proyectos</CardTitle>
              <FileText className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalProjects}</div>
              <p className="text-xs text-gray-400">+2 este mes</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">En Progreso</CardTitle>
              <Activity className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.activeProjects}</div>
              <p className="text-xs text-gray-400">+1 esta semana</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Completados</CardTitle>
              <Award className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.completedProjects}</div>
              <p className="text-xs text-gray-400">+1 este mes</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Palabras Totales</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalWords.toLocaleString()}</div>
              <p className="text-xs text-gray-400">+1.2k esta semana</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">IA Generaciones</CardTitle>
              <Star className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.aiGenerations}</div>
              <p className="text-xs text-gray-400">+12 hoy</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Colaboradores</CardTitle>
              <Users className="h-4 w-4 text-indigo-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.collaborations}</div>
              <p className="text-xs text-gray-400">+3 este mes</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              className="h-20 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              onClick={() => router.push('/studio/new')}
            >
              <Plus className="w-6 h-6 mr-2" />
              Nuevo Guión
            </Button>
            <Button 
              variant="outline" 
              className="h-20 border-gray-600 text-white hover:bg-gray-800"
              onClick={() => router.push('/projects')}
            >
              <FileText className="w-6 h-6 mr-2" />
              Ver Proyectos
            </Button>
            <Button 
              variant="outline" 
              className="h-20 border-gray-600 text-white hover:bg-gray-800"
              onClick={() => router.push('/studio')}
            >
              <Edit3 className="w-6 h-6 mr-2" />
              Editor Studio
            </Button>
            <Button 
              variant="outline" 
              className="h-20 border-gray-600 text-white hover:bg-gray-800"
              onClick={() => router.push('/integration-dashboard')}
            >
              <Activity className="w-6 h-6 mr-2" />
              Sistema Status
            </Button>
          </div>
        </div>

        {/* Recent Projects */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Proyectos Recientes</h3>
            <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
              Ver Todos
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="bg-gray-800 border-gray-700 hover:border-yellow-400 transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">{project.title}</CardTitle>
                    <Badge className={`${getStatusColor(project.status)} text-white`}>
                      {getStatusText(project.status)}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-400">{project.genre}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Progreso</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-400">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {new Date(project.lastModified).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {project.collaborators}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{project.beats} beats</span>
                      <span>{project.wordCount.toLocaleString()} palabras</span>
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black"
                        onClick={() => router.push(`/studio/${project.id}`)}
                      >
                        <Edit3 className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-gray-600 text-gray-300"
                        onClick={() => router.push(`/studio/${project.id}/preview`)}
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-gray-600 text-gray-300"
                      >
                        <Download className="w-4 h-4" />
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