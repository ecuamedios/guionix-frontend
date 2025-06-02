// app/(dashboard)/projects/page.tsx (AVANZADO)
// filepath: app/(dashboard)/projects/page.tsx
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProjectCard from "@/components/dashboard/ProjectCard";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function ProjectsPage() {
  // Aquí puedes traer la lista real de proyectos del usuario
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Proyectos</h1>
        <Link
          href="/dashboard/projects/new"
          className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-500 transition"
        >
          <Plus className="w-5 h-5" /> Nuevo proyecto
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Renderiza ProjectCard por cada proyecto */}
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </DashboardLayout>
  );
}