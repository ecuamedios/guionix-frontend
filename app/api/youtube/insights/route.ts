import { NextRequest, NextResponse } from 'next/server';
import { AIInsightService } from '@/lib/services/ai-insights';
import { VideoInsightRequest } from '@/types/youtube';

export async function POST(request: NextRequest) {
  try {
    const body: VideoInsightRequest = await request.json();
    
    if (!body.videoId || !body.title) {
      return NextResponse.json(
        { error: 'Missing required fields: videoId and title' },
        { status: 400 }
      );
    }

    const aiService = new AIInsightService();
    const insights = await aiService.generateVideoInsights(body);

    return NextResponse.json(insights);
  } catch (error) {
    console.error('Error generating video insights:', error);
    return NextResponse.json(
      { error: 'Failed to generate video insights' },
      { status: 500 }
    );
  }
}
