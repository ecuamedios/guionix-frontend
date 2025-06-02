// app/dev-dashboard/page.tsx - Development dashboard access (remove in production)
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatsPanel from "@/components/dashboard/StatsPanel";
import QuickActions from "@/components/dashboard/QuickActions";
import ProjectCard from "@/components/dashboard/ProjectCard";

export default function DevDashboardPage() {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    redirect("/login");
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="bg-orange-900/50 border border-orange-600 rounded-lg p-4 mb-6">
          <p className="text-orange-200 text-sm">
            🚧 <strong>Modo Desarrollo:</strong> Dashboard de prueba sin autenticación. 
            <br />Esta página se desactiva automáticamente en producción.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsPanel />
        <QuickActions />
      </div>
      
      <h2 className="text-lg font-bold text-white mb-4">Proyectos de demostración</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
      
      <div className="mt-8 p-4 bg-gray-900 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-2">Testing Links</h3>
        <div className="flex flex-wrap gap-4">
          <a 
            href="/studio" 
            className="text-yellow-400 hover:underline"
          >
            Studio →
          </a>
          <a 
            href="/analytics" 
            className="text-yellow-400 hover:underline"
          >
            Analytics →
          </a>
          <a 
            href="/projects" 
            className="text-yellow-400 hover:underline"
          >
            Projects →
          </a>
          <a 
            href="http://localhost:5557" 
            target="_blank"
            className="text-blue-400 hover:underline"
          >
            Prisma Studio →
          </a>
        </div>
      </div>
    </DashboardLayout>
  );
}
