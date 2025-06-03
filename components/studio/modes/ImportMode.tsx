"use client";
import { useState, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { type StudioMode } from "@/hooks/useStudioMode";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  FileText, 
  Film, 
  AlertCircle, 
  CheckCircle, 
  X,
  Download,
  Eye,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Edit3
} from "lucide-react";

interface ImportedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'analyzing' | 'processed' | 'error' | 'ready';
  content?: {
    title?: string;
    genre?: string;
    characters?: string[];
    scenes?: number;
    pages?: number;
    structure?: any;
    screenplay?: string;
  };
  error?: string;
}

interface ImportModeProps {
  onModeSwitch: (mode: StudioMode) => void;
  onProjectCreated?: (project: any) => void;
}

export default function ImportMode({ onModeSwitch, onProjectCreated }: ImportModeProps) {
  const [files, setFiles] = useState<ImportedFile[]>([]);
  const [processing, setProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Configuración de dropzone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: ImportedFile[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'analyzing'
    }));

    setFiles(prev => [...prev, ...newFiles]);
    processFiles(newFiles, acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'application/x-final-draft': ['.fdx'],
      'text/fountain': ['.fountain']
    },
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  // Procesar archivos importados
  const processFiles = async (filesList: ImportedFile[], originalFiles: File[]) => {
    setProcessing(true);

    for (let i = 0; i < filesList.length; i++) {
      const file = filesList[i];
      const originalFile = originalFiles[i];

      try {
        // Simular análisis del archivo
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Analizar contenido según tipo de archivo
        const content = await analyzeFileContent(originalFile);

        setFiles(prev => prev.map(f => 
          f.id === file.id 
            ? { ...f, status: 'processed', content }
            : f
        ));
      } catch (error) {
        setFiles(prev => prev.map(f => 
          f.id === file.id 
            ? { ...f, status: 'error', error: 'Error al procesar el archivo' }
            : f
        ));
      }
    }

    setProcessing(false);
  };

  // Simular análisis de contenido
  const analyzeFileContent = async (file: File): Promise<ImportedFile['content']> => {
    // En producción, esto se haría con un servicio de análisis de documentos
    const mockContent = {
      title: `Proyecto Importado - ${file.name.replace(/\.[^/.]+$/, "")}`,
      genre: "Drama",
      characters: ["PROTAGONISTA", "ANTAGONISTA", "PERSONAJE SECUNDARIO"],
      scenes: Math.floor(Math.random() * 50) + 20,
      pages: Math.floor(Math.random() * 100) + 50,
      structure: {
        act1: "25%",
        act2: "50%", 
        act3: "25%"
      },
      screenplay: "FADE IN:\n\nINT. LIVING ROOM - DAY\n\n[Contenido del guión procesado...]"
    };

    return mockContent;
  };

  // Remover archivo
  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  // Crear proyecto desde archivo importado
  const createProject = (file: ImportedFile) => {
    if (!file.content) return;

    const project = {
      id: Math.random().toString(36).substring(7),
      title: file.content.title,
      genre: file.content.genre,
      source: 'imported',
      importedFrom: file.name,
      content: file.content
    };

    onProjectCreated?.(project);
    onModeSwitch('expert');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Importar Proyecto</h1>
        <p className="text-muted-foreground">
          Importa guiones existentes desde diferentes formatos y continúa trabajando en GUIONIX
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="upload">Subir Archivo</TabsTrigger>
          <TabsTrigger value="processed">Procesados</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          {/* Zona de Drop */}
          <Card>
            <CardContent className="p-8">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? 'border-primary bg-primary/5'
                    : 'border-muted-foreground/25 hover:border-primary/50'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">
                  {isDragActive ? 'Suelta los archivos aquí' : 'Arrastra archivos o haz clic para seleccionar'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  Soportamos PDF, DOC, DOCX, TXT, FDX y Fountain
                </p>
                <p className="text-sm text-muted-foreground">
                  Tamaño máximo: 50MB por archivo
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Formatos Soportados */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { ext: 'PDF', desc: 'Documentos PDF', icon: FileText },
              { ext: 'DOC/DOCX', desc: 'Microsoft Word', icon: FileText },
              { ext: 'TXT', desc: 'Texto plano', icon: FileText },
              { ext: 'FDX', desc: 'Final Draft', icon: Film },
              { ext: 'FOUNTAIN', desc: 'Fountain markup', icon: Film },
              { ext: 'CELTX', desc: 'Celtx format', icon: Film },
            ].map((format) => (
              <Card key={format.ext}>
                <CardContent className="flex items-center p-4">
                  <format.icon className="w-8 h-8 mr-3 text-primary" />
                  <div>
                    <div className="font-medium">{format.ext}</div>
                    <div className="text-sm text-muted-foreground">{format.desc}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Lista de Archivos en Proceso */}
          {files.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Archivos en Proceso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {files.map((file) => (
                  <div key={file.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          file.status === 'analyzing' ? 'bg-yellow-500 animate-pulse' :
                          file.status === 'processed' ? 'bg-green-500' :
                          file.status === 'error' ? 'bg-red-500' :
                          'bg-blue-500'
                        }`} />
                        <div>
                          <div className="font-medium">{file.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatFileSize(file.size)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {file.status === 'processed' && (
                          <Button size="sm" onClick={() => createProject(file)}>
                            <ArrowRight className="w-4 h-4 mr-1" />
                            Abrir
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {file.status === 'analyzing' && (
                      <Progress value={60} className="h-2 mb-2" />
                    )}

                    {file.error && (
                      <Alert className="mt-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{file.error}</AlertDescription>
                      </Alert>
                    )}

                    {file.content && (
                      <div className="mt-3 p-3 bg-muted/30 rounded text-sm">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="font-medium">Título:</span> {file.content.title}
                          </div>
                          <div>
                            <span className="font-medium">Género:</span> {file.content.genre}
                          </div>
                          <div>
                            <span className="font-medium">Escenas:</span> {file.content.scenes}
                          </div>
                          <div>
                            <span className="font-medium">Páginas:</span> {file.content.pages}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="processed" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Proyectos Procesados</CardTitle>
              <CardDescription>
                Archivos que han sido analizados y están listos para editar
              </CardDescription>
            </CardHeader>
            <CardContent>
              {files.filter(f => f.status === 'processed').length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    No hay archivos procesados aún
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {files
                    .filter(f => f.status === 'processed')
                    .map((file) => (
                      <Card key={file.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{file.content?.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {file.content?.genre} • {file.content?.pages} páginas
                              </p>
                            </div>
                            <Button onClick={() => createProject(file)}>
                              <Edit3 className="w-4 h-4 mr-2" />
                              Editar en Studio
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Plantillas de Ejemplo</CardTitle>
                <CardDescription>
                  Importa plantillas preconfiguradas para empezar rápidamente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "Thriller Psicológico", pages: 95, genre: "Thriller" },
                  { title: "Comedia Romántica", pages: 108, genre: "Romance" },
                  { title: "Drama Familiar", pages: 87, genre: "Drama" },
                  { title: "Acción/Aventura", pages: 112, genre: "Acción" },
                ].map((template, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <div className="font-medium">{template.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {template.genre} • {template.pages} páginas
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Usar
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ayuda de Importación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div>
                    <strong>Formatos optimizados:</strong>
                    <p className="text-muted-foreground">
                      Final Draft (.fdx) y Fountain (.fountain) mantienen el formato original
                    </p>
                  </div>
                  <div>
                    <strong>Documentos de texto:</strong>
                    <p className="text-muted-foreground">
                      PDF y DOC se procesan con IA para extraer estructura
                    </p>
                  </div>
                  <div>
                    <strong>Tiempo de procesamiento:</strong>
                    <p className="text-muted-foreground">
                      2-5 minutos dependiendo del tamaño del archivo
                    </p>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" onClick={() => onModeSwitch('new')}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Empezar desde Cero
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
