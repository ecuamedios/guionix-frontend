// app/(dashboard)/page.tsx (AVANZADO)
// filepath: app/(dashboard)/page.tsx
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatsPanel from "@/components/dashboard/StatsPanel";
import QuickActions from "@/components/dashboard/QuickActions";
import ProjectCard from "@/components/dashboard/ProjectCard";

export default function DashboardPage() {
  // Aquí puedes traer datos reales con fetch/server actions
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsPanel />
        <QuickActions />
      </div>
      <h2 className="text-lg font-bold text-white mb-4">Tus proyectos recientes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Renderiza ProjectCard por cada proyecto */}
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </DashboardLayout>
  );
}