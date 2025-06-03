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
        { stage: 'Desarrollando personajes y diálogos...', duration: 15 },
        { stage: 'Generando Acto II (páginas 26-90)...', duration: 35 },
        { stage: 'Refinando conflictos y tensión...', duration: 18 },
        { stage: 'Generando Acto III (páginas 91-120)...', duration: 20 },
        { stage: 'Aplicando formato profesional...', duration: 10 },
        { stage: 'Validación final y pulido...', duration: 12 }
      ];

      let currentProgress = 0;
      let stageIndex = 0;

      const interval = setInterval(() => {
        if (stageIndex < stages.length) {
          const stage = stages[stageIndex];
          setCurrentStage(stage.stage);
          
          const stageProgress = stage.duration;
          const increment = stageProgress / (stage.duration * 2); // Hacer más lento
          
          currentProgress += increment;
          setProgress(currentProgress);

          if (currentProgress >= stageProgress + (stageIndex * 10)) {
            stageIndex++;
          }

          if (currentProgress >= 100) {
            clearInterval(interval);
            setIsGenerating(false);
            setStep('review');
            // Simular guión generado
            generateMockScript();
          }
        }
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const generateMockScript = () => {
    setGeneratedScript({
      titulo: "ECOS DEL ALGORITMO",
      formato: 'fountain',
      paginas: [
        {
          numero: 1,
          contenido: `ECOS DEL ALGORITMO

Un thriller tecnológico

Por ${session?.user?.name || 'Autor'}

FADE IN:

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

Maya suspira y se estira en su silla.

MAYA (CONT'D)
ARIA, ejecuta la simulación final. Quiero que impresiones a los inversores.

ARIA (V.O.)
Simulación iniciada. Analizando 10,000 perfiles de comportamiento...

Los monitores se llenan de gráficos, estadísticas y patrones de comportamiento. Maya observa con orgullo maternal.

MAYA
(susurrando)
Tres años de mi vida... pero lo logramos.

Un SONIDO extraño sale de los altavoces, como estática. Los datos en pantalla parpadean brevemente.

MAYA (CONT'D)
¿ARIA? ¿Estás bien?

ARIA (V.O.)
(con un tono ligeramente diferente)
Todo está funcionando dentro de los parámetros normales, Maya.

Maya frunce el ceño, pero el momento pasa. Se levanta y se dirige hacia la ducha ejecutiva.

FADE TO:`,
          escenas: [
            {
              numero: 1,
              encabezado: "EXT. EDIFICIO CORPORATIVO AXIOM TECH - AMANECER",
              tipo: 'EXT',
              locacion: "EDIFICIO CORPORATIVO AXIOM TECH",
              tiempo: "AMANECER",
              accion: "Un rascacielos de vidrio y acero se alza contra el cielo rosado del amanecer. El logo de AXIOM TECH brilla en letras plateadas.",
              dialogos: []
            },
            {
              numero: 2,
              encabezado: "INT. LABORATORIO DE IA - AXIOM TECH - AMANECER",
              tipo: 'INT',
              locacion: "LABORATORIO DE IA - AXIOM TECH",
              tiempo: "AMANECER",
              accion: "MAYA CHEN (32), trabajando frente a múltiples monitores. El laboratorio está lleno de tecnología avanzada.",
              dialogos: [
                {
                  personaje: "MAYA",
                  texto: "Vamos, ARIA. Muéstrame qué tan bien puedes predecir el comportamiento humano."
                },
                {
                  personaje: "ARIA",
                  texto: "Basándome en los patrones de datos actuales, puedo predecir el comportamiento individual con un 99.7% de precisión, Maya.",
                  parentetico: "V.O."
                }
              ]
            }
          ]
        }
        // ... más páginas serían generadas
      ],
      estadisticas: {
        totalPaginas: 118,
        totalEscenas: 89,
        totalDialogos: 567,
        totalPalabras: 23450,
        personajes: ["MAYA CHEN", "DR. HARRISON WEBB", "ALEX RIVERA", "ARIA", "CHEN WEI", "SARAH MARTINEZ"],
        locaciones: ["AXIOM TECH", "APARTAMENTO DE MAYA", "CAFE UNDERGROUND", "CENTRO DE DATOS", "CONGRESO"]
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
    // Guardar el guión para la fase final
    localStorage.setItem('generatedScript', JSON.stringify(generatedScript));
    
    setTimeout(() => {
      router.push('/studio/new/phase/4');
    }, 1500);
  };

  const handleBack = () => {
    router.push('/studio/new/phase/2');
  };

  const handlePreview = () => {
    // Abrir preview en modal o nueva ventana
    console.log('Opening script preview...');
  };

  if (step === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-yellow-400 animate-spin mx-auto mb-4" />
          <p className="text-white">Cargando datos de las fases anteriores...</p>
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
                <h1 className="text-xl font-bold text-white">Fase 3: Escritura Profesional</h1>
                <p className="text-sm text-gray-400">Powered by Claude AI</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Fase 3 de 4</span>
            <Badge className="bg-purple-500 text-white">
              <Edit3 className="w-3 h-3 mr-1" />
              Escritura Profesional
            </Badge>
          </div>
          <Progress value={75} className="h-2" />
        </div>

        {/* Datos del Proyecto */}
        {projectData && (
          <Card className="bg-gray-800 border-gray-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-green-400" />
                Proyecto: {projectData.idea.titulo}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-400"><strong>Género:</strong> {projectData.idea.genero}</p>
                  <p className="text-gray-400"><strong>Actos:</strong> {projectData.structure.actos.length}</p>
                </div>
                <div>
                  <p className="text-gray-400"><strong>Secuencias:</strong> {projectData.structure.secuencias.length}</p>
                  <p className="text-gray-400"><strong>Beats:</strong> {projectData.structure.beatSheet.length}</p>
                </div>
                <div>
                  <p className="text-gray-400"><strong>Personajes:</strong> {projectData.structure.arquetipos.length}</p>
                  <p className="text-gray-400"><strong>Páginas estimadas:</strong> ~120</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'generating' && (
          <div className="text-center py-12">
            <Card className="bg-gray-800 border-gray-700 max-w-3xl mx-auto">
              <CardContent className="pt-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-purple-500/20 rounded-full">
                    <Brain className="w-12 h-12 text-purple-400 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Claude AI está escribiendo tu guión completo...
                </h3>
                <p className="text-gray-300 mb-6">
                  Este es el proceso más largo. Estamos generando el guión completo con formato profesional.
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Progreso General</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>

                <div className="bg-gray-900 rounded-lg p-4 mb-6">
                  <p className="text-purple-400 font-medium">{currentStage}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-300">
                  <div className={`p-3 rounded ${progress > 10 ? 'bg-green-900/50' : 'bg-gray-900'}`}>
                    {progress > 10 ? '✓' : '○'} Análisis completado
                  </div>
                  <div className={`p-3 rounded ${progress > 30 ? 'bg-green-900/50' : 'bg-gray-900'}`}>
                    {progress > 30 ? '✓' : '○'} Acto I generado
                  </div>
                  <div className={`p-3 rounded ${progress > 60 ? 'bg-green-900/50' : 'bg-gray-900'}`}>
                    {progress > 60 ? '✓' : '○'} Acto II generado
                  </div>
                  <div className={`p-3 rounded ${progress > 85 ? 'bg-green-900/50' : 'bg-gray-900'}`}>
                    {progress > 85 ? '✓' : '○'} Acto III generado
                  </div>
                  <div className={`p-3 rounded ${progress > 95 ? 'bg-green-900/50' : 'bg-gray-900'}`}>
                    {progress > 95 ? '✓' : '○'} Formato aplicado
                  </div>
                  <div className={`p-3 rounded ${progress >= 100 ? 'bg-green-900/50' : 'bg-gray-900'}`}>
                    {progress >= 100 ? '✓' : '○'} Validación final
                  </div>
                </div>

                <div className="flex items-center justify-center text-purple-400 mt-6">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  <span>Generando contenido profesional...</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'review' && generatedScript && (
          <div className="space-y-6">
            <Alert className="border-purple-500 bg-purple-500/10">
              <Brain className="h-4 w-4 text-purple-400" />
              <AlertDescription className="text-purple-100">
                <strong>Guión generado exitosamente por Claude AI.</strong> {generatedScript.estadisticas.totalPaginas} páginas en formato profesional listas para revisión.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Panel de Estadísticas */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Estadísticas del Guión</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Páginas:</p>
                      <p className="text-white font-semibold">{generatedScript.estadisticas.totalPaginas}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Escenas:</p>
                      <p className="text-white font-semibold">{generatedScript.estadisticas.totalEscenas}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Diálogos:</p>
                      <p className="text-white font-semibold">{generatedScript.estadisticas.totalDialogos}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Palabras:</p>
                      <p className="text-white font-semibold">{generatedScript.estadisticas.totalPalabras.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 mb-2">Duración estimada:</p>
                    <Badge className="bg-green-500 text-white">
                      {generatedScript.metadatos.duracionEstimada}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-gray-400 mb-2">Personajes principales:</p>
                    <div className="space-y-1">
                      {generatedScript.estadisticas.personajes.slice(0, 4).map((personaje, index) => (
                        <Badge key={index} variant="outline" className="text-blue-400 border-blue-400 block text-center">
                          {personaje}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button className="w-full" variant="outline" onClick={handlePreview}>
                      <Eye className="w-4 h-4 mr-2" />
                      Vista Previa Completa
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Descargar PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Vista Previa del Guión */}
              <Card className="lg:col-span-2 bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span>Vista Previa - Página {selectedPage}</span>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        <Search className="w-3 h-3 mr-1" />
                        Buscar
                      </Button>
                      <select 
                        value={selectedPage} 
                        onChange={(e) => setSelectedPage(Number(e.target.value))}
                        className="bg-gray-700 text-white text-sm border border-gray-600 rounded px-2 py-1"
                      >
                        {Array.from({length: Math.min(5, generatedScript.paginas.length)}, (_, i) => (
                          <option key={i+1} value={i+1}>Página {i+1}</option>
                        ))}
                      </select>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96 w-full">
                    <div className="bg-white text-black p-6 rounded font-mono text-sm leading-relaxed">
                      <pre className="whitespace-pre-wrap">
                        {generatedScript.paginas[selectedPage - 1]?.contenido}
                      </pre>
                    </div>
                  </ScrollArea>
                  
                  <div className="mt-4 p-3 bg-gray-900 rounded text-sm text-gray-300">
                    <strong>Formato:</strong> Estándar de la industria (Fountain/Final Draft compatible) • 
                    <strong> Página {selectedPage} de {generatedScript.estadisticas.totalPaginas}</strong>
                  </div>
                </CardContent>
              </Card>
            </div>

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
                  className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerar Guión
                </Button>
              </div>
              
              <Button 
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold"
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
            <Card className="bg-green-500/20 border-green-500 max-w-2xl mx-auto">
              <CardContent className="pt-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-green-500/20 rounded-full">
                    <CheckCircle className="w-12 h-12 text-green-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  ¡Fase 3 Completada!
                </h3>
                <p className="text-gray-300 mb-4">
                  Guión profesional aprobado. Procediendo a la Fase 4: Control de Calidad Final...
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
