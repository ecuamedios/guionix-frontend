import React from 'react';
import { YouTubeVideo } from '@/types/youtube';
import { 
  Play, 
  Eye, 
  ThumbsUp, 
  Clock, 
  ExternalLink,
  Sparkles 
} from 'lucide-react';

interface VideoCardProps {
  video: YouTubeVideo;
  onClick: () => void;
}

export function VideoCard({ video, onClick }: VideoCardProps) {
  const formatNumber = (num: string) => {
    const number = parseInt(num);
    if (number >= 1000000) {
      return `${(number / 1000000).toFixed(1)}M`;
    }
    if (number >= 1000) {
      return `${(number / 1000).toFixed(1)}K`;
    }
    return number.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Hace 1 día';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.ceil(diffDays / 7)} semanas`;
    return `Hace ${Math.ceil(diffDays / 30)} meses`;
  };

  const getCategoryLabel = (categoryId: string) => {
    const categories: Record<string, string> = {
      '1': 'Cine',
      '2': 'Autos',
      '10': 'Música',
      '15': 'Mascotas',
      '17': 'Deportes',
      '19': 'Viajes',
      '20': 'Gaming',
      '22': 'Vlogs',
      '23': 'Comedia',
      '24': 'Entretenimiento',
      '25': 'Noticias',
      '26': 'Estilo',
      '27': 'Educación',
      '28': 'Tecnología',
    };
    return categories[categoryId] || 'General';
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-[#cb4335] dark:hover:border-[#cb4335] transition-all duration-300 overflow-hidden">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <button 
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 hover:bg-white text-black px-3 py-1.5 rounded-lg text-sm font-medium flex items-center space-x-1"
            onClick={(e) => {
              e.stopPropagation();
              window.open(`https://youtube.com/watch?v=${video.id}`, '_blank');
            }}
          >
            <Play className="w-4 h-4" />
            <span>Ver Video</span>
          </button>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-2 right-2">
          <span className="bg-black/80 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </span>
        </div>

        {/* Category badge */}
        <div className="absolute top-2 left-2">
          <span className="bg-white/90 text-gray-800 text-xs px-2 py-1 rounded">
            {getCategoryLabel(video.categoryId)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#cb4335] transition-colors duration-200">
          {video.title}
        </h3>

        {/* Channel and date */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium truncate">{video.channelTitle}</span>
          <span className="flex items-center ml-2">
            <Clock className="w-3 h-3 mr-1" />
            {formatDate(video.publishedAt)}
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {formatNumber(video.viewCount)}
            </span>
            <span className="flex items-center">
              <ThumbsUp className="w-4 h-4 mr-1" />
              {formatNumber(video.likeCount)}
            </span>
          </div>
          
          <button
            className="text-[#cb4335] hover:text-white hover:bg-[#cb4335] p-1 rounded transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              window.open(`https://youtube.com/watch?v=${video.id}`, '_blank');
            }}
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* Description preview */}
        {video.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {video.description}
          </p>
        )}

        {/* Generate insights button */}
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClick}
            className="w-full bg-gradient-to-r from-[#cb4335] to-[#a93226] hover:from-[#a93226] hover:to-[#922b21] text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generar Ideas de Guión</span>
          </button>
        </div>
      </div>
    </div>
  );
}
