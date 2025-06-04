"use client";

import React, { useState } from "react";
import {
  BarChart3, TrendingUp, Brain, Users, DollarSign, Star,
  Zap, Clock, Target, Award, Activity, Eye, Gauge, LineChart
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DashboardMetrics } from "../GuionixUnifiedDashboard";

interface AnalyticsIntelligenceProps {
  metrics: DashboardMetrics;
  onNavigate: (tab: string) => void;
}

const AnalyticsIntelligence = ({ metrics, onNavigate }: AnalyticsIntelligenceProps) => {
  const [analyticsTab, setAnalyticsTab] = useState('projects');

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-800 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <BarChart3 className="w-6 h-6" />
            Analytics & Business Intelligence
          </CardTitle>
          <CardDescription className="text-blue-300">
            Métricas avanzadas para optimización del proceso creativo y business
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={analyticsTab} onValueChange={setAnalyticsTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 p-1">
          <TabsTrigger value="projects" className="data-[state=active]:bg-blue-500">
            Proyectos
          </TabsTrigger>
          <TabsTrigger value="ai" className="data-[state=active]:bg-blue-500">
            IA Performance
          </TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:bg-blue-500">
            Equipo
          </TabsTrigger>
          <TabsTrigger value="business" className="data-[state=active]:bg-blue-500">
            Business
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-slate-900/50 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-400" />
                  Completion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">89%</div>
                <Progress value={89} className="h-2 mb-2" />
                <p className="text-sm text-gray-300">+5% vs mes anterior</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-900/50 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  Tiempo Promedio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">{metrics.efficiency.avgCompletionTime} días</div>
                <Progress value={75} className="h-2 mb-2" />
                <p className="text-sm text-gray-300">-2 días optimización</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-900/50 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-400" />
                  Quality Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">{metrics.avgQualityScore}/100</div>
                <Progress value={metrics.avgQualityScore} className="h-2 mb-2" />
                <p className="text-sm text-gray-300">Cultural: {metrics.culturalAuthScore}/100</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "X.AI/Grok", usage: 127.20, cost: 42.30, performance: 94, specialty: "Ideas" },
              { name: "ChatGPT-4", usage: 156.80, cost: 31.40, performance: 91, specialty: "Estructura" },
              { name: "Claude", usage: 63.50, cost: 15.62, performance: 96, specialty: "Escritura" }
            ].map((ai) => (
              <Card key={ai.name} className="bg-slate-900/50 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white">{ai.name}</CardTitle>
                  <CardDescription className="text-gray-300">{ai.specialty}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Performance</span>
                        <span className="text-white">{ai.performance}%</span>
                      </div>
                      <Progress value={ai.performance} className="h-2" />
                    </div>
                    <div className="text-lg font-bold text-white">${ai.usage}</div>
                    <div className="text-sm text-gray-400">Costo: ${ai.cost}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Team Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Productividad</span>
                    <span className="text-white">{metrics.efficiency.productivity}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Miembros activos</span>
                    <span className="text-white">{metrics.teamMembers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Colaboraciones</span>
                    <span className="text-white">6 activas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Skill Development</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["Script Writing", "Cultural Accuracy", "AI Optimization"].map((skill) => (
                    <div key={skill}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">{skill}</span>
                        <span className="text-white">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="business" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">
                  ${metrics.revenue.monthly.toLocaleString()}
                </div>
                <p className="text-green-400 text-sm">+{metrics.revenue.growth}% crecimiento</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI ROI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">4.2x</div>
                <p className="text-purple-400 text-sm">Return on AI investment</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Market Share
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">23%</div>
                <p className="text-blue-400 text-sm">LATAM DramaBox content</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsIntelligence; 