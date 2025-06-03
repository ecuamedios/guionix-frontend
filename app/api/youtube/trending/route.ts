import { NextRequest, NextResponse } from 'next/server';
import { YouTubeService } from '@/lib/services/youtube';
import { TimeFilter, CategoryFilter } from '@/types/youtube';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const timeFilter = (searchParams.get('timeFilter') as TimeFilter) || '24h';
    const categoryFilter = (searchParams.get('categoryFilter') as CategoryFilter) || 'all';
    const maxResults = parseInt(searchParams.get('maxResults') || '20');

    const apiKey = process.env.YOUTUBE_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'YouTube API key not configured' },
        { status: 500 }
      );
    }

    const youtubeService = new YouTubeService(apiKey);
    const result = await youtubeService.getTrendingVideos(timeFilter, categoryFilter, maxResults);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch YouTube videos' },
      { status: 500 }
    );
  }
}
