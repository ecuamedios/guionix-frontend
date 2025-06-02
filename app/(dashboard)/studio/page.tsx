// app/(dashboard)/studio/page.tsx (AVANZADO)
// filepath: app/(dashboard)/studio/page.tsx
import StudioLayout from "@/components/studio/StudioLayout";
import ProjectSelector from "@/components/studio/ProjectSelector";
import ProgressTracker from "@/components/studio/ProgressTracker";

export default function StudioMainPage() {
  // Aquí puedes traer datos reales de proyectos del usuario
  return (
    <StudioLayout
      sidebar={<ProjectSelector />}
      topbar={<div className="text-gray-300">Estudio de guiones</div>}
    >
      <div className="max-w-2xl mx-auto mt-8">
        <h1 className="text-2xl font-bold text-white mb-4">Bienvenido al Studio</h1>
        <p className="text-gray-400 mb-6">
          Selecciona un proyecto para comenzar a escribir, editar o colaborar en tus guiones.
        </p>
        <ProgressTracker project={{ id: "", titulo: "Demo", capas: [] }} />
      </div>
    </StudioLayout>
  );
}