import { useState, useEffect, useCallback } from 'react';
import { YouTubeVideo, YouTubeTrendingResponse, VideoInsight, TimeFilter, CategoryFilter, VideoInsightRequest } from '@/types/youtube';

interface UseYouTubeDataProps {
  initialTimeFilter?: TimeFilter;
  initialCategoryFilter?: CategoryFilter;
  maxResults?: number;
  autoRefresh?: boolean;
  refreshInterval?: number; // in minutes
}

interface UseYouTubeDataReturn {
  videos: YouTubeVideo[];
  loading: boolean;
  error: string | null;
  timeFilter: TimeFilter;
  categoryFilter: CategoryFilter;
  setTimeFilter: (filter: TimeFilter) => void;
  setCategoryFilter: (filter: CategoryFilter) => void;
  refreshVideos: () => Promise<void>;
  generateInsights: (video: YouTubeVideo) => Promise<VideoInsight>;
  insights: Record<string, VideoInsight>;
  insightsLoading: Record<string, boolean>;
  lastUpdated: Date | null;
}

export function useYouTubeData({
  initialTimeFilter = '24h',
  initialCategoryFilter = 'all',
  maxResults = 20,
  autoRefresh = true,
  refreshInterval = 60, // 60 minutes
}: UseYouTubeDataProps = {}): UseYouTubeDataReturn {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>(initialTimeFilter);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>(initialCategoryFilter);
  const [insights, setInsights] = useState<Record<string, VideoInsight>>({});
  const [insightsLoading, setInsightsLoading] = useState<Record<string, boolean>>({});
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fetch trending videos
  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        timeFilter,
        categoryFilter,
        maxResults: maxResults.toString(),
      });

      const response = await fetch(`/api/youtube/trending?${params}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch videos');
      }

      const data: YouTubeTrendingResponse = await response.json();
      setVideos(data.videos);
      setLastUpdated(new Date());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching YouTube videos:', err);
    } finally {
      setLoading(false);
    }
  }, [timeFilter, categoryFilter, maxResults]);

  // Generate insights for a specific video
  const generateInsights = useCallback(async (video: YouTubeVideo): Promise<VideoInsight> => {
    const videoId = video.id;
    
    // Return cached insights if available
    if (insights[videoId]) {
      return insights[videoId];
    }

    try {
      setInsightsLoading(prev => ({ ...prev, [videoId]: true }));

      const request: VideoInsightRequest = {
        videoId: video.id,
        title: video.title,
        description: video.description,
        category: video.categoryId,
      };

      const response = await fetch('/api/youtube/insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate insights');
      }

      const insight: VideoInsight = await response.json();
      
      // Cache the insights
      setInsights(prev => ({ ...prev, [videoId]: insight }));
      
      return insight;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate insights';
      console.error('Error generating video insights:', err);
      throw new Error(errorMessage);
    } finally {
      setInsightsLoading(prev => ({ ...prev, [videoId]: false }));
    }
  }, [insights]);

  // Refresh videos manually
  const refreshVideos = useCallback(async () => {
    await fetchVideos();
  }, [fetchVideos]);

  // Initial fetch and filter changes
  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  // Auto-refresh mechanism
  useEffect(() => {
    if (!autoRefresh) return;

    const intervalMs = refreshInterval * 60 * 1000; // Convert minutes to milliseconds
    const interval = setInterval(() => {
      fetchVideos();
    }, intervalMs);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchVideos]);

  // Clear insights when filters change
  useEffect(() => {
    setInsights({});
    setInsightsLoading({});
  }, [timeFilter, categoryFilter]);

  return {
    videos,
    loading,
    error,
    timeFilter,
    categoryFilter,
    setTimeFilter,
    setCategoryFilter,
    refreshVideos,
    generateInsights,
    insights,
    insightsLoading,
    lastUpdated,
  };
}

// Utility hook for managing selected video insights
export function useVideoInsights() {
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [selectedInsights, setSelectedInsights] = useState<VideoInsight | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openInsights = useCallback((video: YouTubeVideo, insights: VideoInsight) => {
    setSelectedVideo(video);
    setSelectedInsights(insights);
    setIsModalOpen(true);
  }, []);

  const closeInsights = useCallback(() => {
    setIsModalOpen(false);
    setSelectedVideo(null);
    setSelectedInsights(null);
  }, []);

  return {
    selectedVideo,
    selectedInsights,
    isModalOpen,
    openInsights,
    closeInsights,
  };
}
