// components/studio/AIGenerationPanel.tsx (AVANZADO)
// filepath: components/studio/AIGenerationPanel.tsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";

interface AIGenerationPanelProps {
  onGenerate: (prompt: string) => Promise<string>;
  loading?: boolean;
}

export default function AIGenerationPanel({ onGenerate, loading }: AIGenerationPanelProps) {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const handleGenerate = async () => {
    setAiLoading(true);
    const result = await onGenerate(prompt);
    setOutput(result);
    setAiLoading(false);
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-lg p-6 space-y-4 border border-gray-800">
      <Textarea
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Describe la escena, personaje o pide ayuda a la IA..."
        className="bg-gray-800 text-white"
        disabled={loading}
      />
      <Button
        type="button"
        onClick={handleGenerate}
        disabled={aiLoading || loading || !prompt}
        className="flex items-center gap-1"
      >
        {aiLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
        Generar con IA
      </Button>
      {output && (
        <div className="bg-gray-800 text-gray-100 rounded p-3 whitespace-pre-line mt-2">
          {output}
        </div>
      )}
    </div>
  );
}