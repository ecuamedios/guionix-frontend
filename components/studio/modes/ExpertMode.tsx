"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Panel as ResizablePanel, PanelGroup as ResizablePanelGroup, PanelResizeHandle as ResizableHandle } from "react-resizable-panels";
import { 
  Edit3, 
  FileText, 
  Layers, 
  Sparkles, 
  Save,
  Settings,
  Share,
  Download,
  Eye,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react";

// Importar componentes existentes del studio actual
import BeatEditor from "@/components/studio/BeatEditor";
import CapaStructure from "@/components/studio/CapaStructure";
import AIGenerationPanel from "@/components/studio/AIGenerationPanel";

interface Project {
  id: string;
  title: string;
  genre: string;
  lastModified: Date;
  status: 'draft' | 'in-progress' | 'review' | 'final';
  content: {
    beats: any[];
    structure: any[];
    screenplay: string;
  };
}

interface ExpertModeProps {
  onModeSwitch: (mode: string) => void;
}

export default function ExpertMode({ onModeSwitch }: ExpertModeProps) {
  const { data: session } = useSession();
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState("structure");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar proyectos del usuario
  useEffect(() => {
    const loadProjects = async () => {
      try {
        // Simular carga de proyectos
        // En producción esto vendría de la API
        const mockProjects: Project[] = [
          {
            id: "1",
            title: "Mi Guión Épico",
            genre: "Drama",
            lastModified: new Date(),
            status: "in-progress",
            content: {
              beats: [],
              structure: [],
              screenplay: ""
            }
          }
        ];
        
        setProjects(mockProjects);
        if (mockProjects.length > 0) {
          setCurrentProject(mockProjects[0]);
        }
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user) {
      loadProjects();
    }
  }, [session]);

  const handleSaveProject = async () => {
    if (!currentProject) return;
    
    try {
      // Implementar lógica de guardado
      console.log("Saving project:", currentProject);
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleExportProject = () => {
    if (!currentProject) return;
    
    // Implementar lógica de exportación
    console.log("Exporting project:", currentProject);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse text-center">
          <Sparkles className="w-8 h-8 mx-auto mb-4 text-primary" />
          <p>Cargando tu estudio...</p>
        </div>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-6">
        <div className="text-center">
          <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">No hay proyectos</h2>
          <p className="text-muted-foreground mb-6">
            Crea tu primer proyecto para empezar a escribir
          </p>
          <Button onClick={() => onModeSwitch('new')} className="mr-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Nuevo Proyecto Guiado
          </Button>
          <Button variant="outline" onClick={() => onModeSwitch('import')}>
            <FileText className="w-4 h-4 mr-2" />
            Importar Proyecto
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header del Editor */}
      <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </Button>
          <div>
            <h1 className="text-xl font-bold">{currentProject.title}</h1>
            <p className="text-sm text-muted-foreground">
              {currentProject.genre} • Editado {currentProject.lastModified.toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4 mr-1" />
            Vista Previa
          </Button>
          <Button variant="ghost" size="sm" onClick={handleExportProject}>
            <Download className="w-4 h-4 mr-1" />
            Exportar
          </Button>
          <Button variant="ghost" size="sm">
            <Share className="w-4 h-4 mr-1" />
            Compartir
          </Button>
          <Button size="sm" onClick={handleSaveProject}>
            <Save className="w-4 h-4 mr-1" />
            Guardar
          </Button>
        </div>
      </div>

      {/* Área Principal del Editor */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Sidebar Izquierdo */}
        {!sidebarCollapsed && (
          <>
            <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
              <div className="p-4 h-full overflow-y-auto">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Proyectos Recientes</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className={`p-3 cursor-pointer hover:bg-muted/50 border-l-2 ${
                          currentProject?.id === project.id
                            ? 'border-primary bg-muted/30'
                            : 'border-transparent'
                        }`}
                        onClick={() => setCurrentProject(project)}
                      >
                        <div className="font-medium text-sm">{project.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {project.genre} • {project.status}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </ResizablePanel>
            <ResizableHandle />
          </>
        )}

        {/* Área Central de Trabajo */}
        <ResizablePanel defaultSize={sidebarCollapsed ? 70 : 60}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="p-4 pb-0">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="structure" className="flex items-center">
                  <Layers className="w-4 h-4 mr-1" />
                  Estructura
                </TabsTrigger>
                <TabsTrigger value="beats" className="flex items-center">
                  <Edit3 className="w-4 h-4 mr-1" />
                  Beats
                </TabsTrigger>
                <TabsTrigger value="screenplay" className="flex items-center">
                  <FileText className="w-4 h-4 mr-1" />
                  Guión
                </TabsTrigger>
                <TabsTrigger value="ai" className="flex items-center">
                  <Sparkles className="w-4 h-4 mr-1" />
                  IA
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 p-4">
              <TabsContent value="structure" className="h-full m-0">
                <CapaStructure 
                  capas={currentProject?.content?.structure || []}
                  onCapaSelect={(capaId) => console.log('Selected capa:', capaId)}
                  onBeatSelect={(beatId) => console.log('Selected beat:', beatId)}
                  onCapaUpdate={async (capa) => console.log('Updating capa:', capa)}
                  onBeatUpdate={async (beat) => console.log('Updating beat:', beat)}
                  onCapaCreate={async (capa) => console.log('Creating capa:', capa)}
                  onBeatCreate={async (beat, capaId) => console.log('Creating beat:', beat, capaId)}
                />
              </TabsContent>

              <TabsContent value="beats" className="h-full m-0">
                <BeatEditor 
                  beat={undefined}
                  onSave={async (beat) => {
                    console.log('Saving beat:', beat);
                    // Implementar lógica de guardado
                  }}
                  onAIGenerate={async (prompt) => {
                    console.log('Generating AI content:', prompt);
                    return "Contenido generado por IA...";
                  }}
                  projectId={currentProject?.id || ''}
                />
              </TabsContent>

              <TabsContent value="screenplay" className="h-full m-0">
                <Card className="h-full">
                  <CardContent className="p-6 h-full">
                    <div className="h-full bg-white rounded border p-6 font-mono text-sm">
                      {/* Área del editor de guión */}
                      <div className="h-full overflow-y-auto">
                        <p className="text-muted-foreground">
                          Aquí irá el editor de guión en formato estándar...
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ai" className="h-full m-0">
                <AIGenerationPanel 
                  onGenerate={async (prompt, type) => {
                    console.log('Generating AI content:', prompt, type);
                    return "Contenido generado por IA...";
                  }}
                  projectContext={{
                    titulo: currentProject?.title || '',
                    genero: currentProject?.genre || '',
                    sinopsis: '',
                    personajes: []
                  }}
                />
              </TabsContent>
            </div>
          </Tabs>
        </ResizablePanel>

        {/* Panel Derecho (Propiedades/Herramientas) */}
        <ResizableHandle />
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <div className="p-4 h-full overflow-y-auto">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Propiedades
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    ESTADO DEL PROYECTO
                  </label>
                  <div className="mt-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      currentProject.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                      currentProject.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      currentProject.status === 'review' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {currentProject.status === 'draft' ? 'Borrador' :
                       currentProject.status === 'in-progress' ? 'En Progreso' :
                       currentProject.status === 'review' ? 'En Revisión' :
                       'Final'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    GÉNERO
                  </label>
                  <div className="mt-1 text-sm">{currentProject.genre}</div>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    PROGRESO
                  </label>
                  <div className="mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: '45%' }}
                      ></div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">45% completado</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Atajos de Teclado</CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-2">
                <div className="flex justify-between">
                  <span>Guardar</span>
                  <kbd className="px-2 py-1 bg-muted rounded">Ctrl+S</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Vista Previa</span>
                  <kbd className="px-2 py-1 bg-muted rounded">Ctrl+P</kbd>
                </div>
                <div className="flex justify-between">
                  <span>IA Assistant</span>
                  <kbd className="px-2 py-1 bg-muted rounded">Ctrl+K</kbd>
                </div>
              </CardContent>
            </Card>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
