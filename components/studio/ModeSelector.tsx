"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Film, 
  Lightbulb, 
  FileText, 
  Edit3, 
  Users,
  Upload,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Brain,
  Zap,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStudioMode } from "@/hooks/useStudioMode";

interface ModeOption {
  id: 'new' | 'expert' | 'import' | 'collab';
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  features: string[];
  recommended?: boolean;
  aiProvider?: string;
  estimatedTime?: string;
  skillLevel: 'beginner' | 'intermediate' | 'expert';
}

interface ModeSelectorProps {
  onStartNewProject?: () => void;
}

export default function ModeSelector({ onStartNewProject }: ModeSelectorProps) {
  const { switchMode, userProfile } = useStudioMode();
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  const modes: ModeOption[] = [
    {
      id: 'new',
      title: 'Empezar Nuevo Proyecto',
      description: 'Workflow guiado con IA para crear tu guión desde cero en 4 fases profesionales',
      icon: Lightbulb,
      features: [
        'Workflow guiado paso a paso',
        'Multi-IA: X.AI/Grok → ChatGPT-4 → Claude',
        'Validación automática en cada fase',
        'Ideal para principiantes',
        'Resultado de calidad profesional'
      ],
      recommended: userProfile?.isFirstTime || userProfile?.projectCount === 0,
      aiProvider: 'Multi-IA Especializada',
      estimatedTime: '45-60 min',
      skillLevel: 'beginner'
    },
    {
      id: 'expert',
      title: 'Editor Profesional',
      description: 'Acceso completo a todas las herramientas avanzadas para usuarios experimentados',
      icon: Edit3,
      features: [
        'BeatEditor avanzado con Blake Snyder',
        'Sistema de capas profesional',
        'Colaboración en tiempo real',
        'Generación de IA contextual',
        'Control total del proceso'
      ],
      aiProvider: 'Generación Contextual',
      estimatedTime: 'Variable',
      skillLevel: 'expert'
    },
    {
      id: 'import',
      title: 'Importar Proyecto',
      description: 'Importa guiones existentes desde Final Draft, Fountain, Word y otros formatos',
      icon: Upload,
      features: [
        'Soporte Final Draft (.fdx)',
        'Importación Fountain (.fountain)',
        'Documentos Word/PDF',
        'Conversión automática a estructura',
        'Preserva formato original'
      ],
      aiProvider: 'Procesamiento Inteligente',
      estimatedTime: '5-10 min',
      skillLevel: 'intermediate'
    },
    {
      id: 'collab',
      title: 'Colaboración',
      description: 'Únete a un proyecto compartido o colabora en tiempo real con otros escritores',
      icon: Users,
      features: [
        'Edición colaborativa en tiempo real',
        'Sistema de comentarios y notas',
        'Control de versiones',
        'Permisos granulares',
        'Sincronización automática'
      ],
      aiProvider: 'IA Colaborativa',
      estimatedTime: 'En curso',
      skillLevel: 'intermediate'
    }
  ];

  // Recomendación inteligente basada en el perfil
  const getRecommendedMode = (): ModeOption => {
    if (!userProfile) return modes[0];
    
    if (userProfile.isFirstTime || userProfile.projectCount === 0) {
      return modes[0]; // new
    }
    
    if (userProfile.skillLevel === 'expert' || userProfile.projectCount > 5) {
      return modes[1]; // expert
    }
    
    return modes[0]; // default to guided workflow
  };

  const handleModeSelect = (mode: ModeOption) => {
    setSelectedMode(mode.id);
    
    if (mode.id === 'new') {
      // Usar la función del padre para iniciar nuevo proyecto (que incluye navegación)
      if (onStartNewProject) {
        onStartNewProject();
      } else {
        // Fallback: navegar directamente
        switchMode('new');
      }
    } else {
      // Para otros modos, usar switchMode normal
      switchMode(mode.id);
    }
  };

  const recommendedMode = getRecommendedMode();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-2xl">
                <Film className="w-16 h-16 text-white" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-30"></div>
            </div>
          </div>
          
          <h1 className="text-5xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
            Bienvenido a GUIONIX Studio
          </h1>
          
          <p className="text-xl text-white/80 mb-2 max-w-3xl mx-auto">
            El editor de guiones más avanzado del mundo con inteligencia artificial
          </p>
          
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Elige cómo quieres trabajar hoy. Puedes cambiar de modo en cualquier momento.
          </p>
        </div>

        {/* Recomendación Inteligente */}
        {recommendedMode && (
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/50 backdrop-blur-xl">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-yellow-500/20 rounded-full">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                  </div>
                  <span className="text-yellow-400 font-semibold">Recomendación para ti</span>
                </div>
                <p className="text-white/90 mb-3">
                  Basado en tu perfil, te recomendamos empezar con: <strong>{recommendedMode.title}</strong>
                </p>
                <Button 
                  onClick={() => handleModeSelect(recommendedMode)}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Usar Recomendación
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Mode Options Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {modes.map((mode) => {
            const Icon = mode.icon;
            const isSelected = selectedMode === mode.id;
            const isRecommended = mode.recommended;
            
            return (
              <Card 
                key={mode.id}
                className={`relative overflow-hidden transition-all duration-300 cursor-pointer group ${
                  isSelected 
                    ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30 border-blue-500 scale-105' 
                    : isRecommended
                      ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/50 hover:scale-105'
                      : 'bg-gray-900/50 border-gray-700 hover:border-gray-600 hover:scale-105'
                } backdrop-blur-xl`}
                onClick={() => handleModeSelect(mode)}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Recommended Badge */}
                {isRecommended && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Recomendado
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-2xl transition-colors ${
                      isSelected
                        ? 'bg-blue-500 text-white'
                        : isRecommended
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-gray-800 text-gray-300 group-hover:bg-gray-700'
                    }`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-white mb-1">
                        {mode.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Brain className="w-3 h-3" />
                          {mode.aiProvider}
                        </span>
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          {mode.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-gray-300 text-base">
                    {mode.description}
                  </CardDescription>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Características principales:
                    </h4>
                    <ul className="space-y-1">
                      {mode.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-400 flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 mt-0.5 text-green-400 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleModeSelect(mode);
                      }}
                      className={`w-full ${
                        isSelected
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : isRecommended
                            ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black'
                            : 'bg-gray-700 hover:bg-gray-600'
                      } font-semibold transition-all`}
                    >
                      {isSelected ? 'Seleccionado' : 'Elegir este modo'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="text-center">
          <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-xl max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="p-2 bg-blue-500/20 rounded-full">
                  <Brain className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-blue-400 font-semibold">Powered by AI</span>
              </div>
              <p className="text-gray-300 mb-3">
                Todos los modos incluyen acceso completo a nuestro ecosistema de IA: 
                X.AI/Grok, ChatGPT-4, Claude y nuestro sistema híbrido de control de calidad.
              </p>
              <p className="text-sm text-gray-400">
                Puedes cambiar entre modos en cualquier momento sin perder tu progreso.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
