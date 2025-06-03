"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

// Hooks y componentes
import { useStudioMode, type StudioMode } from "@/hooks/useStudioMode";
import ModeSelector from "@/components/studio/ModeSelector";
import NewUserMode from "@/components/studio/modes/NewUserMode";
import ExpertMode from "@/components/studio/modes/ExpertMode";
import ImportMode from "@/components/studio/modes/ImportMode";
import CollabMode from "@/components/studio/modes/CollabMode";

interface StudioUnifiedProps {
  initialMode?: StudioMode;
}

export default function StudioUnified({ initialMode }: StudioUnifiedProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const { mode, switchMode, userProfile, isLoading } = useStudioMode();

  // Sincronizar con URL
  useEffect(() => {
    const urlMode = searchParams.get('mode') as StudioMode;
    if (urlMode && urlMode !== mode && ['new', 'expert', 'import', 'collab'].includes(urlMode)) {
      switchMode(urlMode);
    }
  }, [searchParams, mode, switchMode]);

  // Actualizar URL cuando cambia el modo
  const handleModeSwitch = (newMode: StudioMode) => {
    const url = new URL(window.location.href);
    
    if (newMode === 'selector') {
      url.searchParams.delete('mode');
    } else {
      url.searchParams.set('mode', newMode);
    }
    
    router.push(url.pathname + url.search, { scroll: false });
    switchMode(newMode);
  };

  // Manejar creación de proyecto desde importación
  const handleProjectCreated = (project: any) => {
    console.log("Project created:", project);
    // Aquí se podría guardar el proyecto en el estado global o contexto
    switchMode('expert');
  };

  // Loading states
  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <div>
            <h2 className="text-lg font-semibold">Cargando GUIONIX Studio</h2>
            <p className="text-muted-foreground">Preparando tu espacio de trabajo...</p>
          </div>
        </div>
      </div>
    );
  }

  // Requerir autenticación
  if (status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4 max-w-md">
          <h2 className="text-2xl font-bold">Acceso Requerido</h2>
          <p className="text-muted-foreground">
            Necesitas iniciar sesión para acceder a GUIONIX Studio
          </p>
          <button
            onClick={() => router.push('/auth/signin')}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  // Renderizar componente según el modo
  const renderModeComponent = () => {
    switch (mode) {
      case 'new':
        return <NewUserMode onModeSwitch={handleModeSwitch} />;
      
      case 'expert':
        return <ExpertMode onModeSwitch={handleModeSwitch} />;
      
      case 'import':
        return (
          <ImportMode 
            onModeSwitch={handleModeSwitch}
            onProjectCreated={handleProjectCreated}
          />
        );
      
      case 'collab':
        return <CollabMode onModeSwitch={handleModeSwitch} />;
      
      case 'selector':
      default:
        return <ModeSelector />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Barra de navegación contextual */}
      {mode !== 'selector' && (
        <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleModeSwitch('selector')}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Volver al selector
              </button>
              <div className="h-4 w-px bg-border" />
              <span className="text-sm font-medium">
                {mode === 'new' && 'Workflow Guiado'}
                {mode === 'expert' && 'Editor Avanzado'}
                {mode === 'import' && 'Importar Proyecto'}
                {mode === 'collab' && 'Colaboración'}
              </span>
            </div>
            
            {userProfile && (
              <div className="text-xs text-muted-foreground">
                {userProfile.projectCount === 0 ? 'Primer proyecto' : 
                 `${userProfile.projectCount} proyectos`} • 
                {userProfile.skillLevel === 'beginner' ? 'Principiante' :
                 userProfile.skillLevel === 'intermediate' ? 'Intermedio' : 'Experto'}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <main className={mode === 'selector' ? 'h-screen' : 'h-[calc(100vh-60px)]'}>
        {renderModeComponent()}
      </main>
    </div>
  );
}
