"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Target, CheckCircle, Calendar, BarChart3 } from "lucide-react";

interface ProgressTrackerProps {
  project: any;
}

export default function ProgressTracker({ project }: ProgressTrackerProps) {
  // Calculate various progress metrics
  const totalCapas = project.capas?.length || 0;
  const totalBeats = project.capas?.reduce((acc: number, capa: any) => acc + (capa.beats?.length || 0), 0) || 0;
  const completedBeats = project.capas?.reduce((acc: number, capa: any) => 
    acc + (capa.beats?.filter((b: any) => !!b.contenido?.trim()).length || 0), 0) || 0;
  
  const beatProgress = totalBeats ? Math.round((completedBeats / totalBeats) * 100) : 0;
  const estimatedPages = Math.round(completedBeats * 1.2); // Estimate 1.2 pages per beat
  const estimatedDuration = Math.round(estimatedPages * 1); // 1 minute per page
  const targetPages = 110; // Standard feature length
  const pageProgress = Math.min(Math.round((estimatedPages / targetPages) * 100), 100);
  
  // Calculate Act progress
  const setupBeats = project.capas?.filter((c: any) => c.tipo === 'SETUP')
    .reduce((acc: number, capa: any) => acc + (capa.beats?.length || 0), 0) || 0;
  const confrontationBeats = project.capas?.filter((c: any) => c.tipo === 'CONFRONTATION')
    .reduce((acc: number, capa: any) => acc + (capa.beats?.length || 0), 0) || 0;
  const resolutionBeats = project.capas?.filter((c: any) => c.tipo === 'RESOLUTION')
    .reduce((acc: number, capa: any) => acc + (capa.beats?.length || 0), 0) || 0;

  const completedSetupBeats = project.capas?.filter((c: any) => c.tipo === 'SETUP')
    .reduce((acc: number, capa: any) => acc + (capa.beats?.filter((b: any) => !!b.contenido?.trim()).length || 0), 0) || 0;
  const completedConfrontationBeats = project.capas?.filter((c: any) => c.tipo === 'CONFRONTATION')
    .reduce((acc: number, capa: any) => acc + (capa.beats?.filter((b: any) => !!b.contenido?.trim()).length || 0), 0) || 0;
  const completedResolutionBeats = project.capas?.filter((c: any) => c.tipo === 'RESOLUTION')
    .reduce((acc: number, capa: any) => acc + (capa.beats?.filter((b: any) => !!b.contenido?.trim()).length || 0), 0) || 0;

  const setupProgress = setupBeats ? Math.round((completedSetupBeats / setupBeats) * 100) : 0;
  const confrontationProgress = confrontationBeats ? Math.round((completedConfrontationBeats / confrontationBeats) * 100) : 0;
  const resolutionProgress = resolutionBeats ? Math.round((completedResolutionBeats / resolutionBeats) * 100) : 0;

  // Estimate completion date
  const averageBeatsPerDay = 2; // Assumption
  const remainingBeats = totalBeats - completedBeats;
  const estimatedDaysToComplete = Math.ceil(remainingBeats / averageBeatsPerDay);
  const estimatedCompletionDate = new Date();
  estimatedCompletionDate.setDate(estimatedCompletionDate.getDate() + estimatedDaysToComplete);

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-400";
    if (progress >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  const getProgressBgColor = (progress: number) => {
    if (progress >= 80) return "bg-green-400";
    if (progress >= 50) return "bg-yellow-400";
    return "bg-red-400";
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <TrendingUp className="w-5 h-5 text-yellow-400" />
          Progreso del Proyecto
        </CardTitle>
        <CardDescription className="text-gray-400">
          Seguimiento detallado del avance de tu guión
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-white">Progreso General</h4>
            <Badge className={`${getProgressColor(beatProgress)} bg-gray-800 border-gray-700`}>
              {beatProgress}%
            </Badge>
          </div>
          <Progress 
            value={beatProgress} 
            className="h-3 bg-gray-800"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>{completedBeats} de {totalBeats} beats completados</span>
            <span>{totalCapas} capas estructuradas</span>
          </div>
        </div>

        {/* Act Progress */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-white">Progreso por Actos</h4>
          
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-300">Acto I - Setup</span>
                <span className="text-xs text-gray-400">{setupProgress}%</span>
              </div>
              <Progress value={setupProgress} className="h-2 bg-gray-800" />
              <div className="text-xs text-gray-500 mt-1">
                {completedSetupBeats}/{setupBeats} beats
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-300">Acto II - Confrontación</span>
                <span className="text-xs text-gray-400">{confrontationProgress}%</span>
              </div>
              <Progress value={confrontationProgress} className="h-2 bg-gray-800" />
              <div className="text-xs text-gray-500 mt-1">
                {completedConfrontationBeats}/{confrontationBeats} beats
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-300">Acto III - Resolución</span>
                <span className="text-xs text-gray-400">{resolutionProgress}%</span>
              </div>
              <Progress value={resolutionProgress} className="h-2 bg-gray-800" />
              <div className="text-xs text-gray-500 mt-1">
                {completedResolutionBeats}/{resolutionBeats} beats
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-gray-400">Páginas</span>
            </div>
            <div className="text-lg font-bold text-white">{estimatedPages}</div>
            <div className="text-xs text-gray-500">de {targetPages} objetivo</div>
            <Progress value={pageProgress} className="h-1 mt-2 bg-gray-700" />
          </div>

          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-green-400" />
              <span className="text-xs text-gray-400">Duración</span>
            </div>
            <div className="text-lg font-bold text-white">{estimatedDuration}m</div>
            <div className="text-xs text-gray-500">estimado</div>
          </div>

          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-gray-400">Objetivo</span>
            </div>
            <div className="text-lg font-bold text-white">{Math.round((completedBeats / totalBeats) * 100) || 0}%</div>
            <div className="text-xs text-gray-500">completado</div>
          </div>

          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-orange-400" />
              <span className="text-xs text-gray-400">ETA</span>
            </div>
            <div className="text-sm font-bold text-white">
              {estimatedDaysToComplete > 0 ? `${estimatedDaysToComplete}d` : 'Listo'}
            </div>
            <div className="text-xs text-gray-500">restantes</div>
          </div>
        </div>

        {/* Milestone Indicators */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-white">Hitos del Proyecto</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <CheckCircle className={`w-4 h-4 ${setupProgress >= 100 ? 'text-green-400' : 'text-gray-500'}`} />
              <span className={`text-sm ${setupProgress >= 100 ? 'text-green-400' : 'text-gray-400'}`}>
                Acto I Completado
              </span>
              {setupProgress >= 100 && <Badge className="bg-green-900/50 text-green-400 text-xs">✓</Badge>}
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className={`w-4 h-4 ${confrontationProgress >= 100 ? 'text-green-400' : 'text-gray-500'}`} />
              <span className={`text-sm ${confrontationProgress >= 100 ? 'text-green-400' : 'text-gray-400'}`}>
                Acto II Completado
              </span>
              {confrontationProgress >= 100 && <Badge className="bg-green-900/50 text-green-400 text-xs">✓</Badge>}
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className={`w-4 h-4 ${resolutionProgress >= 100 ? 'text-green-400' : 'text-gray-500'}`} />
              <span className={`text-sm ${resolutionProgress >= 100 ? 'text-green-400' : 'text-gray-400'}`}>
                Acto III Completado
              </span>
              {resolutionProgress >= 100 && <Badge className="bg-green-900/50 text-green-400 text-xs">✓</Badge>}
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className={`w-4 h-4 ${beatProgress >= 100 ? 'text-green-400' : 'text-gray-500'}`} />
              <span className={`text-sm ${beatProgress >= 100 ? 'text-green-400' : 'text-gray-400'}`}>
                Primer Borrador Completo
              </span>
              {beatProgress >= 100 && <Badge className="bg-green-900/50 text-green-400 text-xs">✓</Badge>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}