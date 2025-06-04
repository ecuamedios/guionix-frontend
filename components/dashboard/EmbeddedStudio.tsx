"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Film, 
  Plus, 
  Layers,
  Zap,
  FileText,
  Users,
  Settings,
  ChevronRight,
  Play,
  Edit,
  Star,
  Clock,
  Brain,
  Target,
  Lightbulb,
  X,
  Maximize2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface StudioQuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  estimatedTime: string;
  action: () => void;
}

interface EmbeddedStudioProps {
  className?: string;
}

export default function EmbeddedStudio({ className = "" }: EmbeddedStudioProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showQuickStart, setShowQuickStart] = useState(false);

  const quickActions: StudioQuickAction[] = [
    {
      id: "new-guided",
      title: "Nuevo Guión Guiado",
      description: "Proceso paso a paso para principiantes",
      icon: Lightbulb,
      color: "from-blue-500 to-purple-600",
      estimatedTime: "45-60 min",
      action: () => router.push("/studio/new/phase/1")
    },
    {
      id: "new-expert",
      title: "Editor Avanzado",
      description: "Acceso directo al editor completo",
      icon: Edit,
      color: "from-green-500 to-teal-600",
      estimatedTime: "Variable",
      action: () => router.push("/studio?mode=expert")
    },
    {
      id: "ai-ideas",
      title: "Generador de Ideas",
      description: "IA para conceptos e historias",
      icon: Brain,
      color: "from-purple-500 to-pink-600",
      estimatedTime: "5-10 min",
      action: () => handleAIIdeas()
    },
    {
      id: "import",
      title: "Importar Proyecto",
      description: "Desde Final Draft, Fountain, etc.",
      icon: FileText,
      color: "from-orange-500 to-red-600",
      estimatedTime: "2-5 min",
      action: () => router.push("/studio?mode=import")
    }
  ];

  const recentProjects = [
    { id: "1", title: "El Último Tequilero", progress: 85, lastModified: "Hoy" },
    { id: "2", title: "Amor en las Sombras", progress: 60, lastModified: "Ayer" },
    { id: "3", title: "La Venganza del Patrón", progress: 25, lastModified: "Hace 3 días" }
  ];

  const handleAIIdeas = () => {
    setShowQuickStart(true);
  };

  const handleContinueProject = (projectId: string) => {
    router.push(`/studio/${projectId}`);
  };

  return (
    <>
      <Card className={`bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-800 border-gray-700 ${className}`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-[#cb4335] to-[#a93226] rounded-lg">
                <Film className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-white">GUIONIX Studio</CardTitle>
                <CardDescription className="text-gray-300">
                  Centro de creación integrado
                </CardDescription>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-white/10"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <Layers className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-white/10"
                onClick={() => router.push("/studio")}
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Quick Actions Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Acciones Rápidas</h3>
              <Badge className="bg-[#cb4335]/20 text-[#cb4335] border-[#cb4335]/30">
                AI Powered
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <div
                    key={action.id}
                    className={`
                      relative overflow-hidden rounded-lg bg-gradient-to-r ${action.color} 
                      p-4 cursor-pointer transition-all duration-300 hover:scale-105 
                      hover:shadow-lg group
                    `}
                    onClick={action.action}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="relative">
                      <div className="flex items-start justify-between mb-2">
                        <Icon className="w-6 h-6 text-white" />
                        <ChevronRight className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                      </div>
                      <h4 className="font-semibold text-white text-sm mb-1">
                        {action.title}
                      </h4>
                      <p className="text-xs text-white/80 mb-2">
                        {action.description}
                      </p>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-white/60" />
                        <span className="text-xs text-white/60">
                          {action.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Projects */}
          {isExpanded && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Continuar Trabajando</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-white/10"
                  onClick={() => router.push("/projects")}
                >
                  Ver todos
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="space-y-3">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => handleContinueProject(project.id)}
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-white text-sm">
                        {project.title}
                      </h4>
                      <p className="text-xs text-gray-400">
                        Modificado {project.lastModified}
                      </p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-400">Progreso</span>
                          <span className="text-xs text-[#cb4335]">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                          <div
                            className="bg-gradient-to-r from-[#cb4335] to-[#a93226] h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="ml-3 bg-[#cb4335] hover:bg-[#a93226] text-white"
                    >
                      <Play className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Assistant Teaser */}
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white text-sm">
                  Asistente IA Activo
                </h4>
                <p className="text-xs text-purple-200">
                  3 proveedores • X.AI, OpenAI, Claude disponibles
                </p>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Online
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Start Dialog */}
      <Dialog open={showQuickStart} onOpenChange={setShowQuickStart}>
        <DialogContent className="sm:max-w-md bg-slate-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center space-x-2">
              <Brain className="w-5 h-5 text-[#cb4335]" />
              <span>Generador de Ideas IA</span>
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Genera conceptos para nuevos guiones usando IA avanzada
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button
                className="h-20 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white flex flex-col items-center justify-center space-y-1"
                onClick={() => {
                  setShowQuickStart(false);
                  router.push("/studio/new/phase/1");
                }}
              >
                <Target className="w-5 h-5" />
                <span className="text-xs">Idea desde Cero</span>
              </Button>
              
              <Button
                className="h-20 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white flex flex-col items-center justify-center space-y-1"
                onClick={() => {
                  setShowQuickStart(false);
                  router.push("/dashboard/youtube");
                }}
              >
                <Star className="w-5 h-5" />
                <span className="text-xs">Desde YouTube</span>
              </Button>
            </div>
            
            <div className="text-center">
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white"
                onClick={() => setShowQuickStart(false)}
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
