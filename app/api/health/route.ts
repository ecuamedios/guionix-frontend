import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Basic health check for now - we'll enhance this with backend service checks
    console.log('[Health API] Frontend health check');
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'guionix-frontend',
      frontend: {
        status: 'healthy',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        deployment: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
      },
      services: {
        brain: process.env.GUIONIX_BRAIN_URL ? 'configured' : 'not-configured',
        aiOrchestrator: process.env.GUIONIX_AI_ORCHESTRATOR_URL ? 'configured' : 'not-configured',
        scriptEngine: process.env.GUIONIX_SCRIPT_ENGINE_URL ? 'configured' : 'not-configured',
        exportEngine: process.env.GUIONIX_EXPORT_ENGINE_URL ? 'configured' : 'not-configured'
      }
    });
    
  } catch (error) {
    console.error('[Health API] Health check failed:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      service: 'guionix-frontend',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 503 });
  }
}
