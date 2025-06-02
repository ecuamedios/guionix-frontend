// components/studio/ProgressTracker.tsx (AVANZADO)
// filepath: components/studio/ProgressTracker.tsx
"use client";
import type { Project } from "@/types/studio";

interface ProgressTrackerProps {
  project: Project;
}

export default function ProgressTracker({ project }: ProgressTrackerProps) {
  const totalBeats = project.capas?.reduce((acc, capa) => acc + (capa.beats?.length || 0), 0) || 0;
  const completedBeats = project.capas
    ?.reduce((acc, capa) => acc + (capa.beats?.filter(b => !!b.contenido?.trim()).length || 0), 0) || 0;
  const percent = totalBeats ? Math.round((completedBeats / totalBeats) * 100) : 0;

  return (
    <div className="w-full mt-2">
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>Progreso</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full bg-gray-800 rounded h-2 overflow-hidden">
        <div
          className="bg-yellow-400 h-2 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {completedBeats} de {totalBeats} beats completados
      </div>
    </div>
  );
}