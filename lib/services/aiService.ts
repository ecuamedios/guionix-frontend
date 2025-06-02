// lib/services/aiService.ts (AVANZADO)
import { externalAPI } from "./externalAPI";
import type { AIGenerationRequest, AIGenerationResponse } from "@/types/ai";

export const aiService = {
  async generateContent(payload: AIGenerationRequest): Promise<AIGenerationResponse> {
    const res = await externalAPI.post("/ai/generate", payload);
    return res.data;
  },
  async getUsageStats(userId: string) {
    const res = await externalAPI.get(`/ai/usage/${userId}`);
    return res.data;
  },
};