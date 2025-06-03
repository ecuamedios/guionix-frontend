"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  MessageCircle, 
  Lock, 
  Unlock, 
  Send, 
  Eye, 
  Edit3, 
  UserPlus, 
  Settings,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface CollaborationPanelProps {
  project?: any;
  resourceId?: string;
  currentUserId?: string;
}

interface Collaborator {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'editor' | 'viewer';
  avatar?: string;
  isOnline: boolean;
  lastSeen?: Date;
  currentSection?: string;
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
  resolved: boolean;
  replies: Comment[];
  section?: string;
}

interface ActivityItem {
  id: string;
  userId: string;
  userName: string;
  action: string;
  section?: string;
  timestamp: Date;
}

export default function CollaborationPanel({ project, resourceId, currentUserId = "user-1" }: CollaborationPanelProps) {
  const [collaborators] = useState<Collaborator[]>([
    {
      id: "user-1",
      name: "Tú",
      email: "tu@email.com",
      role: "owner",
      isOnline: true,
      currentSection: "Acto I - Beat 3"
    },
    {
      id: "user-2", 
      name: "María García",
      email: "maria@email.com",
      role: "editor",
      isOnline: true,
      currentSection: "Acto II - Beat 7"
    },
    {
      id: "user-3",
      name: "Carlos López",
      email: "carlos@email.com", 
      role: "viewer",
      isOnline: false,
      lastSeen: new Date(Date.now() - 3600000)
    }
  ]);

  const [comments, setComments] = useState<Comment[]>([
    {
      id: "comment-1",
      userId: "user-2",
      userName: "María García",
      content: "Me gusta mucho el desarrollo del personaje principal en esta sección. ¿Podrías agregar más detalle sobre su motivación?",
      createdAt: new Date(Date.now() - 1800000),
      resolved: false,
      replies: [],
      section: "Acto I - Beat 2"
    },
    {
      id: "comment-2",
      userId: "user-3",
      userName: "Carlos López",
      content: "El diálogo aquí suena muy natural. Excelente trabajo.",
      createdAt: new Date(Date.now() - 3600000),
      resolved: true,
      replies: [],
      section: "Acto I - Beat 1"
    }
  ]);

  const [activities] = useState<ActivityItem[]>([
    {
      id: "activity-1",
      userId: "user-2",
      userName: "María García",
      action: "editó el Beat 7 del Acto II",
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: "activity-2",
      userId: "user-1",
      userName: "Tú",
      action: "agregó nuevo beat en Acto I",
      timestamp: new Date(Date.now() - 900000)
    },
    {
      id: "activity-3",
      userId: "user-3",
      userName: "Carlos López",
      action: "revisó la estructura general",
      timestamp: new Date(Date.now() - 1800000)
    }
  ]);

  const [newComment, setNewComment] = useState("");
  const [activeTab, setActiveTab] = useState<'collaborators' | 'comments' | 'activity'>('collaborators');

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: `comment-${Date.now()}`,
      userId: currentUserId,
      userName: "Tú",
      content: newComment,
      createdAt: new Date(),
      resolved: false,
      replies: [],
      section: "Sección actual"
    };
    
    setComments([comment, ...comments]);
    setNewComment("");
  };

  const toggleCommentResolved = (commentId: string) => {
    setComments(comments.map(comment =>
      comment.id === commentId ? { ...comment, resolved: !comment.resolved } : comment
    ));
  };

  const getRoleColor = (role: Collaborator['role']) => {
    switch (role) {
      case 'owner':
        return 'bg-purple-900/50 text-purple-400 border-purple-400/20';
      case 'editor':
        return 'bg-blue-900/50 text-blue-400 border-blue-400/20';
      case 'viewer':
        return 'bg-gray-800 text-gray-400 border-gray-600';
      default:
        return 'bg-gray-800 text-gray-400 border-gray-600';
    }
  };

  const getRoleIcon = (role: Collaborator['role']) => {
    switch (role) {
      case 'owner':
        return <Settings className="w-3 h-3" />;
      case 'editor':
        return <Edit3 className="w-3 h-3" />;
      case 'viewer':
        return <Eye className="w-3 h-3" />;
      default:
        return <Eye className="w-3 h-3" />;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Ahora';
    if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)}h`;
    return `Hace ${Math.floor(diffInSeconds / 86400)}d`;
  };

  return (
    <Card className="bg-gray-900 border-gray-800 h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-white">
          <Users className="w-5 h-5 text-yellow-400" />
          Colaboración
        </CardTitle>
        <CardDescription className="text-gray-400">
          Trabaja en equipo en tiempo real
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Tab Navigation */}
        <div className="flex gap-1 bg-gray-800 rounded-lg p-1">
          <Button
            size="sm"
            variant={activeTab === 'collaborators' ? "default" : "ghost"}
            onClick={() => setActiveTab('collaborators')}
            className={`flex-1 text-xs ${
              activeTab === 'collaborators' ? "bg-yellow-600 hover:bg-yellow-700" : "text-gray-400"
            }`}
          >
            <Users className="w-3 h-3 mr-1" />
            Equipo
          </Button>
          <Button
            size="sm"
            variant={activeTab === 'comments' ? "default" : "ghost"}
            onClick={() => setActiveTab('comments')}
            className={`flex-1 text-xs ${
              activeTab === 'comments' ? "bg-yellow-600 hover:bg-yellow-700" : "text-gray-400"
            }`}
          >
            <MessageCircle className="w-3 h-3 mr-1" />
            Chat
            {comments.filter(c => !c.resolved).length > 0 && (
              <Badge className="ml-1 bg-red-500 text-white text-xs px-1">
                {comments.filter(c => !c.resolved).length}
              </Badge>
            )}
          </Button>
          <Button
            size="sm"
            variant={activeTab === 'activity' ? "default" : "ghost"}
            onClick={() => setActiveTab('activity')}
            className={`flex-1 text-xs ${
              activeTab === 'activity' ? "bg-yellow-600 hover:bg-yellow-700" : "text-gray-400"
            }`}
          >
            <Clock className="w-3 h-3 mr-1" />
            Actividad
          </Button>
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {activeTab === 'collaborators' && (
            <div className="space-y-4">
              {/* Online Status */}
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">
                  {collaborators.filter(c => c.isOnline).length} en línea
                </span>
              </div>

              {/* Collaborators List */}
              <div className="space-y-3">
                {collaborators.map((collaborator) => (
                  <div key={collaborator.id} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <div className="relative">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={collaborator.avatar} />
                        <AvatarFallback className="bg-gray-700 text-gray-300 text-xs">
                          {collaborator.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 ${
                        collaborator.isOnline ? 'bg-green-400' : 'bg-gray-500'
                      }`}></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-white truncate">
                          {collaborator.name}
                        </p>
                        <Badge className={getRoleColor(collaborator.role)}>
                          {getRoleIcon(collaborator.role)}
                          <span className="ml-1 text-xs">
                            {collaborator.role === 'owner' ? 'Propietario' : 
                             collaborator.role === 'editor' ? 'Editor' : 'Visualizador'}
                          </span>
                        </Badge>
                      </div>
                      
                      {collaborator.isOnline && collaborator.currentSection ? (
                        <p className="text-xs text-green-400">
                          Editando: {collaborator.currentSection}
                        </p>
                      ) : collaborator.lastSeen ? (
                        <p className="text-xs text-gray-500">
                          Visto {formatTimeAgo(collaborator.lastSeen)}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>

              {/* Invite Button */}
              <Button 
                variant="outline" 
                className="w-full border-gray-600 text-gray-300 hover:text-white hover:border-gray-500"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Invitar Colaborador
              </Button>
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="space-y-4">
              {/* Add Comment */}
              <div className="space-y-2">
                <Input
                  placeholder="Escribe un comentario..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button 
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  size="sm"
                  className="w-full bg-yellow-600 hover:bg-yellow-700"
                >
                  <Send className="w-3 h-3 mr-2" />
                  Enviar Comentario
                </Button>
              </div>

              <Separator className="bg-gray-700" />

              {/* Comments List */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {comments.length === 0 ? (
                  <p className="text-center text-gray-400 py-4 text-sm">
                    No hay comentarios aún
                  </p>
                ) : (
                  comments.map((comment) => (
                    <div 
                      key={comment.id} 
                      className={`p-3 rounded-lg border ${
                        comment.resolved 
                          ? 'bg-gray-800/50 border-gray-700 opacity-75' 
                          : 'bg-gray-800 border-gray-700'
                      }`}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-gray-700 text-gray-300 text-xs">
                            {comment.userName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-white">
                              {comment.userName}
                            </p>
                            <span className="text-xs text-gray-500">
                              {formatTimeAgo(comment.createdAt)}
                            </span>
                          </div>
                          {comment.section && (
                            <p className="text-xs text-gray-400">{comment.section}</p>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleCommentResolved(comment.id)}
                          className="p-1 h-auto"
                        >
                          {comment.resolved ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                      
                      <p className="text-sm text-gray-300 mb-2">
                        {comment.content}
                      </p>
                      
                      {comment.resolved && (
                        <Badge className="bg-green-900/50 text-green-400 text-xs">
                          Resuelto
                        </Badge>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="bg-gray-700 text-gray-300 text-xs">
                      {activity.userName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300">
                      <span className="font-medium text-white">{activity.userName}</span>
                      {' '}{activity.action}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}