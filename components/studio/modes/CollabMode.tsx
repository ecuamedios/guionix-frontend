"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Panel as ResizablePanel, PanelGroup as ResizablePanelGroup, PanelResizeHandle as ResizableHandle } from "react-resizable-panels";
import { 
  Users, 
  Share2, 
  MessageCircle, 
  Eye, 
  Edit3,
  Clock,
  CheckCircle,
  AlertCircle,
  Video,
  Mic,
  MoreHorizontal,
  Settings,
  Crown,
  UserPlus,
  Copy,
  Send
} from "lucide-react";

interface Collaborator {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'editor' | 'reviewer' | 'viewer';
  status: 'online' | 'away' | 'offline';
  lastSeen: Date;
  cursor?: {
    x: number;
    y: number;
    section: string;
  };
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  position: {
    section: string;
    line?: number;
  };
  resolved: boolean;
  replies?: Comment[];
}

interface CollabModeProps {
  onModeSwitch: (mode: string) => void;
}

export default function CollabMode({ onModeSwitch }: CollabModeProps) {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeTab, setActiveTab] = useState("collaboration");
  const [inviteEmail, setInviteEmail] = useState("");
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const inviteToken = searchParams.get('invite');
  const projectId = searchParams.get('project');

  // Simular carga de datos de colaboración
  useEffect(() => {
    const loadCollabData = async () => {
      try {
        // Simular datos de colaboradores
        const mockCollaborators: Collaborator[] = [
          {
            id: "1",
            name: "María García",
            email: "maria@example.com",
            role: "owner",
            status: "online",
            lastSeen: new Date(),
            cursor: { x: 100, y: 200, section: "act1" }
          },
          {
            id: "2", 
            name: "Juan Pérez",
            email: "juan@example.com",
            role: "editor",
            status: "online",
            lastSeen: new Date(Date.now() - 5 * 60 * 1000)
          },
          {
            id: "3",
            name: "Ana López",
            email: "ana@example.com", 
            role: "reviewer",
            status: "away",
            lastSeen: new Date(Date.now() - 30 * 60 * 1000)
          }
        ];

        // Simular comentarios
        const mockComments: Comment[] = [
          {
            id: "1",
            userId: "2",
            userName: "Juan Pérez",
            content: "Esta escena necesita más tensión dramática. ¿Qué tal si agregamos un conflicto interno?",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            position: { section: "act1", line: 45 },
            resolved: false
          },
          {
            id: "2",
            userId: "3", 
            userName: "Ana López",
            content: "El diálogo aquí se siente muy expositivo. Podríamos hacer que sea más natural.",
            timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
            position: { section: "act2", line: 102 },
            resolved: false
          }
        ];

        setCollaborators(mockCollaborators);
        setComments(mockComments);
      } catch (error) {
        console.error("Error loading collaboration data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCollabData();
  }, []);

  // Unirse por invitación
  useEffect(() => {
    if (inviteToken && session?.user) {
      // Lógica para unirse al proyecto con token de invitación
      console.log("Joining project with invite token:", inviteToken);
    }
  }, [inviteToken, session]);

  const handleInviteCollaborator = async () => {
    if (!inviteEmail) return;

    try {
      // Implementar lógica de invitación
      console.log("Inviting:", inviteEmail);
      setInviteEmail("");
    } catch (error) {
      console.error("Error inviting collaborator:", error);
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Math.random().toString(36).substring(7),
      userId: session?.user?.id || "current",
      userName: session?.user?.name || "Usuario Actual",
      content: newComment,
      timestamp: new Date(),
      position: { section: "current" },
      resolved: false
    };

    setComments(prev => [comment, ...prev]);
    setNewComment("");
  };

  const getRoleColor = (role: Collaborator['role']) => {
    switch (role) {
      case 'owner': return 'bg-purple-100 text-purple-800';
      case 'editor': return 'bg-blue-100 text-blue-800';
      case 'reviewer': return 'bg-green-100 text-green-800';
      case 'viewer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: Collaborator['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse text-center">
          <Users className="w-8 h-8 mx-auto mb-4 text-primary" />
          <p>Conectando con colaboradores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header de Colaboración */}
      <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur">
        <div className="flex items-center space-x-4">
          <Users className="w-6 h-6 text-primary" />
          <div>
            <h1 className="text-xl font-bold">Proyecto Colaborativo</h1>
            <p className="text-sm text-muted-foreground">
              {collaborators.filter(c => c.status === 'online').length} colaboradores en línea
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Video className="w-4 h-4 mr-1" />
            Video Call
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4 mr-1" />
            Compartir
          </Button>
          <Button size="sm" onClick={() => onModeSwitch('expert')}>
            <Edit3 className="w-4 h-4 mr-1" />
            Editor Avanzado
          </Button>
        </div>
      </div>

      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Área Principal de Colaboración */}
        <ResizablePanel defaultSize={70}>
          <div className="p-6 h-full overflow-y-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="collaboration">Colaborar</TabsTrigger>
                <TabsTrigger value="comments">Comentarios</TabsTrigger>
                <TabsTrigger value="history">Historial</TabsTrigger>
              </TabsList>

              <TabsContent value="collaboration" className="space-y-6 mt-6">
                {/* Vista de Colaboradores Activos */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Colaboradores Activos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {collaborators.map((collaborator) => (
                        <div key={collaborator.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={collaborator.avatar} />
                                <AvatarFallback>
                                  {collaborator.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(collaborator.status)}`} />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">{collaborator.name}</span>
                                {collaborator.role === 'owner' && <Crown className="w-4 h-4 text-yellow-500" />}
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="secondary" className={getRoleColor(collaborator.role)}>
                                  {collaborator.role === 'owner' ? 'Propietario' :
                                   collaborator.role === 'editor' ? 'Editor' :
                                   collaborator.role === 'reviewer' ? 'Revisor' : 'Espectador'}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {collaborator.status === 'online' ? 'En línea' :
                                   collaborator.status === 'away' ? 'Ausente' :
                                   `Último: ${collaborator.lastSeen.toLocaleTimeString()}`}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Invitar Colaboradores */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <UserPlus className="w-5 h-5 mr-2" />
                      Invitar Colaboradores
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="email@ejemplo.com"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleInviteCollaborator()}
                      />
                      <Button onClick={handleInviteCollaborator}>
                        <Send className="w-4 h-4 mr-1" />
                        Invitar
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-3 bg-muted/30 rounded">
                      <Copy className="w-4 h-4" />
                      <span className="text-sm font-mono flex-1">
                        https://guionix.com/studio?invite=abc123xyz
                      </span>
                      <Button variant="ghost" size="sm">Copiar</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Opciones de Colaboración en Tiempo Real */}
                <Card>
                  <CardHeader>
                    <CardTitle>Configuración de Colaboración</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span>Ver cursores de otros usuarios</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span>Notificaciones de cambios</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>Bloquear edición simultánea</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span>Guardar automáticamente</span>
                      </label>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comments" className="space-y-6 mt-6">
                {/* Agregar Comentario */}
                <Card>
                  <CardHeader>
                    <CardTitle>Nuevo Comentario</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Textarea
                        placeholder="Escribe tu comentario o sugerencia..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={3}
                      />
                      <div className="flex justify-end">
                        <Button onClick={handleAddComment}>
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Agregar Comentario
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Lista de Comentarios */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <Card key={comment.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              {comment.userName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-sm">{comment.userName}</span>
                              <span className="text-xs text-muted-foreground">
                                {comment.timestamp.toLocaleString()}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {comment.position.section}
                              </Badge>
                            </div>
                            <p className="text-sm mb-2">{comment.content}</p>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <MessageCircle className="w-3 h-3 mr-1" />
                                Responder
                              </Button>
                              <Button variant="ghost" size="sm">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Resolver
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Historial de Cambios
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        {
                          user: "María García",
                          action: "Editó la escena 15",
                          time: "Hace 5 minutos",
                          type: "edit"
                        },
                        {
                          user: "Juan Pérez", 
                          action: "Agregó comentario en Acto II",
                          time: "Hace 10 minutos",
                          type: "comment"
                        },
                        {
                          user: "Ana López",
                          action: "Revisó la estructura general",
                          time: "Hace 30 minutos", 
                          type: "review"
                        }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 border rounded">
                          <div className={`w-2 h-2 rounded-full ${
                            activity.type === 'edit' ? 'bg-blue-500' :
                            activity.type === 'comment' ? 'bg-green-500' : 'bg-purple-500'
                          }`} />
                          <div className="flex-1">
                            <div className="text-sm">
                              <span className="font-medium">{activity.user}</span> {activity.action}
                            </div>
                            <div className="text-xs text-muted-foreground">{activity.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </ResizablePanel>

        {/* Panel Lateral de Información */}
        <ResizableHandle />
        <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
          <div className="p-4 h-full overflow-y-auto border-l">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Estado del Proyecto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progreso General</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-muted/30 rounded">
                    <div className="text-lg font-bold">{comments.length}</div>
                    <div className="text-xs text-muted-foreground">Comentarios</div>
                  </div>
                  <div className="p-2 bg-muted/30 rounded">
                    <div className="text-lg font-bold">{collaborators.length}</div>
                    <div className="text-xs text-muted-foreground">Colaboradores</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Última Sincronización</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date().toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
