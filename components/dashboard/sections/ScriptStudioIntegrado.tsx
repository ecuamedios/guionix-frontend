"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Target, Play, Rocket, Users, Lightbulb, Layers, PenTool, Shield,
  Brain, FileText, Upload, MessageSquare, Clock, Gauge, Award,
  CheckCircle, AlertCircle, Edit, Eye, Download, Settings,
  Zap, FastForward, GitBranch, Clock4, Cpu, Terminal
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DashboardMetrics } from "../GuionixUnifiedDashboard";

interface ScriptStudioIntegradoProps {
  metrics: DashboardMetrics;
  onNavigate: (tab: string) => void;
}

const ScriptStudioIntegrado = ({ metrics, onNavigate }: ScriptStudioIntegradoProps) => {
  const router = useRouter();
  const [activeStudioTab, setActiveStudioTab] = useState('comando');

  // Proyectos activos en diferentes fases
  const projectsInPhases = {
    phase1: 3, // Ideas
    phase2: 4, // Estructura
    phase3: 3, // Escritura
    phase4: 2  // Control
  };

  const wizardPhases = [
    {
      id: 1,
      title: "Generación Ideas",
      subtitle: "X.AI/Grok",
      description: "Briefing, conceptualización y desarrollo de premisa",
      icon: Lightbulb,
      color: "from-yellow-500 to-orange-600",
      estimatedTime: "30-45 min",
      features: [
        "Briefing inicial con contexto",
        "5 conceptos diferentes generados",
        "Market appeal score automático",
        "Elementos culturales LATAM",
        "Refinamiento iterativo A/B/C"
      ],
      deliverables: [
        "Logline profesional",
        "Sinopsis expandida", 
        "Personajes principales",
        "Conflicto central definido",
        "Stakes & tema establecidos"
      ]
    },
    {
      id: 2,
      title: "Estructura Capas",
      subtitle: "ChatGPT-4",
      description: "Blake Snyder beats y 10-layer DramaBox optimization",
      icon: Layers,
      color: "from-green-500 to-teal-600",
      estimatedTime: "45-60 min",
      features: [
        "Blake Snyder beats (15 principales)",
        "10 capas DramaBox balanceadas",
        "Distribución temporal 110min",
        "Tension curve analysis",
        "Colaboración intensa en equipo"
      ],
      deliverables: [
        "Estructura completa 10-capas",
        "Timing preciso por capa",
        "Validation automática",
        "Plot holes detection",
        "Cultural authenticity check"
      ]
    },
    {
      id: 3,
      title: "Guionización",
      subtitle: "Claude",
      description: "Beat-level editing con formato Yamdu/Jasper",
      icon: PenTool,
      color: "from-purple-500 to-pink-600",
      estimatedTime: "60-90 min",
      features: [
        "Conversor Capa→Minutos (11min/capa)",
        "Editor profesional por beat",
        "Formato Yamdu/Jasper style",
        "Timing controller precisión",
        "Métricas en vivo (36 palabras/beat)"
      ],
      deliverables: [
        "Script completo 110 páginas",
        "Formato profesional",
        "Optimización DramaBox",
        "Mobile viewing ready",
        "Subtitle optimization"
      ]
    },
    {
      id: 4,
      title: "Control Calidad",
      subtitle: "Triple AI",
      description: "Validación integral y approval gates",
      icon: Shield,
      color: "from-red-500 to-pink-600",
      estimatedTime: "15-30 min",
      features: [
        "Batería completa de validaciones",
        "Triple AI correctivo",
        "Quality score dashboard",
        "Approval gates sistema",
        "Production ready certification"
      ],
      deliverables: [
        "Quality score (0-100)",
        "Technical compliance check",
        "Cultural authenticity score",
        "Production approval",
        "Export ready files"
      ]
    }
  ];

  const alternativeModes = [
    {
      id: "express",
      title: "Express Mode",
      description: "Skip to any phase",
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
      features: ["Quick templates", "AI shortcuts", "Experienced path"]
    },
    {
      id: "collaboration",
      title: "Collaboration Mode", 
      description: "Live editing múltiple users",
      icon: Users,
      color: "from-blue-500 to-purple-500",
      features: ["Real-time editing", "Role permissions", "Conflict resolution"]
    },
    {
      id: "expert",
      title: "Expert Mode",
      description: "Full manual control",
      icon: Settings,
      color: "from-gray-500 to-slate-600",
      features: ["Advanced settings", "Custom rules", "Power user tools"]
    }
  ];

  const importFormats = [
    { name: "Final Draft", extension: ".fdx", supported: true },
    { name: "Fountain", extension: ".fountain", supported: true },
    { name: "Celtx", extension: ".celtx", supported: true },
    { name: "PDF Scripts", extension: ".pdf", supported: true, note: "OCR" },
    { name: "Word Documents", extension: ".docx", supported: true },
    { name: "Legacy Formats", extension: "various", supported: true }
  ];

  return (
    <div className="space-y-6">
      {/* 🎯 Centro de Comando */}
      <Card className="bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-800 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-red-400" />
            Centro de Comando - Script Studio Integrado
          </CardTitle>
          <CardDescription className="text-gray-300">
            Sistema profesional de creación de guiones con metodología Blake Snyder optimizada para DramaBox
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Selector de Modo */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Play className="w-5 h-5 text-blue-400" />
                Selector de Modo
              </h3>
              <div className="space-y-3">
                <Button 
                  className="w-full justify-start h-16 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  onClick={() => router.push("/studio?mode=new")}
                >
                  <Play className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">Wizard 4-Fases</div>
                    <div className="text-xs opacity-90">Proceso guiado completo paso a paso</div>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-16 border-green-500/50 hover:bg-green-500/20"
                  onClick={() => router.push("/studio?mode=expert")}
                >
                  <Rocket className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">Modo Experto</div>
                    <div className="text-xs opacity-90">Editor profesional con control total</div>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-16 border-purple-500/50 hover:bg-purple-500/20"
                  onClick={() => router.push("/studio?mode=collab")}
                >
                  <Users className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">Colaboración</div>
                    <div className="text-xs opacity-90">Tiempo real con equipo</div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Project Overview */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-green-400" />
                Overview del Proyecto
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-slate-800 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Proyectos en curso</span>
                    <span className="text-white font-semibold">{metrics.activeProjects}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Distribuidos en 4 fases del proceso
                  </div>
                </div>
                <div className="p-4 bg-slate-800 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Pendientes aprobación</span>
                    <Badge variant="secondary" className="bg-orange-500/20 text-orange-400">
                      {metrics.pendingApprovals}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-400">
                    En approval gates de calidad
                  </div>
                </div>
                <div className="p-4 bg-slate-800 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Score promedio</span>
                    <span className="text-green-400 font-semibold">{metrics.avgQualityScore}/100</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Cultural: {metrics.culturalAuthScore}/100
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs del Studio */}
      <Tabs value={activeStudioTab} onValueChange={setActiveStudioTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 p-1">
          <TabsTrigger value="comando" className="data-[state=active]:bg-red-500">
            Centro
          </TabsTrigger>
          <TabsTrigger value="wizard" className="data-[state=active]:bg-red-500">
            Wizard 4-Fases
          </TabsTrigger>
          <TabsTrigger value="modos" className="data-[state=active]:bg-red-500">
            Modos Alt.
          </TabsTrigger>
          <TabsTrigger value="import" className="data-[state=active]:bg-red-500">
            Import
          </TabsTrigger>
          <TabsTrigger value="colaboracion" className="data-[state=active]:bg-red-500">
            Colaboración
          </TabsTrigger>
        </TabsList>

        {/* 🧙‍♂️ WIZARD DE 4 FASES */}
        <TabsContent value="wizard" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Wizard de 4 Fases - DramaBox Optimizado</CardTitle>
              <CardDescription className="text-gray-300">
                Metodología profesional para guiones de exactamente 110 minutos con autenticidad cultural LATAM
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {wizardPhases.map((phase) => (
                  <Card 
                    key={phase.id} 
                    className="bg-slate-800 border-gray-600 hover:border-gray-500 transition-all cursor-pointer group" 
                    onClick={() => router.push(`/studio?mode=new&phase=${phase.id}`)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${phase.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <phase.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">Fase {phase.id}: {phase.title}</h3>
                          <p className="text-sm text-gray-300">{phase.subtitle}</p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-300 mb-4">{phase.description}</p>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-xs font-semibold text-gray-400 mb-2">CARACTERÍSTICAS:</h4>
                          <ul className="space-y-1">
                            {phase.features.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className="text-xs text-gray-300 flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xs font-semibold text-gray-400 mb-2">ENTREGABLES:</h4>
                          <ul className="space-y-1">
                            {phase.deliverables.slice(0, 2).map((deliverable, idx) => (
                              <li key={idx} className="text-xs text-gray-300 flex items-center gap-2">
                                <Award className="w-3 h-3 text-blue-400" />
                                {deliverable}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                        <Badge variant="outline" className="text-xs">
                          ⏱ {phase.estimatedTime}
                        </Badge>
                        <Badge className={`text-xs`}>
                          {projectsInPhases[`phase${phase.id}` as keyof typeof projectsInPhases]} activos
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Workflow Visualization */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-4">Flujo del Proceso</h3>
                <div className="flex items-center justify-between bg-slate-800 p-4 rounded-lg">
                  {wizardPhases.map((phase, index) => (
                    <div key={phase.id} className="flex items-center">
                      <div className="text-center">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${phase.color} flex items-center justify-center text-white text-xs font-bold`}>
                          {phase.id}
                        </div>
                        <div className="text-xs text-gray-300 mt-1">{phase.title}</div>
                      </div>
                      {index < wizardPhases.length - 1 && (
                        <div className="mx-4 h-px bg-gray-600 w-8"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ⚡ MODOS ALTERNATIVOS */}
        <TabsContent value="modos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {alternativeModes.map((mode) => (
              <Card key={mode.id} className="bg-slate-900/50 border-gray-700 hover:border-gray-600 transition-colors">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <mode.icon className="w-5 h-5 text-blue-400" />
                    {mode.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    {mode.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {mode.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full bg-gradient-to-r ${mode.color} hover:opacity-90`}
                    onClick={() => router.push(`/studio?mode=${mode.id}`)}
                  >
                    Activar {mode.title}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 📥 IMPORT & MIGRATION */}
        <TabsContent value="import" className="space-y-6">
          <Card className="bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border-indigo-500/30">
            <CardHeader>
              <CardTitle className="text-indigo-400">Import & Migration</CardTitle>
              <CardDescription className="text-indigo-300">
                Importa proyectos existentes desde múltiples formatos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {importFormats.map((format, idx) => (
                  <div key={idx} className="p-4 bg-slate-800 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{format.name}</span>
                      <Badge 
                        variant={format.supported ? 'default' : 'secondary'}
                        className={format.supported ? 'bg-green-500' : 'bg-gray-500'}
                      >
                        {format.supported ? 'Soportado' : 'Próximamente'}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-300">{format.extension}</div>
                    {format.note && (
                      <div className="text-xs text-yellow-400 mt-1">{format.note}</div>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Button 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  onClick={() => router.push("/studio?mode=import")}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Iniciar Importación
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 👥 CENTRO DE COLABORACIÓN */}
        <TabsContent value="colaboracion" className="space-y-6">
          <Card className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Centro de Colaboración
              </CardTitle>
              <CardDescription className="text-blue-300">
                Edición en tiempo real con resolución de conflictos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-white mb-3">Estado Actual</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                      <span className="text-white">Colaboraciones activas</span>
                      <Badge className="bg-blue-500">{metrics.activeCollaborations || 6}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                      <span className="text-white">Usuarios conectados</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400">{metrics.teamMembers} activos</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                      <span className="text-white">Conflictos pendientes</span>
                      <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">
                        2
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-3">Herramientas</h3>
                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      onClick={() => router.push("/studio?mode=collab")}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Abrir Colaboración
                    </Button>
                    <Button variant="outline" className="w-full border-blue-500/50 hover:bg-blue-500/20">
                      <GitBranch className="w-4 h-4 mr-2" />
                      Gestionar Versiones
                    </Button>
                    <Button variant="outline" className="w-full border-purple-500/50 hover:bg-purple-500/20">
                      <Clock4 className="w-4 h-4 mr-2" />
                      Ver Actividad
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-white mb-2">Funcionalidades de Colaboración</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-300 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Live editing múltiple users
                    </li>
                    <li className="text-sm text-gray-300 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Real-time comments
                    </li>
                    <li className="text-sm text-gray-300 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Role-based permissions
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-300 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Conflict resolution
                    </li>
                    <li className="text-sm text-gray-300 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Activity timeline
                    </li>
                    <li className="text-sm text-gray-300 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Version control
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScriptStudioIntegrado; 