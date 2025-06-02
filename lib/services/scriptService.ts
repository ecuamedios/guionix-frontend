// lib/services/scriptService.ts (AVANZADO)
import { externalAPI } from "./externalAPI";

export const scriptService = {
  async getProjectScripts(projectId: string) {
    const res = await externalAPI.get(`/scripts/project/${projectId}`);
    return res.data;
  },
  async saveScript(projectId: string, script: string) {
    const res = await externalAPI.post(`/scripts/project/${projectId}`, { script });
    return res.data;
  },
  async validateScript(projectId: string) {
    const res = await externalAPI.post(`/scripts/project/${projectId}/validate`);
    return res.data;
  },
};