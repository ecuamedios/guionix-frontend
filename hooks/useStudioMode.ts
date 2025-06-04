"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Lightbulb, FileText, Edit3, CheckCircle } from "lucide-react";

export type StudioMode = 'new' | 'expert' | 'import' | 'collab' | 'selector';
export type WizardPhase = 1 | 2 | 3 | 4;

interface UserProfile {
  isFirstTime: boolean;
  projectCount: number;
  lastActivity: Date | null;
  skillLevel: 'beginner' | 'intermediate' | 'expert';
}

interface ProjectData {
  id?: string;
  title?: string;
  genre?: string;
  idea?: any;
  structure?: any;
  script?: any;
  quality?: any;
  currentPhase?: WizardPhase;
  completedPhases?: WizardPhase[];
}

export const useStudioMode = () => {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [mode, setMode] = useState<StudioMode>('selector');
  const [currentPhase, setCurrentPhase] = useState<WizardPhase>(1);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [projectData, setProjectData] = useState<ProjectData | null>(null);

  // Detección automática del modo basado en el usuario
  const detectUserMode = (profile: UserProfile): StudioMode => {
    // URL params tienen prioridad
    const urlMode = searchParams.get('mode') as StudioMode;
    if (urlMode && ['new', 'expert', 'import', 'collab'].includes(urlMode)) {
      return urlMode;
    }

    // Invitación de colaboración
    const inviteToken = searchParams.get('invite');
    if (inviteToken) {
      return 'collab';
    }

    // Auto-detección basada en perfil
    if (profile.isFirstTime || profile.projectCount === 0) {
      return 'new'; // Workflow guiado para principiantes
    }

    if (profile.skillLevel === 'expert' || profile.projectCount > 5) {
      return 'expert'; // Editor avanzado para expertos
    }

    return 'selector'; // Mostrar selector para casos ambiguos
  };

  // Cargar perfil del usuario
  useEffect(() => {
    if (session?.user) {
      // Simular carga de perfil del usuario
      // En producción, esto vendría de la API
      const mockProfile: UserProfile = {
        isFirstTime: !localStorage.getItem('guionix-user-visited'),
        projectCount: parseInt(localStorage.getItem('guionix-project-count') || '0'),
        lastActivity: localStorage.getItem('guionix-last-activity') 
          ? new Date(localStorage.getItem('guionix-last-activity')!)
          : null,
        skillLevel: localStorage.getItem('guionix-skill-level') as any || 'beginner'
      };

      setUserProfile(mockProfile);
      const detectedMode = detectUserMode(mockProfile);
      setMode(detectedMode);

      // Detectar fase del wizard si estamos en modo new
      const urlPhase = searchParams.get('phase');
      if (urlPhase && ['1', '2', '3', '4'].includes(urlPhase)) {
        setCurrentPhase(parseInt(urlPhase) as WizardPhase);
      }

      // Cargar datos del proyecto actual si existen
      const savedProject = localStorage.getItem('guionix-current-project');
      if (savedProject) {
        try {
          setProjectData(JSON.parse(savedProject));
        } catch (error) {
          console.error('Error loading project data:', error);
        }
      }

      // Marcar que el usuario ya visitó
      if (mockProfile.isFirstTime) {
        localStorage.setItem('guionix-user-visited', 'true');
      }
    }
  }, [session, searchParams]);

  const switchMode = (newMode: StudioMode) => {
    setMode(newMode);
    
    // Actualizar URL sin recargar la página
    const url = new URL(window.location.href);
    if (newMode === 'selector') {
      url.searchParams.delete('mode');
      url.searchParams.delete('phase');
    } else {
      url.searchParams.set('mode', newMode);
      if (newMode === 'new' && currentPhase) {
        url.searchParams.set('phase', currentPhase.toString());
      } else {
        url.searchParams.delete('phase');
      }
    }
    window.history.replaceState({}, '', url.toString());

    // Actualizar perfil del usuario
    if (newMode === 'expert') {
      localStorage.setItem('guionix-skill-level', 'expert');
    }
  };

  const switchPhase = (newPhase: WizardPhase) => {
    setCurrentPhase(newPhase);
    
    // Actualizar URL
    const url = new URL(window.location.href);
    url.searchParams.set('phase', newPhase.toString());
    window.history.replaceState({}, '', url.toString());
  };

  const updateProjectData = (updates: Partial<ProjectData>) => {
    const newProjectData = projectData ? { ...projectData, ...updates } : updates;
    setProjectData(newProjectData);
    
    // Persistir en localStorage
    localStorage.setItem('guionix-current-project', JSON.stringify(newProjectData));
  };

  const completePhase = (phase: WizardPhase, data: any) => {
    updateProjectData({
      [`phase${phase}Data`]: data,
      currentPhase: phase,
      completedPhases: [...(projectData?.completedPhases || []), phase].filter((p, i, arr) => arr.indexOf(p) === i)
    });
  };

  const startNewProject = () => {
    setProjectData({
      id: `project-${Date.now()}`,
      currentPhase: 1,
      completedPhases: []
    });
    setCurrentPhase(1);
    switchMode('new');
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    if (userProfile) {
      const newProfile = { ...userProfile, ...updates };
      setUserProfile(newProfile);
      
      // Persistir cambios relevantes
      if (updates.projectCount !== undefined) {
        localStorage.setItem('guionix-project-count', updates.projectCount.toString());
      }
      if (updates.skillLevel) {
        localStorage.setItem('guionix-skill-level', updates.skillLevel);
      }
      localStorage.setItem('guionix-last-activity', new Date().toISOString());
    }
  };

  return {
    mode,
    currentPhase,
    userProfile,
    projectData,
    switchMode,
    switchPhase,
    updateProjectData,
    completePhase,
    startNewProject,
    updateUserProfile,
    isLoading: !userProfile
  };
};

