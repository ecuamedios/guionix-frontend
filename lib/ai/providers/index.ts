// lib/ai/providers/index.ts
// GUIONIX Triple AI Orchestration System
// X.AI/Grok (Velocidad/Económico) → OpenAI GPT-4 (Calidad) → Claude (Pulido)

export interface AIProvider {
  name: string;
  models: string[];
  costPerToken: number;
  strengths: string[];
  maxTokens: number;
  generateContent(params: AIGenerationParams): Promise<AIResponse>;
}

export interface AIGenerationParams {
  prompt: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  context?: string;
}

export interface AIResponse {
  content: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    costUsd: number;
  };
  model: string;
  provider: string;
  processingTime: number;
  quality: 'draft' | 'standard' | 'premium';
}

export interface ProviderCosts {
  xai: number;      // $0.0001 per token (más barato)
  openai: number;   // $0.01 per token (equilibrado)
  claude: number;   // $0.015 per token (premium)
}

export const PROVIDER_COSTS: ProviderCosts = {
  xai: 0.0001,
  openai: 0.01,
  claude: 0.015,
};

export const PROVIDER_STRENGTHS = {
  xai: ['speed', 'cost_efficiency', 'basic_generation', 'quick_drafts'],
  openai: ['balanced_quality', 'versatility', 'reasoning', 'structure'],
  claude: ['polish', 'creativity', 'cultural_nuance', 'refinement'],
} as const;
