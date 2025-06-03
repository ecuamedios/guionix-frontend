'use client';

import { useState } from 'react';
import { useYouTubeData } from '@/hooks/useYouTubeData';
import { VideoCard } from '@/components/dashboard/VideoCardSimple';
import { VideoInsightModal } from '@/components/dashboard/VideoInsightModal';
import { YouTubeVideo, TimeFilter, CategoryFilter } from '@/types/youtube';
import { Loader2, TrendingUp, Clock, Filter, RefreshCw } from 'lucide-react';

export default function YouTubeDashboard() {
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('24h');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [isInsightModalOpen, setIsInsightModalOpen] = useState(false);

  const { 
    videos, 
    loading: isLoading, 
    error: isError, 
    refreshVideos: refetch,
    setTimeFilter: updateTimeFilter,
    setCategoryFilter: updateCategoryFilter,
    generateInsights,
    insights,
    insightsLoading
  } = useYouTubeData({
    initialTimeFilter: timeFilter,
    initialCategoryFilter: categoryFilter,
    maxResults: 20
  });

  const handleVideoClick = async (video: YouTubeVideo) => {
    setSelectedVideo(video);
    
    // Generate insights if not already available
    if (!insights[video.id] && !insightsLoading[video.id]) {
      await generateInsights(video);
    }
    
    setIsInsightModalOpen(true);
  };

  const handleTimeFilterChange = (filter: TimeFilter) => {
    setTimeFilter(filter);
    updateTimeFilter(filter);
  };

  const handleCategoryFilterChange = (filter: CategoryFilter) => {
    setCategoryFilter(filter);
    updateCategoryFilter(filter);
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#cb4335] rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  YouTube Insights
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Descubre tendencias y genera ideas para tus guiones
                </p>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-[#cb4335] text-white rounded-lg hover:bg-[#a93226] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Actualizar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-4 mb-6">
            <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filtros
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Time Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                <Clock className="inline h-4 w-4 mr-2" />
                Período de tiempo
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: '24h' as TimeFilter, label: '24 horas' },
                  { value: '7d' as TimeFilter, label: '7 días' },
                  { value: '30d' as TimeFilter, label: '30 días' }
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => handleTimeFilterChange(value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      timeFilter === value
                        ? 'bg-[#cb4335] text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                <TrendingUp className="inline h-4 w-4 mr-2" />
                Categoría
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => handleCategoryFilterChange(e.target.value as CategoryFilter)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#cb4335] focus:border-transparent"
              >
                <option value="all">Todas las categorías</option>
                <option value="entertainment">Entretenimiento</option>
                <option value="education">Educación</option>
                <option value="comedy">Comedia</option>
                <option value="music">Música</option>
                <option value="gaming">Gaming</option>
                <option value="news">Noticias</option>
                <option value="lifestyle">Estilo de vida</option>
                <option value="technology">Tecnología</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-[#cb4335] mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Cargando videos trending...
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
            <div className="text-center">
              <div className="text-red-600 dark:text-red-400 mb-2">
                <TrendingUp className="h-8 w-8 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">
                Error al cargar videos
              </h3>
              <p className="text-red-600 dark:text-red-400 mb-4">
                No se pudieron cargar los videos trending. Verifica tu configuración de API.
              </p>
              <button
                onClick={handleRefresh}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Intentar de nuevo
              </button>
            </div>
          </div>
        )}

        {/* Videos Grid */}
        {!isLoading && !isError && videos && (
          <>
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                Mostrando {videos.length} videos trending en español de los últimos {
                  timeFilter === '24h' ? '24 horas' :
                  timeFilter === '7d' ? '7 días' : '30 días'
                }
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={() => handleVideoClick(video)}
                />
              ))}
            </div>

            {videos.length === 0 && (
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No se encontraron videos
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Prueba con diferentes filtros o actualiza la página.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Insight Modal */}
      {selectedVideo && (
        <VideoInsightModal
          insight={insights[selectedVideo.id] || null}
          isOpen={isInsightModalOpen}
          onClose={() => {
            setIsInsightModalOpen(false);
            setSelectedVideo(null);
          }}
        />
      )}
    </div>
  );
}
