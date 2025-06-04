"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2, Lightbulb, FileText, Edit3, CheckCircle } from "lucide-react";

// Hooks y componentes
import { useStudioMode, useWizard, type StudioMode } from "@/hooks/useStudioMode";
import ModeSelector from "@/components/studio/ModeSelector";
import NewUserMode from "@/components/studio/modes/NewUserMode";
import ExpertMode from "@/components/studio/modes/ExpertMode";
import ImportMode from "@/components/studio/modes/ImportMode";
import CollabMode from "@/components/studio/modes/CollabMode";
import WizardLayout from "@/components/studio/wizard/WizardLayout";

// Importar los componentes de las fases (temporalmente los crearemos)
// import Phase1Ideas from "@/components/studio/wizard/Phase1Ideas";
// import Phase2Structure from "@/components/studio/wizard/Phase2Structure";
// import Phase3Writing from "@/components/studio/wizard/Phase3Writing";
// import Phase4Quality from "@/components/studio/wizard/Phase4Quality";

interface StudioUnifiedProps {
  initialMode?: StudioMode;
}

export default function StudioUnified({ initialMode }: StudioUnifiedProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const { 
    mode, 
    currentPhase, 
    switchMode, 
    switchPhase, 
    userProfile, 
    projectData, 
    startNewProject,
    isLoading 
  } = useStudioMode();
  
  const { 
    phases, 
    nextPhase, 
    previousPhase, 
    canGoToPhase 
  } = useWizard();

  // Sincronizar con URL
  useEffect(() => {
    const urlMode = searchParams.get('mode') as StudioMode;
    const urlPhase = searchParams.get('phase');
    
    if (urlMode && urlMode !== mode && ['new', 'expert', 'import', 'collab'].includes(urlMode)) {
      switchMode(urlMode);
    }
    
    if (urlMode === 'new' && urlPhase && ['1', '2', '3', '4'].includes(urlPhase)) {
      const phaseNum = parseInt(urlPhase) as any;
      if (phaseNum !== currentPhase) {
        switchPhase(phaseNum);
      }
    }
  }, [searchParams, mode, currentPhase, switchMode, switchPhase]);

  // Actualizar URL cuando cambia el modo o fase
  const handleModeSwitch = (newMode: StudioMode) => {
    const url = new URL(window.location.href);
    
    if (newMode === 'selector') {
      url.searchParams.delete('mode');
      url.searchParams.delete('phase');
    } else {
      url.searchParams.set('mode', newMode);
      if (newMode === 'new') {
        url.searchParams.set('phase', currentPhase.toString());
      } else {
        url.searchParams.delete('phase');
      }
    }
    
    router.push(url.pathname + url.search, { scroll: false });
    switchMode(newMode);
  };

  const handlePhaseChange = (newPhase: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set('phase', newPhase.toString());
    router.push(url.pathname + url.search, { scroll: false });
    switchPhase(newPhase as any);
  };

  // Manejar creación de proyecto desde importación
  const handleProjectCreated = (project: any) => {
    console.log("Project created:", project);
    switchMode('expert');
  };

  const handleStartNewProject = () => {
    startNewProject();
    const url = new URL(window.location.href);
    url.searchParams.set('mode', 'new');
    url.searchParams.set('phase', '1');
    router.push(url.pathname + url.search, { scroll: false });
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

  // Renderizar wizard si estamos en modo new
  if (mode === 'new') {
    return (
      <WizardLayout
        currentPhase={currentPhase}
        phases={phases}
        onPhaseChange={handlePhaseChange}
        onBack={currentPhase > 1 ? previousPhase : undefined}
        onNext={currentPhase < 4 ? nextPhase : undefined}
        canGoNext={true}
        canGoBack={currentPhase > 1}
      >
        {/* Contenido de la fase actual - temporalmente mostraremos placeholders */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentPhase === 1 && (
            <div className="text-center">
              <Lightbulb className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Fase 1: Generación de Ideas</h2>
              <p className="text-gray-300 mb-8">
                Desarrollo inicial del concepto y estructura básica del guión con X.AI/Grok
              </p>
              <div className="bg-slate-800 rounded-lg p-8">
                <p className="text-white">
                  Aquí irá el componente Phase1Ideas - Funcionalidad de generación de ideas con IA
                </p>
              </div>
            </div>
          )}
          
          {currentPhase === 2 && (
            <div className="text-center">
              <FileText className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Fase 2: Desarrollo de Estructura</h2>
              <p className="text-gray-300 mb-8">
                Creación de la estructura narrativa, actos y puntos de giro con ChatGPT-4
              </p>
              <div className="bg-slate-800 rounded-lg p-8">
                <p className="text-white">
                  Aquí irá el componente Phase2Structure - Desarrollo de estructura narrativa
                </p>
              </div>
            </div>
          )}
          
          {currentPhase === 3 && (
            <div className="text-center">
              <Edit3 className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Fase 3: Escritura Profesional</h2>
              <p className="text-gray-300 mb-8">
                Redacción completa del guión con formato profesional usando Claude
              </p>
              <div className="bg-slate-800 rounded-lg p-8">
                <p className="text-white">
                  Aquí irá el componente Phase3Writing - Escritura profesional del guión
                </p>
              </div>
            </div>
          )}
          
          {currentPhase === 4 && (
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Fase 4: Control de Calidad</h2>
              <p className="text-gray-300 mb-8">
                Revisión final, validación y pulido del guión con Sistema Híbrido
              </p>
              <div className="bg-slate-800 rounded-lg p-8">
                <p className="text-white">
                  Aquí irá el componente Phase4Quality - Control de calidad y revisión final
                </p>
              </div>
            </div>
          )}
        </div>
      </WizardLayout>
    );
  }

  // Renderizar componente según el modo (modos originales)
  const renderModeComponent = () => {
    switch (mode) {
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
        return <ModeSelector onStartNewProject={handleStartNewProject} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Barra de navegación contextual */}
      {(mode === 'expert' || mode === 'import' || mode === 'collab') && (
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
