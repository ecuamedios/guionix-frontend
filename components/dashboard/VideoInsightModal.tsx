import React from 'react';
import { VideoInsight, GeneratedIdea } from '@/types/youtube';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Lightbulb, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Star, 
  Copy,
  Download,
  Play,
  Sparkles,
  Target,
  Brain,
  FileText
} from 'lucide-react';

interface VideoInsightModalProps {
  isOpen: boolean;
  onClose: () => void;
  insight: VideoInsight | null;
  onUseIdea?: (idea: GeneratedIdea) => void;
  onCreateScript?: (idea: GeneratedIdea) => void;
}

export function VideoInsightModal({ 
  isOpen, 
  onClose, 
  insight,
  onUseIdea,
  onCreateScript 
}: VideoInsightModalProps) {
  if (!insight) return null;

  const getAdaptationTypeLabel = (type: string) => {
    const types = {
      direct: 'Adaptación Directa',
      inspired: 'Inspiración',
      variation: 'Variación Creativa',
    };
    return types[type as keyof typeof types] || type;
  };

  const getAdaptationTypeColor = (type: string) => {
    const colors = {
      direct: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300',
      inspired: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300',
      variation: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 dark:text-green-400';
    if (confidence >= 0.6) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <Brain className="w-6 h-6 mr-2 text-[#cb4335]" />
            Ideas de Guión Generadas
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
              <p className="font-medium text-sm">Video Original:</p>
              <p className="font-semibold text-gray-900 dark:text-white">{insight.originalVideo.title}</p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="ideas" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ideas" className="flex items-center">
              <Lightbulb className="w-4 h-4 mr-2" />
              Ideas de Guión
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Análisis de Tendencias
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ideas" className="space-y-4">
            <div className="grid gap-4">
              {insight.ideas.map((idea, index) => (
                <Card key={idea.id} className="hover:shadow-lg transition-shadow border-gray-200 dark:border-gray-700">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-lg text-gray-900 dark:text-white">
                          {idea.title}
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge className={getAdaptationTypeColor(idea.adaptationType)}>
                            {getAdaptationTypeLabel(idea.adaptationType)}
                          </Badge>
                          <Badge variant="outline" className="border-gray-300 dark:border-gray-600">
                            {idea.genre}
                          </Badge>
                          <Badge variant="outline" className="border-gray-300 dark:border-gray-600">
                            {idea.theme}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Confianza</p>
                          <p className={`font-bold ${getConfidenceColor(idea.confidence)}`}>
                            {Math.round(idea.confidence * 100)}%
                          </p>
                        </div>
                        <Star className={`w-5 h-5 ${idea.confidence >= 0.8 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Concept */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <Target className="w-4 h-4 mr-2 text-[#cb4335]" />
                        Concepto
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {idea.concept}
                      </p>
                    </div>

                    {/* Characters */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <Users className="w-4 h-4 mr-2 text-[#cb4335]" />
                        Personajes Principales
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {idea.characters.map((character, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {character}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Plot Points */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <BookOpen className="w-4 h-4 mr-2 text-[#cb4335]" />
                        Puntos de Trama
                      </h4>
                      <ul className="space-y-1">
                        {idea.plotPoints.map((point, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                            <span className="w-2 h-2 bg-[#cb4335] rounded-full mt-2 mr-2 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Button
                        size="sm"
                        className="bg-[#cb4335] hover:bg-[#a93226] text-white flex-1"
                        onClick={() => onCreateScript?.(idea)}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Crear Guión
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onUseIdea?.(idea)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Usar Idea
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <div className="space-y-4">
              {insight.trends.map((trend, index) => (
                <Card key={index} className="border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 dark:text-white flex items-center justify-between">
                      <span className="flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-[#cb4335]" />
                        {trend.genre}
                      </span>
                      <Badge className="bg-gradient-to-r from-[#cb4335] to-[#a93226] text-white">
                        {trend.popularity}% Popular
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Palabras Clave Trending
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {trend.keywords.map((keyword, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            #{keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <Button 
            className="bg-gradient-to-r from-[#cb4335] to-[#a93226] hover:from-[#a93226] hover:to-[#922b21] text-white"
            onClick={() => {
              // Navigate to create new script with all ideas
              onClose();
            }}
          >
            <Play className="w-4 h-4 mr-2" />
            Crear Proyecto con Estas Ideas
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
