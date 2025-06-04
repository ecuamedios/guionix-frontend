"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { 
  Film, 
  Plus, 
  Users,
  Clock,
  TrendingUp,
  Activity,
  Calendar,
  Award,
  BarChart3,
  FolderOpen,
  Edit,
  Eye,
  Sun,
  Moon,
  Menu,
  X,
  Home,
  PenTool,
  Briefcase,
  UserCheck,
  Building,
  Cog,
  Search,
  Bell,
  Zap,
  Target,
  BookOpen,
  Palette,
  Star,
  Clock3,
  Layers,
  Brain,
  Sparkles,
  Gauge,
  Globe,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  MessageSquare,
  GitBranch,
  Coffee
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Project {
  id: string;
  title: string;
  status: 'draft' | 'in-progress' | 'review' | 'completed';
  progress: number;
  lastModified: string;
  genre: string;
  pages: number;
  team?: string[];
}

interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalPages: number;
  weeklyProgress: number;
  aiIdeasGenerated: number;
  teamMembers: number;
  monthlyGoal: number;
}

interface MenuItem {
  name: string;
  icon: React.ComponentType<any>;
  href?: string;
  comingSoon?: boolean;
  active?: boolean;
  badge?: string;
}

export default function ModernDashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data con estilo moderno
  const [stats] = useState<DashboardStats>({
    totalProjects: 18,
    activeProjects: 5,
    completedProjects: 12,
    totalPages: 1247,
    weeklyProgress: 76,
    aiIdeasGenerated: 132,
    teamMembers: 8,
    monthlyGoal: 85
  });

  const [projects] = useState<Project[]>([
    {
      id: "1",
      title: "Dropbox Design System",
      status: "in-progress",
      progress: 34,
      lastModified: "2 horas ago",
      genre: "Medium",
      pages: 89,
      team: ["avatar1", "avatar2", "avatar3"]
    },
    {
      id: "2", 
      title: "Slack Team UI Design",
      status: "in-progress",
      progress: 47,
      lastModified: "1 día ago",
      genre: "High",
      pages: 112,
      team: ["avatar1", "avatar2"]
    },
    {
      id: "3",
      title: "GitHub Satellite",
      status: "completed",
      progress: 100,
      lastModified: "3 días ago",
      genre: "Low",
      pages: 120,
      team: ["avatar1", "avatar2", "avatar3", "avatar4"]
    },
    {
      id: "4",
      title: "3D Character Modelling",
      status: "in-progress",
      progress: 89,
      lastModified: "5 horas ago",
      genre: "Medium",
      pages: 67,
      team: ["avatar1", "avatar2"]
    }
  ]);

  const menuItems: MenuItem[] = [
    {
      name: "Dashboard",
      icon: Home,
      href: "/",
      active: true
    },
    {
      name: "Projects",
      icon: Briefcase,
      href: "/projects",
      badge: "5"
    },
    {
      name: "Create New",
      icon: Plus,
      href: "/studio/new/phase/1"
    },
    {
      name: "Teams",
      icon: Users,
      href: "/teams",
      badge: "8"
    },
    {
      name: "Analytics",
      icon: BarChart3,
      href: "/analytics"
    },
    {
      name: "AI Assistant",
      icon: Brain,
      href: "/ai",
      badge: "New"
    }
  ];

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session, router]);

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 
        flex flex-col shadow-2xl lg:shadow-none
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                GUIONIX
              </h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                if (!item.comingSoon && item.href) {
                  router.push(item.href);
                  setSidebarOpen(false);
                }
              }}
              className={`
                w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group
                ${item.active 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <item.icon className={`w-5 h-5 ${item.active ? 'text-white' : ''}`} />
                <span className="font-medium">{item.name}</span>
              </div>
              {item.badge && (
                <Badge className={`text-xs px-2 py-0.5 ${
                  item.active 
                    ? 'bg-white/20 text-white border-white/20' 
                    : 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                }`}>
                  {item.badge}
                </Badge>
              )}
            </button>
          ))}
        </nav>

        {/* Theme Toggle & User info */}
        <div className="p-4 space-y-3 border-t border-slate-200/50 dark:border-slate-700/50">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center space-x-3 p-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-5 h-5" />
                <span className="font-medium">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-5 h-5" />
                <span className="font-medium">Dark Mode</span>
              </>
            )}
          </button>

          {/* User info */}
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {session.user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                {session.user?.name || 'Usuario'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {session.user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Projects</h1>
                <p className="text-slate-600 dark:text-slate-400">Welcome back, {session.user?.name?.split(' ')[0] || 'Creator'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline"
                size="sm"
                className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button 
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Project
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-slate-900 dark:text-white text-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    Projects
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stats.totalProjects}</div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{stats.activeProjects} active</p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-slate-900 dark:text-white text-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    Completed
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stats.completedProjects}</div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">this month</p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-slate-900 dark:text-white text-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    Teams
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stats.teamMembers}</div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">members</p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-slate-900 dark:text-white text-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mr-3">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    Productivity
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stats.monthlyGoal}%</div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">monthly goal</p>
              </CardContent>
            </Card>
          </div>

          {/* Active Projects Table */}
          <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur border-slate-200/50 dark:border-slate-700/50 mb-8">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white flex items-center justify-between">
                <div className="flex items-center">
                  <GitBranch className="w-5 h-5 mr-2 text-blue-600" />
                  Active Projects
                </div>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                  View All Projects
                </Button>
              </CardTitle>
              <CardDescription>Overview of your ongoing projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-50/50 dark:bg-slate-700/20 hover:bg-slate-100/50 dark:hover:bg-slate-700/40 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                      <div>
                        <h3 className="font-medium text-slate-900 dark:text-white">{project.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Updated {project.lastModified}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{project.pages}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Tasks</p>
                      </div>
                      <Badge className={`
                        ${project.genre === 'High' ? 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400' : ''}
                        ${project.genre === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400' : ''}
                        ${project.genre === 'Low' ? 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400' : ''}
                      `}>
                        {project.genre}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        <div className="flex -space-x-2">
                          {project.team?.slice(0, 3).map((member, index) => (
                            <div key={index} className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center">
                              <span className="text-xs text-white font-medium">{index + 1}</span>
                            </div>
                          ))}
                          {(project.team?.length || 0) > 3 && (
                            <div className="w-6 h-6 bg-slate-200 dark:bg-slate-600 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center">
                              <span className="text-xs text-slate-600 dark:text-slate-300">+{(project.team?.length || 0) - 3}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="w-24">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-slate-600 dark:text-slate-400">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tasks Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur border-slate-200/50 dark:border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-white flex items-center">
                  <Gauge className="w-5 h-5 mr-2 text-blue-600" />
                  Tasks Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">76%</div>
                  <p className="text-slate-600 dark:text-slate-400">Overall Progress</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-slate-700 dark:text-slate-300">Completed</span>
                    </div>
                    <span className="font-medium text-slate-900 dark:text-white">76%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-slate-700 dark:text-slate-300">In-Progress</span>
                    </div>
                    <span className="font-medium text-slate-900 dark:text-white">32%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-slate-700 dark:text-slate-300">Behind</span>
                    </div>
                    <span className="font-medium text-slate-900 dark:text-white">13%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur border-slate-200/50 dark:border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-white flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    <div>
                      <p className="text-sm text-slate-900 dark:text-white font-medium">New project created</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                    <div>
                      <p className="text-sm text-slate-900 dark:text-white font-medium">Task completed</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                    <div>
                      <p className="text-sm text-slate-900 dark:text-white font-medium">Team member added</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">3 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
                    <div>
                      <p className="text-sm text-slate-900 dark:text-white font-medium">Deadline approaching</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">5 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
