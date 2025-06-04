'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { 
  FileText, 
  Zap, 
  Clock, 
  CheckCircle, 
  Eye,
  Download,
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'

interface ScriptData {
  title: string
  genre: string
  logline: string
  structure: any
}

interface SceneData {
  id: number
  title: string
  location: string
  timeOfDay: string
  characters: string[]
  content: string
  duration: string
  pageCount: number
}

export default function Phase3Page() {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentScene, setCurrentScene] = useState(0)
  const [generatedScript, setGeneratedScript] = useState<SceneData[]>([])
  const [scriptData, setScriptData] = useState<ScriptData | null>(null)
  const [stage, setStage] = useState<string>('Inicializando Claude AI...')

  useEffect(() => {
    // Load data from previous phases
    const storedData = localStorage.getItem('guionix-script-data')
    if (storedData) {
      setScriptData(JSON.parse(storedData))
    }
  }, [])

  const generateScript = async () => {
    setIsGenerating(true)
    setProgress(0)
    
    const stages = [
      'Inicializando Claude AI...',
      'Analizando estructura narrativa...',
      'Generando beats cinematográficos...',
      'Creando diálogos profesionales...',
      'Aplicando formato industria...',
      'Optimizando timing visual...',
      'Validando coherencia narrativa...',
      'Finalizando guión profesional...'
    ]

    // Simular generación de guión con Claude AI
    for (let i = 0; i < stages.length; i++) {
      setStage(stages[i])
      await new Promise(resolve => setTimeout(resolve, 1500))
      setProgress((i + 1) * 12.5)
    }

    // Mock script data
    const mockScript: SceneData[] = [
      {
        id: 1,
        title: "Apertura - La Llamada",
        location: "INT. APARTAMENTO MÉXICO - DÍA",
        timeOfDay: "DÍA",
        characters: ["MARÍA", "ABOGADO (V.O.)"],
        content: `FADE IN:

INT. APARTAMENTO MÉXICO - DÍA

María (28), abogada exitosa, revisa contratos cuando suena el teléfono. Su expresión cambia al escuchar.

                    MARÍA
              (incrédula)
          ¿Cómo que murió? Hablé con él 
          la semana pasada...

                    ABOGADO (V.O.)
          Lo siento, María. El funeral 
          es mañana. Y... hay algo más 
          sobre la herencia.

María se sienta lentamente, procesando la noticia.

                    MARÍA
          ¿Qué clase de "algo más"?

CLOSE-UP: Los ojos de María se llenan de lágrimas y determinación.`,
        duration: "2:30",
        pageCount: 1.5
      },
      {
        id: 2,
        title: "Regreso a Casa",
        location: "EXT. HACIENDA TEQUILERA - ATARDECER",
        timeOfDay: "ATARDECER",
        characters: ["MARÍA", "DON ROBERTO"],
        content: `EXT. HACIENDA TEQUILERA - ATARDECER

Un BMW se detiene frente a una hacienda colonial. María sale, observando los campos de agave dorado.

                    MARÍA
              (susurrando)
          Papá... ¿qué secretos guardabas?

Don Roberto (55), elegante pero intimidante, se acerca desde la casa principal.

                    DON ROBERTO
          María, mi niña. Cuánto has crecido.

                    MARÍA
          Don Roberto. No esperaba verlo aquí.

                    DON ROBERTO
              (sonrisa fría)
          Esta hacienda también es mi hogar. 
          Tu padre y yo... éramos socios.

El viento mueve los agaves, creando un susurro ominoso.`,
        duration: "3:45",
        pageCount: 2
      }
    ]

    setGeneratedScript(mockScript)
    setIsGenerating(false)
    setProgress(100)
  }

  const nextPhase = () => {
    // Save current data
    const currentData = {
      ...scriptData,
      generatedScript,
      phase3Complete: true
    }
    localStorage.setItem('guionix-script-data', JSON.stringify(currentData))
    router.push('/studio/new/phase/4')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Fase 3: Escritura Profesional
              </h1>
              <p className="text-blue-200/80 text-lg">
                Claude AI • Conversión a formato cinematográfico • 110 minutos exactos
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-blue-400/30 text-blue-300 bg-blue-500/10">
              <Zap className="w-4 h-4 mr-2" />
              Claude AI
            </Badge>
            <Badge variant="outline" className="border-cyan-400/30 text-cyan-300 bg-cyan-500/10">
              <Clock className="w-4 h-4 mr-2" />
              110 min runtime
            </Badge>
            <Badge variant="outline" className="border-blue-400/30 text-blue-300 bg-blue-500/10">
              <FileText className="w-4 h-4 mr-2" />
              Formato profesional
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Info */}
            {scriptData && (
              <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white">Información del Proyecto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-blue-300 text-sm font-medium">Título</label>
                    <p className="text-white font-semibold text-lg">{scriptData.title}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-blue-300 text-sm font-medium">Género</label>
                      <p className="text-white">{scriptData.genre}</p>
                    </div>
                    <div>
                      <label className="text-blue-300 text-sm font-medium">Formato</label>
                      <p className="text-white">Screenplay Professional</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-blue-300 text-sm font-medium">Logline</label>
                    <p className="text-white/80 text-sm leading-relaxed">{scriptData.logline}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Generation Process */}
            {!generatedScript.length && (
              <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    Generación de Guión Profesional
                  </CardTitle>
                  <CardDescription className="text-blue-200/70">
                    Claude AI convertirá tu estructura en un guión cinematográfico profesional
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isGenerating ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center animate-pulse">
                          <Zap className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-blue-300 font-medium">{stage}</span>
                      </div>
                      <Progress value={progress} className="bg-slate-800 border border-blue-500/20" />
                      <p className="text-blue-200/60 text-sm">
                        Generando beats cinematográficos, diálogos auténticos y formato profesional...
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/20">
                        <h4 className="text-white font-semibold mb-3">Claude AI - Escritura Profesional</h4>
                        <ul className="space-y-2 text-blue-200/80 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            Conversión a beats cinematográficos (11 min por capa)
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            Formato profesional estilo Yamdu/Final Draft
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            Optimización para plataformas DramaBox
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            Timing exacto y direcciones de cámara
                          </li>
                        </ul>
                      </div>
                      
                      <Button 
                        onClick={generateScript}
                        size="lg" 
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold"
                      >
                        <FileText className="w-5 h-5 mr-2" />
                        Generar Guión Profesional
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Generated Script */}
            {generatedScript.length > 0 && (
              <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                      Guión Generado
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-blue-400/30 text-blue-300"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-green-400/30 text-green-300"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Exportar
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="text-blue-200/70">
                    Guión profesional listo para producción
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Scene Navigation */}
                    <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg border border-blue-500/20">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setCurrentScene(Math.max(0, currentScene - 1))}
                        disabled={currentScene === 0}
                        className="border-blue-400/30"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </Button>
                      <span className="text-white font-medium">
                        Escena {currentScene + 1} de {generatedScript.length}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setCurrentScene(Math.min(generatedScript.length - 1, currentScene + 1))}
                        disabled={currentScene === generatedScript.length - 1}
                        className="border-blue-400/30"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                      <div className="ml-auto flex gap-2">
                        <Badge className="bg-blue-500/20 text-blue-300">
                          {generatedScript[currentScene]?.duration}
                        </Badge>
                        <Badge className="bg-cyan-500/20 text-cyan-300">
                          {generatedScript[currentScene]?.pageCount} pág
                        </Badge>
                      </div>
                    </div>

                    {/* Current Scene */}
                    {generatedScript[currentScene] && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <h3 className="text-xl font-bold text-white">
                            {generatedScript[currentScene].title}
                          </h3>
                          <Badge className="bg-blue-500/20 text-blue-300">
                            {generatedScript[currentScene].location}
                          </Badge>
                        </div>
                        
                        <div className="bg-slate-950/50 rounded-lg p-6 border border-blue-500/10 font-mono text-sm">
                          <pre className="text-white/90 whitespace-pre-wrap leading-relaxed">
                            {generatedScript[currentScene].content}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white text-lg">Progreso de Fase</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-300">Escritura Profesional</span>
                    <span className="text-white font-bold">{progress}%</span>
                  </div>
                  <Progress value={progress} className="bg-slate-800" />
                  
                  {generatedScript.length > 0 && (
                    <div className="mt-6 space-y-3">
                      <h4 className="text-white font-semibold">Estadísticas del Guión</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                          <div className="text-2xl font-bold text-blue-300">
                            {generatedScript.length}
                          </div>
                          <div className="text-xs text-blue-200/70">Escenas</div>
                        </div>
                        <div className="bg-cyan-500/10 rounded-lg p-3 border border-cyan-500/20">
                          <div className="text-2xl font-bold text-cyan-300">
                            {generatedScript.reduce((acc, scene) => acc + scene.pageCount, 0).toFixed(1)}
                          </div>
                          <div className="text-xs text-cyan-200/70">Páginas</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Export Options */}
            {generatedScript.length > 0 && (
              <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Opciones de Exportación</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-slate-800/50 hover:bg-slate-700/50 text-white border border-white/10">
                    <FileText className="w-4 h-4 mr-2" />
                    Final Draft (.fdx)
                  </Button>
                  <Button className="w-full justify-start bg-slate-800/50 hover:bg-slate-700/50 text-white border border-white/10">
                    <FileText className="w-4 h-4 mr-2" />
                    Fountain (.fountain)
                  </Button>
                  <Button className="w-full justify-start bg-slate-800/50 hover:bg-slate-700/50 text-white border border-white/10">
                    <Download className="w-4 h-4 mr-2" />
                    PDF Profesional
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => router.push('/studio/new/phase/2')} 
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Fase Anterior
          </Button>
          
          {generatedScript.length > 0 && (
            <Button 
              onClick={nextPhase}
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold"
            >
              Continuar a Control de Calidad
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}