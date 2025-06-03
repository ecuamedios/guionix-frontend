"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export type StudioMode = 'new' | 'expert' | 'import' | 'collab' | 'selector';

interface UserProfile {
  isFirstTime: boolean;
  projectCount: number;
  lastActivity: Date | null;
  skillLevel: 'beginner' | 'intermediate' | 'expert';
}

export const useStudioMode = () => {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [mode, setMode] = useState<StudioMode>('selector');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

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
    } else {
      url.searchParams.set('mode', newMode);
    }
    window.history.replaceState({}, '', url.toString());

    // Actualizar perfil del usuario
    if (newMode === 'expert') {
      localStorage.setItem('guionix-skill-level', 'expert');
    }
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
    userProfile,
    switchMode,
    updateUserProfile,
    isLoading: !userProfile
  };
};
