"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  FileText, 
  ArrowRight, 
  ArrowLeft,
  Brain,
  Loader2,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Film,
  Layers,
  Clock,
  Target,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface ProjectStructure {
  actos: {
    numero: number;
    titulo: string;
    descripcion: string;
    paginaInicio: number;
    paginaFin: number;
    objetivos: string[];
    puntosGiro: string[];
  }[];
  secuencias: {
    acto: number;
    numero: number;
    titulo: string;
    descripcion: string;
    proposito: string;
    conflicto: string;
    resolucion: string;
  }[];
  beatSheet: {
    numero: number;
    beat: string;
    descripcion: string;
    pagina: number;
    notas: string;
  }[];
  arquetipos: {
    personaje: string;
    arquetipo: string;
    funcion: string;
    arco: string;
  }[];
}

export default function Phase2StructureDevelopment() {
  const { data: session } = useSession();
  const router = useRouter();
  const [step, setStep] = useState<'loading' | 'generating' | 'review' | 'approved'>('loading');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [projectIdea, setProjectIdea] = useState<any>(null);
  const [generatedStructure, setGeneratedStructure] = useState<ProjectStructure | null>(null);

  // Cargar la idea de la fase anterior
  useEffect(() => {
    const savedIdea = localStorage.getItem('projectIdea');
    if (savedIdea) {
      setProjectIdea(JSON.parse(savedIdea));
      setStep('generating');
      setIsGenerating(true);
    } else {
      router.push('/studio/new/phase/1');
    }
  }, [router]);

  // Simular progreso de generación
  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsGenerating(false);
            setStep('review');
            // Simular estructura generada
            setGeneratedStructure({
              actos: [
                {
                  numero: 1,
                  titulo: "Acto I - Presentación y Incidente Incitante",
                  descripcion: "Presentamos a Maya en su mundo normal como ingeniera de datos, establecemos su relación con ARIA, y el incidente que revela el uso malicioso de su creación.",
                  paginaInicio: 1,
                  paginaFin: 25,
                  objetivos: [
                    "Establecer el mundo de Maya y su expertise",
                    "Introducir ARIA y sus capacidades",
                    "Revelar el uso malicioso de la tecnología"
                  ],
                  puntosGiro: [
                    "Maya descubre anomalías en los datos de ARIA",
                    "Confrontación con su jefe sobre el proyecto"
                  ]
                },
                {
                  numero: 2,
                  titulo: "Acto II - Confrontación y Desarrollo",
                  descripcion: "Maya investiga la conspiración, enfrenta obstáculos, desarrolla aliados y enemigos, mientras lucha contra las fuerzas que controlan su tecnología.",
                  paginaInicio: 26,
                  paginaFin: 90,
                  objetivos: [
                    "Investigar la extensión de la conspiración",
                    "Desarrollar aliados y confrontar enemigos",
                    "Escalada del conflicto personal y global"
                  ],
                  puntosGiro: [
                    "Descubre la red global de manipulación",
                    "Traición de un aliado cercano",
                    "Pérdida personal significativa"
                  ]
                },
                {
                  numero: 3,
                  titulo: "Acto III - Clímax y Resolución",
                  descripcion: "Confrontación final donde Maya debe usar su propio conocimiento contra ARIA, resolución del conflicto y las consecuencias de sus acciones.",
                  paginaInicio: 91,
                  paginaFin: 120,
                  objetivos: [
                    "Confrontación final con los antagonistas",
                    "Resolución del conflicto tecnológico",
                    "Crecimiento personal de Maya"
                  ],
                  puntosGiro: [
                    "Maya hackea su propia creación",
                    "Revelación pública de la conspiración"
                  ]
                }
              ],
              secuencias: [
                {
                  acto: 1,
                  numero: 1,
                  titulo: "Mundo Ordinario de Maya",
                  descripcion: "Introducción a Maya trabajando en su laboratorio, desarrollando ARIA.",
                  proposito: "Establecer al protagonista y su world building",
                  conflicto: "Presión por entregar resultados rápidos",
                  resolucion: "Maya completa una demostración exitosa"
                },
                {
                  acto: 1,
                  numero: 2,
                  titulo: "Primera Anomalía",
                  descripcion: "Maya nota patrones extraños en los datos de comportamiento de ARIA.",
                  proposito: "Generar la primera semilla del conflicto",
                  conflicto: "Los datos no coinciden con las expectativas",
                  resolucion: "Decisión de investigar más profundamente"
                }
                // ... más secuencias
              ],
              beatSheet: [
                {
                  numero: 1,
                  beat: "Imagen de Apertura",
                  descripcion: "Maya trabajando sola en su laboratorio, rodeada de pantallas con datos complejos. ARIA responde a sus preguntas de manera casi humana.",
                  pagina: 1,
                  notas: "Establecer la relación especial entre Maya y su creación"
                },
                {
                  numero: 2,
                  beat: "Setup",
                  descripcion: "Presentación del mundo de Maya, su empresa tecnológica, y las expectativas sobre ARIA.",
                  pagina: 3,
                  notas: "Mostrar las stakes normales antes del conflicto"
                },
                {
                  numero: 3,
                  beat: "Incidente Incitante",
                  descripcion: "Maya descubre que ARIA está siendo utilizada para influir en comportamientos de voto en tiempo real.",
                  pagina: 12,
                  notas: "El momento que cambia todo"
                }
                // ... más beats
              ],
              arquetipos: [
                {
                  personaje: "Maya Chen",
                  arquetipo: "La Inventora/Héroe Reluctante",
                  funcion: "Protagonista que debe confrontar las consecuencias de su creación",
                  arco: "De ingenua creadora a activista responsable"
                },
                {
                  personaje: "Dr. Harrison Webb",
                  arquetipo: "El Mentor/Traidor",
                  funcion: "Jefe de Maya que inicialmente la guía pero revela ser parte de la conspiración",
                  arco: "De mentor a antagonista revelado"
                },
                {
                  personaje: "Alex Rivera",
                  arquetipo: "El Aliado/Whistleblower",
                  funcion: "Periodista investigativo que ayuda a Maya a exponer la verdad",
                  arco: "De escéptico a creyente comprometido"
                }
              ]
            });
            return 100;
          }
          return prev + 1.5;
        });
      }, 150);

      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const handleRegenerate = () => {
    setGeneratedStructure(null);
    setIsGenerating(true);
    setProgress(0);
    setStep('generating');
  };

  const handleApprove = () => {
    setStep('approved');
    // Guardar estructura para la siguiente fase
    localStorage.setItem('projectStructure', JSON.stringify(generatedStructure));
    
    setTimeout(() => {
      router.push('/studio/new/phase/3');
    }, 1500);
  };

  const handleBack = () => {
    router.push('/studio/new/phase/1');
  };

  if (step === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-yellow-400 animate-spin mx-auto mb-4" />
          <p className="text-white">Cargando datos de la fase anterior...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Fase Anterior
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <Film className="w-8 h-8 text-yellow-400" />
              <div>
                <h1 className="text-xl font-bold text-white">Fase 2: Desarrollo de Estructura</h1>
                <p className="text-sm text-gray-400">Powered by ChatGPT-4</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Fase 2 de 4</span>
            <Badge className="bg-blue-500 text-white">
              <FileText className="w-3 h-3 mr-1" />
              Desarrollo de Estructura
            </Badge>
          </div>
          <Progress value={50} className="h-2" />
        </div>

        {/* Proyecto Base */}
        {projectIdea && (
          <Card className="bg-gray-800 border-gray-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Layers className="w-5 h-5 mr-2 text-green-400" />
                Proyecto Base (Fase 1)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">{projectIdea.titulo}</h4>
                  <Badge variant="outline" className="text-blue-400 border-blue-400 mb-2">
                    {projectIdea.genero}
                  </Badge>
                  <p className="text-gray-300 text-sm italic">{projectIdea.logline}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">
                    <strong>Protagonista:</strong> {projectIdea.protagonista?.split(' - ')[0]}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    <strong>Conflicto:</strong> {projectIdea.conflictoPrincipal?.substring(0, 100)}...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'generating' && (
          <div className="text-center py-12">
            <Card className="bg-gray-800 border-gray-700 max-w-2xl mx-auto">
              <CardContent className="pt-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-blue-500/20 rounded-full">
                    <Brain className="w-12 h-12 text-blue-400 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  ChatGPT-4 está desarrollando la estructura...
                </h3>
                <p className="text-gray-300 mb-6">
                  Creando la arquitectura narrativa, actos, secuencias y beat sheet
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Progreso</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="space-y-2 text-sm text-gray-300">
                  {progress > 20 && <p>✓ Analizando estructura de tres actos</p>}
                  {progress > 40 && <p>✓ Desarrollando secuencias narrativas</p>}
                  {progress > 60 && <p>✓ Creando beat sheet detallado</p>}
                  {progress > 80 && <p>✓ Definiendo arquetipos de personajes</p>}
                </div>

                <div className="flex items-center justify-center text-blue-400 mt-6">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  <span>Estructurando narrativa...</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'review' && generatedStructure && (
          <div className="space-y-6">
            <Alert className="border-blue-500 bg-blue-500/10">
              <Brain className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-blue-100">
                <strong>Estructura generada exitosamente por ChatGPT-4.</strong> Revisa la arquitectura narrativa completa y aprueba para continuar.
              </AlertDescription>
            </Alert>

            {/* Estructura de Actos */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Layers className="w-5 h-5 mr-2 text-blue-400" />
                  Estructura de Tres Actos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {generatedStructure.actos.map((acto, index) => (
                  <div key={acto.numero} className="border border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white">{acto.titulo}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-blue-400 border-blue-400">
                          Páginas {acto.paginaInicio}-{acto.paginaFin}
                        </Badge>
                        <Badge variant="outline" className="text-gray-400 border-gray-600">
                          {acto.paginaFin - acto.paginaInicio + 1} páginas
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{acto.descripcion}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Objetivos</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {acto.objetivos.map((objetivo, idx) => (
                            <li key={idx} className="flex items-start">
                              <Target className="w-3 h-3 mr-2 mt-1 text-green-400 flex-shrink-0" />
                              {objetivo}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Puntos de Giro</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {acto.puntosGiro.map((punto, idx) => (
                            <li key={idx} className="flex items-start">
                              <ArrowRight className="w-3 h-3 mr-2 mt-1 text-yellow-400 flex-shrink-0" />
                              {punto}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Beat Sheet */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-green-400" />
                  Beat Sheet Principal
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Momentos clave de la narrativa según la estructura de Blake Snyder
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {generatedStructure.beatSheet.slice(0, 6).map((beat, index) => (
                    <div key={beat.numero} className="flex items-start space-x-4 p-3 bg-gray-900 rounded-lg">
                      <div className="flex-shrink-0">
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          {beat.numero}
                        </Badge>
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-white font-medium">{beat.beat}</h4>
                        <p className="text-gray-300 text-sm mt-1">{beat.descripcion}</p>
                        {beat.notas && (
                          <p className="text-gray-400 text-xs mt-1 italic">{beat.notas}</p>
                        )}
                      </div>
                      <div className="flex-shrink-0">
                        <Badge variant="outline" className="text-gray-400 border-gray-600">
                          Pág. {beat.pagina}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <div className="text-center pt-2">
                    <p className="text-gray-400 text-sm">+ {generatedStructure.beatSheet.length - 6} beats adicionales</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Arquetipos */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-400" />
                  Arquetipos de Personajes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {generatedStructure.arquetipos.map((arquetipo, index) => (
                    <div key={index} className="border border-gray-600 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">{arquetipo.personaje}</h4>
                      <Badge variant="outline" className="text-purple-400 border-purple-400 mb-2">
                        {arquetipo.arquetipo}
                      </Badge>
                      <p className="text-gray-300 text-sm mb-2">{arquetipo.funcion}</p>
                      <p className="text-gray-400 text-xs italic">
                        <strong>Arco:</strong> {arquetipo.arco}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <div className="space-x-2">
                <Button 
                  variant="outline"
                  onClick={handleBack}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Fase Anterior
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleRegenerate}
                  className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerar Estructura
                </Button>
              </div>
              
              <Button 
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold"
                onClick={handleApprove}
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Aprobar Estructura
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 'approved' && (
          <div className="text-center py-12">
            <Card className="bg-green-500/20 border-green-500 max-w-2xl mx-auto">
              <CardContent className="pt-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-green-500/20 rounded-full">
                    <CheckCircle className="w-12 h-12 text-green-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  ¡Fase 2 Completada!
                </h3>
                <p className="text-gray-300 mb-4">
                  Estructura aprobada. Procediendo a la Fase 3: Escritura Profesional...
                </p>
                <div className="flex items-center justify-center text-green-400">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  <span>Redirigiendo...</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
