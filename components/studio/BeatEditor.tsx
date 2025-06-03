"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save, Sparkles, Clock, FileText, Users, Target } from "lucide-react";

interface Beat {
  id: string;
  titulo: string;
  contenido: string;
  tipo?: 'ESCENA' | 'SECUENCIA' | 'MONTAJE' | 'TRANSICION';
  blakeSnyderBeat?: string;
  duracionEstimada?: number;
  personajes?: string[];
  locacion?: string;
  momentoDia?: 'AMANECER' | 'DIA' | 'ATARDECER' | 'NOCHE';
  descripcion?: string;
  conflicto?: string;
  objetivoPersonaje?: string;
  obstaculo?: string;
  pagina?: number;
}

interface BeatEditorProps {
  beat?: Beat;
  onSave: (beat: Beat) => Promise<void>;
  onAIGenerate?: (prompt: string) => Promise<string>;
  loading?: boolean;
  projectId?: string;
}

const blakeSnyderBeats = [
  "Opening Image", "Theme Stated", "Set-Up", "Catalyst", "Debate",
  "Break into Two", "B Story", "Fun and Games", "Midpoint", "Bad Guys Close In",
  "All Is Lost", "Dark Night of the Soul", "Break into Three", "Finale", "Final Image"
];

export default function BeatEditor({ beat, onSave, onAIGenerate, loading, projectId }: BeatEditorProps) {
  const [currentBeat, setCurrentBeat] = useState<Beat>(beat || {
    id: `beat-${Date.now()}`,
    titulo: "",
    contenido: "",
    tipo: 'ESCENA',
    blakeSnyderBeat: "Opening Image",
    duracionEstimada: 5,
    personajes: [],
    locacion: "",
    momentoDia: 'DIA',
    descripcion: "",
    conflicto: "",
    objetivoPersonaje: "",
    obstaculo: "",
    pagina: 1
  });
  
  const [aiLoading, setAiLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    setWordCount(currentBeat.contenido.split(/\s+/).filter(word => word.length > 0).length);
  }, [currentBeat.contenido]);

  const handleSave = async () => {
    await onSave(currentBeat);
  };

  const handleAIGenerate = async () => {
    if (!onAIGenerate) return;
    setAiLoading(true);
    try {
      const prompt = `
        Título: ${currentBeat.titulo}
        Tipo: ${currentBeat.tipo}
        Blake Snyder Beat: ${currentBeat.blakeSnyderBeat}
        Locación: ${currentBeat.locacion}
        Momento del día: ${currentBeat.momentoDia}
        Personajes: ${currentBeat.personajes?.join(', ')}
        Objetivo del personaje: ${currentBeat.objetivoPersonaje}
        Obstáculo: ${currentBeat.obstaculo}
        Conflicto: ${currentBeat.conflicto}
        
        Contenido actual: ${currentBeat.contenido}
        
        Por favor mejora y expande este beat de guión cinematográfico siguiendo el formato profesional de Hollywood.
      `;
      const aiContent = await onAIGenerate(prompt);
      setCurrentBeat(prev => ({ ...prev, contenido: aiContent }));
    } catch (error) {
      console.error('Error generating AI content:', error);
    } finally {
      setAiLoading(false);
    }
  };

  const updateBeat = (field: keyof Beat, value: any) => {
    setCurrentBeat(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-lg border border-gray-800">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Editor de Beat</h2>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-gray-800 text-gray-300">
              <Clock className="w-3 h-3 mr-1" />
              {currentBeat.duracionEstimada}min
            </Badge>
            <Badge variant="secondary" className="bg-gray-800 text-gray-300">
              <FileText className="w-3 h-3 mr-1" />
              {wordCount} palabras
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="content" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="content" className="data-[state=active]:bg-gray-700">Contenido</TabsTrigger>
            <TabsTrigger value="structure" className="data-[state=active]:bg-gray-700">Estructura</TabsTrigger>
            <TabsTrigger value="details" className="data-[state=active]:bg-gray-700">Detalles</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            <Input
              value={currentBeat.titulo}
              onChange={e => updateBeat('titulo', e.target.value)}
              placeholder="Título del beat"
              className="text-xl font-bold bg-gray-800 text-white border-gray-700"
              disabled={loading}
            />
            
            <Textarea
              value={currentBeat.contenido}
              onChange={e => updateBeat('contenido', e.target.value)}
              placeholder="Escribe el contenido del beat como un guionista de Hollywood..."
              className="min-h-[300px] bg-gray-800 text-white border-gray-700"
              disabled={loading}
            />

            <div className="flex gap-2 justify-end">
              {onAIGenerate && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleAIGenerate}
                  disabled={aiLoading || loading}
                  className="flex items-center gap-2"
                >
                  {aiLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  Mejorar con IA
                </Button>
              )}
              <Button
                type="button"
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700"
              >
                {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                Guardar
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="structure" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Tipo de Beat</label>
                <Select value={currentBeat.tipo} onValueChange={(value: any) => updateBeat('tipo', value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="ESCENA">Escena</SelectItem>
                    <SelectItem value="SECUENCIA">Secuencia</SelectItem>
                    <SelectItem value="MONTAJE">Montaje</SelectItem>
                    <SelectItem value="TRANSICION">Transición</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Blake Snyder Beat</label>
                <Select value={currentBeat.blakeSnyderBeat} onValueChange={(value) => updateBeat('blakeSnyderBeat', value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {blakeSnyderBeats.map(beat => (
                      <SelectItem key={beat} value={beat}>{beat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Duración (minutos)</label>
                <Input
                  type="number"
                  value={currentBeat.duracionEstimada}
                  onChange={e => updateBeat('duracionEstimada', parseInt(e.target.value))}
                  className="bg-gray-800 border-gray-700 text-white"
                  min="1"
                  max="30"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Página</label>
                <Input
                  type="number"
                  value={currentBeat.pagina}
                  onChange={e => updateBeat('pagina', parseInt(e.target.value))}
                  className="bg-gray-800 border-gray-700 text-white"
                  min="1"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Objetivo del Personaje
                </label>
                <Textarea
                  value={currentBeat.objetivoPersonaje}
                  onChange={e => updateBeat('objetivoPersonaje', e.target.value)}
                  placeholder="¿Qué quiere lograr el protagonista en este beat?"
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={2}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Obstáculo</label>
                <Textarea
                  value={currentBeat.obstaculo}
                  onChange={e => updateBeat('obstaculo', e.target.value)}
                  placeholder="¿Qué impide que el personaje logre su objetivo?"
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={2}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Conflicto</label>
                <Textarea
                  value={currentBeat.conflicto}
                  onChange={e => updateBeat('conflicto', e.target.value)}
                  placeholder="¿Cuál es la tensión dramática de este beat?"
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={2}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Locación</label>
                <Input
                  value={currentBeat.locacion}
                  onChange={e => updateBeat('locacion', e.target.value)}
                  placeholder="Ej: CASA DE JOHN - COCINA"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Momento del Día</label>
                <Select value={currentBeat.momentoDia} onValueChange={(value: any) => updateBeat('momentoDia', value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="AMANECER">Amanecer</SelectItem>
                    <SelectItem value="DIA">Día</SelectItem>
                    <SelectItem value="ATARDECER">Atardecer</SelectItem>
                    <SelectItem value="NOCHE">Noche</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block flex items-center gap-2">
                <Users className="w-4 h-4" />
                Personajes (separados por coma)
              </label>
              <Input
                value={currentBeat.personajes?.join(', ') || ''}
                onChange={e => updateBeat('personajes', e.target.value.split(',').map(p => p.trim()).filter(p => p))}
                placeholder="JOHN, MARIA, DETECTIVE SMITH"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Descripción</label>
              <Textarea
                value={currentBeat.descripcion}
                onChange={e => updateBeat('descripcion', e.target.value)}
                placeholder="Descripción breve del beat para referencia"
                className="bg-gray-800 border-gray-700 text-white"
                rows={3}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}