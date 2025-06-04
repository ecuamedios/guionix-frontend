"use client";

import React, { useState } from "react";
import {
  Users, Crown, Shield, Edit, Eye, UserPlus, MessageCircle,
  Award, Settings, Clock, CheckCircle, AlertCircle, Activity
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DashboardMetrics, TeamMember } from "../GuionixUnifiedDashboard";

interface TeamManagementProps {
  metrics: DashboardMetrics;
  searchQuery: string;
  onNavigate: (tab: string) => void;
}

const TeamManagement = ({ metrics, searchQuery, onNavigate }: TeamManagementProps) => {
  const [teamTab, setTeamTab] = useState('members');

  const mockTeamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Ana García",
      email: "ana@guionix.com",
      avatar: "/avatars/ana.jpg",
      role: "DIRECTOR",
      status: "active",
      lastSeen: "2024-01-15T10:30:00Z",
      projects: ["project-1", "project-2"],
      permissions: ["approve_scripts", "manage_projects", "view_analytics"]
    },
    {
      id: "2", 
      name: "Luis Pérez",
      email: "luis@guionix.com",
      avatar: "/avatars/luis.jpg",
      role: "EDITOR",
      status: "active",
      lastSeen: "2024-01-15T09:45:00Z",
      projects: ["project-2", "project-3"],
      permissions: ["edit_scripts", "collaborate"]
    },
    {
      id: "3",
      name: "María López",
      email: "maria@guionix.com", 
      avatar: "/avatars/maria.jpg",
      role: "SUPERVISOR",
      status: "offline",
      lastSeen: "2024-01-14T18:20:00Z",
      projects: ["project-1", "project-4"],
      permissions: ["quality_control", "approve_phases"]
    }
  ];

  const roleHierarchy = [
    {
      role: "SUPER_ADMIN",
      name: "Super Admin",
      description: "Acceso completo al sistema",
      icon: Crown,
      color: "text-yellow-400",
      permissions: ["full_access", "system_config", "user_management"],
      count: 1
    },
    {
      role: "DIRECTOR", 
      name: "Director",
      description: "Aprobación creativa y gestión",
      icon: Award,
      color: "text-purple-400",
      permissions: ["creative_approval", "project_management", "team_oversight"],
      count: 3
    },
    {
      role: "SUPERVISOR",
      name: "Supervisor", 
      description: "Control de calidad",
      icon: Shield,
      color: "text-blue-400",
      permissions: ["quality_control", "approve_phases", "review_scripts"],
      count: 4
    },
    {
      role: "EDITOR",
      name: "Editor",
      description: "Creación de contenido",
      icon: Edit,
      color: "text-green-400", 
      permissions: ["edit_scripts", "collaborate", "create_content"],
      count: 8
    },
    {
      role: "VIEWER",
      name: "Viewer",
      description: "Solo lectura",
      icon: Eye,
      color: "text-gray-400",
      permissions: ["view_only", "read_scripts"],
      count: 2
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-800 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Team & User Management
          </CardTitle>
          <CardDescription className="text-purple-300">
            Gestión integral del equipo con roles, permisos y colaboración
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={teamTab} onValueChange={setTeamTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 p-1">
          <TabsTrigger value="members" className="data-[state=active]:bg-purple-500">
            Miembros
          </TabsTrigger>
          <TabsTrigger value="roles" className="data-[state=active]:bg-purple-500">
            Roles
          </TabsTrigger>
          <TabsTrigger value="projects" className="data-[state=active]:bg-purple-500">
            Asignaciones
          </TabsTrigger>
          <TabsTrigger value="communication" className="data-[state=active]:bg-purple-500">
            Comunicación
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Miembros del Equipo</h3>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Agregar Miembro
            </Button>
          </div>
          
          {mockTeamMembers.map((member) => (
            <Card key={member.id} className="bg-slate-900/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-purple-500 text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-white">{member.name}</h4>
                      <p className="text-gray-300 text-sm">{member.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-purple-500/20 text-purple-400">
                          {member.role}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={member.status === 'active' ? 'border-green-500 text-green-400' : 'border-gray-500 text-gray-400'}
                        >
                          {member.status === 'active' ? 'Activo' : 'Offline'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="border-blue-500/50 hover:bg-blue-500/20">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-purple-500/50 hover:bg-purple-500/20">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Proyectos asignados:</span>
                    <span className="text-white ml-2">{member.projects.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Último acceso:</span>
                    <span className="text-white ml-2">
                      {new Date(member.lastSeen).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Permisos:</span>
                    <span className="text-white ml-2">{member.permissions.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <Card className="bg-slate-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Jerarquía de Roles</CardTitle>
              <CardDescription className="text-gray-300">
                Sistema de roles con permisos diferenciados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roleHierarchy.map((role) => (
                  <div key={role.role} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg bg-gray-700`}>
                        <role.icon className={`w-5 h-5 ${role.color}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{role.name}</h4>
                        <p className="text-sm text-gray-300">{role.description}</p>
                        <div className="flex gap-2 mt-1">
                          {role.permissions.slice(0, 2).map((perm) => (
                            <Badge key={perm} variant="outline" className="text-xs">
                              {perm.replace('_', ' ')}
                            </Badge>
                          ))}
                          {role.permissions.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{role.permissions.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{role.count}</div>
                      <div className="text-sm text-gray-400">miembros</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <Card className="bg-slate-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Asignación de Proyectos</CardTitle>
              <CardDescription className="text-gray-300">
                Distribución de workload y skill matching
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { project: "La Venganza del Patrón", team: 3, progress: 75, priority: "high" },
                  { project: "Corazones Divididos", team: 2, progress: 100, priority: "urgent" },
                  { project: "Secretos de Familia", team: 1, progress: 100, priority: "medium" }
                ].map((project, idx) => (
                  <div key={idx} className="p-4 bg-slate-800 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">{project.project}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Equipo:</span>
                        <span className="text-white">{project.team} miembros</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Progreso:</span>
                        <span className="text-white">{project.progress}%</span>
                      </div>
                      <Badge 
                        className={
                          project.priority === 'urgent' ? 'bg-red-500' :
                          project.priority === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                        }
                      >
                        {project.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Internal Messaging</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Nuevo Mensaje
                  </Button>
                  <div className="text-sm text-gray-300">
                    <div className="flex justify-between mb-2">
                      <span>Mensajes no leídos:</span>
                      <Badge variant="secondary" className="bg-blue-500">5</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Conversaciones activas:</span>
                      <span className="text-white">12</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Knowledge Base</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full border-purple-500/50 hover:bg-purple-500/20">
                    Ver Documentación
                  </Button>
                  <Button variant="outline" className="w-full border-green-500/50 hover:bg-green-500/20">
                    Training Materials
                  </Button>
                  <div className="text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Artículos disponibles:</span>
                      <span className="text-white">47</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamManagement; 