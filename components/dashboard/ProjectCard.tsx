// components/dashboard/ProjectCard.tsx
"use client";
import { Film, Users, Calendar } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
  project?: {
    id: string;
    title: string;
    description: string;
    status: "ACTIVE" | "DRAFT" | "COMPLETED";
    updatedAt: string;
    collaborators: number;
    progress: number;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Demo data if no project provided
  const defaultProject = {
    id: "demo-1",
    title: "El Último Encuentro",
    description: "Drama psicológico sobre la reunión entre dos hermanos después de 20 años.",
    status: "ACTIVE" as const,
    updatedAt: "2024-06-01",
    collaborators: 3,
    progress: 65,
  };

  const proj = project || defaultProject;

  const statusColors = {
    ACTIVE: "bg-green-900/50 text-green-300 border-green-700",
    DRAFT: "bg-yellow-900/50 text-yellow-300 border-yellow-700",
    COMPLETED: "bg-blue-900/50 text-blue-300 border-blue-700",
  };

  return (
    <Link
      href={`/studio/${proj.id}`}
      className="block bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-gray-700 hover:bg-gray-900/70 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Film className="w-5 h-5 text-yellow-400" />
          <h3 className="font-semibold text-white text-lg">{proj.title}</h3>
        </div>
        <span className={`px-2 py-1 rounded text-xs border ${statusColors[proj.status]}`}>
          {proj.status}
        </span>
      </div>

      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {proj.description}
      </p>

      <div className="space-y-3">
        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Progreso</span>
            <span>{proj.progress}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-yellow-400 h-2 rounded-full transition-all"
              style={{ width: `${proj.progress}%` }}
            />
          </div>
        </div>

        {/* Project stats */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{proj.collaborators} colaboradores</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(proj.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}