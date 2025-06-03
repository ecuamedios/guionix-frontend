// app/integration-dashboard/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  RefreshCw, 
  Brain, 
  Bot, 
  FileText, 
  Download,
  Settings,
  Activity
} from 'lucide-react';

interface ServiceStatus {
  status: 'success' | 'error';
  response?: any;
  error?: string;
  timestamp: string;
}

interface IntegrationResults {
  summary: {
    totalServices: number;
    successfulServices: number;
    failedServices: number;
    overallStatus: string;
  };
  serviceResults: Record<string, ServiceStatus>;
  message: string;
  nextSteps: string[];
}

const serviceConfig = {
  aiService: {
    name: 'AI Orchestrator',
    icon: Bot,
    description: 'Triple AI + Smart Routing + Budget Control',
    color: 'bg-blue-500'
  },
  scriptService: {
    name: 'Script Engine',
    icon: FileText,
    description: 'Script Generation + Blake Snyder Validation',
    color: 'bg-green-500'
  },
  exportService: {
    name: 'Export Engine',
    icon: Download,
    description: 'Export PDF, Final Draft, Fountain, Celtx',
    color: 'bg-purple-500'
  },
  userService: {
    name: 'Brain Service',
    icon: Brain,
    description: 'Admin APIs, User Management, Workflow Approval',
    color: 'bg-orange-500'
  }
};

export default function IntegrationDashboard() {
  const [results, setResults] = useState<IntegrationResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const runIntegrationTest = async (service: string = 'all') => {
    setLoading(true);
    try {
      const response = await fetch(`/api/integration/test?service=${service}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Integration test failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const testSpecificAction = async (service: string, action: string, payload: any) => {
    try {
      const response = await fetch('/api/integration/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ service, action, payload })
      });
      const data = await response.json();
      console.log(`${service}.${action} result:`, data);
      return data;
    } catch (error) {
      console.error(`${service}.${action} failed:`, error);
      return null;
    }
  };

  useEffect(() => {
    // Run initial test on load
    runIntegrationTest();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getOverallStatusColor = (status: string) => {
    switch (status) {
      case 'all-connected':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'partial-connectivity':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                🔗 Guionix Integration Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Monitor and test connections to your 4 backend services
              </p>
            </div>
            <Button 
              onClick={() => runIntegrationTest()} 
              disabled={loading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Test All Services
            </Button>
          </div>
        </div>

        {/* Overall Status */}
        {results && (
          <Alert className={`mb-6 ${getOverallStatusColor(results.summary.overallStatus)}`}>
            <Activity className="h-4 w-4" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <div>
                  <strong>{results.message}</strong>
                  <div className="text-sm mt-1">
                    {results.summary.successfulServices}/{results.summary.totalServices} services connected
                  </div>
                </div>
                <Badge variant="outline" className="bg-white">
                  {results.summary.overallStatus}
                </Badge>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Service Overview</TabsTrigger>
            <TabsTrigger value="testing">Live Testing</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
          </TabsList>

          {/* Service Overview */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(serviceConfig).map(([key, config]) => {
                const serviceResult = results?.serviceResults[key];
                const Icon = config.icon;
                
                return (
                  <Card key={key} className="relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-full h-1 ${config.color}`} />
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Icon className="h-6 w-6 text-gray-600" />
                        {serviceResult && getStatusIcon(serviceResult.status)}
                      </div>
                      <CardTitle className="text-lg">{config.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {config.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {serviceResult ? (
                        <div className="space-y-2">
                          <Badge 
                            variant={serviceResult.status === 'success' ? 'default' : 'destructive'}
                            className="text-xs"
                          >
                            {serviceResult.status === 'success' ? 'Connected' : 'Failed'}
                          </Badge>
                          {serviceResult.error && (
                            <p className="text-xs text-red-600 mt-1">
                              {serviceResult.error}
                            </p>
                          )}
                          <p className="text-xs text-gray-500">
                            Last checked: {new Date(serviceResult.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      ) : (
                        <Badge variant="outline">Not tested</Badge>
                      )}
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-3"
                        onClick={() => runIntegrationTest(key.replace('Service', ''))}
                        disabled={loading}
                      >
                        Test Service
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Live Testing */}
          <TabsContent value="testing">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Service Testing */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    AI Orchestrator Testing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => testSpecificAction('ai', 'generate', {
                      prompt: 'Generate a logline for a sci-fi movie',
                      tier: 'cost-effective',
                      userId: 'test-user'
                    })}
                  >
                    Test AI Generation
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => testSpecificAction('ai', 'budget', { userId: 'test-user' })}
                  >
                    Check Budget Status
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => testSpecificAction('ai', 'usage', { userId: 'test-user' })}
                  >
                    Get Usage Analytics
                  </Button>
                </CardContent>
              </Card>

              {/* Script Service Testing */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Script Engine Testing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => testSpecificAction('script', 'generate', {
                      projectId: 'test-project',
                      userId: 'test-user',
                      scriptType: 'feature',
                      logline: 'A test logline',
                      genre: ['drama'],
                      targetAudience: 'Adults'
                    })}
                  >
                    Generate Script
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => testSpecificAction('script', 'validate', { projectId: 'test-project' })}
                  >
                    Validate Blake Snyder Structure
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => testSpecificAction('script', 'analyze', { scriptId: 'test-script' })}
                  >
                    Analyze Script Structure
                  </Button>
                </CardContent>
              </Card>

              {/* Export Service Testing */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Export Engine Testing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => testSpecificAction('export', 'formats', {})}
                  >
                    Get Available Formats
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => testSpecificAction('export', 'export', {
                      scriptId: 'test-script',
                      userId: 'test-user',
                      format: 'pdf'
                    })}
                  >
                    Test PDF Export
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => testSpecificAction('export', 'history', { projectId: 'test-project' })}
                  >
                    Get Export History
                  </Button>
                </CardContent>
              </Card>

              {/* User Service Testing */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Brain Service Testing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => testSpecificAction('user', 'permissions', { userId: 'test-user' })}
                  >
                    Get User Permissions
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => testSpecificAction('user', 'profile', { userId: 'test-user' })}
                  >
                    Get User Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => testSpecificAction('user', 'approvals', { userId: 'test-user' })}
                  >
                    Get Pending Approvals
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Configuration */}
          <TabsContent value="configuration">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Backend Service Configuration
                </CardTitle>
                <CardDescription>
                  Verify your backend service URLs and API keys are properly configured
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">🧠 Brain Service</h4>
                      <code className="block p-2 bg-gray-100 rounded text-sm">
                        GUIONIX_BRAIN_URL=https://guionix-brain-production.up.railway.app
                      </code>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">🤖 AI Orchestrator</h4>
                      <code className="block p-2 bg-gray-100 rounded text-sm">
                        GUIONIX_AI_ORCHESTRATOR_URL=https://guionix-ai-orchestrator-production.up.railway.app
                      </code>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">📝 Script Engine</h4>
                      <code className="block p-2 bg-gray-100 rounded text-sm">
                        GUIONIX_SCRIPT_ENGINE_URL=https://guionix-script-engine-production.up.railway.app
                      </code>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">📁 Export Engine</h4>
                      <code className="block p-2 bg-gray-100 rounded text-sm">
                        GUIONIX_EXPORT_ENGINE_URL=https://guionix-export-engine-production.up.railway.app
                      </code>
                    </div>
                  </div>

                  {results?.nextSteps && results.nextSteps.length > 0 && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Next Steps:</h4>
                      <ul className="space-y-1 text-sm text-blue-800">
                        {results.nextSteps.map((step, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="font-mono text-blue-600">•</span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
