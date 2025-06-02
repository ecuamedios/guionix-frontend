// components/studio/BeatEditor.tsx (AVANZADO)
// filepath: components/studio/BeatEditor.tsx
"use client";
import { useState } from "react";
import type { Beat } from "@/types/studio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, Sparkles } from "lucide-react";

interface BeatEditorProps {
  beat: Beat;
  onSave: (beat: Beat) => Promise<void>;
  onAIGenerate?: (prompt: string) => Promise<string>;
  loading?: boolean;
}

export default function BeatEditor({ beat, onSave, onAIGenerate, loading }: BeatEditorProps) {
  const [titulo, setTitulo] = useState(beat.titulo);
  const [contenido, setContenido] = useState(beat.contenido);
  const [aiLoading, setAiLoading] = useState(false);

  const handleSave = async () => {
    await onSave({ ...beat, titulo, contenido });
  };

  const handleAIGenerate = async () => {
    if (!onAIGenerate) return;
    setAiLoading(true);
    const aiContent = await onAIGenerate(contenido);
    setContenido(aiContent);
    setAiLoading(false);
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-lg p-6 space-y-4 border border-gray-800">
      <Input
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        placeholder="Título del beat"
        className="text-xl font-bold bg-gray-800 text-white"
        disabled={loading}
      />
      <Textarea
        value={contenido}
        onChange={e => setContenido(e.target.value)}
        placeholder="Escribe el contenido del beat como un guionista de Hollywood..."
        className="min-h-[180px] bg-gray-800 text-white"
        disabled={loading}
      />
      <div className="flex gap-2 justify-end">
        {onAIGenerate && (
          <Button
            type="button"
            variant="secondary"
            onClick={handleAIGenerate}
            disabled={aiLoading || loading}
            className="flex items-center gap-1"
          >
            {aiLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            Mejorar con IA
          </Button>
        )}
        <Button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-1"
        >
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
          Guardar
        </Button>
      </div>
    </div>
  );
}