// Hook específico para el wizard
export const useWizard = () => {
  const { 
    currentPhase, 
    projectData, 
    switchPhase, 
    updateProjectData, 
    completePhase 
  } = useStudioMode();

  const phases = [
    {
      id: 1,
      title: "Generación de Ideas",
      description: "Desarrollo inicial del concepto y estructura básica del guión",
      icon: Lightbulb,
      aiProvider: "X.AI/Grok",
      estimatedTime: "5-10 min",
      status: projectData?.completedPhases?.includes(1) ? 'completed' as const : 
              currentPhase === 1 ? 'in-progress' as const : 'pending' as const
    },
    {
      id: 2,
      title: "Desarrollo de Estructura",
      description: "Creación de la estructura narrativa, actos y puntos de giro",
      icon: FileText,
      aiProvider: "ChatGPT-4",
      estimatedTime: "10-15 min",
      status: projectData?.completedPhases?.includes(2) ? 'completed' as const : 
              currentPhase === 2 ? 'in-progress' as const : 'pending' as const
    },
    {
      id: 3,
      title: "Escritura Profesional",
      description: "Redacción completa del guión con formato profesional",
      icon: Edit3,
      aiProvider: "Claude",
      estimatedTime: "20-30 min",
      status: projectData?.completedPhases?.includes(3) ? 'completed' as const : 
              currentPhase === 3 ? 'in-progress' as const : 'pending' as const
    },
    {
      id: 4,
      title: "Control de Calidad",
      description: "Revisión final, validación y pulido del guión",
      icon: CheckCircle,
      aiProvider: "Sistema Híbrido",
      estimatedTime: "10-15 min",
      status: projectData?.completedPhases?.includes(4) ? 'completed' as const : 
              currentPhase === 4 ? 'in-progress' as const : 'pending' as const
    }
  ];

  const canGoToPhase = (phaseId: WizardPhase): boolean => {
    if (phaseId === 1) return true;
    return projectData?.completedPhases?.includes((phaseId - 1) as WizardPhase) || false;
  };

  const nextPhase = () => {
    if (currentPhase < 4) {
      switchPhase((currentPhase + 1) as WizardPhase);
    }
  };

  const previousPhase = () => {
    if (currentPhase > 1) {
      switchPhase((currentPhase - 1) as WizardPhase);
    }
  };

  return {
    currentPhase,
    phases,
    projectData,
    switchPhase,
    nextPhase,
    previousPhase,
    canGoToPhase,
    updateProjectData,
    completePhase
  };
};
