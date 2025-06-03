"use client";
import { useState } from "react";
import StudioLayout from "@/components/studio/StudioLayout";
import ProjectSelector from "@/components/studio/ProjectSelector";
import ProgressTracker from "@/components/studio/ProgressTracker";
import BeatEditor from "@/components/studio/BeatEditor";
import CapaStructure from "@/components/studio/CapaStructure";
import AIGenerationPanel from "@/components/studio/AIGenerationPanel";
import WordCounter from "@/components/studio/WordCounter";
import ValidationStatus from "@/components/studio/ValidationStatus";
import CollaborationPanel from "@/components/studio/CollaborationPanel";
import ExportPanel from "@/components/studio/ExportPanel";
import { Plus, Save, Share, Download, Users, FileOutput, Film } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudioMainPage() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentView, setCurrentView] = useState<'overview' | 'editor' | 'structure' | 'collaboration' | 'export'>('overview');
  
  // Demo project data
  const demoProject = {
    id: "demo-project",
    titulo: "Hollywood Epic",
    subtitulo: "Una historia épica de venganza y redención",
    genero: "Drama/Acción",
    sinopsis: "Un ex-soldado busca justicia por la muerte de su familia...",
    logline: "Cuando le matan a su familia, un veterano de guerra debe confrontar su pasado para obtener justicia.",
    ownerId: "demo-user",
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "BORRADOR" as const,
    capas: [
      {
        id: "capa-1",
        numero: 1,
        titulo: "Acto I - Setup",
        descripcion: "Presentación del protagonista y el incidente incitante",
        tipo: "SETUP" as const,
        blakeSnyderBeat: "Setup",
        paginaInicio: 1,
        paginaFin: 25,
        beats: []
      },
      {
        id: "capa-2", 
        numero: 2,
        titulo: "Acto II - Confrontación",
        descripcion: "Desarrollo del conflicto principal",
        tipo: "CONFRONTATION" as const,
        blakeSnyderBeat: "Fun and Games",
        paginaInicio: 26,
        paginaFin: 90,
        beats: []
      }
    ]
  };

  const handleNewProject = () => {
    setCurrentView('editor');
    setSelectedProject(demoProject);
  };

  // Helper function to extract text from project for WordCounter
  const getProjectText = (project: any) => {
    if (!project || !project.capas) return '';
    
    let text = '';
    project.capas.forEach((capa: any) => {
      if (capa.beats) {
        capa.beats.forEach((beat: any) => {
          if (beat.contenido) {
            text += beat.contenido + ' ';
          }
        });
      }
    });
    return text;
  };

  const topbarActions = (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="text-gray-300 border-gray-600 hover:bg-gray-700"
        onClick={() => setCurrentView('export')}
      >
        <FileOutput className="w-4 h-4 mr-2" />
        Exportar
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="text-gray-300 border-gray-600 hover:bg-gray-700"
        onClick={() => setCurrentView('collaboration')}
      >
        <Users className="w-4 h-4 mr-2" />
        Colaborar
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="text-gray-300 border-gray-600 hover:bg-gray-700"
      >
        <Save className="w-4 h-4 mr-2" />
        Guardar
      </Button>
    </div>
  );

  const renderContent = () => {
    if (!selectedProject) {
  if (!selectedProject) {
      return (
        <div className="max-w-6xl mx-auto mt-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Bienvenido al Studio GUIONIX</h1>
            <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
              El lugar donde las ideas se convierten en guiones cinematográficos profesionales usando la metodología Blake Snyder
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 p-8 rounded-xl border border-yellow-500 shadow-xl">
              <div className="flex items-center mb-4">
                <Plus className="w-8 h-8 text-black mr-3" />
                <h3 className="text-2xl font-semibold text-black">Crear Nuevo Proyecto</h3>
              </div>
              <p className="text-black/80 mb-6 text-lg">
                Comienza un nuevo guión desde cero con nuestro sistema de beats estructurado y asistencia de IA
              </p>
              <Button 
                onClick={handleNewProject} 
                className="w-full bg-black hover:bg-gray-800 text-white text-lg py-3"
              >
                <Plus className="w-5 h-5 mr-2" />
                Nuevo Proyecto
              </Button>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 shadow-xl">
              <div className="flex items-center mb-4">
                <Download className="w-8 h-8 text-yellow-400 mr-3" />
                <h3 className="text-2xl font-semibold text-white">Importar Guión</h3>
              </div>
              <p className="text-gray-400 mb-6 text-lg">
                Sube un archivo existente en formato Final Draft, Fountain, PDF o Word
              </p>
              <Button 
                variant="outline" 
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 text-lg py-3"
              >
                <Download className="w-5 h-5 mr-2" />
                Importar Archivo
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Film className="w-6 h-6 text-black" />
                </div>
                <h4 className="text-lg font-semibold text-white">Editor Profesional</h4>
              </div>
              <p className="text-gray-400 text-center">
                Editor de beats con metodología Blake Snyder y herramientas profesionales de escritura
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-black" />
                </div>
                <h4 className="text-lg font-semibold text-white">Colaboración</h4>
              </div>
              <p className="text-gray-400 text-center">
                Trabajo en equipo en tiempo real con comentarios, chat y control de versiones
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FileOutput className="w-6 h-6 text-black" />
                </div>
                <h4 className="text-lg font-semibold text-white">Exportación</h4>
              </div>
              <p className="text-gray-400 text-center">
                Exporta tu guión a múltiples formatos: PDF, Final Draft, Fountain y más
              </p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white">Proyectos Recientes</h3>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-gray-300 border-gray-600"
              >
                Ver todos
              </Button>
            </div>
            <div className="space-y-4">
              <div 
                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer transition-all duration-200 border border-gray-600 hover:border-yellow-600"
                onClick={() => setSelectedProject(demoProject)}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-lg flex items-center justify-center mr-4">
                    <Film className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">{demoProject.titulo}</h4>
                    <p className="text-gray-400">{demoProject.subtitulo}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-500">{demoProject.genero}</span>
                      <span className="text-xs text-yellow-400">BORRADOR</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-400">Hace 2 horas</span>
                  </div>
                  <div className="text-sm text-gray-400">75% completado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    }

    switch (currentView) {
      case 'editor':
        return (
          <BeatEditor 
            beat={undefined}
            onSave={async (beat) => {
              console.log('Saving beat:', beat);
              // Aquí se implementaría la lógica para guardar el beat
            }}
            onAIGenerate={async (prompt) => {
              console.log('Generating AI content:', prompt);
              // Aquí se implementaría la lógica de IA
              return "Contenido generado por IA...";
            }}
            projectId={selectedProject.id}
          />
        );
      case 'structure':
        return (
          <CapaStructure 
            capas={selectedProject.capas || []}
            onCapaSelect={(capaId) => console.log('Selected capa:', capaId)}
            onBeatSelect={(beatId) => console.log('Selected beat:', beatId)}
            onCapaUpdate={async (capa) => console.log('Updating capa:', capa)}
            onBeatUpdate={async (beat) => console.log('Updating beat:', beat)}
            onCapaCreate={async (capa) => console.log('Creating capa:', capa)}
            onBeatCreate={async (beat, capaId) => console.log('Creating beat:', beat, capaId)}
          />
        );
      case 'collaboration':
        return <CollaborationPanel project={selectedProject} />;
      case 'export':
        return <ExportPanel project={selectedProject} />;
      default:
        return (
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">{selectedProject.titulo}</h1>
                  <p className="text-gray-400">{selectedProject.subtitulo}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Guardado</span>
                  </div>
                  <div className="text-gray-500">•</div>
                  <span>Última edición: hace 5 min</span>
                </div>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <ProgressTracker project={selectedProject} />
                <ValidationStatus project={selectedProject} />
              </div>
              <div className="space-y-6">
                <WordCounter 
                  text={getProjectText(selectedProject)}
                  title="Estadísticas del Proyecto"
                  targetWords={25000}
                />
                <AIGenerationPanel 
                  onGenerate={async (prompt, type) => {
                    console.log('Generating AI content:', prompt, type);
                    return "Contenido generado por IA...";
                  }}
                  projectContext={{
                    titulo: selectedProject.titulo,
                    genero: selectedProject.genero,
                    sinopsis: selectedProject.sinopsis,
                    personajes: []
                  }}
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <StudioLayout
      sidebar={<ProjectSelector selectedProject={selectedProject} onProjectSelect={setSelectedProject} onCreateNew={handleNewProject} />}
      topbar={selectedProject ? topbarActions : <div className="text-gray-300">Estudio de guiones</div>}
    >
      {selectedProject && (
        <div className="mb-6">
          <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
            <Button 
              variant={currentView === 'overview' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentView('overview')}
              className={`text-sm ${currentView === 'overview' ? 'bg-yellow-600 text-black' : 'text-gray-300 hover:bg-gray-700'}`}
            >
              Resumen
            </Button>
            <Button 
              variant={currentView === 'editor' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentView('editor')}
              className={`text-sm ${currentView === 'editor' ? 'bg-yellow-600 text-black' : 'text-gray-300 hover:bg-gray-700'}`}
            >
              Editor
            </Button>
            <Button 
              variant={currentView === 'structure' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentView('structure')}
              className={`text-sm ${currentView === 'structure' ? 'bg-yellow-600 text-black' : 'text-gray-300 hover:bg-gray-700'}`}
            >
              Estructura
            </Button>
            <Button 
              variant={currentView === 'collaboration' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentView('collaboration')}
              className={`text-sm ${currentView === 'collaboration' ? 'bg-yellow-600 text-black' : 'text-gray-300 hover:bg-gray-700'}`}
            >
              <Users className="w-4 h-4 mr-1" />
              Colaboración
            </Button>
            <Button 
              variant={currentView === 'export' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentView('export')}
              className={`text-sm ${currentView === 'export' ? 'bg-yellow-600 text-black' : 'text-gray-300 hover:bg-gray-700'}`}
            >
              <FileOutput className="w-4 h-4 mr-1" />
              Exportar
            </Button>
          </div>
        </div>
      )}
      {renderContent()}
    </StudioLayout>
  );
}