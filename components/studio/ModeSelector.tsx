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

export default function ModeSelector() {
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
    
    // Actualizar perfil del usuario
    if (mode.id === 'expert') {
      userProfile && switchMode('expert');
    } else {
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
                className={`relative overflow-hidden transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${
                  isSelected 
                    ? 'bg-blue-500/20 border-blue-500 shadow-xl shadow-blue-500/25' 
                    : isRecommended
                      ? 'bg-yellow-500/10 border-yellow-500/50 hover:border-yellow-500'
                      : 'bg-slate-900/50 border-white/10 hover:border-white/20'
                } backdrop-blur-xl`}
                onClick={() => handleModeSelect(mode)}
              >
                {isRecommended && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-500 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                    RECOMENDADO
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-xl ${
                      isSelected 
                        ? 'bg-blue-500/20' 
                        : isRecommended 
                          ? 'bg-yellow-500/20'
                          : 'bg-white/5'
                    }`}>
                      <Icon className={`w-8 h-8 ${
                        isSelected 
                          ? 'text-blue-400' 
                          : isRecommended 
                            ? 'text-yellow-400'
                            : 'text-white/70'
                      }`} />
                    </div>
                    
                    <Badge variant="outline" className={`text-xs ${
                      mode.skillLevel === 'beginner' 
                        ? 'border-green-400/50 text-green-400'
                        : mode.skillLevel === 'intermediate'
                          ? 'border-yellow-400/50 text-yellow-400'
                          : 'border-red-400/50 text-red-400'
                    }`}>
                      {mode.skillLevel === 'beginner' ? 'Principiante' :
                       mode.skillLevel === 'intermediate' ? 'Intermedio' : 'Experto'}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl text-white mb-2">
                    {mode.title}
                  </CardTitle>
                  
                  <CardDescription className="text-white/70 text-sm leading-relaxed">
                    {mode.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {mode.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-white/80">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Meta Info */}
                  <div className="space-y-2 text-xs text-white/60">
                    <div className="flex items-center justify-between">
                      <span>IA:</span>
                      <span className="text-blue-400">{mode.aiProvider}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Tiempo:</span>
                      <span className="text-white/80">{mode.estimatedTime}</span>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <Button 
                    className={`w-full mt-4 font-semibold ${
                      isSelected
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : isRecommended
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black'
                          : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModeSelect(mode);
                    }}
                  >
                    {isSelected ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Seleccionado
                      </>
                    ) : (
                      <>
                        Seleccionar
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-900/50 border-white/10 backdrop-blur-xl">
            <CardContent className="pt-6 text-center">
              <div className="p-3 bg-blue-500/20 rounded-full w-fit mx-auto mb-4">
                <Brain className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">IA Multicapa</h3>
              <p className="text-white/70 text-sm">
                Diferentes modelos especializados para cada fase del proceso creativo
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-white/10 backdrop-blur-xl">
            <CardContent className="pt-6 text-center">
              <div className="p-3 bg-green-500/20 rounded-full w-fit mx-auto mb-4">
                <Target className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Control de Calidad</h3>
              <p className="text-white/70 text-sm">
                Validación profesional en cada paso para garantizar máxima calidad
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-white/10 backdrop-blur-xl">
            <CardContent className="pt-6 text-center">
              <div className="p-3 bg-purple-500/20 rounded-full w-fit mx-auto mb-4">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Profesional</h3>
              <p className="text-white/70 text-sm">
                Formato estándar de la industria compatible con Final Draft
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
