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
  const [currentStage, setCurrentStage] = useState('');
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
      const stages = [
        'Inicializando X.AI/Grok...',
        'Analizando concepto principal...',
        'Identificando género y elementos...',
        'Desarrollando protagonista...',
        'Creando conflicto principal...',
        'Definiendo temáticas...',
        'Generando logline...',
        'Creando sinopsis completa...',
        'Finalizando propuesta...'
      ];

      let currentProgress = 0;
      let stageIndex = 0;

      const interval = setInterval(() => {
        if (stageIndex < stages.length) {
          setCurrentStage(stages[stageIndex]);
          currentProgress += Math.random() * 15 + 5;
          setProgress(Math.min(currentProgress, 100));

          if (currentProgress >= (stageIndex + 1) * (100 / stages.length)) {
            stageIndex++;
          }

          if (currentProgress >= 100) {
            clearInterval(interval);
            setIsGenerating(false);
            setStep('review');
            const idea = generateIdeaFromUserInput(userInput);
            setGeneratedIdea(idea);
          }
        }
      }, 800);

      return () => clearInterval(interval);
    }
  }, [isGenerating, userInput]);

  // Función para generar idea basada en input del usuario
  const generateIdeaFromUserInput = (input: typeof userInput): ProjectIdea => {
    // Generar título basado en el concepto
    const titles = [
      `${input.concepto.split(' ')[0]} Infinito`,
      `El Último ${input.concepto.split(' ')[1] || 'Secreto'}`,
      `${input.genero}: ${input.concepto.split(' ')[0]}`,
      `Código ${input.concepto.split(' ')[0]}`,
      `La Era de ${input.concepto.split(' ')[1] || input.genero}`
    ];
    
    const titulo = titles[Math.floor(Math.random() * titles.length)] || "Proyecto Sin Título";
    
    // Crear logline incorporando el concepto del usuario
    const logline = `${input.concepto}. Una historia ${input.genero.toLowerCase()} que explora ${input.audiencia ? `para ${input.audiencia}` : 'temas universales'}.`;
    
    // Sinopsis expandida basada en el concepto
    const sinopsis = `${input.concepto} En este ${input.genero.toLowerCase()}, seguimos a un protagonista que debe enfrentar desafíos extraordinarios. ${input.elementos ? `La historia incluye elementos como: ${input.elementos}.` : ''} ${input.inspiraciones ? `Con influencias de ${input.inspiraciones},` : ''} esta narrativa promete capturar la atención de ${input.audiencia || 'una amplia audiencia'} a través de una trama envolvente y personajes memorables.`;
    
    return {
      titulo,
      genero: input.genero || "Drama",
      logline,
      sinopsis,
      protagonista: `Un personaje complejo cuya historia se basa en: ${input.concepto}`,
      conflictoPrincipal: `El conflicto principal surge de: ${input.concepto}`,
      tematicas: [
        input.genero,
        ...input.elementos.split(',').slice(0, 3).map(t => t.trim()).filter(Boolean),
        "Desarrollo personal",
        "Conflicto interno"
      ].filter(Boolean).slice(0, 5),
      tonoEstilo: `Estilo ${input.genero.toLowerCase()} ${input.inspiraciones ? `inspirado en ${input.inspiraciones}` : 'con enfoque moderno'}.`
    };
  };

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900">
      {/* Header con glassmorphism */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                onClick={() => router.push('/studio/new')}
                className="text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver
              </Button>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden sm:flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg">
                  <Lightbulb className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Generación de Ideas
                  </h1>
                  <p className="text-sm text-gray-400 flex items-center">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Powered by X.AI/Grok
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator - Moderno */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <div>
              <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Fase 1 de 4</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Genera tu Idea</h2>
              <p className="text-gray-400 mt-2 max-w-lg">
                Transforma tu concepto inicial en una idea de guión completamente desarrollada
              </p>
            </div>
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold px-4 py-2 text-sm mt-4 sm:mt-0">
              <Brain className="w-4 h-4 mr-2" />
              IA Creativa
            </Badge>
          </div>
          <div className="relative">
            <Progress value={25} className="h-3 bg-slate-800" />
            <div className="absolute top-0 left-0 h-3 w-1/4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg" />
          </div>
        </div>

        {step === 'input' && (
          <div className="space-y-8">
            {/* Card principal con glassmorphism */}
            <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader className="pb-8">
                <CardTitle className="text-white flex items-center text-2xl">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-4">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  Información Base del Proyecto
                </CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  Proporciona los elementos básicos de tu idea para que la IA pueda desarrollarla de manera única
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Grid responsivo para campos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Concepto Principal */}
                  <div className="lg:col-span-2">
                    <Label htmlFor="concepto" className="text-white mb-3 block text-lg font-medium">
                      Concepto Principal *
                      <span className="text-gray-400 text-sm font-normal ml-2">
                        (La base de tu historia)
                      </span>
                    </Label>
                    <Textarea
                      id="concepto"
                      placeholder="Ejemplo: Un detective debe resolver un caso mientras pierde la memoria gradualmente..."
                      value={userInput.concepto}
                      onChange={(e) => setUserInput({...userInput, concepto: e.target.value})}
                      className="bg-slate-800/50 border-white/20 text-white min-h-[120px] text-lg placeholder:text-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20 transition-all duration-200"
                    />
                  </div>

                  {/* Género */}
                  <div>
                    <Label htmlFor="genero" className="text-white mb-3 block text-lg font-medium">
                      Género Preferido *
                    </Label>
                    <Input
                      id="genero"
                      placeholder="Thriller, Drama, Sci-Fi, Comedia..."
                      value={userInput.genero}
                      onChange={(e) => setUserInput({...userInput, genero: e.target.value})}
                      className="bg-slate-800/50 border-white/20 text-white h-14 text-lg placeholder:text-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20 transition-all duration-200"
                    />
                  </div>

                  {/* Audiencia */}
                  <div>
                    <Label htmlFor="audiencia" className="text-white mb-3 block text-lg font-medium">
                      Audiencia Objetivo
                    </Label>
                    <Input
                      id="audiencia"
                      placeholder="Adultos 25-45, Público familiar..."
                      value={userInput.audiencia}
                      onChange={(e) => setUserInput({...userInput, audiencia: e.target.value})}
                      className="bg-slate-800/50 border-white/20 text-white h-14 text-lg placeholder:text-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20 transition-all duration-200"
                    />
                  </div>

                  {/* Referencias */}
                  <div>
                    <Label htmlFor="inspiraciones" className="text-white mb-3 block text-lg font-medium">
                      Referencias/Inspiraciones
                    </Label>
                    <Input
                      id="inspiraciones"
                      placeholder="Inception + Memento, Christopher Nolan..."
                      value={userInput.inspiraciones}
                      onChange={(e) => setUserInput({...userInput, inspiraciones: e.target.value})}
                      className="bg-slate-800/50 border-white/20 text-white h-14 text-lg placeholder:text-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20 transition-all duration-200"
                    />
                  </div>

                  {/* Elementos específicos */}
                  <div>
                    <Label htmlFor="elementos" className="text-white mb-3 block text-lg font-medium">
                      Elementos Específicos
                    </Label>
                    <Textarea
                      id="elementos"
                      placeholder="Locaciones, personajes, situaciones que quieres incluir..."
                      value={userInput.elementos}
                      onChange={(e) => setUserInput({...userInput, elementos: e.target.value})}
                      className="bg-slate-800/50 border-white/20 text-white min-h-[100px] text-lg placeholder:text-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Botón de acción principal */}
                <div className="pt-8 border-t border-white/10">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="text-gray-400 text-sm">
                      <CheckCircle className="w-4 h-4 inline mr-2" />
                      {isFormValid() ? 'Listo para generar' : 'Completa los campos marcados con *'}
                    </div>
                    <Button 
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-lg px-8 py-4 shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105"
                      onClick={handleGenerate}
                      disabled={!isFormValid()}
                    >
                      <Sparkles className="w-6 h-6 mr-3" />
                      Generar Idea con IA
                      <ArrowRight className="w-6 h-6 ml-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'generating' && (
          <div className="text-center py-16">
            <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl max-w-4xl mx-auto shadow-2xl">
              <CardContent className="pt-12 pb-16">
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="p-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl shadow-2xl animate-pulse">
                      <Lightbulb className="w-16 h-16 text-black" />
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
                  </div>
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
                  X.AI/Grok está generando tu idea...
                </h3>
                <p className="text-xl text-gray-300 mb-8">
                  Analizando tu concepto y creando una propuesta narrativa única
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Progreso de Generación</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-slate-800/50 rounded-full h-3 overflow-hidden border border-white/10">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 h-3 rounded-full transition-all duration-500 shadow-lg"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-2xl p-6 mb-8 border border-white/10">
                  <p className="text-yellow-400 font-semibold text-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 mr-3 animate-pulse" />
                    {currentStage}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-300">
                  <div className={`p-4 rounded-xl border transition-all duration-300 ${progress > 20 ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-slate-800/50 border-white/10'}`}>
                    {progress > 20 ? '✓' : '○'} Concepto analizado
                  </div>
                  <div className={`p-4 rounded-xl border transition-all duration-300 ${progress > 40 ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-slate-800/50 border-white/10'}`}>
                    {progress > 40 ? '✓' : '○'} Género definido
                  </div>
                  <div className={`p-4 rounded-xl border transition-all duration-300 ${progress > 70 ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-slate-800/50 border-white/10'}`}>
                    {progress > 70 ? '✓' : '○'} Personajes creados
                  </div>
                  <div className={`p-4 rounded-xl border transition-all duration-300 ${progress > 90 ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-slate-800/50 border-white/10'}`}>
                    {progress > 90 ? '✓' : '○'} Sinopsis generada
                  </div>
                </div>

                <div className="flex items-center justify-center text-yellow-400 mt-8">
                  <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                  <span className="text-lg">Procesando con inteligencia artificial...</span>
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
