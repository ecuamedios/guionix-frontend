// hooks/useScriptStudio.ts (AVANZADO)
// filepath: hooks/useScriptStudio.ts
import { useState, useCallback } from "react";
import type { Project, Capa, Beat } from "@/types/studio";

export function useScriptStudio(initialProject?: Project) {
  const [project, setProject] = useState<Project | undefined>(initialProject);

  const selectCapa = useCallback((capaId: string) => {
    return project?.capas?.find((c) => c.id === capaId);
  }, [project]);

  const selectBeat = useCallback((beatId: string) => {
    for (const capa of project?.capas || []) {
      const beat = capa.beats?.find((b) => b.id === beatId);
      if (beat) return beat;
    }
    return undefined;
  }, [project]);

  const updateBeat = useCallback((beatId: string, updates: Partial<Beat>) => {
    setProject((prev) => {
      if (!prev) return prev;
      const newCapas = prev.capas?.map((capa) => ({
        ...capa,
        beats: capa.beats?.map((b) => (b.id === beatId ? { ...b, ...updates } : b)),
      }));
      return { ...prev, capas: newCapas };
    });
  }, []);

  return {
    project,
    setProject,
    selectCapa,
    selectBeat,
    updateBeat,
  };
}