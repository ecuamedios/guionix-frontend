"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Youtube, TrendingUp, Clock, Filter, RefreshCw, Play,
  Eye, ThumbsUp, MessageSquare, Calendar, BarChart3,
  Lightbulb, FileText, Download, ExternalLink, Star
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Tipos para YouTube Analytics
interface YouTubeVideo {
  id: string;
  title: string;
  channel: string;
  views: number;
  likes: number;
  comments: number;
  duration: string;
  publishedAt: string;
  thumbnail: string;
  description: string;
  trending_score: number;
  category: string;
  language: string;
}

interface VideoInsight {
  video_id: string;
  script_potential: number;
  genre_suggestion: string;
  target_audience: string;
  content_pillars: string[];
  dramatic_elements: string[];
  adaptation_ideas: string[];
  guionix_score: number;
}

interface YouTubeAnalyticsProps {
  onNavigate: (tab: string) => void;
}

const YouTubeAnalytics: React.FC<YouTubeAnalyticsProps> = ({ onNavigate }) => {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('24h');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [insights, setInsights] = useState<{ [key: string]: VideoInsight }>({});
  const [loading, setLoading] = useState(false);

  // Mock data para YouTube trending (en producción vendría de la API)
  const mockVideos: YouTubeVideo[] = [
    {
      id: "1",
      title: "El Secreto de los Millonarios Mexicanos que NO te Cuentan",
      channel: "Emprendimiento LATAM",
      views: 2400000,
      likes: 125000,
      comments: 8900,
      duration: "12:45",
      publishedAt: "2024-06-03",
      thumbnail: "https://picsum.photos/480/270?random=1",
      description: "Descubre las estrategias secretas que usan los empresarios más exitosos de México...",
      trending_score: 95,
      category: "business",
      language: "es"
    },
    {
      id: "2", 
      title: "La Historia de Amor que Conquistó TikTok - Drama Real",
      channel: "Historias Virales",
      views: 1800000,
      likes: 89000,
      comments: 12400,
      duration: "8:32",
      publishedAt: "2024-06-03",
      thumbnail: "https://picsum.photos/480/270?random=2",
      description: "Una pareja que se conoció por TikTok y su historia se volvió viral mundial...",
      trending_score: 87,
      category: "entertainment",
      language: "es"
    },
    {
      id: "3",
      title: "El Misterio del Pueblo Fantasma en Jalisco",
      channel: "Misterios México",
      views: 950000,
      likes: 45000,
      comments: 6700,
      duration: "15:20",
      publishedAt: "2024-06-02",
      thumbnail: "https://picsum.photos/480/270?random=3",
      description: "Investigación sobre un pueblo abandonado donde ocurren fenómenos inexplicables...",
      trending_score: 78,
      category: "mystery",
      language: "es"
    }
  ];

  // Mock insights (en producción se generarían con IA)
  const mockInsights: { [key: string]: VideoInsight } = {
    "1": {
      video_id: "1",
      script_potential: 85,
      genre_suggestion: "Drama Empresarial / Thriller Económico",
      target_audience: "Adultos 25-45, interesados en emprendimiento",
      content_pillars: ["Ambición", "Secretos familiares", "Poder económico", "Traición"],
      dramatic_elements: ["Revelaciones progresivas", "Conflicto generacional", "Dilemas éticos"],
      adaptation_ideas: [
        "Serie de 10 episodios sobre dinastía empresarial mexicana",
        "Película biográfica de emprendedor controversial",
        "Docudrama sobre crisis económicas y oportunidades"
      ],
      guionix_score: 88
    },
    "2": {
      video_id: "2",
      script_potential: 92,
      genre_suggestion: "Comedia Romántica Digital / Drama Generacional",
      target_audience: "Jóvenes 16-30, usuarios de redes sociales",
      content_pillars: ["Amor digital", "Fama viral", "Autenticidad vs imagen", "Conexión humana"],
      dramatic_elements: ["Malentendidos digitales", "Presión social", "Crecimiento personal"],
      adaptation_ideas: [
        "Serie web episódica sobre influencers",
        "Película romántica para plataforma DramaBox",
        "Cortometraje sobre relaciones digitales"
      ],
      guionix_score: 91
    }
  };

  const handleGenerateInsights = async (video: YouTubeVideo) => {
    setLoading(true);
    setSelectedVideo(video);
    
    // Simular llamada a API de IA
    setTimeout(() => {
      setInsights(prev => ({
        ...prev,
        [video.id]: mockInsights[video.id] || {
          video_id: video.id,
          script_potential: Math.floor(Math.random() * 40) + 60,
          genre_suggestion: "Drama Contemporáneo",
          target_audience: "Audiencia General",
          content_pillars: ["Conflicto", "Resolución", "Crecimiento"],
          dramatic_elements: ["Tensión narrativa", "Desarrollo de personajes"],
          adaptation_ideas: ["Adaptación cinematográfica", "Serie de TV", "Cortometraje"],
          guionix_score: Math.floor(Math.random() * 30) + 70
        }
      }));
      setLoading(false);
    }, 2000);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Header YouTube Analytics */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-500 rounded-xl shadow-lg">
            <Youtube className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">YouTube Analytics</h2>
            <p className="text-gray-400">Tendencias virales para inspiración de guiones</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="border-red-500/50 hover:bg-red-500/20"
            onClick={() => setLoading(true)}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
          <Button 
            className="bg-red-500 hover:bg-red-600"
            onClick={() => onNavigate('studio')}
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Crear Guión
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card className="bg-slate-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros de Tendencias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Clock className="inline w-4 h-4 mr-2" />
                Período
              </label>
              <Select value={selectedTimeFilter} onValueChange={setSelectedTimeFilter}>
                <SelectTrigger className="bg-slate-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Últimas 24 horas</SelectItem>
                  <SelectItem value="7d">Última semana</SelectItem>
                  <SelectItem value="30d">Último mes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <TrendingUp className="inline w-4 h-4 mr-2" />
                Categoría
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-slate-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="entertainment">Entretenimiento</SelectItem>
                  <SelectItem value="business">Negocios</SelectItem>
                  <SelectItem value="mystery">Misterio</SelectItem>
                  <SelectItem value="comedy">Comedia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <BarChart3 className="inline w-4 h-4 mr-2" />
                Región
              </label>
              <Select defaultValue="mx">
                <SelectTrigger className="bg-slate-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mx">México</SelectItem>
                  <SelectItem value="latam">Latinoamérica</SelectItem>
                  <SelectItem value="es">España</SelectItem>
                  <SelectItem value="global">Global (Español)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Videos Trending Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-red-500" />
            Videos Trending
          </h3>
          
          {mockVideos.map((video) => (
            <Card key={video.id} className="bg-slate-800/50 border-gray-700 hover:border-red-500/50 transition-all cursor-pointer"
                  onClick={() => handleGenerateInsights(video)}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-32 h-20 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium text-sm mb-2 line-clamp-2">
                      {video.title}
                    </h4>
                    <p className="text-gray-400 text-xs mb-2">{video.channel}</p>
                    
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {formatNumber(video.views)}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        {formatNumber(video.likes)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {formatNumber(video.comments)}
                      </span>
                    </div>
                    
                    <div className="mt-2">
                      <Badge variant="secondary" className="text-xs">
                        Trending #{video.trending_score}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Panel de Insights */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Insights para Guión
          </h3>
          
          {selectedVideo && insights[selectedVideo.id] && (
            <Card className="bg-slate-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-sm">
                  {selectedVideo.title}
                </CardTitle>
                <CardDescription>
                  Análisis generado por GUIONIX AI
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 text-sm">Potencial de Guión</span>
                    <Badge className="bg-green-500">
                      {insights[selectedVideo.id].script_potential}/100
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${insights[selectedVideo.id].script_potential}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-medium mb-2">Género Sugerido</h5>
                  <p className="text-gray-300 text-sm">{insights[selectedVideo.id].genre_suggestion}</p>
                </div>
                
                <div>
                  <h5 className="text-white font-medium mb-2">Audiencia Objetivo</h5>
                  <p className="text-gray-300 text-sm">{insights[selectedVideo.id].target_audience}</p>
                </div>
                
                <div>
                  <h5 className="text-white font-medium mb-2">Elementos Dramáticos</h5>
                  <div className="flex flex-wrap gap-1">
                    {insights[selectedVideo.id].dramatic_elements.map((element, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {element}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-medium mb-2">Ideas de Adaptación</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    {insights[selectedVideo.id].adaptation_ideas.map((idea, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Star className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                        {idea}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="bg-red-500 hover:bg-red-600 flex-1"
                      onClick={() => onNavigate('studio')}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Crear Guión
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {!selectedVideo && (
            <Card className="bg-slate-800/50 border-gray-700">
              <CardContent className="p-8 text-center">
                <Youtube className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h4 className="text-white font-medium mb-2">Selecciona un video</h4>
                <p className="text-gray-400 text-sm">
                  Haz clic en cualquier video trending para generar insights automáticos 
                  con IA y crear ideas de guión.
                </p>
              </CardContent>
            </Card>
          )}
          
          {loading && selectedVideo && (
            <Card className="bg-slate-800/50 border-gray-700">
              <CardContent className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
                <h4 className="text-white font-medium mb-2">Generando Insights...</h4>
                <p className="text-gray-400 text-sm">
                  Analizando con X.AI, ChatGPT-4 y Claude para crear ideas únicas
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default YouTubeAnalytics; 