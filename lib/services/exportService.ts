// lib/services/exportService.ts (AVANZADO)
import { externalAPI } from "./externalAPI";
import type { ExportRequest, ExportResult } from "@/types/export";

export const exportService = {
  async exportProject(payload: ExportRequest): Promise<ExportResult> {
    const res = await externalAPI.post("/export", payload);
    return res.data;
  },
  async getExportHistory(projectId: string) {
    const res = await externalAPI.get(`/export/history/${projectId}`);
    return res.data;
  },
};