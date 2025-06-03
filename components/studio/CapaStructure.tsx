"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronRight, ChevronDown, Plus, Edit, Trash2, Clock, FileText, Target, Users } from "lucide-react";

interface Beat {
  id: string;
  nombre: string;
  titulo: string;
  contenido?: string;
  tipo?: 'ESCENA' | 'SECUENCIA' | 'MONTAJE' | 'TRANSICION';
  blakeSnyderBeat?: string;
  duracionEstimada?: number;
  personajes?: string[];
  locacion?: string;
  momentoDia?: 'AMANECER' | 'DIA' | 'ATARDECER' | 'NOCHE';
  objetivoPersonaje?: string;
  obstaculo?: string;
  conflicto?: string;
  pagina?: number;
}

interface Capa {
  id: string;
  numero: number;
  titulo: string;
  descripcion?: string;
  tipo: 'SETUP' | 'CONFRONTATION' | 'RESOLUTION';
  blakeSnyderBeat: string;
  paginaInicio: number;
  paginaFin: number;
  beats: Beat[];
}

interface CapaStructureProps {
  projectId?: string;
  capas?: Capa[];
  onCapaSelect?: (capaId: string) => void;
  onBeatSelect?: (beatId: string) => void;
  onCapaUpdate?: (capa: Capa) => Promise<void>;
  onBeatUpdate?: (beat: Beat) => Promise<void>;
  onCapaCreate?: (capa: Partial<Capa>) => Promise<void>;
  onBeatCreate?: (beat: Partial<Beat>, capaId: string) => Promise<void>;
}

const blakeSnyderActs = {
  'SETUP': ['Opening Image', 'Theme Stated', 'Set-Up', 'Catalyst', 'Debate'],
  'CONFRONTATION': ['Break into Two', 'B Story', 'Fun and Games', 'Midpoint', 'Bad Guys Close In'],
  'RESOLUTION': ['All Is Lost', 'Dark Night of the Soul', 'Break into Three', 'Finale', 'Final Image']
};

