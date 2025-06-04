// app/api/integration/test/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/services/aiService';
import { scriptService } from '@/lib/services/scriptService';
import { exportService } from '@/lib/services/exportService';
import { userService } from '@/lib/services/userService';
import { checkServiceHealth } from '@/lib/services/backendServices';

export async function GET() {
  try {
    const healthChecks = await checkServiceHealth();
    
    return NextResponse.json({
      status: 'success',
      timestamp: new Date().toISOString(),
      services: healthChecks
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { service, action, payload } = body;
    
    // Mock service test response
    return NextResponse.json({
      status: 'success',
      service,
      action,
      result: 'Service test completed successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        error: error instanceof Error ? error.message : 'Invalid request'
      },
      { status: 400 }
    );
  }
}
