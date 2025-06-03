"use client";
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, Clock, Target, TrendingUp } from "lucide-react";

interface WordCounterProps {
  text: string;
  title?: string;
  targetWords?: number;
  showEstimatedTime?: boolean;
}

interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  paragraphs: number;
  sentences: number;
  estimatedReadingTime: number;
  estimatedScreenTime: number;
}

export default function WordCounter({ 
  text, 
  title = "Estadísticas del Texto",
  targetWords = 25000, // Promedio para un largometraje (90-120 páginas)
  showEstimatedTime = true 
}: WordCounterProps) {
  
  const stats: TextStats = useMemo(() => {
    if (!text) {
      return {
        words: 0,
        characters: 0,
        charactersNoSpaces: 0,
        paragraphs: 0,
        sentences: 0,
        estimatedReadingTime: 0,
        estimatedScreenTime: 0
      };
    }

    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    
    // Estimación de tiempo de lectura (250 palabras por minuto promedio)
    const estimatedReadingTime = Math.ceil(words / 250);
    
    // Estimación de tiempo en pantalla (1 página = ~250 palabras = ~1 minuto de película)
    const estimatedScreenTime = Math.ceil(words / 250);

    return {
      words,
      characters,
      charactersNoSpaces,
      paragraphs,
      sentences,
      estimatedReadingTime,
      estimatedScreenTime
    };
  }, [text]);

  const progressPercentage = targetWords > 0 ? (stats.words / targetWords) * 100 : 0;
  const isOverTarget = progressPercentage > 100;
  
  const getProgressColor = () => {
    if (progressPercentage < 25) return "bg-red-600";
    if (progressPercentage < 50) return "bg-orange-600";
    if (progressPercentage < 75) return "bg-yellow-600";
    if (progressPercentage <= 100) return "bg-green-600";
    return "bg-blue-600";
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-white text-sm">
          <FileText className="w-4 h-4" />
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Estadísticas principales */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-3 h-3 text-yellow-500" />
              <span className="text-xs text-gray-400">Palabras</span>
            </div>
            <div className="text-lg font-bold text-white">{stats.words.toLocaleString()}</div>
            {targetWords > 0 && (
              <div className="text-xs text-gray-500">
                de {targetWords.toLocaleString()}
              </div>
            )}
          </div>

          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-3 h-3 text-blue-500" />
              <span className="text-xs text-gray-400">Caracteres</span>
            </div>
            <div className="text-lg font-bold text-white">{stats.characters.toLocaleString()}</div>
            <div className="text-xs text-gray-500">
              {stats.charactersNoSpaces.toLocaleString()} sin espacios
            </div>
          </div>
        </div>

        {/* Progreso hacia el objetivo */}
        {targetWords > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Progreso</span>
              <Badge 
                variant={isOverTarget ? "default" : "secondary"} 
                className={`text-xs ${isOverTarget ? 'bg-blue-600' : 'bg-gray-700 text-gray-300'}`}
              >
                {Math.round(progressPercentage)}%
              </Badge>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor()}`}
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
            {isOverTarget && (
              <div className="text-xs text-blue-400">
                ¡Has superado tu objetivo por {(stats.words - targetWords).toLocaleString()} palabras!
              </div>
            )}
          </div>
        )}

        {/* Estadísticas detalladas */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-400">Párrafos:</span>
            <span className="text-white font-medium">{stats.paragraphs}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Oraciones:</span>
            <span className="text-white font-medium">{stats.sentences}</span>
          </div>
        </div>

        {/* Estimaciones de tiempo */}
        {showEstimatedTime && stats.words > 0 && (
          <div className="border-t border-gray-700 pt-3 space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-3 h-3 text-green-500" />
              <span className="text-xs text-gray-400 font-medium">Estimaciones</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-800 rounded p-2">
                <div className="text-gray-400 mb-1">Tiempo de lectura</div>
                <div className="text-white font-medium">{formatTime(stats.estimatedReadingTime)}</div>
              </div>
              <div className="bg-gray-800 rounded p-2">
                <div className="text-gray-400 mb-1">Tiempo en pantalla</div>
                <div className="text-white font-medium">{formatTime(stats.estimatedScreenTime)}</div>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 mt-2">
              * Basado en promedios de la industria cinematográfica
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}