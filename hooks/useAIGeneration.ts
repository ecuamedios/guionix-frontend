// hooks/useAIGeneration.ts (AVANZADO)
// filepath: hooks/useAIGeneration.ts
import { useState } from "react";
import { aiService } from "@/lib/services/aiService";
import type { AIGenerationRequest, AIGenerationResponse } from "@/types/ai";

export function useAIGeneration() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIGenerationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = async (payload: AIGenerationRequest) => {
    setLoading(true);
    setError(null);
    try {
      const res = await aiService.generateContent(payload);
      setResult(res);
      return res;
    } catch (e: any) {
      setError(e.message || "Error al generar contenido IA");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return { loading, result, error, generate };
}