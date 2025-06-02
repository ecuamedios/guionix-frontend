// lib/services/brainService.ts (AVANZADO)
import { externalAPI } from "./externalAPI";

export const brainService = {
  async analyzeScript(script: string, userId: string) {
    const res = await externalAPI.post("/brain/analyze", { script, userId });
    return res.data;
  },
  async getSuggestions(projectId: string) {
    const res = await externalAPI.get(`/brain/suggestions/${projectId}`);
    return res.data;
  },
};