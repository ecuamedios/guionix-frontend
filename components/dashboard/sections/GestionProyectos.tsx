"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FolderOpen, Filter, Calendar, Users, Download, Plus, Search,
  Star, Clock, Target, BarChart3, FileText, Video, Smartphone,
  CheckCircle, AlertCircle, Play, Pause, Archive, Award,
  TrendingUp, Eye, Edit, Settings, Copy, Upload
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DashboardMetrics, Project } from "../GuionixUnifiedDashboard";

interface GestionProyectosProps {
  searchQuery: string;
  metrics: DashboardMetrics;
  onNavigate: (tab: string) => void;
}

const GestionProyectos = ({ searchQuery, metrics, onNavigate }: GestionProyectosProps) => {
  const router = useRouter();
  const [activeProjectTab, setActiveProjectTab] = useState('lista');
  const [statusFilter, setStatusFilter] = useState('all');
  const [genreFilter, setGenreFilter] = useState('all');

  // Mock data - proyectos de ejemplo
  const mockProjects: Project[] = [
    {
      id: "1",
      title: "La Venganza del Patrón",
      status: "development",
      category: "dramabox",
      progress: 75,
      phase: 3,
      lastModified: "2024-01-15",
      genre: "Drama/Romance",
      pages: 82,
      duration: 83,
      qualityScore: 87,
      culturalAuth: 92,
      team: [],
      collaboration: { activeUsers: 3, pendingApprovals: 1 },
      deadline: "2024-02-01",
      priority: "high",
      template: "DramaBox Latino",
      aiCost: 45.30
    },
    {
      id: "2", 
      title: "Corazones Divididos",
      status: "review",
      category: "feature",
      progress: 100,
      phase: 4,
      lastModified: "2024-01-14",
      genre: "Romance",
      pages: 110,
      duration: 110,
      qualityScore: 94,
      culturalAuth: 89,
      team: [],
      collaboration: { activeUsers: 2, pendingApprovals: 2 },
      deadline: "2024-01-20",
      priority: "urgent",
      template: "Largometraje Clásico",
      aiCost: 67.80
    },
    {
      id: "3",
      title: "Secretos de Familia",
      status: "production",
      category: "webseries", 
      progress: 100,
      phase: 4,
      lastModified: "2024-01-12",
      genre: "Drama",
      pages: 45,
      duration: 45,
      qualityScore: 91,
      culturalAuth: 95,
      team: [],
      collaboration: { activeUsers: 1, pendingApprovals: 0 },
      deadline: "2024-01-15",
      priority: "medium",
      template: "Serie Web Episódica",
      aiCost: 23.50
    },
    {
      id: "4",
      title: "Amor en Tiempos Modernos",
      status: "development",
      category: "shorts",
      progress: 45,
      phase: 2,
      lastModified: "2024-01-13",
      genre: "Romance/Comedia",
      pages: 15,
      duration: 15,
      qualityScore: 82,
      culturalAuth: 88,
      team: [],
      collaboration: { activeUsers: 2, pendingApprovals: 0 },
      deadline: "2024-01-25",
      priority: "low",
      template: "Cortometraje Condensado",
      aiCost: 12.40
    }
  ];

  const templates = [
    {
      id: "dramabox",
      name: "DramaBox (10 capas móvil)",
      description: "Optimizado para plataforma móvil con 110 minutos exactos",
      icon: Smartphone,
      color: "from-pink-500 to-red-600",
      specs: {
        duration: "110 min",
        layers: "10 capas",
        platform: "Mobile",
        optimization: "DramaBox"
      },
      features: [
        "Hook cada 11 minutos",
        "Mobile viewing optimized",
        "Subtitle ready",
        "Binge-ability scoring"
      ]
    },
    {
      id: "feature",
      name: "Largometraje (Blake Snyder clásico)",
      description: "Estructura tradicional de 3 actos con 15 beats principales",
      icon: Video,
      color: "from-blue-500 to-purple-600",
      specs: {
        duration: "90-120 min", 
        structure: "3 actos",
        beats: "15 principales",
        format: "Theatrical"
      },
      features: [
        "Blake Snyder beats",
        "3-act structure",
        "Character arcs",
        "Festival ready"
      ]
    },
    {
      id: "webseries",
      name: "Serie Web (episódica)",
      description: "Formato episódico con arcos narrativos conectados",
      icon: FileText,
      color: "from-green-500 to-teal-600",
      specs: {
        duration: "20-60 min/ep",
        episodes: "6-12",
        format: "Streaming",
        hooks: "Cliffhangers"
      },
      features: [
        "Episode structure",
        "Season arcs",
        "Cliffhanger mastery",
        "Streaming optimized"
      ]
    },
    {
      id: "shorts",
      name: "Cortometraje (estructura condensada)",
      description: "Narrativa compacta con máximo impacto emocional",
      icon: Clock,
      color: "from-yellow-500 to-orange-600",
      specs: {
        duration: "5-30 min",
        acts: "1-2 actos",
        focus: "Single concept",
        impact: "Maximum"
      },
      features: [
        "Compressed narrative",
        "Single concept focus",
        "Maximum emotional impact",
        "Festival circuit ready"
      ]
    }
  ];

  const statusColors = {
    development: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" },
    review: { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30" },
    production: { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30" },
    archived: { bg: "bg-gray-500/20", text: "text-gray-400", border: "border-gray-500/30" }
  };

  const priorityColors = {
    low: "text-green-400",
    medium: "text-yellow-400", 
    high: "text-orange-400",
    urgent: "text-red-400"
  };

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.genre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesGenre = genreFilter === 'all' || project.genre.toLowerCase().includes(genreFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesGenre;
  });

  const projectStats = {
    development: mockProjects.filter(p => p.status === 'development').length,
    review: mockProjects.filter(p => p.status === 'review').length,
    production: mockProjects.filter(p => p.status === 'production').length,
    archived: mockProjects.filter(p => p.status === 'archived').length
  };

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm font-medium">En Desarrollo</p>
                <p className="text-2xl font-bold text-white">{projectStats.development}</p>
              </div>
              <Play className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-yellow-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-400 text-sm font-medium">En Revisión</p>
                <p className="text-2xl font-bold text-white">{projectStats.review}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium">Producción</p>
                <p className="text-2xl font-bold text-white">{projectStats.production}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-gray-500/20 to-gray-600/20 border-gray-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Archivados</p>
                <p className="text-2xl font-bold text-white">{projectStats.archived}</p>
              </div>
              <Archive className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y búsqueda */}
      <Card className="bg-slate-900/50 border-gray-700">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar proyectos, géneros, colaboradores..."
                  className="pl-10 bg-slate-800 border-gray-600 focus:border-red-500"
                  value={searchQuery}
                  readOnly
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-slate-800 border-gray-600">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="development">En Desarrollo</SelectItem>
                <SelectItem value="review">En Revisión</SelectItem>
                <SelectItem value="production">Producción</SelectItem>
                <SelectItem value="archived">Archivados</SelectItem>
              </SelectContent>
            </Select>
            <Select value={genreFilter} onValueChange={setGenreFilter}>
              <SelectTrigger className="w-48 bg-slate-800 border-gray-600">
                <SelectValue placeholder="Género" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los géneros</SelectItem>
                <SelectItem value="drama">Drama</SelectItem>
                <SelectItem value="romance">Romance</SelectItem>
                <SelectItem value="comedia">Comedia</SelectItem>
                <SelectItem value="accion">Acción</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Proyecto
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs del sistema */}
      <Tabs value={activeProjectTab} onValueChange={setActiveProjectTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 p-1">
          <TabsTrigger value="lista" className="data-[state=active]:bg-red-500">
            Lista Proyectos
          </TabsTrigger>
          <TabsTrigger value="progreso" className="data-[state=active]:bg-red-500">
            Vista Progreso
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-red-500">
            Templates
          </TabsTrigger>
          <TabsTrigger value="exportacion" className="data-[state=active]:bg-red-500">
            Exportación
          </TabsTrigger>
        </TabsList>

        {/* Lista Completa de Proyectos */}
        <TabsContent value="lista" className="space-y-4">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="bg-slate-900/50 border-gray-700 hover:border-gray-600 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                      <Badge className={`${statusColors[project.status].bg} ${statusColors[project.status].text} border ${statusColors[project.status].border}`}>
                        {project.status === 'development' ? 'Desarrollo' :
                         project.status === 'review' ? 'Revisión' :
                         project.status === 'production' ? 'Producción' : 'Archivado'}
                      </Badge>
                      <Badge variant="outline" className={priorityColors[project.priority]}>
                        {project.priority === 'low' ? 'Baja' :
                         project.priority === 'medium' ? 'Media' :
                         project.priority === 'high' ? 'Alta' : 'Urgente'}
                      </Badge>
                    </div>
                    <p className="text-gray-300 mb-2">{project.genre} • {project.category}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <span>Fase {project.phase}/4</span>
                      <span>{project.pages} páginas</span>
                      <span>{project.duration} min</span>
                      <span>Score: {project.qualityScore}/100</span>
                      <span>Cultural: {project.culturalAuth}/100</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="border-blue-500/50 hover:bg-blue-500/20">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-green-500/50 hover:bg-green-500/20">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-purple-500/50 hover:bg-purple-500/20">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-300">Progreso general</span>
                      <span className="text-sm text-white">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Colaboradores activos:</span>
                      <span className="text-white">{project.collaboration.activeUsers}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Deadline:</span>
                      <span className="text-white">{new Date(project.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Costo IA:</span>
                      <span className="text-green-400">${project.aiCost}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Vista de Progreso */}
        <TabsContent value="progreso" className="space-y-6">
          <Card className="bg-slate-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Vista de Progreso por Fases</CardTitle>
              <CardDescription className="text-gray-300">
                Distribución de proyectos en el proceso de 4 fases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { phase: 1, title: "Ideas", count: 3, color: "from-yellow-500 to-orange-600" },
                  { phase: 2, title: "Estructura", count: 4, color: "from-green-500 to-teal-600" },
                  { phase: 3, title: "Escritura", count: 3, color: "from-purple-500 to-pink-600" },
                  { phase: 4, title: "Control", count: 2, color: "from-red-500 to-pink-600" }
                ].map((phase) => (
                  <div key={phase.phase} className="text-center">
                    <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${phase.color} flex items-center justify-center mb-3`}>
                      <span className="text-2xl font-bold text-white">{phase.count}</span>
                    </div>
                    <h3 className="font-semibold text-white">Fase {phase.phase}</h3>
                    <p className="text-sm text-gray-300">{phase.title}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates de Inicio Rápido */}
        <TabsContent value="templates" className="space-y-6">
          <Card className="bg-slate-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Templates de Inicio Rápido</CardTitle>
              <CardDescription className="text-gray-300">
                Plantillas optimizadas para diferentes tipos de producción
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates.map((template) => (
                  <Card key={template.id} className="bg-slate-800 border-gray-600 hover:border-gray-500 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${template.color} flex items-center justify-center`}>
                          <template.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{template.name}</h3>
                          <p className="text-sm text-gray-300">{template.description}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                        {Object.entries(template.specs).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-400 capitalize">{key}:</span>
                            <span className="text-white">{value}</span>
                          </div>
                        ))}
                      </div>
                      
                      <ul className="space-y-1 mb-4">
                        {template.features.map((feature, idx) => (
                          <li key={idx} className="text-xs text-gray-300 flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className={`w-full bg-gradient-to-r ${template.color} hover:opacity-90`}
                        onClick={() => router.push(`/studio?template=${template.id}`)}
                      >
                        Usar Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Exportación Masiva */}
        <TabsContent value="exportacion" className="space-y-6">
          <Card className="bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border-indigo-500/30">
            <CardHeader>
              <CardTitle className="text-indigo-400">Exportación Masiva</CardTitle>
              <CardDescription className="text-indigo-300">
                Exporta múltiples proyectos en diferentes formatos profesionales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-white mb-3">Formatos Disponibles</h3>
                  <div className="space-y-2">
                    {[
                      "PDF Profesional",
                      "Final Draft (.fdx)", 
                      "Fountain (.fountain)",
                      "Word Document (.docx)",
                      "Celtx Export",
                      "Yamdu Ready"
                    ].map((format, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-slate-800 rounded">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-white text-sm">{format}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-3">Opciones de Exportación</h3>
                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar Seleccionados
                    </Button>
                    <Button variant="outline" className="w-full border-indigo-500/50 hover:bg-indigo-500/20">
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicar Proyectos
                    </Button>
                    <Button variant="outline" className="w-full border-green-500/50 hover:bg-green-500/20">
                      <Upload className="w-4 h-4 mr-2" />
                      Importar Batch
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GestionProyectos; 