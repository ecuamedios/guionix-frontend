// components/studio/HierarchyNavigation.tsx (AVANZADO)
// filepath: components/studio/HierarchyNavigation.tsx
"use client";
import type { Project } from "@/types/studio";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface HierarchyNavigationProps {
  project: Project;
  currentCapaId?: string;
  currentBeatId?: string;
}

export default function HierarchyNavigation({ project, currentCapaId, currentBeatId }: HierarchyNavigationProps) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-400 py-2">
      <Link href={`/dashboard/studio/${project.id}`} className="hover:underline font-bold text-yellow-400">
        {project.titulo}
      </Link>
      {currentCapaId && (
        <>
          <ChevronRight className="w-4 h-4" />
          <span>
            {project.capas?.find(c => c.id === currentCapaId)?.nombre || "Capa"}
          </span>
        </>
      )}
      {currentBeatId && (
        <>
          <ChevronRight className="w-4 h-4" />
          <span>
            {project.capas
              ?.flatMap(c => c.beats || [])
              .find(b => b.id === currentBeatId)?.titulo || "Beat"}
          </span>
        </>
      )}
    </nav>
  );
}