"use client";

import React, { useState } from "react";
import {
  Settings, Brain, Palette, Shield, Globe, Activity,
  Server, Key, Eye, Bell, Download, Upload, Database,
  Monitor, Cpu, HardDrive, Wifi, CheckCircle, AlertTriangle
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SystemConfigProps {
  onNavigate: (tab: string) => void;
}

const SystemConfig = ({ onNavigate }: SystemConfigProps) => {
  const [configTab, setConfigTab] = useState('ai');
  const [aiSettings, setAiSettings] = useState({
    xaiEnabled: true,
    openaiEnabled: true,
    claudeEnabled: true,
    budget: [350],
    qualityThreshold: [85]
  });

  // Estados para configuraciones de interfaz
  const [interfaceSettings, setInterfaceSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    aiCompletionAlerts: true,
    twoFactorAuth: true
  });

  const aiProviders = [
    {
      name: "X.AI/Grok",
      enabled: aiSettings.xaiEnabled,
      usage: "Generación de Ideas",
      cost: "$42.30/mes",
      performance: 94,
      status: "online"
    },
    {
      name: "ChatGPT-4",
      enabled: aiSettings.openaiEnabled,
      usage: "Estructura Narrativa", 
      cost: "$31.40/mes",
      performance: 91,
      status: "online"
    },
    {
      name: "Claude",
      enabled: aiSettings.claudeEnabled,
      usage: "Escritura Profesional",
      cost: "$15.62/mes",
      performance: 96,
      status: "online"
    }
  ];

  const railwayServices = [
    { name: "API Gateway", status: "online", uptime: "99.9%", cpu: 45, memory: 67 },
    { name: "Database", status: "online", uptime: "100%", cpu: 23, memory: 34 },
    { name: "AI Processing", status: "online", uptime: "99.8%", cpu: 78, memory: 89 },
    { name: "File Storage", status: "online", uptime: "99.9%", cpu: 12, memory: 23 },
    { name: "Authentication", status: "online", uptime: "100%", cpu: 8, memory: 15 },
    { name: "Websockets", status: "online", uptime: "99.7%", cpu: 34, memory: 45 }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-slate-900 via-gray-900/20 to-slate-800 border-gray-500/30">
        <CardHeader>
          <CardTitle className="text-gray-400 flex items-center gap-2">
            <Settings className="w-6 h-6" />
            System Configuration
          </CardTitle>
          <CardDescription className="text-gray-300">
            Configuración avanzada del sistema GUIONIX
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={configTab} onValueChange={setConfigTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 p-1">
          <TabsTrigger value="ai" className="data-[state=active]:bg-gray-500">
            IA Settings
          </TabsTrigger>
          <TabsTrigger value="interface" className="data-[state=active]:bg-gray-500">
            Interface
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-gray-500">
            Security
          </TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-gray-500">
            Integrations
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="data-[state=active]:bg-gray-500">
            Monitoring
          </TabsTrigger>
        </TabsList>

        {/* 🤖 AI Settings */}
        <TabsContent value="ai" className="space-y-6">
          <Card className="bg-slate-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                Configuración de Proveedores IA
              </CardTitle>
              <CardDescription className="text-gray-300">
                Gestión de APIs, presupuestos y umbrales de calidad
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Proveedores */}
              <div className="space-y-4">
                {aiProviders.map((provider) => (
                  <div key={provider.name} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Switch 
                        checked={provider.enabled}
                        onCheckedChange={(checked: boolean) => {
                          if (provider.name === "X.AI/Grok") {
                            setAiSettings(prev => ({ ...prev, xaiEnabled: checked }));
                          }
                        }}
                      />
                      <div>
                        <h4 className="font-semibold text-white">{provider.name}</h4>
                        <p className="text-sm text-gray-300">{provider.usage}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={provider.status === 'online' ? 'bg-green-500' : 'bg-red-500'}>
                        {provider.status}
                      </Badge>
                      <p className="text-sm text-gray-400 mt-1">{provider.cost}</p>
                      <p className="text-xs text-gray-400">Performance: {provider.performance}%</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Budget Control */}
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Presupuesto Mensual</h4>
                <div className="px-4">
                  <Slider
                    value={aiSettings.budget}
                    onValueChange={(value: number[]) => setAiSettings(prev => ({ ...prev, budget: value }))}
                    max={1000}
                    min={100}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>$100</span>
                    <span className="text-white font-semibold">${aiSettings.budget[0]}</span>
                    <span>$1000</span>
                  </div>
                </div>
              </div>

              {/* Quality Threshold */}
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Umbral de Calidad Mínimo</h4>
                <div className="px-4">
                  <Slider
                    value={aiSettings.qualityThreshold}
                    onValueChange={(value: number[]) => setAiSettings(prev => ({ ...prev, qualityThreshold: value }))}
                    max={100}
                    min={50}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>50%</span>
                    <span className="text-white font-semibold">{aiSettings.qualityThreshold[0]}%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 🎨 Interface */}
        <TabsContent value="interface" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Palette className="w-5 h-5 text-blue-400" />
                  Theme & Layout
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Tema</label>
                  <Select defaultValue="dark">
                    <SelectTrigger className="bg-slate-800 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Idioma</label>
                  <Select defaultValue="es">
                    <SelectTrigger className="bg-slate-800 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="w-5 h-5 text-yellow-400" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Email notifications</span>
                  <Switch 
                    checked={interfaceSettings.emailNotifications}
                    onCheckedChange={(checked: boolean) => setInterfaceSettings(prev => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Push notifications</span>
                  <Switch 
                    checked={interfaceSettings.pushNotifications}
                    onCheckedChange={(checked: boolean) => setInterfaceSettings(prev => ({ ...prev, pushNotifications: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">AI completion alerts</span>
                  <Switch 
                    checked={interfaceSettings.aiCompletionAlerts}
                    onCheckedChange={(checked: boolean) => setInterfaceSettings(prev => ({ ...prev, aiCompletionAlerts: checked }))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 🔒 Security */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  Authentication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Two-factor auth</span>
                  <Switch 
                    checked={interfaceSettings.twoFactorAuth}
                    onCheckedChange={(checked: boolean) => setInterfaceSettings(prev => ({ ...prev, twoFactorAuth: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Session timeout (minutes)</span>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-20 bg-slate-800 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="60">60</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-purple-400" />
                  Data Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Encryption at rest</span>
                  <Badge className="bg-green-500">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Backup frequency</span>
                  <span className="text-white">Daily</span>
                </div>
                <Button variant="outline" className="w-full border-green-500/50 hover:bg-green-500/20">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 🌐 Integrations */}
        <TabsContent value="integrations" className="space-y-6">
          <Card className="bg-slate-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-400" />
                Railway Services Status
              </CardTitle>
              <CardDescription className="text-gray-300">
                Estado de microservicios en Railway
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {railwayServices.map((service) => (
                  <div key={service.name} className="p-4 bg-slate-800 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-white">{service.name}</h4>
                      <Badge className={service.status === 'online' ? 'bg-green-500' : 'bg-red-500'}>
                        {service.status}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Uptime:</span>
                        <span className="text-white">{service.uptime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">CPU:</span>
                        <span className="text-white">{service.cpu}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Memory:</span>
                        <span className="text-white">{service.memory}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 📊 System Monitoring */}
        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-slate-900/50 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-blue-400" />
                  CPU Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">34%</div>
                <p className="text-sm text-gray-300">Average across services</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <HardDrive className="w-5 h-5 text-green-400" />
                  Memory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">45%</div>
                <p className="text-sm text-gray-300">8.2GB / 16GB used</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <Wifi className="w-5 h-5 text-purple-400" />
                  Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                <p className="text-sm text-gray-300">Uptime this month</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">System Health Checks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { check: "Database connectivity", status: "pass", lastRun: "2 min ago" },
                  { check: "AI API endpoints", status: "pass", lastRun: "1 min ago" },
                  { check: "File storage access", status: "pass", lastRun: "3 min ago" },
                  { check: "Authentication service", status: "warning", lastRun: "5 min ago" },
                  { check: "Backup systems", status: "pass", lastRun: "1 hour ago" }
                ].map((check, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      {check.status === 'pass' ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      )}
                      <span className="text-white">{check.check}</span>
                    </div>
                    <span className="text-sm text-gray-400">{check.lastRun}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemConfig; 