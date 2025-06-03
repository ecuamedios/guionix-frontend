// YouTube API Types
export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  channelTitle: string;
  publishedAt: string;
  viewCount: string;
  likeCount: string;
  duration: string;
  categoryId: string;
  tags: string[];
}

export interface YouTubeTrendingResponse {
  videos: YouTubeVideo[];
  nextPageToken?: string;
  totalResults: number;
}

export interface VideoInsightRequest {
  videoId: string;
  title: string;
  description: string;
  category: string;
}

export interface GeneratedIdea {
  id: string;
  title: string;
  concept: string;
  genre: string;
  theme: string;
  characters: string[];
  plotPoints: string[];
  adaptationType: 'direct' | 'inspired' | 'variation';
  confidence: number;
}

export interface VideoInsight {
  videoId: string;
  originalVideo: {
    title: string;
    description: string;
    category: string;
  };
  ideas: GeneratedIdea[];
  trends: {
    genre: string;
    popularity: number;
    keywords: string[];
  }[];
  generatedAt: string;
}

export type TimeFilter = '24h' | '7d' | '30d';
export type CategoryFilter = 'all' | 'entertainment' | 'documentary' | 'series' | 'shorts';
