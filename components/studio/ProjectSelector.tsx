"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  titulo: string;
  genero?: string;
  duracionEstimada?: number;
  status?: string;
  createdAt: string;
}

interface ProjectSelectorProps {
  onProjectSelect?: (projectId: string) => void;
  selectedProjectId?: string;
}

export default function ProjectSelector({ onProjectSelect, selectedProjectId }: ProjectSelectorProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/studio/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Seleccionar Proyecto</CardTitle>
          <CardDescription>Cargando proyectos...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>Error al cargar proyectos: {error}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seleccionar Proyecto</CardTitle>
        <CardDescription>Elige un proyecto para trabajar en el estudio</CardDescription>
      </CardHeader>
      <CardContent>
        {projects.length === 0 ? (
          <p className="text-muted-foreground">No hay proyectos disponibles.</p>
        ) : (
          <div className="space-y-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-accent ${
                  selectedProjectId === project.id ? 'bg-accent border-primary' : ''
                }`}
                onClick={() => onProjectSelect?.(project.id)}
              >
                <div className="flex-1">
                  <h3 className="font-medium">{project.titulo}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {project.genero && (
                      <Badge variant="secondary" className="text-xs">
                        {project.genero}
                      </Badge>
                    )}
                    {project.duracionEstimada && (
                      <span className="text-xs text-muted-foreground">
                        {project.duracionEstimada} min
                      </span>
                    )}
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant={selectedProjectId === project.id ? "default" : "outline"}
                >
                  {selectedProjectId === project.id ? "Seleccionado" : "Seleccionar"}
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}