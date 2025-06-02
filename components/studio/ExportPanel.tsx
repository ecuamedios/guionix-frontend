// components/studio/ExportPanel.tsx (SUPER AVANZADO)
// filepath: components/studio/ExportPanel.tsx
"use client";
import { useExport } from "@/hooks/useExport";
import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import type { ExportFormat } from "@/types/export";

interface ExportPanelProps {
  projectId: string;
}

const exportFormats: { label: string; value: ExportFormat }[] = [
  { label: "PDF", value: "pdf" },
  { label: "Fountain", value: "fountain" },
  { label: "Final Draft", value: "finaldraft" },
];

export default function ExportPanel({ projectId }: ExportPanelProps) {
  const { exportProject, loading, result, fetchHistory, history } = useExport();
  const [format, setFormat] = useState<ExportFormat>("pdf");

  const handleExport = async () => {
    await exportProject({ projectId, format, userId: "me" });
    fetchHistory(projectId);
  };

  return (
    <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg space-y-4">
      <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
        <Download className="w-5 h-5 text-yellow-400" /> Exportar guion
      </h3>
      <div className="flex gap-2">
        {exportFormats.map(f => (
          <button
            key={f.value}
            className={`px-3 py-1 rounded font-semibold text-xs ${
              format === f.value
                ? "bg-yellow-400 text-black"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setFormat(f.value)}
            disabled={loading}
            type="button"
          >
            {f.label}
          </button>
        ))}
      </div>
      <button
        className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded font-bold hover:bg-yellow-500 transition disabled:opacity-60"
        onClick={handleExport}
        disabled={loading}
        type="button"
      >
        {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Download className="w-4 h-4" />}
        Exportar
      </button>
      {result && (
        <div className="text-xs text-green-400 mt-2">
          Archivo listo:{" "}
          <a href={result.url} target="_blank" rel="noopener noreferrer" className="underline">
            Descargar ({result.format.toUpperCase()})
          </a>
        </div>
      )}
      <div>
        <h4 className="text-xs text-gray-400 mb-1">Historial de exportaciones</h4>
        <ul className="space-y-1 max-h-24 overflow-y-auto text-xs">
          {history.map(item => (
            <li key={item.id} className="flex justify-between items-center">
              <span>
                {item.format.toUpperCase()} - {new Date(item.createdAt).toLocaleString()}
              </span>
              {item.url && (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-yellow-400 underline">
                  Descargar
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}