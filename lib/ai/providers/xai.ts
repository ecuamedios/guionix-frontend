// lib/ai/providers/xai.ts
// X.AI/Grok Provider - Velocidad y Economía
import type { AIProvider, AIGenerationParams, AIResponse } from './index';

export class XAIProvider implements AIProvider {
  name = 'X.AI/Grok';
  models = ['grok-beta', 'grok-1'];
  costPerToken = 0.0001; // Más económico
  maxTokens = 4096;
  strengths = ['speed', 'cost_efficiency', 'basic_generation', 'quick_drafts'];

  async generateContent(params: AIGenerationParams): Promise<AIResponse> {
    const startTime = Date.now();
    
    try {
      // Configuración optimizada para velocidad
      const response = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.XAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: params.model || 'grok-beta',
          messages: [
            {
              role: 'system',
              content: 'Eres un asistente especializado en crear guiones cinematográficos con metodología Blake Snyder. Responde en español con enfoque mexicano y estructura precisa.'
            },
            {
              role: 'user',
              content: params.context ? `${params.context}\n\n${params.prompt}` : params.prompt
            }
          ],
          temperature: params.temperature || 0.7,
          max_tokens: Math.min(params.maxTokens || 500, this.maxTokens),
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`XAI API Error: ${response.status}`);
      }

      const data = await response.json();
      const processingTime = Date.now() - startTime;
      
      const usage = {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0,
        costUsd: (data.usage?.total_tokens || 0) * this.costPerToken,
      };

      return {
        content: data.choices[0]?.message?.content || '',
        usage,
        model: params.model || 'grok-beta',
        provider: 'xai',
        processingTime,
        quality: 'draft',
      };
    } catch (error) {
      console.error('XAI Provider Error:', error);
      throw new Error(`XAI generation failed: ${error}`);
    }
  }
}
