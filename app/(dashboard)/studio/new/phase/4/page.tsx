"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Brain,
  Loader2,
  Award,
  RefreshCw,
  Film,
  AlertTriangle,
  Download,
  Share,
  Eye,
  FileText,
  Star,
  Target,
  Zap,
  BookOpen,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface QualityCheck {
  category: string;
  checks: {
    name: string;
    status: 'pending' | 'running' | 'passed' | 'warning' | 'failed';
    score: number;
    details: string;
    suggestions?: string[];
  }[];
}

interface FinalReport {
  overallScore: number;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D';
  readyForProduction: boolean;
  strengths: string[];
  improvements: string[];
  industryCompliance: {
    formatting: boolean;
    structure: boolean;
    length: boolean;
    characters: boolean;
  };
  aiProviderScores: {
    grok: number;
    chatgpt: number;
    claude: number;
    hybrid: number;
  };
  exportOptions: {
    format: string;
    description: string;
    compatible: string[];
  }[];
}

export default function Phase4QualityControl() {
  const { data: session } = useSession();
  const router = useRouter();
  const [step, setStep] = useState<'loading' | 'analyzing' | 'report' | 'completed'>('loading');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentCheck, setCurrentCheck] = useState('');
  const [projectData, setProjectData] = useState<any>(null);
  const [qualityChecks, setQualityChecks] = useState<QualityCheck[]>([]);
  const [finalReport, setFinalReport] = useState<FinalReport | null>(null);

  // Cargar datos de todas las fases anteriores
  useEffect(() => {
    const savedIdea = localStorage.getItem('projectIdea');
    const savedStructure = localStorage.getItem('projectStructure');
    const savedScript = localStorage.getItem('generatedScript');
    
    if (savedIdea && savedStructure && savedScript) {
      setProjectData({
        idea: JSON.parse(savedIdea),
        structure: JSON.parse(savedStructure),
        script: JSON.parse(savedScript)
      });
      setStep('analyzing');
      setIsAnalyzing(true);
    } else {
      router.push('/studio/new/phase/1');
    }
  }, [router]);

  // Simular proceso de análisis de calidad
  useEffect(() => {
    if (isAnalyzing) {
      const checks = [
        'Analizando formato y estructura...',
        'Verificando coherencia narrativa...',
        'Evaluando desarrollo de personajes...',
        'Revisando diálogos y ritmo...',
        'Comprobando estándares de la industria...',
        'Validando duración y paginación...',
        'Análisis de temas y tono...',
        'Verificación de continuidad...',
        'Evaluación de comerciabilidad...',
        'Generando reporte final...'
      ];

      let currentProgress = 0;
      let checkIndex = 0;

      const interval = setInterval(() => {
        if (checkIndex < checks.length) {
          setCurrentCheck(checks[checkIndex]);
          
          currentProgress += 10;
          setProgress(currentProgress);

          if (currentProgress >= (checkIndex + 1) * 10) {
            checkIndex++;
          }

          if (currentProgress >= 100) {
            clearInterval(interval);
            setIsAnalyzing(false);
            setStep('report');
            generateQualityReport();
          }
        }
      }, 800);

      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  const generateQualityReport = () => {
    setQualityChecks([
      {
        category: "Formato y Estructura",
        checks: [
          {
            name: "Formato de Guión Estándar",
            status: 'passed',
            score: 95,
            details: "Cumple perfectamente con el formato Final Draft/Fountain"
          },
          {
            name: "Estructura de Tres Actos",
            status: 'passed',
            score: 92,
            details: "Estructura narrativa bien definida con puntos de giro claros"
          },
          {
            name: "Longitud Apropiada",
            status: 'passed',
            score: 88,
            details: "118 páginas - dentro del rango ideal para largometraje"
          }
        ]
      },
      {
        category: "Narrativa y Personajes",
        checks: [
          {
            name: "Desarrollo de Protagonista",
            status: 'passed',
            score: 94,
            details: "Maya Chen tiene un arco narrativo completo y convincente"
          },
          {
            name: "Conflicto Principal",
            status: 'passed',
            score: 91,
            details: "Conflicto tecnológico-ético bien establecido y desarrollado"
          },
          {
            name: "Personajes Secundarios",
            status: 'warning',
            score: 78,
            details: "Algunos personajes secundarios podrían tener más profundidad",
            suggestions: ["Desarrollar más el background de Alex Rivera", "Añadir motivaciones específicas para Dr. Webb"]
          }
        ]
      },
      {
        category: "Diálogos y Estilo",
        checks: [
          {
            name: "Naturalidad de Diálogos",
            status: 'passed',
            score: 89,
            details: "Diálogos fluidos y apropiados para cada personaje"
          },
          {
            name: "Consistencia de Voz",
            status: 'passed',
            score: 92,
            details: "Cada personaje mantiene una voz distintiva"
          },
          {
            name: "Ritmo y Pacing",
            status: 'passed',
            score: 87,
            details: "Buen equilibrio entre acción, diálogo y descripción"
          }
        ]
      },
      {
        category: "Comerciabilidad",
        checks: [
          {
            name: "Relevancia del Tema",
            status: 'passed',
            score: 96,
            details: "Temática de IA muy actual y comercial"
          },
          {
            name: "Audiencia Objetivo",
            status: 'passed',
            score: 90,
            details: "Atractivo para audiencia amplia 18-54 años"
          },
          {
            name: "Potencial de Producción",
            status: 'passed',
            score: 85,
            details: "Presupuesto medio, locaciones factibles"
          }
        ]
      }
    ]);

    setFinalReport({
      overallScore: 89,
      grade: 'B+',
      readyForProduction: true,
      strengths: [
        "Concepto original y muy actual",
        "Estructura narrativa sólida",
        "Protagonista bien desarrollada",
        "Temática relevante y comercial",
        "Formato profesional impecable"
      ],
      improvements: [
        "Expandir personajes secundarios",
        "Añadir más tensión en el segundo acto",
        "Revisar algunos diálogos técnicos",
        "Considerar subtramas adicionales"
      ],
      industryCompliance: {
        formatting: true,
        structure: true,
        length: true,
        characters: true
      },
      aiProviderScores: {
        grok: 92,
        chatgpt: 88,
        claude: 91,
        hybrid: 89
      },
      exportOptions: [
        {
          format: "PDF Final Draft",
          description: "Formato estándar de la industria",
          compatible: ["Final Draft", "WriterDuet", "Celtx"]
        },
        {
          format: "Fountain",
          description: "Formato de texto plano universal",
          compatible: ["Highland", "Slugline", "Trelby"]
        },
        {
          format: "Word Document",
          description: "Para revisiones y comentarios",
          compatible: ["Microsoft Word", "Google Docs"]
        }
      ]
    });
  };

  const handleReanalyze = () => {
    setQualityChecks([]);
    setFinalReport(null);
    setIsAnalyzing(true);
    setProgress(0);
    setCurrentCheck('');
    setStep('analyzing');
  };

  const handleComplete = () => {
    setStep('completed');
    // Guardar proyecto final
    const finalProject = {
      ...projectData,
      qualityReport: finalReport,
      completedAt: new Date().toISOString(),
      status: 'completed'
    };
    localStorage.setItem('completedProject', JSON.stringify(finalProject));
    
    setTimeout(() => {
      router.push('/studio');
    }, 2000);
  };

  const handleBack = () => {
    router.push('/studio/new/phase/3');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'failed': return <AlertTriangle className="w-4 h-4" />;
      default: return <Loader2 className="w-4 h-4 animate-spin" />;
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-400';
    if (grade.startsWith('B')) return 'text-blue-400';
    if (grade.startsWith('C')) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (step === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-yellow-400 animate-spin mx-auto mb-4" />
          <p className="text-white">Cargando datos del proyecto...</p>
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
                disabled={step === 'analyzing'}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Fase Anterior
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <Film className="w-8 h-8 text-yellow-400" />
              <div>
                <h1 className="text-xl font-bold text-white">Fase 4: Control de Calidad</h1>
                <p className="text-sm text-gray-400">Sistema Híbrido de Validación</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Fase 4 de 4</span>
            <Badge className="bg-green-500 text-white">
              <CheckCircle className="w-3 h-3 mr-1" />
              Control de Calidad
            </Badge>
          </div>
          <Progress value={100} className="h-2" />
        </div>

        {/* Resumen del Proyecto */}
        {projectData && (
          <Card className="bg-gray-800 border-gray-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-400" />
                {projectData.idea.titulo} - Análisis Final
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-400"><strong>Páginas:</strong> {projectData.script.estadisticas.totalPaginas}</p>
                  <p className="text-gray-400"><strong>Escenas:</strong> {projectData.script.estadisticas.totalEscenas}</p>
                </div>
                <div>
                  <p className="text-gray-400"><strong>Personajes:</strong> {projectData.script.estadisticas.personajes.length}</p>
                  <p className="text-gray-400"><strong>Diálogos:</strong> {projectData.script.estadisticas.totalDialogos}</p>
                </div>
                <div>
                  <p className="text-gray-400"><strong>Palabras:</strong> {projectData.script.estadisticas.totalPalabras.toLocaleString()}</p>
                  <p className="text-gray-400"><strong>Duración:</strong> {projectData.script.metadatos.duracionEstimada}</p>
                </div>
                <div>
                  <p className="text-gray-400"><strong>Género:</strong> {projectData.idea.genero}</p>
                  <p className="text-gray-400"><strong>Estado:</strong> <span className="text-green-400">Listo para análisis</span></p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'analyzing' && (
          <div className="text-center py-12">
            <Card className="bg-gray-800 border-gray-700 max-w-3xl mx-auto">
              <CardContent className="pt-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-green-500/20 rounded-full">
                    <Brain className="w-12 h-12 text-green-400 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Sistema Híbrido analizando calidad...
                </h3>
                <p className="text-gray-300 mb-6">
                  Ejecutando controles de calidad comprehensivos con múltiples AIs
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Progreso del Análisis</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>

                <div className="bg-gray-900 rounded-lg p-4 mb-6">
                  <p className="text-green-400 font-medium">{currentCheck}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                  <div className={`p-3 rounded ${progress > 20 ? 'bg-green-900/50' : 'bg-gray-900'}`}>
                    {progress > 20 ? '✓' : '○'} Formato verificado
                  </div>
                  <div className={`p-3 rounded ${progress > 40 ? 'bg-green-900/50' : 'bg-gray-900'}`}>
                    {progress > 40 ? '✓' : '○'} Narrativa analizada
                  </div>
                  <div className={`p-3 rounded ${progress > 60 ? 'bg-green-900/50' : 'bg-gray-900'}`}>
                    {progress > 60 ? '✓' : '○'} Personajes evaluados
                  </div>
                  <div className={`p-3 rounded ${progress > 80 ? 'bg-green-900/50' : 'bg-gray-900'}`}>
                    {progress > 80 ? '✓' : '○'} Comerciabilidad revisada
                  </div>
                </div>

                <div className="flex items-center justify-center text-green-400 mt-6">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  <span>Generando reporte de calidad...</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'report' && finalReport && (
          <div className="space-y-6">
            {/* Reporte Principal */}
            <Alert className={`border-2 ${finalReport.readyForProduction ? 'border-green-500 bg-green-500/10' : 'border-yellow-500 bg-yellow-500/10'}`}>
              <Award className={`h-5 w-5 ${finalReport.readyForProduction ? 'text-green-400' : 'text-yellow-400'}`} />
              <AlertDescription className={finalReport.readyForProduction ? 'text-green-100' : 'text-yellow-100'}>
                <div className="flex items-center justify-between">
                  <div>
                    <strong>Análisis Completado:</strong> Puntuación general <span className={getGradeColor(finalReport.grade)}>{finalReport.overallScore}/100 ({finalReport.grade})</span>
                    <br />
                    <strong>Estado:</strong> {finalReport.readyForProduction ? '✅ Listo para producción' : '⚠️ Requiere revisiones menores'}
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${getGradeColor(finalReport.grade)}`}>
                      {finalReport.grade}
                    </div>
                  </div>
                </div>
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Puntuaciones por IA */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-400" />
                    Puntuaciones por IA
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">X.AI/Grok</span>
                      <Badge className="bg-blue-500">{finalReport.aiProviderScores.grok}/100</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">ChatGPT-4</span>
                      <Badge className="bg-green-500">{finalReport.aiProviderScores.chatgpt}/100</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Claude</span>
                      <Badge className="bg-purple-500">{finalReport.aiProviderScores.claude}/100</Badge>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold">Sistema Híbrido</span>
                      <Badge className="bg-yellow-500 text-black">{finalReport.aiProviderScores.hybrid}/100</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cumplimiento Industrial */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Target className="w-5 h-5 mr-2 text-green-400" />
                    Cumplimiento Industrial
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Formato</span>
                      {finalReport.industryCompliance.formatting ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Estructura</span>
                      {finalReport.industryCompliance.structure ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Longitud</span>
                      {finalReport.industryCompliance.length ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Personajes</span>
                      {finalReport.industryCompliance.characters ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Opciones de Exportación */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Download className="w-5 h-5 mr-2 text-blue-400" />
                    Opciones de Exportación
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {finalReport.exportOptions.map((option, index) => (
                    <Button key={index} variant="outline" className="w-full justify-start" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      {option.format}
                    </Button>
                  ))}
                  <Separator />
                  <Button variant="outline" className="w-full" size="sm">
                    <Share className="w-4 h-4 mr-2" />
                    Compartir Proyecto
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Análisis Detallado */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {qualityChecks.map((category, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.checks.map((check, checkIndex) => (
                      <div key={checkIndex} className="border border-gray-600 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">{check.name}</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={getStatusColor(check.status)}>
                              {check.score}/100
                            </Badge>
                            <div className={getStatusColor(check.status)}>
                              {getStatusIcon(check.status)}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm">{check.details}</p>
                        {check.suggestions && (
                          <div className="mt-2">
                            <p className="text-yellow-400 text-xs font-medium">Sugerencias:</p>
                            <ul className="text-xs text-gray-400 mt-1 space-y-1">
                              {check.suggestions.map((suggestion, i) => (
                                <li key={i}>• {suggestion}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Fortalezas y Mejoras */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-green-400" />
                    Fortalezas del Guión
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {finalReport.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start text-gray-300">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Target className="w-5 h-5 mr-2 text-yellow-400" />
                    Áreas de Mejora
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {finalReport.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start text-gray-300">
                        <ArrowRight className="w-4 h-4 mr-2 mt-0.5 text-yellow-400 flex-shrink-0" />
                        {improvement}
                      </li>
                    ))}
                  </ul>
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
                  onClick={handleReanalyze}
                  className="border-green-500 text-green-400 hover:bg-green-500/10"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reanalizar
                </Button>
              </div>
              
              <Button 
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                onClick={handleComplete}
              >
                <Award className="w-5 h-5 mr-2" />
                Finalizar Proyecto
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 'completed' && (
          <div className="text-center py-12">
            <Card className="bg-gradient-to-br from-yellow-500/20 to-green-500/20 border-yellow-500 max-w-3xl mx-auto">
              <CardContent className="pt-8">
                <div className="flex justify-center mb-6">
                  <div className="p-6 bg-yellow-500/20 rounded-full">
                    <Award className="w-16 h-16 text-yellow-400" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  ¡Proyecto Completado Exitosamente!
                </h3>
                <p className="text-gray-300 mb-6 text-lg">
                  Tu guión "{projectData?.idea?.titulo}" ha sido creado con éxito usando nuestro sistema de IA de 4 fases.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-white font-semibold">4 IAs Utilizadas</p>
                    <p className="text-gray-400 text-sm">Sistema híbrido completo</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <BookOpen className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <p className="text-white font-semibold">{projectData?.script?.estadisticas?.totalPaginas} Páginas</p>
                    <p className="text-gray-400 text-sm">Formato profesional</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <p className="text-white font-semibold">Calificación {finalReport?.grade}</p>
                    <p className="text-gray-400 text-sm">Listo para producción</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold mr-4">
                    <Download className="w-5 h-5 mr-2" />
                    Descargar Guión Final
                  </Button>
                  <Button size="lg" variant="outline" className="border-green-500 text-green-400">
                    <Eye className="w-5 h-5 mr-2" />
                    Abrir en Studio
                  </Button>
                </div>

                <p className="text-gray-400 mt-6">
                  Redirigiendo al Studio Principal...
                </p>
                <div className="flex items-center justify-center text-yellow-400 mt-2">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  <span>Finalizando...</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
