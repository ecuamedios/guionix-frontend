// lib/services/backendServices.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Base configuration for all backend services
const createServiceClient = (baseURL: string, apiKey?: string): AxiosInstance => {
  const config: AxiosRequestConfig = {
    baseURL,
    timeout: 30000, // 30 seconds for backend services
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  };

  if (apiKey) {
    config.headers!['Authorization'] = `Bearer ${apiKey}`;
  }

  const client = axios.create(config);

  // Add request interceptor for debugging
  client.interceptors.request.use(
    (config) => {
      console.log(`[GUIONIX] Making request to ${config.baseURL}${config.url}`);
      return config;
    },
    (error) => {
      console.error('[GUIONIX] Request error:', error);
      return Promise.reject(error);
    }
  );

  // Add response interceptor for error handling
  client.interceptors.response.use(
    (response) => {
      console.log(`[GUIONIX] Response from ${response.config.baseURL}: ${response.status}`);
      return response;
    },
    (error) => {
      console.error(`[GUIONIX] Service error:`, error.response?.data || error.message);
      return Promise.reject(error);
    }
  );

  return client;
};

// 🧠 GUIONIX BRAIN (USER MANAGEMENT)
export const brainService = createServiceClient(
  process.env.GUIONIX_BRAIN_URL!,
  process.env.GUIONIX_BRAIN_API_KEY
);

// 🤖 GUIONIX AI ORCHESTRATOR
export const aiOrchestratorService = createServiceClient(
  process.env.GUIONIX_AI_ORCHESTRATOR_URL!,
  process.env.GUIONIX_AI_ORCHESTRATOR_API_KEY
);

// 📝 GUIONIX SCRIPT ENGINE
export const scriptEngineService = createServiceClient(
  process.env.GUIONIX_SCRIPT_ENGINE_URL!,
  process.env.GUIONIX_SCRIPT_ENGINE_API_KEY
);

// 📁 GUIONIX EXPORT ENGINE
export const exportEngineService = createServiceClient(
  process.env.GUIONIX_EXPORT_ENGINE_URL!,
  process.env.GUIONIX_EXPORT_ENGINE_API_KEY
);

// 🧮 GUIONIX ML ENGINE (NUEVO)
export const mlEngineService = createServiceClient(
  process.env.GUIONIX_ML_ENGINE_URL!,
  process.env.GUIONIX_ML_ENGINE_API_KEY
);

// Health check function for all services
export const checkServiceHealth = async () => {
  const services = [
    { name: 'brain', client: brainService },
    { name: 'aiOrchestrator', client: aiOrchestratorService },
    { name: 'scriptEngine', client: scriptEngineService },
    { name: 'exportEngine', client: exportEngineService },
    { name: 'mlEngine', client: mlEngineService }
  ];

  const healthChecks = await Promise.allSettled(
    services.map(async (service) => {
      try {
        const response = await service.client.get('/health');
        return {
          service: service.name,
          status: 'healthy',
          response: response.status
        };
      } catch (error) {
        return {
          service: service.name,
          status: 'unhealthy',
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    })
  );

  return healthChecks.map((result, index) => ({
    serviceName: services[index].name,
    ...(result.status === 'fulfilled' ? result.value : { status: 'error', error: result.reason })
  }));
};

// Export all services for easy access
export const GuionixServices = {
  brain: brainService,
  aiOrchestrator: aiOrchestratorService,
  scriptEngine: scriptEngineService,
  exportEngine: exportEngineService
} as const;

export type GuionixServiceName = keyof typeof GuionixServices;
