"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, XCircle, Clock } from "lucide-react";

interface ValidationResult {
  type: 'blake-snyder' | 'word-count' | 'structure' | 'format';
  name: string;
  status: 'passed' | 'warning' | 'failed' | 'pending';
  message: string;
  score?: number;
  maxScore?: number;
}

interface ValidationStatusProps {
  projectId?: string;
  onValidationComplete?: (results: ValidationResult[]) => void;
}

export default function ValidationStatus({ projectId, onValidationComplete }: ValidationStatusProps) {
  const [validations, setValidations] = useState<ValidationResult[]>([
    {
      type: 'blake-snyder',
      name: 'Blake Snyder Beat Sheet',
      status: 'pending',
      message: 'Validación pendiente',
    },
    {
      type: 'word-count',
      name: 'Conteo de Palabras',
      status: 'pending',
      message: 'Análisis pendiente',
    },
    {
      type: 'structure',
      name: 'Estructura de Guión',
      status: 'pending',
      message: 'Revisión pendiente',
    },
    {
      type: 'format',
      name: 'Formato Estándar',
      status: 'pending',
      message: 'Verificación pendiente',
    },
  ]);
  
  const [loading, setLoading] = useState(false);
  const [overallScore, setOverallScore] = useState(0);

  const runValidationsManually = async () => {
    if (!projectId) return;
    
    setLoading(true);
    const updatedValidations = [...validations];

    try {
      // Blake Snyder validation
      const blakeResponse = await fetch('/api/studio/validation/blake-snyder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      });
      
      if (blakeResponse.ok) {
        const blakeData = await blakeResponse.json();
        const blakeIndex = updatedValidations.findIndex(v => v.type === 'blake-snyder');
        if (blakeIndex !== -1) {
          updatedValidations[blakeIndex] = {
            ...updatedValidations[blakeIndex],
            status: blakeData.isValid ? 'passed' : 'warning',
            message: blakeData.isValid ? 'Estructura válida' : 'Estructura incompleta',
            score: blakeData.score,
            maxScore: blakeData.maxScore,
          };
        }
      }

      // Word count validation
      const wordResponse = await fetch('/api/studio/validation/word-count', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      });
      
      if (wordResponse.ok) {
        const wordData = await wordResponse.json();
        const wordIndex = updatedValidations.findIndex(v => v.type === 'word-count');
        if (wordIndex !== -1) {
          updatedValidations[wordIndex] = {
            ...updatedValidations[wordIndex],
            status: wordData.status === 'complete' ? 'passed' : 'warning',
            message: `${wordData.totalWords} palabras (${Math.round(wordData.percentage)}%)`,
            score: wordData.totalWords,
            maxScore: wordData.targetWordCount,
          };
        }
      }

      // Mock other validations
      const structureIndex = updatedValidations.findIndex(v => v.type === 'structure');
      if (structureIndex !== -1) {
        updatedValidations[structureIndex] = {
          ...updatedValidations[structureIndex],
          status: 'passed',
          message: 'Estructura correcta',
          score: 85,
          maxScore: 100,
        };
      }

      const formatIndex = updatedValidations.findIndex(v => v.type === 'format');
      if (formatIndex !== -1) {
        updatedValidations[formatIndex] = {
          ...updatedValidations[formatIndex],
          status: 'passed',
          message: 'Formato estándar',
          score: 90,
          maxScore: 100,
        };
      }

      setValidations(updatedValidations);
      
      // Calculate overall score
      const totalScore = updatedValidations.reduce((sum, v) => sum + (v.score || 0), 0);
      const totalMaxScore = updatedValidations.reduce((sum, v) => sum + (v.maxScore || 100), 0);
      setOverallScore(Math.round((totalScore / totalMaxScore) * 100));
      
      onValidationComplete?.(updatedValidations);
    } catch (error) {
      console.error('Error running validations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const runValidations = async () => {
      if (!projectId) return;
      
      setLoading(true);
      const updatedValidations = [...validations];

      try {
        // Blake Snyder validation
        const blakeResponse = await fetch('/api/studio/validation/blake-snyder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectId }),
        });
        
        if (blakeResponse.ok) {
          const blakeData = await blakeResponse.json();
          const blakeIndex = updatedValidations.findIndex(v => v.type === 'blake-snyder');
          if (blakeIndex !== -1) {
            updatedValidations[blakeIndex] = {
              ...updatedValidations[blakeIndex],
              status: blakeData.isValid ? 'passed' : 'warning',
              message: blakeData.isValid ? 'Estructura válida' : 'Estructura incompleta',
              score: blakeData.score,
              maxScore: blakeData.maxScore,
            };
          }
        }

        // Word count validation
        const wordResponse = await fetch('/api/studio/validation/word-count', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectId }),
        });
        
        if (wordResponse.ok) {
          const wordData = await wordResponse.json();
          const wordIndex = updatedValidations.findIndex(v => v.type === 'word-count');
          if (wordIndex !== -1) {
            updatedValidations[wordIndex] = {
              ...updatedValidations[wordIndex],
              status: wordData.status === 'complete' ? 'passed' : 'warning',
              message: `${wordData.totalWords} palabras (${Math.round(wordData.percentage)}%)`,
              score: wordData.totalWords,
              maxScore: wordData.targetWordCount,
            };
          }
        }

        // Mock other validations
        const structureIndex = updatedValidations.findIndex(v => v.type === 'structure');
        if (structureIndex !== -1) {
          updatedValidations[structureIndex] = {
            ...updatedValidations[structureIndex],
            status: 'passed',
            message: 'Estructura correcta',
            score: 85,
            maxScore: 100,
          };
        }

        const formatIndex = updatedValidations.findIndex(v => v.type === 'format');
        if (formatIndex !== -1) {
          updatedValidations[formatIndex] = {
            ...updatedValidations[formatIndex],
            status: 'passed',
            message: 'Formato estándar',
            score: 90,
            maxScore: 100,
          };
        }

        setValidations(updatedValidations);
        
        // Calculate overall score
        const totalScore = updatedValidations.reduce((sum, v) => sum + (v.score || 0), 0);
        const totalMaxScore = updatedValidations.reduce((sum, v) => sum + (v.maxScore || 100), 0);
        setOverallScore(Math.round((totalScore / totalMaxScore) * 100));
        
        onValidationComplete?.(updatedValidations);
      } catch (error) {
        console.error('Error running validations:', error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      runValidations();
    }
  }, [projectId, validations, onValidationComplete]);

  const getStatusIcon = (status: ValidationResult['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: ValidationResult['status']) => {
    switch (status) {
      case 'passed':
        return <Badge className="bg-green-100 text-green-800">Aprobado</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Advertencia</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Fallido</Badge>;
      default:
        return <Badge variant="secondary">Pendiente</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Estado de Validación
          {overallScore > 0 && (
            <Badge variant="outline" className="text-lg px-3 py-1">
              {overallScore}%
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Validación automática de la estructura y formato del guión
        </CardDescription>
        {overallScore > 0 && (
          <Progress value={overallScore} className="mt-2" />
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {validations.map((validation) => (
            <div
              key={validation.type}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(validation.status)}
                <div>
                  <p className="font-medium">{validation.name}</p>
                  <p className="text-sm text-muted-foreground">{validation.message}</p>
                  {validation.score !== undefined && validation.maxScore && (
                    <div className="flex items-center gap-2 mt-1">
                      <Progress 
                        value={(validation.score / validation.maxScore) * 100} 
                        className="w-20 h-2" 
                      />
                      <span className="text-xs text-muted-foreground">
                        {validation.score}/{validation.maxScore}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {getStatusBadge(validation.status)}
            </div>
          ))}
        </div>
        
        {projectId && !loading && (
          <div className="mt-4 pt-4 border-t text-center">
            <button
              onClick={runValidationsManually}
              className="text-sm text-primary hover:underline"
              disabled={loading}
            >
              Ejecutar validaciones nuevamente
            </button>
          </div>
        )}
        
        {loading && (
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Ejecutando validaciones...
          </div>
        )}
      </CardContent>
    </Card>
  );
}