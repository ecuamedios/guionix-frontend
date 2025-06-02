export type AIModel = "gpt-4" | "gpt-3.5" | "claude" | "xai";

export interface AIGenerationRequest {
  prompt: string;
  model: AIModel;
  temperature?: number;
  maxTokens?: number;
  userId: string;
  projectId?: string;
  context?: string;
}

export interface AIGenerationResponse {
  output: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    costUsd?: number;
  };
  model: AIModel;
  createdAt: Date;
  requestId?: string;
  error?: string;
}

export interface AIUsageStats {
  userId: string;
  month: string;
  totalTokens: number;
  totalCostUsd: number;
  requests: number;
}