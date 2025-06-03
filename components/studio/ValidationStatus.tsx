"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, XCircle, Clock, RefreshCw, Shield, FileText, BarChart3, Layout } from "lucide-react";

interface ValidationResult {
  type: 'blake-snyder' | 'word-count' | 'structure' | 'format' | 'characters' | 'dialogue' | 'scenes';
  name: string;
  status: 'passed' | 'warning' | 'failed' | 'pending';
  message: string;
  score?: number;
  maxScore?: number;
  details?: string[];
  recommendations?: string[];
}

interface ValidationStatusProps {
  project?: any;
  projectId?: string;
  onValidationComplete?: (results: ValidationResult[]) => void;
}

export default function ValidationStatus({ project, projectId, onValidationComplete }: ValidationStatusProps) {
  const [validations, setValidations] = useState<ValidationResult[]>([
    {
      type: 'blake-snyder',
      name: 'Blake Snyder Beat Sheet',
      status: 'pending',
      message: 'Analizando estructura narrativa...',
      recommendations: ['Asegúrate de incluir todos los beats esenciales', 'Verifica la duración de cada acto']
    },
    {
      type: 'word-count',
      name: 'Conteo de Palabras',
      status: 'pending',
      message: 'Calculando extensión del guión...',
      recommendations: ['Apunta a 15,000-25,000 palabras para largometraje', 'Considera el tiempo de pantalla estimado']
    },
    {
      type: 'structure',
      name: 'Estructura de Guión',
      status: 'pending',
      message: 'Evaluando arquitectura narrativa...',
      recommendations: ['Equilibra los tres actos', 'Asegúrate de tener conflictos claros']
    },
    {
      type: 'format',
      name: 'Formato Estándar',
      status: 'pending',
      message: 'Verificando formato industrial...',
      recommendations: ['Usa formato estándar de guión', 'Verifica márgenes y tipografía']
    },
    {
      type: 'characters',
      name: 'Desarrollo de Personajes',
      status: 'pending',
      message: 'Analizando arcos de personajes...',
      recommendations: ['Desarrolla arcos completos para protagonistas', 'Define motivaciones claras']
    },
    {
      type: 'dialogue',
      name: 'Calidad del Diálogo',
      status: 'pending',
      message: 'Evaluando naturalidad del diálogo...',
      recommendations: ['Cada personaje debe tener voz única', 'Evita exposition dumps']
    },
    {
      type: 'scenes',
      name: 'Estructura de Escenas',
      status: 'pending',
      message: 'Revisando construcción de escenas...',
      recommendations: ['Cada escena debe avanzar la historia', 'Equilibra acción y diálogo']
    },
  ]);
  
  const [loading, setLoading] = useState(false);
  const [overallScore, setOverallScore] = useState(0);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Simulate validation based on project data
  const simulateValidation = () => {
    if (!project) return;

    const updatedValidations = [...validations];
    
    // Blake Snyder validation
    const totalCapas = project.capas?.length || 0;
    const blakeIndex = updatedValidations.findIndex(v => v.type === 'blake-snyder');
    if (blakeIndex !== -1) {
      const score = Math.min(totalCapas * 20, 100);
      updatedValidations[blakeIndex] = {
        ...updatedValidations[blakeIndex],
        status: score >= 80 ? 'passed' : score >= 60 ? 'warning' : 'failed',
        message: `${totalCapas} capas estructuradas (${score}% completo)`,
        score,
        maxScore: 100,
        details: [
          `Capas identificadas: ${totalCapas}`,
          'Setup, Confrontación y Resolución detectados',
          'Estructura de tres actos presente'
        ]
      };
    }

    // Word count validation
    const totalBeats = project.capas?.reduce((acc: number, capa: any) => acc + (capa.beats?.length || 0), 0) || 0;
    const estimatedWords = totalBeats * 250; // Estimate 250 words per beat
    const wordIndex = updatedValidations.findIndex(v => v.type === 'word-count');
    if (wordIndex !== -1) {
      const targetWords = 20000;
      const percentage = Math.min((estimatedWords / targetWords) * 100, 100);
      updatedValidations[wordIndex] = {
        ...updatedValidations[wordIndex],
        status: percentage >= 80 ? 'passed' : percentage >= 50 ? 'warning' : 'failed',
        message: `~${estimatedWords.toLocaleString()} palabras estimadas (${Math.round(percentage)}%)`,
        score: estimatedWords,
        maxScore: targetWords,
        details: [
          `Beats completados: ${totalBeats}`,
          `Páginas estimadas: ${Math.round(estimatedWords / 250)}`,
          `Duración estimada: ${Math.round(estimatedWords / 250)} minutos`
        ]
      };
    }

    // Structure validation
    const structureIndex = updatedValidations.findIndex(v => v.type === 'structure');
    if (structureIndex !== -1) {
      const hasSetup = project.capas?.some((capa: any) => capa.tipo === 'SETUP');
      const hasConfrontation = project.capas?.some((capa: any) => capa.tipo === 'CONFRONTATION');
      const hasResolution = project.capas?.some((capa: any) => capa.tipo === 'RESOLUTION');
      const structureScore = (hasSetup ? 30 : 0) + (hasConfrontation ? 40 : 0) + (hasResolution ? 30 : 0);
      
      updatedValidations[structureIndex] = {
        ...updatedValidations[structureIndex],
        status: structureScore >= 80 ? 'passed' : structureScore >= 60 ? 'warning' : 'failed',
        message: `Estructura ${structureScore}% completa`,
        score: structureScore,
        maxScore: 100,
        details: [
          `Setup: ${hasSetup ? '✓' : '✗'}`,
          `Confrontación: ${hasConfrontation ? '✓' : '✗'}`,
          `Resolución: ${hasResolution ? '✓' : '✗'}`
        ]
      };
    }

    // Format validation (simulate)
    const formatIndex = updatedValidations.findIndex(v => v.type === 'format');
    if (formatIndex !== -1) {
      updatedValidations[formatIndex] = {
        ...updatedValidations[formatIndex],
        status: 'passed',
        message: 'Formato estándar aplicado',
        score: 95,
        maxScore: 100,
        details: [
          'Tipografía: Courier 12pt',
          'Márgenes: Estándar industrial',
          'Encabezados: Correctos'
        ]
      };
    }

    // Characters validation (simulate)
    const charactersIndex = updatedValidations.findIndex(v => v.type === 'characters');
    if (charactersIndex !== -1) {
      updatedValidations[charactersIndex] = {
        ...updatedValidations[charactersIndex],
        status: 'warning',
        message: 'Desarrollo de personajes en progreso',
        score: 70,
        maxScore: 100,
        details: [
          'Protagonista: Definido',
          'Antagonista: En desarrollo',
          'Personajes secundarios: 3 identificados'
        ]
      };
    }

    // Dialogue validation (simulate)
    const dialogueIndex = updatedValidations.findIndex(v => v.type === 'dialogue');
    if (dialogueIndex !== -1) {
      updatedValidations[dialogueIndex] = {
        ...updatedValidations[dialogueIndex],
        status: 'warning',
        message: 'Diálogo necesita refinamiento',
        score: 65,
        maxScore: 100,
        details: [
          'Naturalidad: Buena',
          'Diferenciación de voces: Mejorable',
          'Exposition: Revisar'
        ]
      };
    }

    // Scenes validation (simulate)
    const scenesIndex = updatedValidations.findIndex(v => v.type === 'scenes');
    if (scenesIndex !== -1) {
      updatedValidations[scenesIndex] = {
        ...updatedValidations[scenesIndex],
        status: 'passed',
        message: 'Estructura de escenas sólida',
        score: 80,
        maxScore: 100,
        details: [
          'Propósito claro en cada escena',
          'Transiciones fluidas',
          'Ritmo narrativo adecuado'
        ]
      };
    }

    setValidations(updatedValidations);
    
    // Calculate overall score
    const totalScore = updatedValidations.reduce((sum, v) => sum + (v.score || 0), 0);
    const totalMaxScore = updatedValidations.reduce((sum, v) => sum + (v.maxScore || 100), 0);
    setOverallScore(Math.round((totalScore / totalMaxScore) * 100));
    
    onValidationComplete?.(updatedValidations);
  };

  const runValidationsManually = async () => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    simulateValidation();
    setLoading(false);
  };

  useEffect(() => {
    if (project) {
      simulateValidation();
    }
  }, [project]);

  const getStatusIcon = (status: ValidationResult['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-400" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: ValidationResult['status']) => {
    switch (status) {
      case 'passed':
        return <Badge className="bg-green-900/50 text-green-400 border-green-400/20">Aprobado</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-900/50 text-yellow-400 border-yellow-400/20">Advertencia</Badge>;
      case 'failed':
        return <Badge className="bg-red-900/50 text-red-400 border-red-400/20">Fallido</Badge>;
      default:
        return <Badge className="bg-gray-800 text-gray-400 border-gray-600">Pendiente</Badge>;
    }
  };

  const getTypeIcon = (type: ValidationResult['type']) => {
    switch (type) {
      case 'blake-snyder':
        return <Layout className="h-4 w-4" />;
      case 'word-count':
        return <BarChart3 className="h-4 w-4" />;
      case 'structure':
        return <Shield className="h-4 w-4" />;
      case 'format':
        return <FileText className="h-4 w-4" />;
      case 'characters':
      case 'dialogue':
      case 'scenes':
        return <FileText className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-yellow-400" />
            Estado de Validación
          </div>
          {overallScore > 0 && (
            <Badge variant="outline" className="text-lg px-3 py-1 border-yellow-400 text-yellow-400">
              {overallScore}%
            </Badge>
          )}
        </CardTitle>
        <CardDescription className="text-gray-400">
          Análisis integral de calidad y estructura del guión
        </CardDescription>
        {overallScore > 0 && (
          <Progress 
            value={overallScore} 
            className="mt-3 h-2 bg-gray-800" 
          />
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {validations.map((validation) => (
            <div
              key={validation.type}
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getTypeIcon(validation.type)}
                  {getStatusIcon(validation.status)}
                  <div>
                    <h4 className="font-medium text-white">{validation.name}</h4>
                    <p className="text-sm text-gray-400">{validation.message}</p>
                  </div>
                </div>
                {getStatusBadge(validation.status)}
              </div>
              
              {validation.score !== undefined && validation.maxScore && (
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span>Puntuación</span>
                    <span>{validation.score}/{validation.maxScore}</span>
                  </div>
                  <Progress 
                    value={(validation.score / validation.maxScore) * 100} 
                    className="h-2 bg-gray-700"
                  />
                </div>
              )}

              {validation.details && validation.details.length > 0 && (
                <div className="mb-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedCard(expandedCard === validation.type ? null : validation.type)}
                    className="text-xs text-gray-400 hover:text-white p-0 h-auto"
                  >
                    {expandedCard === validation.type ? 'Ocultar detalles' : 'Ver detalles'}
                  </Button>
                  
                  {expandedCard === validation.type && (
                    <div className="mt-2 space-y-1">
                      {validation.details.map((detail, index) => (
                        <div key={index} className="text-xs text-gray-300 flex items-center gap-2">
                          <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                          {detail}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {validation.recommendations && validation.recommendations.length > 0 && validation.status !== 'passed' && (
                <div className="border-t border-gray-700 pt-3">
                  <h5 className="text-xs font-medium text-gray-400 mb-2">Recomendaciones:</h5>
                  <div className="space-y-1">
                    {validation.recommendations.map((rec, index) => (
                      <div key={index} className="text-xs text-gray-300 flex items-start gap-2">
                        <div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        {rec}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-700 flex justify-center">
          <Button
            onClick={runValidationsManually}
            disabled={loading}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-500"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Analizando...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Ejecutar Análisis
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}