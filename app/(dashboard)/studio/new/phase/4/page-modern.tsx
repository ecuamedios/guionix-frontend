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
  Users,
  Shield
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
      const checkCategories = [
        {
          name: 'Formato y Estructura',
          checks: [
            'Verificación de formato estándar',
            'Análisis de estructura de tres actos',
            'Validación de longitud apropiada',
            'Consistencia de formato de escenas'
          ]
        },
        {
          name: 'Personajes y Diálogos',
          checks: [
            'Desarrollo de personajes',
            'Autenticidad de diálogos',
            'Diversidad de voces',
            'Arcos narrativos de personajes'
          ]
        },
        {
          name: 'Narrativa y Ritmo',
          checks: [
            'Coherencia narrativa',
            'Ritmo y timing',
            'Tensión dramática',
            'Resolución satisfactoria'
          ]
        },
        {
          name: 'Cumplimiento Industrial',
          checks: [
            'Estándares de la industria',
            'Compatibilidad con software',
            'Requisitos de producción',
            'Viabilidad comercial'
          ]
        }
      ];

      let currentProgress = 0;
      let categoryIndex = 0;
      let checkIndex = 0;

      const interval = setInterval(() => {
        if (categoryIndex < checkCategories.length) {
          const currentCategory = checkCategories[categoryIndex];
          const currentCheckName = currentCategory.checks[checkIndex];
          
          setCurrentCheck(`${currentCategory.name}: ${currentCheckName}`);
          
          currentProgress += 1.2;
          setProgress(Math.min(currentProgress, 100));
          
          checkIndex++;
          if (checkIndex >= currentCategory.checks.length) {
            categoryIndex++;
            checkIndex = 0;
          }
          
          if (currentProgress >= 100) {
            clearInterval(interval);
            setIsAnalyzing(false);
            setStep('report');
            generateQualityReport();
          }
        }
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  const generateQualityReport = () => {
    const mockQualityChecks: QualityCheck[] = [
      {
        category: "Formato y Estructura",
        checks: [
          {
            name: "Formato estándar de guión",
            status: 'passed',
            score: 95,
            details: "El guión sigue las convenciones estándar de la industria cinematográfica.",
            suggestions: ["Revisar algunos espaciados menores"]
          },
          {
            name: "Estructura de tres actos",
            status: 'passed',
            score: 92,
            details: "Estructura narrativa bien balanceada con puntos de giro efectivos."
          },
          {
            name: "Longitud apropiada",
            status: 'passed',
            score: 88,
            details: "118 páginas - longitud ideal para thriller tecnológico."
          }
        ]
      },
      {
        category: "Personajes y Diálogos",
        checks: [
          {
            name: "Desarrollo de personajes",
            status: 'passed',
            score: 90,
            details: "Personajes principales bien desarrollados con arcos claros."
          },
          {
            name: "Autenticidad de diálogos",
            status: 'warning',
            score: 78,
            details: "Algunos diálogos técnicos podrían ser más naturales.",
            suggestions: ["Simplificar jerga técnica", "Añadir más subtext"]
          },
          {
            name: "Diversidad de voces",
            status: 'passed',
            score: 85,
            details: "Cada personaje tiene una voz distintiva y creíble."
          }
        ]
      },
      {
        category: "Narrativa y Ritmo",
        checks: [
          {
            name: "Coherencia narrativa",
            status: 'passed',
            score: 94,
            details: "Historia cohesiva sin agujeros de trama significativos."
          },
          {
            name: "Ritmo y timing",
            status: 'passed',
            score: 87,
            details: "Buen ritmo general con momentos de tensión bien distribuidos."
          },
          {
            name: "Tensión dramática",
            status: 'passed',
            score: 91,
            details: "Excelente escalada de tensión a lo largo de los tres actos."
          }
        ]
      }
    ];

    setQualityChecks(mockQualityChecks);

    const mockFinalReport: FinalReport = {
      overallScore: 89,
      grade: 'A',
      readyForProduction: true,
      strengths: [
        "Estructura narrativa sólida y bien balanceada",
        "Personajes convincentes con motivaciones claras",
        "Tema tecnológico relevante y actual",
        "Diálogos naturales y efectivos",
        "Formato profesional estándar"
      ],
      improvements: [
        "Simplificar algunos términos técnicos para mayor accesibilidad",
        "Desarrollar más el trasfondo de personajes secundarios",
        "Considerar añadir más momentos de alivio cómico"
      ],
      industryCompliance: {
        formatting: true,
        structure: true,
        length: true,
        characters: true
      },
      aiProviderScores: {
        grok: 85,
        chatgpt: 88,
        claude: 91,
        hybrid: 89
      },
      exportOptions: [
        {
          format: "Final Draft (.fdx)",
          description: "Estándar de la industria para producción profesional",
          compatible: ["Final Draft", "WriterDuet", "Celtx"]
        },
        {
          format: "Fountain (.fountain)",
          description: "Formato de texto plano para colaboración y control de versiones",
          compatible: ["Highland", "Slugline", "Trelby"]
        },
        {
          format: "PDF",
          description: "Para revisión y distribución general",
          compatible: ["Cualquier lector PDF"]
        }
      ]
    };

    setFinalReport(mockFinalReport);
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
    // Aquí se podría guardar el proyecto final
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  const handleBack = () => {
    router.push('/studio/new/phase/3');
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
              <div className="p-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Fase 4</h1>
                <p className="text-sm text-white/60">Control de Calidad</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-emerald-400 border-emerald-400/50 bg-emerald-500/10">
                AI Quality Control
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Control de Calidad Final</h2>
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
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg shadow-green-400/30"></div>
                <span className="text-sm text-white/80">Fase 3</span>
              </div>
              <ArrowRight className="w-4 h-4 text-white/40" />
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-pulse shadow-lg shadow-emerald-400/30"></div>
                <span className="text-sm text-white font-medium">Fase 4</span>
              </div>
            </div>
          </div>
        </div>

        {step === 'analyzing' && (
          <div className="text-center py-12">
            <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl max-w-3xl mx-auto shadow-2xl">
              <CardContent className="pt-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full">
                    <Brain className="w-12 h-12 text-white animate-pulse" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
                  Analizando Calidad del Guión...
                </h3>
                <p className="text-white/70 mb-6">
                  Ejecutando verificaciones de calidad con IA híbrida (Grok + Claude + ChatGPT)
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Progreso de Análisis</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>

                <div className="text-center mb-6">
                  <p className="text-emerald-400 font-medium">{currentCheck}</p>
                </div>

                <div className="flex items-center justify-center text-emerald-400">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  <span>Analizando con IA híbrida...</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'report' && finalReport && (
          <div className="space-y-6">
            <Alert className="border-emerald-500/50 bg-emerald-500/10 backdrop-blur-xl">
              <Award className="h-4 w-4 text-emerald-400" />
              <AlertDescription className="text-white/90">
                <strong>Análisis de calidad completado.</strong> Tu guión ha obtenido una calificación de <strong>{finalReport.grade}</strong> con un puntaje de {finalReport.overallScore}/100.
              </AlertDescription>
            </Alert>

            {/* Overall Score */}
            <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-emerald-400" />
                    Calificación General
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-2xl px-4 py-2 ${
                      finalReport.grade === 'A+' || finalReport.grade === 'A' 
                        ? 'text-emerald-400 border-emerald-400/50 bg-emerald-500/10'
                        : 'text-yellow-400 border-yellow-400/50 bg-yellow-500/10'
                    }`}
                  >
                    {finalReport.grade}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-3">Fortalezas</h4>
                    <ul className="space-y-2">
                      {finalReport.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start text-white/70 text-sm">
                          <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-emerald-400 flex-shrink-0" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-3">Áreas de Mejora</h4>
                    <ul className="space-y-2">
                      {finalReport.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start text-white/70 text-sm">
                          <Target className="w-4 h-4 mr-2 mt-0.5 text-yellow-400 flex-shrink-0" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quality Checks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {qualityChecks.map((category, index) => (
                <Card key={index} className="bg-slate-900/50 border border-white/10 backdrop-blur-xl shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.checks.map((check, checkIndex) => (
                        <div key={checkIndex} className="flex items-center justify-between p-3 bg-slate-800/30 backdrop-blur-sm rounded-lg border border-white/5">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <div className="flex-1">
                                <p className="text-white font-medium text-sm">{check.name}</p>
                                <p className="text-white/60 text-xs mt-1">{check.details}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge 
                                  variant="outline" 
                                  className={`${
                                    check.status === 'passed' 
                                      ? 'text-emerald-400 border-emerald-400/50 bg-emerald-500/10'
                                      : check.status === 'warning'
                                      ? 'text-yellow-400 border-yellow-400/50 bg-yellow-500/10'
                                      : 'text-red-400 border-red-400/50 bg-red-500/10'
                                  }`}
                                >
                                  {check.score}%
                                </Badge>
                                {check.status === 'passed' && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                                {check.status === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-400" />}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Export Options */}
            <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Download className="w-5 h-5 mr-2 text-blue-400" />
                  Opciones de Exportación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {finalReport.exportOptions.map((option, index) => (
                    <div key={index} className="p-4 bg-slate-800/30 backdrop-blur-sm rounded-lg border border-white/5">
                      <h4 className="text-white font-semibold mb-2">{option.format}</h4>
                      <p className="text-white/60 text-sm mb-3">{option.description}</p>
                      <Button 
                        size="sm" 
                        className="w-full bg-blue-500/20 text-blue-400 border border-blue-400/50 hover:bg-blue-500/30"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Descargar
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

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
                  onClick={handleReanalyze}
                  className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 backdrop-blur-sm"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Re-analizar
                </Button>
              </div>
              
              <Button 
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold shadow-lg shadow-emerald-500/25"
                onClick={handleComplete}
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Completar Proyecto
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 'completed' && (
          <div className="text-center py-12">
            <Card className="bg-slate-900/50 border border-emerald-500/50 backdrop-blur-xl max-w-2xl mx-auto shadow-2xl">
              <CardContent className="pt-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full">
                    <Award className="w-12 h-12 text-emerald-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
                  ¡Proyecto Completado!
                </h3>
                <p className="text-white/70 mb-4">
                  Tu guión está listo para producción. Todas las fases han sido completadas exitosamente.
                </p>
                <div className="flex items-center justify-center text-emerald-400">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  <span>Redirigiendo al dashboard...</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
