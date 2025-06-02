"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronDown, Plus } from "lucide-react";

interface Beat {
  id: string;
  nombre: string;
  contenido?: string;
  duracionEstimada?: number;
}

interface Capa {
  id: string;
  nombre: string;
  descripcion?: string;
  beats: Beat[];
}

interface CapaStructureProps {
  projectId?: string;
  capas?: Capa[];
  onCapaSelect?: (capaId: string) => void;
  onBeatSelect?: (beatId: string) => void;
}

export default function CapaStructure({ 
  capas = [], 
  onCapaSelect, 
  onBeatSelect 
}: CapaStructureProps) {
  const [expandedCapas, setExpandedCapas] = useState<Set<string>>(new Set());

  const toggleCapa = (capaId: string) => {
    const newExpanded = new Set(expandedCapas);
    if (newExpanded.has(capaId)) {
      newExpanded.delete(capaId);
    } else {
      newExpanded.add(capaId);
    }
    setExpandedCapas(newExpanded);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Estructura de Capas
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Capa
          </Button>
        </CardTitle>
        <CardDescription>
          Organiza tu guión en capas y beats
        </CardDescription>
      </CardHeader>
      <CardContent>
        {capas.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No hay capas creadas aún.</p>
            <p className="text-sm mt-2">Comienza creando tu primera capa.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {capas.map((capa) => (
              <div key={capa.id} className="border rounded-lg">
                <div
                  className="flex items-center justify-between p-3 cursor-pointer hover:bg-accent"
                  onClick={() => toggleCapa(capa.id)}
                >
                  <div className="flex items-center gap-2">
                    {expandedCapas.has(capa.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    <span className="font-medium">{capa.nombre}</span>
                    <Badge variant="secondary" className="text-xs">
                      {capa.beats.length} beats
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCapaSelect?.(capa.id);
                    }}
                  >
                    Editar
                  </Button>
                </div>
                
                {expandedCapas.has(capa.id) && (
                  <div className="border-t bg-muted/50">
                    {capa.beats.length === 0 ? (
                      <div className="p-4 text-center text-sm text-muted-foreground">
                        No hay beats en esta capa
                      </div>
                    ) : (
                      <div className="p-2 space-y-1">
                        {capa.beats.map((beat) => (
                          <div
                            key={beat.id}
                            className="flex items-center justify-between p-2 rounded hover:bg-background cursor-pointer"
                            onClick={() => onBeatSelect?.(beat.id)}
                          >
                            <div>
                              <span className="text-sm font-medium">{beat.nombre}</span>
                              {beat.duracionEstimada && (
                                <span className="text-xs text-muted-foreground ml-2">
                                  {beat.duracionEstimada}min
                                </span>
                              )}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {beat.contenido ? 'Completo' : 'Pendiente'}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}