export default function CapaStructure({ 
  capas = [], 
  onCapaSelect, 
  onBeatSelect,
  onCapaUpdate,
  onBeatUpdate,
  onCapaCreate,
  onBeatCreate
}: CapaStructureProps) {
  const [expandedCapas, setExpandedCapas] = useState<Set<string>>(new Set());
  const [editingCapa, setEditingCapa] = useState<Capa | null>(null);
  const [editingBeat, setEditingBeat] = useState<Beat | null>(null);
  const [isCreatingCapa, setIsCreatingCapa] = useState(false);
  const [isCreatingBeat, setIsCreatingBeat] = useState<string | null>(null);

  const [newCapa, setNewCapa] = useState<Partial<Capa>>({
    numero: capas.length + 1,
    titulo: '',
    descripcion: '',
    tipo: 'SETUP',
    blakeSnyderBeat: 'Opening Image',
    paginaInicio: 1,
    paginaFin: 25,
    beats: []
  });

  const [newBeat, setNewBeat] = useState<Partial<Beat>>({
    nombre: '',
    titulo: '',
    contenido: '',
    tipo: 'ESCENA',
    blakeSnyderBeat: 'Opening Image',
    duracionEstimada: 5,
    personajes: [],
    locacion: '',
    momentoDia: 'DIA',
    pagina: 1
  });

  const toggleCapa = (capaId: string) => {
    const newExpanded = new Set(expandedCapas);
    if (newExpanded.has(capaId)) {
      newExpanded.delete(capaId);
    } else {
      newExpanded.add(capaId);
    }
    setExpandedCapas(newExpanded);
  };

  const handleCreateCapa = async () => {
    if (onCapaCreate && newCapa.titulo) {
      await onCapaCreate(newCapa);
      setIsCreatingCapa(false);
      setNewCapa({
        numero: capas.length + 2,
        titulo: '',
        descripcion: '',
        tipo: 'SETUP',
        blakeSnyderBeat: 'Opening Image',
        paginaInicio: 1,
        paginaFin: 25,
        beats: []
      });
    }
  };

  const handleCreateBeat = async (capaId: string) => {
    if (onBeatCreate && newBeat.nombre) {
      await onBeatCreate(newBeat, capaId);
      setIsCreatingBeat(null);
      setNewBeat({
        nombre: '',
        titulo: '',
        contenido: '',
        tipo: 'ESCENA',
        blakeSnyderBeat: 'Opening Image',
        duracionEstimada: 5,
        personajes: [],
        locacion: '',
        momentoDia: 'DIA',
        pagina: 1
      });
    }
  };

  const getTotalDuration = (beats: Beat[]) => {
    return beats.reduce((total, beat) => total + (beat.duracionEstimada || 0), 0);
  };

  const getProgressPercentage = (capa: Capa) => {
    const totalBeats = capa.beats.length;
    const completedBeats = capa.beats.filter(beat => beat.contenido && beat.contenido.length > 50).length;
    return totalBeats > 0 ? (completedBeats / totalBeats) * 100 : 0;
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <span className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Estructura de Capas
          </span>
          <Dialog open={isCreatingCapa} onOpenChange={setIsCreatingCapa}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                <Plus className="w-4 h-4 mr-2" />
                Nueva Capa
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700 text-white">
              <DialogHeader>
                <DialogTitle>Crear Nueva Capa</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Define una nueva capa en la estructura de tu guión
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Número</label>
                    <Input
                      type="number"
                      value={newCapa.numero}
                      onChange={e => setNewCapa(prev => ({ ...prev, numero: parseInt(e.target.value) }))}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Tipo</label>
                    <Select value={newCapa.tipo} onValueChange={(value: any) => setNewCapa(prev => ({ ...prev, tipo: value }))}>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="SETUP">Setup (Acto I)</SelectItem>
                        <SelectItem value="CONFRONTATION">Confrontación (Acto II)</SelectItem>
                        <SelectItem value="RESOLUTION">Resolución (Acto III)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Título</label>
                  <Input
                    value={newCapa.titulo}
                    onChange={e => setNewCapa(prev => ({ ...prev, titulo: e.target.value }))}
                    placeholder="Ej: Acto I - Presentación del protagonista"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Descripción</label>
                  <Textarea
                    value={newCapa.descripcion}
                    onChange={e => setNewCapa(prev => ({ ...prev, descripcion: e.target.value }))}
                    placeholder="Describe el propósito y contenido de esta capa"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Página Inicio</label>
                    <Input
                      type="number"
                      value={newCapa.paginaInicio}
                      onChange={e => setNewCapa(prev => ({ ...prev, paginaInicio: parseInt(e.target.value) }))}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Página Fin</label>
                    <Input
                      type="number"
                      value={newCapa.paginaFin}
                      onChange={e => setNewCapa(prev => ({ ...prev, paginaFin: parseInt(e.target.value) }))}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreatingCapa(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateCapa} className="bg-yellow-600 hover:bg-yellow-700">
                    Crear Capa
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
        <CardDescription className="text-gray-400">
          Organiza tu guión en capas siguiendo la metodología de Blake Snyder
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {capas.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No hay capas creadas aún</p>
            <p className="text-sm">Comienza creando tu primera capa</p>
          </div>
        ) : (
          capas.map((capa) => (
            <div key={capa.id} className="border border-gray-700 rounded-lg bg-gray-800">
              <div
                className="p-4 cursor-pointer hover:bg-gray-750 transition-colors"
                onClick={() => toggleCapa(capa.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {expandedCapas.has(capa.id) ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                    <div>
                      <h3 className="font-semibold text-white">{capa.titulo}</h3>
                      <p className="text-sm text-gray-400">{capa.descripcion}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                      {capa.tipo}
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                      <Clock className="w-3 h-3 mr-1" />
                      {getTotalDuration(capa.beats)}min
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                      Pág. {capa.paginaInicio}-{capa.paginaFin}
                    </Badge>
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getProgressPercentage(capa)}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-10">
                      {Math.round(getProgressPercentage(capa))}%
                    </span>
                  </div>
                </div>
              </div>

              {expandedCapas.has(capa.id) && (
                <div className="border-t border-gray-700 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-300">Beats ({capa.beats.length})</h4>
                    <Dialog open={isCreatingBeat === capa.id} onOpenChange={(open) => setIsCreatingBeat(open ? capa.id : null)}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                          <Plus className="w-3 h-3 mr-1" />
                          Nuevo Beat
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 border-gray-700 text-white">
                        <DialogHeader>
                          <DialogTitle>Crear Nuevo Beat</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Añade un nuevo beat a la capa "{capa.titulo}"
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-300 mb-2 block">Nombre del Beat</label>
                            <Input
                              value={newBeat.nombre}
                              onChange={e => setNewBeat(prev => ({ ...prev, nombre: e.target.value }))}
                              placeholder="Ej: Incidente incitante"
                              className="bg-gray-800 border-gray-700"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-300 mb-2 block">Título</label>
                            <Input
                              value={newBeat.titulo}
                              onChange={e => setNewBeat(prev => ({ ...prev, titulo: e.target.value }))}
                              placeholder="Ej: John descubre la traición"
                              className="bg-gray-800 border-gray-700"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-gray-300 mb-2 block">Tipo</label>
                              <Select value={newBeat.tipo} onValueChange={(value: any) => setNewBeat(prev => ({ ...prev, tipo: value }))}>
                                <SelectTrigger className="bg-gray-800 border-gray-700">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700">
                                  <SelectItem value="ESCENA">Escena</SelectItem>
                                  <SelectItem value="SECUENCIA">Secuencia</SelectItem>
                                  <SelectItem value="MONTAJE">Montaje</SelectItem>
                                  <SelectItem value="TRANSICION">Transición</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-300 mb-2 block">Duración (min)</label>
                              <Input
                                type="number"
                                value={newBeat.duracionEstimada}
                                onChange={e => setNewBeat(prev => ({ ...prev, duracionEstimada: parseInt(e.target.value) }))}
                                className="bg-gray-800 border-gray-700"
                                min="1"
                                max="30"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsCreatingBeat(null)}>
                              Cancelar
                            </Button>
                            <Button onClick={() => handleCreateBeat(capa.id)} className="bg-yellow-600 hover:bg-yellow-700">
                              Crear Beat
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  {capa.beats.length === 0 ? (
                    <div className="text-center py-6 text-gray-500">
                      <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No hay beats en esta capa</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {capa.beats.map((beat, index) => (
                        <div
                          key={beat.id}
                          className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer transition-colors"
                          onClick={() => onBeatSelect?.(beat.id)}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-400 w-6">{index + 1}</span>
                            <div>
                              <p className="font-medium text-white">{beat.titulo || beat.nombre}</p>
                              <p className="text-sm text-gray-400">{beat.blakeSnyderBeat}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {beat.personajes && beat.personajes.length > 0 && (
                              <Badge variant="outline" className="border-gray-600 text-gray-400">
                                <Users className="w-3 h-3 mr-1" />
                                {beat.personajes.length}
                              </Badge>
                            )}
                            <Badge variant="outline" className="border-gray-600 text-gray-400">
                              <Clock className="w-3 h-3 mr-1" />
                              {beat.duracionEstimada}min
                            </Badge>
                            <Badge variant="outline" className="border-gray-600 text-gray-400">
                              {beat.tipo}
                            </Badge>
                            {beat.contenido && beat.contenido.length > 50 ? (
                              <div className="w-2 h-2 bg-green-500 rounded-full" title="Completado" />
                            ) : (
                              <div className="w-2 h-2 bg-gray-500 rounded-full" title="En progreso" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}