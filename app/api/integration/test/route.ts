// app/api/integration/test/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/services/aiService';
import { scriptService } from '@/lib/services/scriptService';
import { exportService } from '@/lib/services/exportService';
import { userService } from '@/lib/services/userService';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const service = searchParams.get('service') || 'all';

  try {
    const results: Record<string, any> = {};

    // Test AI Orchestrator Service
    if (service === 'all' || service === 'ai') {
      try {
        console.log('[Integration Test] Testing AI Service...');
        
        const aiResult = await aiService.generateGuionixContent({
          prompt: "Generate a brief logline for a sci-fi thriller",
          tier: 'cost-effective',
          userId: 'test-user-123'
        });
        
        results.aiService = {
          status: 'success',
          response: aiResult,
          timestamp: new Date().toISOString()
        };
      } catch (error) {
        results.aiService = {
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        };
      }
    }

    // Test Script Engine Service
    if (service === 'all' || service === 'script') {
      try {
        console.log('[Integration Test] Testing Script Service...');
        
        const scriptResult = await scriptService.generateScript({
          projectId: 'test-project-456',
          userId: 'test-user-123',
          scriptType: 'feature',
          logline: 'A young programmer discovers a conspiracy that threatens the digital world',
          genre: ['sci-fi', 'thriller'],
          targetAudience: 'Adults 18-35'
        });
        
        results.scriptService = {
          status: 'success',
          response: scriptResult,
          timestamp: new Date().toISOString()
        };
      } catch (error) {
        results.scriptService = {
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        };
      }
    }

    // Test Export Engine Service
    if (service === 'all' || service === 'export') {
      try {
        console.log('[Integration Test] Testing Export Service...');
        
        const exportResult = await exportService.getAvailableFormats();
        
        results.exportService = {
          status: 'success',
          response: exportResult,
          timestamp: new Date().toISOString()
        };
      } catch (error) {
        results.exportService = {
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        };
      }
    }

    // Test Brain Service (User Management)
    if (service === 'all' || service === 'user') {
      try {
        console.log('[Integration Test] Testing User Service...');
        
        // Test getting user permissions (this will likely fail until backend is connected)
        const userResult = await userService.getUserPermissions('test-user-123');
        
        results.userService = {
          status: 'success',
          response: userResult,
          timestamp: new Date().toISOString()
        };
      } catch (error) {
        results.userService = {
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        };
      }
    }

    // Summary
    const successCount = Object.values(results).filter(r => r.status === 'success').length;
    const totalCount = Object.keys(results).length;

    return NextResponse.json({
      summary: {
        totalServices: totalCount,
        successfulServices: successCount,
        failedServices: totalCount - successCount,
        overallStatus: successCount === totalCount ? 'all-connected' : 'partial-connectivity'
      },
      serviceResults: results,
      timestamp: new Date().toISOString(),
      message: successCount === totalCount 
        ? 'All services are properly connected!' 
        : `${successCount}/${totalCount} services connected. Check backend service URLs and API keys.`,
      nextSteps: successCount < totalCount ? [
        'Verify backend service URLs in .env.local',
        'Check API keys are properly configured',
        'Ensure backend services are running and accessible',
        'Review network connectivity and CORS settings'
      ] : [
        'All services connected successfully!',
        'You can now use the full Guionix system',
        'Test the Script Studio and AI features'
      ]
    });

  } catch (error) {
    console.error('[Integration Test] Test suite failed:', error);
    
    return NextResponse.json({
      summary: {
        totalServices: 0,
        successfulServices: 0,
        failedServices: 1,
        overallStatus: 'test-error'
      },
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      message: 'Integration test suite failed to run'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { service, action, payload } = body;

    let result;

    switch (service) {
      case 'ai':
        if (action === 'generate') {
          result = await aiService.generateGuionixContent(payload);
        } else if (action === 'budget') {
          result = await aiService.getBudgetStatus(payload.userId);
        } else if (action === 'usage') {
          result = await aiService.getUsageStats(payload.userId);
        }
        break;

      case 'script':
        if (action === 'generate') {
          result = await scriptService.generateScript(payload);
        } else if (action === 'validate') {
          result = await scriptService.validateScript(payload.projectId);
        } else if (action === 'analyze') {
          result = await scriptService.analyzeBlakeSnyderStructure(payload.scriptId);
        }
        break;

      case 'export':
        if (action === 'export') {
          result = await exportService.exportScript(payload);
        } else if (action === 'formats') {
          result = await exportService.getAvailableFormats();
        } else if (action === 'history') {
          result = await exportService.getExportHistory(payload.projectId);
        }
        break;

      case 'user':
        if (action === 'profile') {
          result = await userService.getUserProfile(payload.userId);
        } else if (action === 'permissions') {
          result = await userService.getUserPermissions(payload.userId);
        } else if (action === 'approvals') {
          result = await userService.getPendingApprovals(payload.userId);
        }
        break;

      default:
        throw new Error(`Unknown service: ${service}`);
    }

    return NextResponse.json({
      success: true,
      service,
      action,
      result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('[Integration Test] POST test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
