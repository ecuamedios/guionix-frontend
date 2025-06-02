// lib/utils/hierarchyUtils.ts (AVANZADO)
// filepath: lib/utils/hierarchyUtils.ts
import type { Project, Capa, Beat } from "@/types/studio";

export function getCapaById(project: Project, capaId: string): Capa | undefined {
  return project.capas?.find((capa) => capa.id === capaId);
}

export function getBeatPath(project: Project, beatId: string): { capa: Capa; beat: Beat } | undefined {
  for (const capa of project.capas || []) {
    const beat = capa.beats?.find((b) => b.id === beatId);
    if (beat) return { capa, beat };
  }
  return undefined;
}

export function getProjectHierarchy(project: Project) {
  return (project.capas || []).map((capa) => ({
    ...capa,
    beats: capa.beats || [],
  }));
}