// lib/utils/scriptUtils.ts (AVANZADO)
// filepath: lib/utils/scriptUtils.ts
import type { Project, Beat } from "@/types/studio";

export function countWords(text: string): number {
  return text.trim().split(/\s+/).length;
}

export function getAllBeats(project: Project): Beat[] {
  return project.capas?.flatMap((capa) => capa.beats || []) || [];
}

export function findBeatById(project: Project, beatId: string): Beat | undefined {
  return getAllBeats(project).find((beat) => beat.id === beatId);
}