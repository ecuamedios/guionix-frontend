import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/studio/validation/word-count - Validate word count for script
export async function POST(request: NextRequest) {
  try {
    const { projectId, targetWordCount } = await request.json();
    
    if (!projectId) {
      return NextResponse.json({ error: "Project ID required" }, { status: 400 });
    }

    const project = await prisma.pelicula.findUnique({
      where: { id: projectId },
      include: {
        capas: {
          include: {
            minutos: {
              include: {
                beats: true,
              },
            },
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Calculate word count
    let totalWords = 0;
    let totalCharacters = 0;
    let totalBeats = 0;
    
    project.capas.forEach((capa) => {
      capa.minutos.forEach((minuto) => {
        minuto.beats.forEach((beat) => {
          totalBeats++;
          if (beat.contenido) {
            const words = beat.contenido.trim().split(/\s+/).filter((word: string) => word.length > 0);
            totalWords += words.length;
            totalCharacters += beat.contenido.length;
          }
        });
      });
    });

    const validation = {
      totalWords,
      totalCharacters,
      totalBeats,
      totalCapas: project.capas.length,
      targetWordCount: targetWordCount || 25000, // Default feature film target
      percentage: targetWordCount ? (totalWords / targetWordCount) * 100 : 0,
      status: targetWordCount ? 
        (totalWords >= targetWordCount * 0.9 ? 'complete' : 
         totalWords >= targetWordCount * 0.5 ? 'in-progress' : 'starting') : 'unknown',
    };

    return NextResponse.json(validation);
  } catch (error) {
    console.error("Error validating word count:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}