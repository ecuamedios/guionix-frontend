// hooks/useExport.ts (AVANZADO)
// filepath: hooks/useExport.ts
import { useState } from "react";
import { exportService } from "@/lib/services/exportService";
import type { ExportRequest, ExportResult, ExportHistoryItem } from "@/types/export";

export function useExport() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ExportResult | null>(null);
  const [history, setHistory] = useState<ExportHistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const exportProject = async (payload: ExportRequest) => {
    setLoading(true);
    setError(null);
    try {
      const res = await exportService.exportProject(payload);
      setResult(res);
      return res;
    } catch (e: any) {
      setError(e.message || "Error al exportar");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async (projectId: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await exportService.getExportHistory(projectId);
      setHistory(res);
    } catch (e: any) {
      setError(e.message || "Error al cargar historial");
    } finally {
      setLoading(false);
    }
  };

  return { loading, result, error, exportProject, history, fetchHistory };
}