"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, FileText, Film, Code, Loader2, CheckCircle, AlertCircle, Settings } from "lucide-react";

interface ExportFormat {
  id: 'pdf' | 'fountain' | 'finaldraft' | 'word' | 'html' | 'txt';
  name: string;
  description: string;
  icon: React.ReactNode;
  size?: string;
  status?: 'available' | 'processing' | 'ready' | 'error';
  lastExported?: Date;
}

interface ExportPanelProps {
  project?: any;
  projectId?: string;
}

const exportFormats: ExportFormat[] = [
  {
    id: "pdf",
    name: "PDF Profesional",
    description: "Formato estándar de la industria con formato correcto",
    icon: <FileText className="w-4 h-4" />,
    status: 'available'
  },
  {
    id: "fountain",
    name: "Fountain",
    description: "Formato de texto plano para escritores",
    icon: <Code className="w-4 h-4" />,
    status: 'available'
  },
  {
    id: "finaldraft",
    name: "Final Draft",
    description: "Compatible con Final Draft (.fdx)",
    icon: <Film className="w-4 h-4" />,
    status: 'available'
  },
  {
    id: "word",
    name: "Microsoft Word",
    description: "Documento de Word con formato básico",
    icon: <FileText className="w-4 h-4" />,
    status: 'available'
  },
  {
    id: "html",
    name: "HTML",
    description: "Página web para visualización online",
    icon: <Code className="w-4 h-4" />,
    status: 'available'
  },
  {
    id: "txt",
    name: "Texto Plano",
    description: "Archivo de texto simple sin formato",
    icon: <FileText className="w-4 h-4" />,
    status: 'available'
  }
];

export default function ExportPanel({ project, projectId }: ExportPanelProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat['id']>('pdf');
  const [loading, setLoading] = useState(false);
  const [exportHistory, setExportHistory] = useState<any[]>([
    {
      id: '1',
      format: 'pdf',
      createdAt: new Date(Date.now() - 86400000),
      size: '2.4 MB',
      status: 'ready'
    },
    {
      id: '2', 
      format: 'fountain',
      createdAt: new Date(Date.now() - 172800000),
      size: '145 KB',
      status: 'ready'
    }
  ]);
  const [customSettings, setCustomSettings] = useState({
    includePageNumbers: true,
    includeTitlePage: true,
    watermark: false,
    characterNames: 'uppercase',
    sceneHeaders: 'standard'
  });

  const handleExport = async (formatId: ExportFormat['id']) => {
    if (!project && !projectId) return;
    
    setLoading(true);
    setSelectedFormat(formatId);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newExport = {
        id: Date.now().toString(),
        format: formatId,
        createdAt: new Date(),
        size: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
        status: 'ready',
        downloadUrl: `#download-${formatId}-${Date.now()}`
      };
      
      setExportHistory([newExport, ...exportHistory]);
      
      // Simulate download
      console.log(`Downloading ${formatId} export...`);
      
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFormatIcon = (formatId: string) => {
    const format = exportFormats.find(f => f.id === formatId);
    return format?.icon || <FileText className="w-4 h-4" />;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'processing':
        return <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Download className="w-5 h-5 text-yellow-400" />
          Exportar Guión
        </CardTitle>
        <CardDescription className="text-gray-400">
          Exporta tu guión en múltiples formatos profesionales
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Export Formats */}
        <div>
          <h4 className="text-sm font-medium text-white mb-3">Formatos Disponibles</h4>
          <div className="grid grid-cols-1 gap-3">
            {exportFormats.map((format) => (
              <div
                key={format.id}
                className={`p-3 border rounded-lg cursor-pointer transition-all hover:border-gray-600 ${
                  selectedFormat === format.id 
                    ? 'border-yellow-400 bg-yellow-400/10' 
                    : 'border-gray-700 bg-gray-800'
                }`}
                onClick={() => setSelectedFormat(format.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-yellow-400">
                      {format.icon}
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm">{format.name}</p>
                      <p className="text-xs text-gray-400">{format.description}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={selectedFormat === format.id ? "default" : "outline"}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExport(format.id);
                    }}
                    disabled={loading && selectedFormat === format.id}
                    className={selectedFormat === format.id ? "bg-yellow-600 hover:bg-yellow-700" : "border-gray-600"}
                  >
                    {loading && selectedFormat === format.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-gray-700" />

        {/* Export Settings */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Settings className="w-4 h-4 text-yellow-400" />
            <h4 className="text-sm font-medium text-white">Configuración de Exportación</h4>
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={customSettings.includePageNumbers}
                onChange={(e) => setCustomSettings({...customSettings, includePageNumbers: e.target.checked})}
                className="rounded border-gray-600 bg-gray-800"
              />
              Incluir números de página
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={customSettings.includeTitlePage}
                onChange={(e) => setCustomSettings({...customSettings, includeTitlePage: e.target.checked})}
                className="rounded border-gray-600 bg-gray-800"
              />
              Incluir página de título
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={customSettings.watermark}
                onChange={(e) => setCustomSettings({...customSettings, watermark: e.target.checked})}
                className="rounded border-gray-600 bg-gray-800"
              />
              Agregar marca de agua
            </label>
          </div>
        </div>

        <Separator className="bg-gray-700" />

        {/* Export History */}
        <div>
          <h4 className="text-sm font-medium text-white mb-3">Historial de Exportaciones</h4>
          {exportHistory.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">
              No hay exportaciones previas
            </p>
          ) : (
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {exportHistory.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 bg-gray-800 border border-gray-700 rounded text-sm"
                >
                  <div className="flex items-center gap-2">
                    {getFormatIcon(item.format)}
                    {getStatusIcon(item.status)}
                    <div>
                      <p className="text-white font-medium">
                        {exportFormats.find(f => f.id === item.format)?.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {item.createdAt.toLocaleDateString()} • {item.size}
                      </p>
                    </div>
                  </div>
                  {item.status === 'ready' && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
                      onClick={() => console.log(`Download ${item.id}`)}
                    >
                      <Download className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Export Button */}
        <div className="pt-2">
          <Button
            onClick={() => handleExport('pdf')}
            disabled={loading}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-medium"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Exportando...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Exportación Rápida (PDF)
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}