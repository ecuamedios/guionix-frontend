"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStudioMode, type StudioMode } from "@/hooks/useStudioMode";
import { 
  Lightbulb, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  Film,
  Sparkles,
  Brain,
  Users,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Phase {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  aiProvider: string;
  status: 'pending' | 'in-progress' | 'completed' | 'approved';
  estimatedTime: string;
}

interface NewUserModeProps {
  onModeSwitch: (mode: StudioMode) => void;
}

export default function NewUserMode({ onModeSwitch }: NewUserModeProps) {
  const { switchMode } = useStudioMode();
  const router = useRouter();
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  const phases: Phase[] = [
    {
      id: 1,
      title: "Generación de Ideas",
      description: "Desarrollo inicial del concepto y estructura básica del guión",
      icon: Lightbulb,
      aiProvider: "X.AI/Grok",
      status: 'pending',
      estimatedTime: "5-10 min"
    },
    {
      id: 2,
      title: "Desarrollo de Estructura",
      description: "Creación de la estructura narrativa, actos y puntos de giro",
      icon: Film,
      aiProvider: "ChatGPT-4",
      status: 'pending',
      estimatedTime: "10-15 min"
    },
    {
      id: 3,
      title: "Escritura Profesional",
      description: "Redacción completa del guión con formato profesional",
      icon: Target,
      aiProvider: "Claude",
      status: 'pending',
      estimatedTime: "20-30 min"
    },
    {
      id: 4,
      title: "Control de Calidad",
      description: "Revisión final, validación y pulido del guión",
      icon: CheckCircle,
      aiProvider: "Sistema Híbrido",
      status: 'pending',
      estimatedTime: "10-15 min"
    }
  ];

  const handleStartProcess = () => {
    setIsStarted(true);
    // Navegar directamente a la fase 1 del workflow existente
    router.push('/studio?mode=new&phase=1');
  };

  const handleBackToSelector = () => {
    switchMode('selector');
  };

  const getPhaseProgress = () => {
    const completedPhases = phases.filter(p => p.status === 'completed').length;
    return (completedPhases / phases.length) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10" />
      
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={handleBackToSelector}
                className="text-white/70 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Cambiar Modo
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-blue-400 border-blue-400/50 bg-blue-500/10">
                <Sparkles className="w-3 h-3 mr-1" />
                Workflow Guiado
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="p-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl shadow-2xl">
                <Sparkles className="w-16 h-16 text-black" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl blur-xl opacity-30"></div>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4">
            Crear Nuevo Guión
          </h2>
          <p className="text-xl text-gray-300 mb-2">
            Proceso de Creación Profesional en 4 Fases con IA
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Nuestro sistema avanzado combina la potencia de múltiples IAs para crear 
            guiones de calidad profesional con controles de aprobación en cada fase.
          </p>
        </div>

        {/* Process Overview */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">
            Proceso de Creación
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              const isActive = index === currentPhase;
              const isCompleted = phase.status === 'completed';
              
              return (
                <Card key={phase.id} className={`relative overflow-hidden transition-all duration-300 ${
                  isActive 
                    ? 'bg-yellow-500/20 border-yellow-500 scale-105' 
                    : isCompleted 
                      ? 'bg-green-500/20 border-green-500'
                      : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                }`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-full ${
                        isActive 
                          ? 'bg-yellow-500 text-black' 
                          : isCompleted 
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-700 text-gray-300'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge variant="outline" className={`text-xs ${
                        isActive 
                          ? 'border-yellow-400 text-yellow-400'
                          : isCompleted
                            ? 'border-green-400 text-green-400'
                            : 'border-gray-600 text-gray-400'
                      }`}>
                        Fase {phase.id}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-white mt-2">
                      {phase.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 mb-4">
                      {phase.description}
                    </CardDescription>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">IA Provider:</span>
                        <span className="text-yellow-400 font-medium">{phase.aiProvider}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Tiempo:</span>
                        <span className="text-white">{phase.estimatedTime}</span>
                      </div>
                    </div>

                    {isCompleted && (
                      <div className="mt-4 flex items-center text-green-400 text-sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Completado y Aprobado
                      </div>
                    )}
                  </CardContent>

                  {/* Progress indicator */}
                  {index < phases.length - 1 && (
                    <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
                      <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <Brain className="w-8 h-8 text-blue-400 mb-2" />
              <CardTitle className="text-white">IA Multicapa</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Utilizamos diferentes modelos de IA especializados en cada fase del proceso creativo.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <Target className="w-8 h-8 text-green-400 mb-2" />
              <CardTitle className="text-white">Control de Calidad</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Cada fase requiere aprobación antes de continuar, garantizando la máxima calidad.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CheckCircle className="w-8 h-8 text-purple-400 mb-2" />
              <CardTitle className="text-white">Resultado Profesional</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Formato estándar de la industria, compatible con Final Draft y otros software.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        {getPhaseProgress() > 0 && (
          <Card className="bg-gray-800 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Film className="w-5 h-5 mr-2" />
                Progreso del Proyecto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Completado</span>
                  <span className="text-white font-medium">{Math.round(getPhaseProgress())}%</span>
                </div>
                <Progress value={getPhaseProgress()} className="h-2" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Button */}
        <div className="text-center">
          <Button 
            size="lg"
            onClick={handleStartProcess}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-lg px-8 py-4 shadow-xl shadow-yellow-500/25"
          >
            <Sparkles className="w-6 h-6 mr-3" />
            Comenzar Proceso de Creación
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
          
          <p className="text-gray-400 mt-4 text-sm">
            Tiempo estimado total: 45-70 minutos • Puedes pausar en cualquier momento
          </p>
        </div>
      </div>
    </div>
  );
}
