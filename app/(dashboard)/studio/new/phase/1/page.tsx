"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  Lightbulb, 
  ArrowRight, 
  ArrowLeft,
  Brain,
  Loader2,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Film,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

interface ProjectIdea {
  titulo: string;
  genero: string;
  logline: string;
  sinopsis: string;
  protagonista: string;
  conflictoPrincipal: string;
  tematicas: string[];
  tonoEstilo: string;
}

export default function Phase1IdeaGeneration() {
  const { data: session } = useSession();
  const router = useRouter();
  const [step, setStep] = useState<'input' | 'generating' | 'review' | 'approved'>('input');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [userInput, setUserInput] = useState({
    concepto: '',
    genero: '',
    audiencia: '',
    inspiraciones: '',
    elementos: ''
  });
  const [generatedIdea, setGeneratedIdea] = useState<ProjectIdea | null>(null);

  // Simular progreso de generación
  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsGenerating(false);
            setStep('review');
            // Simular resultado generado
            setGeneratedIdea({
              titulo: "Ecos del Algoritmo",
              genero: "Thriller Sci-Fi",
              logline: "Una programadora descubre que la IA que desarrolló para predecir comportamientos está siendo usada para manipular elecciones mundiales.",
              sinopsis: "Maya Chen, una brillante ingeniera de datos, crea ARIA, una IA capaz de predecir comportamientos humanos con 99.7% de precisión. Cuando descubre que su creación está siendo utilizada por una corporación secreta para influir en elecciones globales, debe enfrentarse a las consecuencias de su invención mientras lucha por detener una conspiración que amenaza la democracia mundial.",
              protagonista: "Maya Chen - Ingeniera de datos de 32 años, brillante pero ingénua sobre las implicaciones éticas de su trabajo.",
              conflictoPrincipal: "Maya vs. la corporación que secuestró su tecnología y vs. su propia responsabilidad como creadora.",
              tematicas: ["Ética en IA", "Responsabilidad tecnológica", "Manipulación de masas", "Poder corporativo"],
              tonoEstilo: "Thriller cerebral con elementos de drama psicológico, ritmo intenso y atmósfera techno-noir."
            });
            return 100;
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setProgress(0);
    setStep('generating');
  };

  const handleRegenerate = () => {
    setGeneratedIdea(null);
    handleGenerate();
  };

  const handleApprove = () => {
    setStep('approved');
    // Guardar en localStorage para las siguientes fases
    localStorage.setItem('projectIdea', JSON.stringify(generatedIdea));
    
    setTimeout(() => {
      router.push('/studio/new/phase/2');
    }, 1500);
  };

  const handleEdit = () => {
    setStep('input');
  };

  const isFormValid = () => {
    return userInput.concepto.trim() && userInput.genero.trim();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.push('/studio/new')}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <Film className="w-8 h-8 text-yellow-400" />
              <div>
                <h1 className="text-xl font-bold text-white">Fase 1: Generación de Ideas</h1>
                <p className="text-sm text-gray-400">Powered by X.AI/Grok</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Fase 1 de 4</span>
            <Badge className="bg-yellow-500 text-black">
              <Lightbulb className="w-3 h-3 mr-1" />
              Generación de Ideas
            </Badge>
          </div>
          <Progress value={25} className="h-2" />
        </div>

        {step === 'input' && (
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-yellow-400" />
                  Información Base del Proyecto
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Proporciona los elementos básicos de tu idea para que la IA pueda desarrollarla
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="concepto" className="text-white mb-2 block">
                    Concepto Principal *
                  </Label>
                  <Textarea
                    id="concepto"
                    placeholder="Describe brevemente tu idea central (ej: Un detective debe resolver un caso mientras pierde la memoria)"
                    value={userInput.concepto}
                    onChange={(e) => setUserInput({...userInput, concepto: e.target.value})}
                    className="bg-gray-900 border-gray-600 text-white min-h-[100px]"
                  />
                </div>

                <div>
                  <Label htmlFor="genero" className="text-white mb-2 block">
                    Género Preferido *
                  </Label>
                  <Input
                    id="genero"
                    placeholder="ej: Thriller, Drama, Sci-Fi, Comedia..."
                    value={userInput.genero}
                    onChange={(e) => setUserInput({...userInput, genero: e.target.value})}
                    className="bg-gray-900 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="audiencia" className="text-white mb-2 block">
                    Audiencia Objetivo
                  </Label>
                  <Input
                    id="audiencia"
                    placeholder="ej: Adultos 25-45, Público familiar, Jóvenes adultos..."
                    value={userInput.audiencia}
                    onChange={(e) => setUserInput({...userInput, audiencia: e.target.value})}
                    className="bg-gray-900 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="inspiraciones" className="text-white mb-2 block">
                    Referencias/Inspiraciones
                  </Label>
                  <Input
                    id="inspiraciones"
                    placeholder="ej: Inception + Memento, estilo Christopher Nolan..."
                    value={userInput.inspiraciones}
                    onChange={(e) => setUserInput({...userInput, inspiraciones: e.target.value})}
                    className="bg-gray-900 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="elementos" className="text-white mb-2 block">
                    Elementos Específicos
                  </Label>
                  <Textarea
                    id="elementos"
                    placeholder="Elementos que definitivamente quieres incluir: locaciones, personajes, situaciones específicas..."
                    value={userInput.elementos}
                    onChange={(e) => setUserInput({...userInput, elementos: e.target.value})}
                    className="bg-gray-900 border-gray-600 text-white"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button 
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                onClick={handleGenerate}
                disabled={!isFormValid()}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generar Idea con IA
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 'generating' && (
          <div className="text-center py-12">
            <Card className="bg-gray-800 border-gray-700 max-w-2xl mx-auto">
              <CardContent className="pt-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-yellow-500/20 rounded-full">
                    <Brain className="w-12 h-12 text-yellow-400 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  X.AI está generando tu idea...
                </h3>
                <p className="text-gray-300 mb-6">
                  Analizando tu concepto y desarrollando una propuesta completa
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Progreso</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="flex items-center justify-center text-yellow-400">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  <span>Procesando con IA avanzada...</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'review' && generatedIdea && (
          <div className="space-y-6">
            <Alert className="border-yellow-500 bg-yellow-500/10">
              <Brain className="h-4 w-4 text-yellow-400" />
              <AlertDescription className="text-yellow-100">
                <strong>Idea generada exitosamente por X.AI/Grok.</strong> Revisa los detalles y aprueba para continuar a la siguiente fase.
              </AlertDescription>
            </Alert>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-2xl">{generatedIdea.titulo}</CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-blue-400 border-blue-400">
                    {generatedIdea.genero}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Logline</h4>
                  <p className="text-gray-300 italic">{generatedIdea.logline}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Sinopsis</h4>
                  <p className="text-gray-300 leading-relaxed">{generatedIdea.sinopsis}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Protagonista</h4>
                  <p className="text-gray-300">{generatedIdea.protagonista}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Conflicto Principal</h4>
                  <p className="text-gray-300">{generatedIdea.conflictoPrincipal}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Temáticas</h4>
                  <div className="flex flex-wrap gap-2">
                    {generatedIdea.tematicas.map((tema, index) => (
                      <Badge key={index} variant="outline" className="text-green-400 border-green-400">
                        {tema}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Tono y Estilo</h4>
                  <p className="text-gray-300">{generatedIdea.tonoEstilo}</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <div className="space-x-2">
                <Button 
                  variant="outline"
                  onClick={handleEdit}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Editar Input
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleRegenerate}
                  className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerar
                </Button>
              </div>
              
              <Button 
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold"
                onClick={handleApprove}
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Aprobar y Continuar
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
                  ¡Fase 1 Completada!
                </h3>
                <p className="text-gray-300 mb-4">
                  Idea aprobada. Procediendo a la Fase 2: Desarrollo de Estructura...
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
