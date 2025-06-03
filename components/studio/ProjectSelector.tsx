"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Plus, Search, Film, Clock, Calendar, FileText, Star, MoreVertical, Trash2, Edit } from "lucide-react";

interface Project {
  id: string;
  titulo: string;
  subtitulo?: string;
  genero?: string;
  duracionEstimada?: number;
  status?: 'BORRADOR' | 'REVISION' | 'FINAL' | 'PRODUCCION';
  createdAt: string;
  updatedAt?: string;
  progress?: number;
  lastEditedAt?: string;
  isFavorite?: boolean;
  capas?: any[];
}

interface ProjectSelectorProps {
  onProjectSelect?: (project: Project) => void;
  selectedProject?: Project | null;
  onCreateNew?: () => void;
}

export default function ProjectSelector({ onProjectSelect, selectedProject, onCreateNew }: ProjectSelectorProps) {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "demo-1",
      titulo: "Hollywood Epic",
      subtitulo: "Una historia épica de venganza y redención",
      genero: "Drama/Acción",
      duracionEstimada: 120,
      status: "BORRADOR",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      progress: 65,
      lastEditedAt: "Hace 2 horas",
      isFavorite: true,
      capas: []
    },
    {
      id: "demo-2",
      titulo: "Midnight Runner",
      subtitulo: "Thriller nocturno en las calles de la ciudad",
      genero: "Thriller",
      duracionEstimada: 95,
      status: "REVISION",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      progress: 40,
      lastEditedAt: "Ayer",
      isFavorite: false,
      capas: []
    },
    {
      id: "demo-3",
      titulo: "Love & Algorithms",
      subtitulo: "Comedia romántica en Silicon Valley",
      genero: "Comedia Romántica",
      duracionEstimada: 105,
      status: "BORRADOR",
      createdAt: new Date(Date.now() - 259200000).toISOString(),
      progress: 25,
      lastEditedAt: "Hace 3 días",
      isFavorite: false,
      capas: []
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'BORRADOR' | 'REVISION' | 'FINAL'>('ALL');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.subtitulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.genero?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'ALL' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'BORRADOR':
        return 'bg-blue-900/50 text-blue-400 border-blue-400/20';
      case 'REVISION':
        return 'bg-yellow-900/50 text-yellow-400 border-yellow-400/20';
      case 'FINAL':
        return 'bg-green-900/50 text-green-400 border-green-400/20';
      case 'PRODUCCION':
        return 'bg-purple-900/50 text-purple-400 border-purple-400/20';
      default:
        return 'bg-gray-800 text-gray-400 border-gray-600';
    }
  };

  const toggleFavorite = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, isFavorite: !p.isFavorite } : p
    ));
  };

  const handleCreateNew = () => {
    onCreateNew?.();
  };

  return (
    <Card className="bg-gray-900 border-gray-800 h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-white">
          <Film className="w-5 h-5 text-yellow-400" />
          Proyectos
        </CardTitle>
        <CardDescription className="text-gray-400">
          Selecciona o crea un nuevo proyecto de guión
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Create New Project Button */}
        <Button 
          onClick={handleCreateNew}
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-medium"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Proyecto
        </Button>

        <Separator className="bg-gray-700" />

        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar proyectos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
          </div>

          <div className="flex gap-1">
            {(['ALL', 'BORRADOR', 'REVISION', 'FINAL'] as const).map((status) => (
              <Button
                key={status}
                size="sm"
                variant={filterStatus === status ? "default" : "outline"}
                onClick={() => setFilterStatus(status)}
                className={`text-xs ${
                  filterStatus === status 
                    ? "bg-yellow-600 hover:bg-yellow-700" 
                    : "border-gray-600 text-gray-400 hover:text-white"
                }`}
              >
                {status === 'ALL' ? 'Todos' : status}
              </Button>
            ))}
          </div>
        </div>

        <Separator className="bg-gray-700" />

        {/* Projects List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto"></div>
              <p className="text-gray-400 mt-2">Cargando proyectos...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-400">{error}</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-600 mx-auto mb-2" />
              <p className="text-gray-400">
                {searchTerm ? 'No se encontraron proyectos' : 'No hay proyectos disponibles'}
              </p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-gray-600 ${
                  selectedProject?.id === project.id 
                    ? 'border-yellow-400 bg-yellow-400/10' 
                    : 'border-gray-700 bg-gray-800 hover:bg-gray-750'
                }`}
                onClick={() => onProjectSelect?.(project)}
              >
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white truncate">{project.titulo}</h3>
                        <button
                          onClick={(e) => toggleFavorite(project.id, e)}
                          className="flex-shrink-0"
                        >
                          <Star 
                            className={`w-4 h-4 ${
                              project.isFavorite 
                                ? 'text-yellow-400 fill-yellow-400' 
                                : 'text-gray-400 hover:text-yellow-400'
                            }`} 
                          />
                        </button>
                      </div>
                      {project.subtitulo && (
                        <p className="text-sm text-gray-400 mt-1 truncate">{project.subtitulo}</p>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {project.genero && (
                      <Badge className="bg-gray-700 text-gray-300 text-xs">
                        {project.genero}
                      </Badge>
                    )}
                    {project.status && (
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    )}
                    {project.duracionEstimada && (
                      <Badge className="bg-gray-800 text-gray-400 text-xs">
                        {project.duracionEstimada}min
                      </Badge>
                    )}
                  </div>

                  {/* Progress */}
                  {project.progress !== undefined && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>Progreso</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div 
                          className="bg-yellow-400 h-1.5 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                    </div>
                    {project.lastEditedAt && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{project.lastEditedAt}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Stats */}
        {filteredProjects.length > 0 && (
          <>
            <Separator className="bg-gray-700" />
            <div className="text-center text-xs text-gray-400">
              {filteredProjects.length} proyecto{filteredProjects.length !== 1 ? 's' : ''} 
              {searchTerm && ' encontrado'}
              {filterStatus !== 'ALL' && ` (${filterStatus})`}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}