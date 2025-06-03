import { YouTubeVideo, YouTubeTrendingResponse, TimeFilter, CategoryFilter } from '@/types/youtube';

export class YouTubeService {
  private apiKey: string;
  private baseUrl = 'https://www.googleapis.com/youtube/v3';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Get trending videos from Spain
   */
  async getTrendingVideos(
    timeFilter: TimeFilter = '24h',
    categoryFilter: CategoryFilter = 'all',
    maxResults: number = 20
  ): Promise<YouTubeTrendingResponse> {
    try {
      // Map time filters to YouTube API parameters
      const publishedAfter = this.getPublishedAfterDate(timeFilter);
      
      // Map category filters to YouTube category IDs
      const categoryId = this.getCategoryId(categoryFilter);

      const params = new URLSearchParams({
        part: 'snippet,statistics,contentDetails',
        chart: 'mostPopular',
        regionCode: 'ES', // Spain
        maxResults: maxResults.toString(),
        key: this.apiKey,
        ...(categoryId && { videoCategoryId: categoryId }),
      });

      const response = await fetch(`${this.baseUrl}/videos?${params}`);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      const videos: YouTubeVideo[] = data.items.map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnailUrl: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        viewCount: item.statistics.viewCount || '0',
        likeCount: item.statistics.likeCount || '0',
        duration: this.parseDuration(item.contentDetails.duration),
        categoryId: item.snippet.categoryId,
        tags: item.snippet.tags || [],
      }));

      // Filter by time if needed (YouTube API doesn't support publishedAfter for trending)
      const filteredVideos = this.filterVideosByTime(videos, timeFilter);

      return {
        videos: filteredVideos,
        nextPageToken: data.nextPageToken,
        totalResults: data.pageInfo.totalResults,
      };
    } catch (error) {
      console.error('Error fetching trending videos:', error);
      throw error;
    }
  }

  /**
   * Search videos by topic/keyword
   */
  async searchVideos(
    query: string,
    timeFilter: TimeFilter = '7d',
    maxResults: number = 10
  ): Promise<YouTubeTrendingResponse> {
    try {
      const publishedAfter = this.getPublishedAfterDate(timeFilter);

      const params = new URLSearchParams({
        part: 'snippet',
        q: query,
        type: 'video',
        regionCode: 'ES',
        relevanceLanguage: 'es',
        maxResults: maxResults.toString(),
        publishedAfter: publishedAfter,
        order: 'viewCount',
        key: this.apiKey,
      });

      const response = await fetch(`${this.baseUrl}/search?${params}`);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Get detailed video information
      const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
      const detailedVideos = await this.getVideoDetails(videoIds);

      return {
        videos: detailedVideos,
        nextPageToken: data.nextPageToken,
        totalResults: data.pageInfo.totalResults,
      };
    } catch (error) {
      console.error('Error searching videos:', error);
      throw error;
    }
  }

  /**
   * Get detailed information for specific videos
   */
  private async getVideoDetails(videoIds: string): Promise<YouTubeVideo[]> {
    const params = new URLSearchParams({
      part: 'snippet,statistics,contentDetails',
      id: videoIds,
      key: this.apiKey,
    });

    const response = await fetch(`${this.baseUrl}/videos?${params}`);
    const data = await response.json();

    return data.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default.url,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      viewCount: item.statistics.viewCount || '0',
      likeCount: item.statistics.likeCount || '0',
      duration: this.parseDuration(item.contentDetails.duration),
      categoryId: item.snippet.categoryId,
      tags: item.snippet.tags || [],
    }));
  }

  /**
   * Convert time filter to ISO date
   */
  private getPublishedAfterDate(timeFilter: TimeFilter): string {
    const now = new Date();
    let daysBack = 1;

    switch (timeFilter) {
      case '24h':
        daysBack = 1;
        break;
      case '7d':
        daysBack = 7;
        break;
      case '30d':
        daysBack = 30;
        break;
    }

    const publishedAfter = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
    return publishedAfter.toISOString();
  }

  /**
   * Map category filters to YouTube category IDs
   */
  private getCategoryId(categoryFilter: CategoryFilter): string | null {
    const categoryMap: Record<CategoryFilter, string | null> = {
      all: null,
      entertainment: '24', // Entertainment
      documentary: '27', // Education (closest to documentaries)
      series: '24', // Entertainment
      shorts: null, // Will be filtered by duration
    };

    return categoryMap[categoryFilter];
  }

  /**
   * Parse YouTube duration format (PT4M13S) to readable format
   */
  private parseDuration(duration: string): string {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return '0:00';

    const hours = parseInt(match[1] || '0');
    const minutes = parseInt(match[2] || '0');
    const seconds = parseInt(match[3] || '0');

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  /**
   * Filter videos by time (fallback when API doesn't support time filtering)
   */
  private filterVideosByTime(videos: YouTubeVideo[], timeFilter: TimeFilter): YouTubeVideo[] {
    const now = new Date();
    let cutoffTime: Date;

    switch (timeFilter) {
      case '24h':
        cutoffTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        cutoffTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        cutoffTime = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        return videos;
    }

    return videos.filter(video => new Date(video.publishedAt) >= cutoffTime);
  }
}
