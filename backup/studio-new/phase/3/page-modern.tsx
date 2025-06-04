"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  Edit3, 
  ArrowRight, 
  ArrowLeft,
  Brain,
  Loader2,
  CheckCircle,
  RefreshCw,
  Film,
  FileText,
  Download,
  Eye,
  Search,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ScriptPage {
  numero: number;
  contenido: string;
  escenas: {
    numero: number;
    encabezado: string;
    tipo: 'INT' | 'EXT';
    locacion: string;
    tiempo: string;
    accion: string;
    dialogos: {
      personaje: string;
      texto: string;
      parentetico?: string;
    }[];
  }[];
}

interface GeneratedScript {
  titulo: string;
  formato: 'fountain' | 'final-draft';
  paginas: ScriptPage[];
  estadisticas: {
    totalPaginas: number;
    totalEscenas: number;
    totalDialogos: number;
    totalPalabras: number;
    personajes: string[];
    locaciones: string[];
  };
  metadatos: {
    autor: string;
    fecha: string;
    version: string;
    genero: string;
    duracionEstimada: string;
  };
}

export default function Phase3ProfessionalWriting() {
  const { data: session } = useSession();
  const router = useRouter();
  const [step, setStep] = useState<'loading' | 'generating' | 'review' | 'approved'>('loading');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState('');
  const [projectData, setProjectData] = useState<any>(null);
  const [generatedScript, setGeneratedScript] = useState<GeneratedScript | null>(null);
  const [selectedPage, setSelectedPage] = useState(1);

  // Cargar datos de las fases anteriores
  useEffect(() => {
    const savedIdea = localStorage.getItem('projectIdea');
    const savedStructure = localStorage.getItem('projectStructure');
    
    if (savedIdea && savedStructure) {
      setProjectData({
        idea: JSON.parse(savedIdea),
        structure: JSON.parse(savedStructure)
      });
      setStep('generating');
      setIsGenerating(true);
    } else {
      router.push('/studio/new/phase/1');
    }
  }, [router]);

  // Simular progreso de generación de guión completo
  useEffect(() => {
    if (isGenerating) {
      const stages = [
        { stage: 'Inicializando Claude AI...', duration: 8 },
        { stage: 'Analizando estructura narrativa...', duration: 12 },
        { stage: 'Generando Acto I (páginas 1-25)...', duration: 20 },
        { stage: 'Escribiendo Acto II (páginas 26-90)...', duration: 35 },
        { stage: 'Desarrollando Acto III (páginas 91-120)...', duration: 20 },
        { stage: 'Refinando diálogos y acción...', duration: 15 },
        { stage: 'Aplicando formato profesional...', duration: 10 }
      ];

      let currentProgress = 0;
      let stageIndex = 0;

      const interval = setInterval(() => {
        if (stageIndex < stages.length) {
          const currentStageData = stages[stageIndex];
          setCurrentStage(currentStageData.stage);
          
          const progressIncrement = currentStageData.duration / 100;
          currentProgress += progressIncrement;
          
          if (currentProgress >= (stageIndex + 1) * (100 / stages.length)) {
            stageIndex++;
          }
          
          setProgress(Math.min(currentProgress, 100));
          
          if (currentProgress >= 100) {
            clearInterval(interval);
            setIsGenerating(false);
            setStep('review');
            generateMockScript();
          }
        }
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const generateMockScript = () => {
    setGeneratedScript({
      titulo: "Un thriller tecnológico",
      formato: 'fountain',
      paginas: [
        {
          numero: 1,
          contenido: `FADE IN:

EXT. EDIFICIO CORPORATIVO AXIOM TECH - AMANECER

Un rascacielos de vidrio y acero se alza contra el cielo rosado del amanecer. El logo de AXIOM TECH brilla en letras plateadas.

INT. LABORATORIO DE IA - AXIOM TECH - AMANECER

MAYA CHEN (32), de ascendencia asiática, cabello recogido en una cola de caballo desordenada, trabaja frente a múltiples monitores. Sus ojos están inyectados en sangre por la falta de sueño.

En la pantalla principal: líneas de código se desplazan como cascadas verdes. Una interfaz muestra "ARIA v3.7 - ENTRENAMIENTO ACTIVO".

MAYA
(hablando a la pantalla)
Vamos, ARIA. Muéstrame qué tan bien puedes predecir el comportamiento humano.

Una voz sintética, suave y femenina, responde desde los altavoces.

ARIA (V.O.)
Basándome en los patrones de datos actuales, puedo predecir el comportamiento individual con un 99.7% de precisión, Maya.

Maya sonríe, satisfecha. Toma un sorbo de café frío.

MAYA
Increíble. Eres perfecta.

Su teléfono VIBRA. Un mensaje de texto: "Presentación ejecutiva en 2 horas. No me decepciones. - Dr. Webb"

FADE TO:`,
          escenas: [
            {
              numero: 1,
              encabezado: "EXT. EDIFICIO CORPORATIVO AXIOM TECH - AMANECER",
              tipo: 'EXT',
              locacion: "EDIFICIO CORPORATIVO AXIOM TECH",
              tiempo: "AMANECER",
              accion: "Un rascacielos de vidrio y acero se alza contra el cielo rosado del amanecer.",
              dialogos: []
            }
          ]
        }
      ],
      estadisticas: {
        totalPaginas: 118,
        totalEscenas: 89,
        totalDialogos: 567,
        totalPalabras: 23450,
        personajes: ["MAYA CHEN", "DR. HARRISON WEBB", "ALEX RIVERA", "ARIA", "CHEN WEI", "SARAH MARTINEZ"],
        locaciones: ["AXIOM TECH", "APARTAMENTO DE MAYA", "CAFE UNDERGROUND", "CENTRO DE DATOS"]
      },
      metadatos: {
        autor: session?.user?.name || 'Autor GUIONIX',
        fecha: new Date().toLocaleDateString(),
        version: "Primera versión - Claude AI",
        genero: "Thriller Tecnológico",
        duracionEstimada: "112 minutos"
      }
    });
  };

  const handleRegenerate = () => {
    setGeneratedScript(null);
    setIsGenerating(true);
    setProgress(0);
    setCurrentStage('');
    setStep('generating');
  };

  const handleApprove = () => {
    setStep('approved');
    localStorage.setItem('generatedScript', JSON.stringify(generatedScript));
    
    setTimeout(() => {
      router.push('/studio/new/phase/4');
    }, 1500);
  };

  const handleBack = () => {
    router.push('/studio/new/phase/2');
  };

  if (step === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-white animate-spin mx-auto mb-4" />
          <p className="text-white/80">Cargando datos de las fases anteriores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl">
                <Edit3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Fase 3</h1>
                <p className="text-sm text-white/60">Escritura Profesional</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-blue-400 border-blue-400/50 bg-blue-500/10">
                Claude AI
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Escritura Profesional del Guión</h2>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg shadow-green-400/30"></div>
                <span className="text-sm text-white/80">Fase 1</span>
              </div>
              <ArrowRight className="w-4 h-4 text-white/40" />
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg shadow-green-400/30"></div>
                <span className="text-sm text-white/80">Fase 2</span>
              </div>
              <ArrowRight className="w-4 h-4 text-white/40" />
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-pulse shadow-lg shadow-blue-400/30"></div>
                <span className="text-sm text-white font-medium">Fase 3</span>
              </div>
              <ArrowRight className="w-4 h-4 text-white/40" />
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-white/20 rounded-full"></div>
                <span className="text-sm text-white/40">Fase 4</span>
              </div>
            </div>
          </div>
        </div>

        {step === 'generating' && (
          <div className="text-center py-12">
            <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl max-w-3xl mx-auto shadow-2xl">
              <CardContent className="pt-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full">
                    <Brain className="w-12 h-12 text-white animate-pulse" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
                  Claude AI está escribiendo el guión...
                </h3>
                <p className="text-white/70 mb-6">
                  Generando 118 páginas de guión profesional en formato estándar de la industria
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Progreso de Escritura</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>

                <div className="text-center mb-6">
                  <p className="text-blue-400 font-medium">{currentStage}</p>
                </div>

                <div className="flex items-center justify-center text-blue-400">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  <span>Escribiendo guión profesional...</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'review' && generatedScript && (
          <div className="space-y-6">
            <Alert className="border-blue-500/50 bg-blue-500/10 backdrop-blur-xl">
              <Brain className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-white/90">
                <strong>Guión generado exitosamente por Claude AI.</strong> {generatedScript.estadisticas.totalPaginas} páginas en formato profesional listas para revisión.
              </AlertDescription>
            </Alert>

            {/* Script Statistics */}
            <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-400" />
                  Estadísticas del Guión
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center p-4 bg-slate-800/30 backdrop-blur-sm rounded-lg border border-white/5">
                    <p className="text-white font-semibold text-2xl">{generatedScript.estadisticas.totalPaginas}</p>
                    <p className="text-white/60 text-sm">Páginas</p>
                  </div>
                  <div className="text-center p-4 bg-slate-800/30 backdrop-blur-sm rounded-lg border border-white/5">
                    <p className="text-white font-semibold text-2xl">{generatedScript.estadisticas.totalEscenas}</p>
                    <p className="text-white/60 text-sm">Escenas</p>
                  </div>
                  <div className="text-center p-4 bg-slate-800/30 backdrop-blur-sm rounded-lg border border-white/5">
                    <p className="text-white font-semibold text-2xl">{generatedScript.estadisticas.totalDialogos}</p>
                    <p className="text-white/60 text-sm">Diálogos</p>
                  </div>
                  <div className="text-center p-4 bg-slate-800/30 backdrop-blur-sm rounded-lg border border-white/5">
                    <p className="text-white font-semibold text-2xl">{generatedScript.estadisticas.totalPalabras.toLocaleString()}</p>
                    <p className="text-white/60 text-sm">Palabras</p>
                  </div>
                  <div className="text-center p-4 bg-slate-800/30 backdrop-blur-sm rounded-lg border border-white/5">
                    <p className="text-white font-semibold text-2xl">{generatedScript.metadatos.duracionEstimada}</p>
                    <p className="text-white/60 text-sm">Duración</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Script Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Páginas del Guión</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <div className="space-y-2">
                      {Array.from({length: Math.min(5, generatedScript.paginas.length)}, (_, i) => (
                        <Button
                          key={i + 1}
                          variant={selectedPage === i + 1 ? "default" : "ghost"}
                          className={`w-full justify-start text-left ${
                            selectedPage === i + 1 
                              ? "bg-blue-500/20 text-blue-400 border-blue-400/50" 
                              : "text-white/70 hover:bg-white/5"
                          }`}
                          onClick={() => setSelectedPage(i + 1)}
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Página {i + 1}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2 bg-slate-900/50 border border-white/10 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white text-sm">
                    <strong>Página {selectedPage} de {generatedScript.estadisticas.totalPaginas}</strong>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <pre className="text-white/80 text-sm font-mono whitespace-pre-wrap">
                      {generatedScript.paginas[selectedPage - 1]?.contenido}
                    </pre>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline"
                  onClick={handleBack}
                  className="border-white/20 text-white/80 hover:bg-white/5 backdrop-blur-sm"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Fase Anterior
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleRegenerate}
                  className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 backdrop-blur-sm"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerar Guión
                </Button>
              </div>
              
              <Button 
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold shadow-lg shadow-green-500/25"
                onClick={handleApprove}
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Aprobar Guión
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 'approved' && (
          <div className="text-center py-12">
            <Card className="bg-slate-900/50 border border-green-500/50 backdrop-blur-xl max-w-2xl mx-auto shadow-2xl">
              <CardContent className="pt-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full">
                    <CheckCircle className="w-12 h-12 text-green-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
                  ¡Fase 3 Completada!
                </h3>
                <p className="text-white/70 mb-4">
                  Guión aprobado. Procediendo a la Fase 4: Control de Calidad...
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
