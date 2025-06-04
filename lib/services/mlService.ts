import { mlEngineService } from './backendServices';

// Types for ML operations
interface ScriptAnalysis {
  scriptId: string;
  sentimentScore: number;
  emotionalArcs: {
    act: number;
    tension: number;
    emotion: string;
  }[];
  dialogueQuality: number;
  characterDevelopment: number;
  pacing: number;
}

interface SuccessPrediction {
  commercialScore: number;
  criticalScore: number;
  audienceAppeal: {
    demographic: string;
    score: number;
  }[];
  recommendedBudget: {
    min: number;
    max: number;
  };
  marketingStrategy: string[];
}

interface GenreOptimization {
  suggestedGenre: string;
  confidence: number;
  improvements: {
    element: string;
    suggestion: string;
    impact: number;
  }[];
}

// ML Service for advanced analytics and predictions
export const mlService = {
  
  // Analyze script for various metrics
  async analyzeScript(scriptId: string, userId: string): Promise<ScriptAnalysis> {
    try {
      const response = await mlEngineService.post('/api/analyze', {
        scriptId,
        userId,
        analysisType: 'complete'
      });
      
      return response.data;
    } catch (error) {
      console.error('[ML Service] Script analysis failed:', error);
      // Return mock data for development
      return {
        scriptId,
        sentimentScore: 0.75,
        emotionalArcs: [
          { act: 1, tension: 0.3, emotion: 'curiosity' },
          { act: 2, tension: 0.8, emotion: 'tension' },
          { act: 3, tension: 0.9, emotion: 'climax' },
          { act: 4, tension: 0.4, emotion: 'resolution' }
        ],
        dialogueQuality: 0.82,
        characterDevelopment: 0.78,
        pacing: 0.85
      };
    }
  },

  // Predict commercial success
  async predictSuccess(scriptId: string, genreData?: any): Promise<SuccessPrediction> {
    try {
      const response = await mlEngineService.post('/api/predict/success', {
        scriptId,
        genre: genreData?.genre || 'drama',
        targetAudience: genreData?.targetAudience || 'general'
      });
      
      return response.data;
    } catch (error) {
      console.error('[ML Service] Success prediction failed:', error);
      // Return mock data for development
      return {
        commercialScore: 0.73,
        criticalScore: 0.81,
        audienceAppeal: [
          { demographic: '18-34', score: 0.85 },
          { demographic: '35-54', score: 0.72 },
          { demographic: '55+', score: 0.58 }
        ],
        recommendedBudget: {
          min: 2000000,
          max: 15000000
        },
        marketingStrategy: [
          'Social media focus on younger demographics',
          'Streaming platform partnerships',
          'Film festival submissions for critical recognition'
        ]
      };
    }
  },

  // Optimize genre and suggest improvements
  async optimizeGenre(scriptId: string, currentGenre: string): Promise<GenreOptimization> {
    try {
      const response = await mlEngineService.post('/api/optimize/genre', {
        scriptId,
        currentGenre
      });
      
      return response.data;
    } catch (error) {
      console.error('[ML Service] Genre optimization failed:', error);
      // Return mock data for development
      return {
        suggestedGenre: 'psychological-thriller',
        confidence: 0.87,
        improvements: [
          {
            element: 'dialogue',
            suggestion: 'Add more tension through subtext',
            impact: 0.15
          },
          {
            element: 'pacing',
            suggestion: 'Increase tempo in second act',
            impact: 0.12
          },
          {
            element: 'character-development',
            suggestion: 'Strengthen protagonist motivation',
            impact: 0.20
          }
        ]
      };
    }
  },

  // Get ML insights for dashboard
  async getMLInsights(userId: string): Promise<{
    totalAnalyses: number;
    averageScores: {
      commercial: number;
      critical: number;
      dialogue: number;
    };
    trendingGenres: string[];
    recommendations: string[];
  }> {
    try {
      const response = await mlEngineService.get(`/api/insights/${userId}`);
      return response.data;
    } catch (error) {
      console.error('[ML Service] ML insights failed:', error);
      // Return mock data for development
      return {
        totalAnalyses: 15,
        averageScores: {
          commercial: 0.74,
          critical: 0.79,
          dialogue: 0.81
        },
        trendingGenres: ['psychological-thriller', 'sci-fi-drama', 'dark-comedy'],
        recommendations: [
          'Consider exploring psychological thriller elements',
          'Your dialogue scores are consistently high',
          'Character development could be strengthened'
        ]
      };
    }
  },

  // Train custom model with user feedback
  async submitFeedback(analysisId: string, feedback: {
    accuracy: number;
    usefulness: number;
    comments: string;
  }): Promise<{ success: boolean; message: string }> {
    try {
      const response = await mlEngineService.post('/api/feedback', {
        analysisId,
        feedback
      });
      
      return {
        success: true,
        message: 'Feedback submitted successfully. This helps improve our models!'
      };
    } catch (error) {
      console.error('[ML Service] Feedback submission failed:', error);
      return {
        success: false,
        message: 'Failed to submit feedback. Please try again.'
      };
    }
  }
};

export default mlService; 