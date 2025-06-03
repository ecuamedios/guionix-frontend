"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Sparkles, Copy, RefreshCw, BookOpen, Users, MapPin, Clock } from "lucide-react";

interface AIGenerationPanelProps {
  onGenerate: (prompt: string, type: string) => Promise<string>;
  loading?: boolean;
  projectContext?: {
    titulo?: string;
    genero?: string;
    sinopsis?: string;
    personajes?: string[];
  };
}

const promptTemplates = {
  escena: {
    title: "Generar Escena",
    icon: <MapPin className="w-4 h-4" />,
    prompts: [
      "Escribe una escena dramática en {locacion} donde {personaje} descubre {conflicto}",
      "Crea una escena de acción donde {personaje} debe escapar de {peligro}",
      "Desarrolla una escena íntima entre {personaje1} y {personaje2} sobre {tema}",
      "Escribe una escena de confrontación donde {personaje} enfrenta {antagonista}"
    ]
  },
  dialogo: {
    title: "Mejorar Diálogo",
    icon: <Users className="w-4 h-4" />,
    prompts: [
      "Mejora este diálogo para que sea más natural y emotivo: {dialogo}",
      "Añade subtexto a esta conversación entre {personaje1} y {personaje2}",
      "Haz que este diálogo revele más sobre la personalidad de {personaje}",
      "Transforma este diálogo expositivo en uno más dramático"
    ]
  },
  personaje: {
    title: "Desarrollo de Personaje",
    icon: <Users className="w-4 h-4" />,
    prompts: [
      "Crea el backstory de {personaje} incluyendo motivaciones y traumas",
      "Desarrolla los objetivos y obstáculos internos de {personaje}",
      "Describe la apariencia y mannerisms únicos de {personaje}",
      "Explora la relación entre {personaje1} y {personaje2}"
    ]
  },
  estructura: {
    title: "Estructura Narrativa",
    icon: <BookOpen className="w-4 h-4" />,
    prompts: [
      "Sugiere mejoras para la estructura del segundo acto",
      "Crea un plot twist efectivo para el punto medio",
      "Desarrolla subtramas que complementen la historia principal",
      "Mejora la progresión emocional del protagonista"
    ]
  }
};

export default function AIGenerationPanel({ onGenerate, loading, projectContext }: AIGenerationPanelProps) {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof promptTemplates>("escena");
  const [customVariables, setCustomVariables] = useState<Record<string, string>>({});

  const handleGenerate = async (generationType = 'custom') => {
    if (!prompt.trim()) return;
    
    setAiLoading(true);
    try {
      const contextualPrompt = buildContextualPrompt(prompt, generationType);
      const result = await onGenerate(contextualPrompt, generationType);
      setOutput(result);
    } catch (error) {
      console.error('Error generating AI content:', error);
      setOutput('Error al generar contenido. Por favor intenta de nuevo.');
    } finally {
      setAiLoading(false);
    }
  };

  const buildContextualPrompt = (userPrompt: string, type: string) => {
    let contextualPrompt = `Eres un guionista profesional de Hollywood. 

CONTEXTO DEL PROYECTO:`;
    
    if (projectContext?.titulo) {
      contextualPrompt += `\n- Título: ${projectContext.titulo}`;
    }
    if (projectContext?.genero) {
      contextualPrompt += `\n- Género: ${projectContext.genero}`;
    }
    if (projectContext?.sinopsis) {
      contextualPrompt += `\n- Sinopsis: ${projectContext.sinopsis}`;
    }
    if (projectContext?.personajes?.length) {
      contextualPrompt += `\n- Personajes principales: ${projectContext.personajes.join(', ')}`;
    }

    contextualPrompt += `\n\nTIPO DE CONTENIDO: ${type}
    
INSTRUCCIÓN: ${userPrompt}

Por favor genera contenido cinematográfico profesional siguiendo los estándares de la industria. El resultado debe ser específico, visual y emocionalmente impactante.`;

    return contextualPrompt;
  };

  const useTemplate = (template: string) => {
    setPrompt(template);
  };

  const copyToClipboard = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
    }
  };

  const replaceVariables = (template: string) => {
    let processedTemplate = template;
    Object.entries(customVariables).forEach(([key, value]) => {
      const placeholder = `{${key}}`;
      processedTemplate = processedTemplate.replace(new RegExp(placeholder, 'g'), value);
    });
    return processedTemplate;
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          Asistente de IA para Guionistas
        </CardTitle>
        <CardDescription className="text-gray-400">
          Potencia tu creatividad con inteligencia artificial especializada en escritura cinematográfica
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Tabs value={selectedTemplate} onValueChange={(value) => setSelectedTemplate(value as keyof typeof promptTemplates)}>
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            {Object.entries(promptTemplates).map(([key, template]) => (
              <TabsTrigger 
                key={key} 
                value={key} 
                className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
              >
                <span className="flex items-center gap-1">
                  {template.icon}
                  {template.title}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(promptTemplates).map(([key, template]) => (
            <TabsContent key={key} value={key} className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">{template.title}</h3>
                <div className="grid gap-2">
                  {template.prompts.map((templatePrompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start text-left h-auto p-3 bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                      onClick={() => useTemplate(templatePrompt)}
                    >
                      <span className="text-sm">{templatePrompt}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Variables personalizadas (opcional)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="personaje"
                value={customVariables.personaje || ''}
                onChange={e => setCustomVariables(prev => ({ ...prev, personaje: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Input
                placeholder="locacion"
                value={customVariables.locacion || ''}
                onChange={e => setCustomVariables(prev => ({ ...prev, locacion: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Input
                placeholder="conflicto"
                value={customVariables.conflicto || ''}
                onChange={e => setCustomVariables(prev => ({ ...prev, conflicto: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Input
                placeholder="tema"
                value={customVariables.tema || ''}
                onChange={e => setCustomVariables(prev => ({ ...prev, tema: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Prompt personalizado
            </label>
            <Textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Describe específicamente lo que necesitas: escena, diálogo, desarrollo de personaje, etc."
              className="min-h-[120px] bg-gray-800 border-gray-700 text-white placeholder-gray-500"
              disabled={loading}
            />
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => handleGenerate('escena')}
              disabled={aiLoading || loading || !prompt.trim()}
              className="flex-1 bg-yellow-600 hover:bg-yellow-700"
            >
              {aiLoading ? (
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              Generar con IA
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setPrompt('')}
              disabled={aiLoading || loading}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {output && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Resultado generado</h3>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                  <Clock className="w-3 h-3 mr-1" />
                  {output.split(' ').length} palabras
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyToClipboard}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copiar
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 max-h-80 overflow-y-auto">
              <div className="text-gray-100 whitespace-pre-wrap leading-relaxed">
                {output}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPrompt(`Mejora este contenido: ${output.substring(0, 200)}...`)}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Mejorar
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPrompt(`Continúa este contenido: ${output.substring(output.length - 200)}`)}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Continuar
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPrompt(`Reescribe este contenido desde otra perspectiva: ${output.substring(0, 200)}...`)}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Reescribir
              </Button>
            </div>
          </div>
        )}

        {projectContext && (
          <div className="border-t border-gray-700 pt-4">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Contexto del proyecto</h4>
            <div className="space-y-1 text-sm text-gray-400">
              {projectContext.titulo && <p><span className="font-medium">Título:</span> {projectContext.titulo}</p>}
              {projectContext.genero && <p><span className="font-medium">Género:</span> {projectContext.genero}</p>}
              {projectContext.personajes && projectContext.personajes.length > 0 && (
                <p><span className="font-medium">Personajes:</span> {projectContext.personajes.join(', ')}</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}