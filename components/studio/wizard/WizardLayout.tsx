"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Circle,
  Lightbulb,
  FileText,
  Edit3,
  Award,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export interface WizardPhase {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  aiProvider: string;
  estimatedTime: string;
  status: 'pending' | 'in-progress' | 'completed' | 'approved';
}

interface WizardLayoutProps {
  children: React.ReactNode;
  currentPhase: number;
  phases: WizardPhase[];
  onPhaseChange: (phase: number) => void;
  onBack?: () => void;
  onNext?: () => void;
  canGoNext?: boolean;
  canGoBack?: boolean;
  isLoading?: boolean;
}

export default function WizardLayout({
  children,
  currentPhase,
  phases,
  onPhaseChange,
  onBack,
  onNext,
  canGoNext = false,
  canGoBack = true,
  isLoading = false
}: WizardLayoutProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentPhaseData = phases.find(p => p.id === currentPhase);
  const completedPhases = phases.filter(p => p.status === 'completed').length;
  const progressPercentage = (completedPhases / phases.length) * 100;

  const handleBackToStudio = () => {
    router.push('/studio');
  };

  const handlePhaseClick = (phaseId: number) => {
    const phase = phases.find(p => p.id === phaseId);
    if (phase && (phase.status === 'completed' || phaseId <= currentPhase)) {
      onPhaseChange(phaseId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                onClick={handleBackToStudio}
                className="text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver al Studio
              </Button>
            </div>
            
            <div className="flex items-center space-x-6">
              {currentPhaseData && (
                <div className="hidden sm:flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg">
                    <currentPhaseData.icon className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {currentPhaseData.title}
                    </h1>
                    <p className="text-sm text-gray-400 flex items-center">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Powered by {currentPhaseData.aiProvider}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar y Breadcrumbs */}
      <div className="border-b border-white/10 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Progress Indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Progreso del Proyecto
                </h2>
                <p className="text-sm text-gray-400">
                  Fase {currentPhase} de {phases.length} • {completedPhases} completadas
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{Math.round(progressPercentage)}%</div>
                <div className="text-sm text-gray-400">Completado</div>
              </div>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Phase Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              const isActive = phase.id === currentPhase;
              const isCompleted = phase.status === 'completed';
              const canAccess = isCompleted || phase.id <= currentPhase;
              
              return (
                <Card 
                  key={phase.id} 
                  className={`relative overflow-hidden transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'bg-yellow-500/20 border-yellow-500 scale-105' 
                      : isCompleted 
                        ? 'bg-green-500/20 border-green-500 hover:scale-102'
                        : canAccess
                          ? 'bg-gray-800 border-gray-700 hover:border-gray-600 hover:scale-102'
                          : 'bg-gray-900 border-gray-800 opacity-50 cursor-not-allowed'
                  }`}
                  onClick={() => canAccess && handlePhaseClick(phase.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-full transition-colors ${
                        isActive 
                          ? 'bg-yellow-500 text-black' 
                          : isCompleted 
                            ? 'bg-green-500 text-white'
                            : canAccess
                              ? 'bg-gray-700 text-gray-300'
                              : 'bg-gray-800 text-gray-500'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={`text-xs ${
                          isActive 
                            ? 'border-yellow-400 text-yellow-400'
                            : isCompleted
                              ? 'border-green-400 text-green-400'
                              : 'border-gray-600 text-gray-400'
                        }`}>
                          Fase {phase.id}
                        </Badge>
                        
                        {isCompleted && (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-sm font-semibold text-white mb-1 truncate">
                      {phase.title}
                    </h3>
                    
                    <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                      {phase.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">
                        {phase.aiProvider}
                      </span>
                      <span className="text-gray-400">
                        {phase.estimatedTime}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Navigation Footer */}
      <footer className="border-t border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {onBack && canGoBack && (
                <Button
                  variant="outline"
                  onClick={onBack}
                  disabled={isLoading}
                  className="text-gray-400 border-gray-600 hover:text-white hover:border-gray-500"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {currentPhaseData && (
                <div className="hidden sm:block text-sm text-gray-400">
                  Tiempo estimado: {currentPhaseData.estimatedTime}
                </div>
              )}
              
              {onNext && canGoNext && (
                <Button
                  onClick={onNext}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-black font-semibold"
                >
                  {isLoading ? "Procesando..." : "Siguiente"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 