// lib/services/aiService.ts
import { aiOrchestratorService } from './backendServices';
import type { AIGenerationRequest, AIGenerationResponse } from "@/types/ai";

export interface GuionixAIRequest {
  prompt: string;
  tier?: 'cost-effective' | 'balanced' | 'premium';
  userId?: string;
  projectId?: string;
  context?: {
    scriptType?: string;
    beatIndex?: number;
    characterCount?: number;
  };
}

export interface GuionixAIResponse {
  content: string;
  provider: string;
  cost: number;
  tokensUsed: number;
  processingTime: number;
}

export const aiService = {
  // NEW: Route through AI Orchestrator for production workloads
  async generateContent(payload: AIGenerationRequest): Promise<AIGenerationResponse> {
    try {
      console.log('[AI Service] Routing request through AI Orchestrator...');
      
      const response = await aiOrchestratorService.post('/api/generate', {
        prompt: payload.prompt,
        model: payload.model,
        temperature: payload.temperature,
        maxTokens: payload.maxTokens,
        userId: payload.userId,
        projectId: payload.projectId,
        context: payload.context,
        // Add Guionix-specific features
        budgetTracking: true,
        providerSelection: 'smart-routing'
      });

      return {
        output: response.data.content || response.data.output,
        usage: {
          promptTokens: response.data.usage?.promptTokens || 0,
          completionTokens: response.data.usage?.completionTokens || 0,
          totalTokens: response.data.usage?.totalTokens || response.data.tokensUsed || 0,
          costUsd: response.data.cost || 0
        },
        model: payload.model,
        createdAt: new Date(),
        requestId: response.data.requestId
      };
      
    } catch (error) {
      console.error('[AI Service] AI Orchestrator failed, using fallback:', error);
      
      // Fallback response
      return {
        output: `Generated content for: ${payload.prompt}`,
        usage: {
          promptTokens: Math.ceil(payload.prompt.length / 4),
          completionTokens: 100,
          totalTokens: Math.ceil(payload.prompt.length / 4) + 100,
          costUsd: 0.0001
        },
        model: payload.model,
        createdAt: new Date(),
        error: 'Fallback response - AI Orchestrator unavailable'
      };
    }
  },

  // Enhanced generation with Guionix-specific features
  async generateGuionixContent(payload: GuionixAIRequest): Promise<GuionixAIResponse> {
    try {
      console.log('[AI Service] Guionix content generation...');
      
      const response = await aiOrchestratorService.post('/api/guionix/generate', {
        prompt: payload.prompt,
        tier: payload.tier || 'cost-effective',
        userId: payload.userId,
        projectId: payload.projectId,
        context: payload.context,
        budgetTracking: true,
        providerSelection: 'smart-routing'
      });

      return {
        content: response.data.content,
        provider: response.data.provider,
        cost: response.data.cost,
        tokensUsed: response.data.tokensUsed,
        processingTime: response.data.processingTime
      };
      
    } catch (error) {
      console.error('[AI Service] Guionix generation failed:', error);
      
      return {
        content: `Generated content for: ${payload.prompt}`,
        provider: 'xai-fallback',
        cost: 0.0001,
        tokensUsed: Math.ceil(payload.prompt.length / 4),
        processingTime: 500
      };
    }
  },

  // Get AI usage statistics
  async getUsageStats(userId: string): Promise<{
    totalRequests: number;
    totalCost: number;
    providerBreakdown: Record<string, { requests: number; cost: number }>;
    dailyUsage: Array<{ date: string; requests: number; cost: number }>;
  }> {
    try {
      const response = await aiOrchestratorService.get(`/api/analytics/${userId}`);
      return response.data;
    } catch (error) {
      console.error('[AI Service] Failed to get usage stats:', error);
      // Return mock data for development
      return {
        totalRequests: 42,
        totalCost: 0.85,
        providerBreakdown: {
          'xai': { requests: 30, cost: 0.60 },
          'openai': { requests: 8, cost: 0.20 },
          'claude': { requests: 4, cost: 0.05 }
        },
        dailyUsage: [
          { date: '2024-01-15', requests: 15, cost: 0.25 },
          { date: '2024-01-14', requests: 12, cost: 0.30 },
          { date: '2024-01-13', requests: 15, cost: 0.30 }
        ]
      };
    }
  },

  // Check AI budget status
  async getBudgetStatus(userId: string): Promise<{
    remainingBudget: number;
    totalSpent: number;
    monthlyLimit: number;
    warningThreshold: number;
  }> {
    try {
      const response = await aiOrchestratorService.get(`/api/budget/${userId}`);
      return response.data;
    } catch (error) {
      console.error('[AI Service] Failed to get budget status:', error);
      // Return mock data for development
      return {
        remainingBudget: 49.15,
        totalSpent: 0.85,
        monthlyLimit: 50.00,
        warningThreshold: 40.00
      };
    }
  },

  // Request AI provider optimization
  async optimizeProviderSelection(requirements: {
    maxCost?: number;
    minQuality?: number;
    preferredProviders?: string[];
  }): Promise<{
    recommendedProvider: string;
    estimatedCost: number;
    reasoning: string;
  }> {
    try {
      const response = await aiOrchestratorService.post('/api/optimize', requirements);
      return response.data;
    } catch (error) {
      console.error('[AI Service] Failed to optimize provider selection:', error);
      return {
        recommendedProvider: 'xai',
        estimatedCost: 0.0001,
        reasoning: 'X.AI selected for cost-effectiveness'
      };
    }
  }
};