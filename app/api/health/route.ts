import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check database connection (optional)
    // await prisma.$connect();

    const healthData = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      service: "guionix-frontend",
      version: "1.0.0",
      frontend: {
        status: "healthy",
        version: "1.0.0",
        environment: process.env.NODE_ENV || "development"
      },
      services: {
        brain: process.env.GUIONIX_BRAIN_URL ? "configured" : "not-configured",
        aiOrchestrator: process.env.GUIONIX_AI_ORCHESTRATOR_URL ? "configured" : "not-configured",
        scriptEngine: process.env.GUIONIX_SCRIPT_ENGINE_URL ? "configured" : "not-configured",
        exportEngine: process.env.GUIONIX_EXPORT_ENGINE_URL ? "configured" : "not-configured"
      },
      database: process.env.DATABASE_URL ? "configured" : "not-configured"
    };

    return NextResponse.json(healthData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
