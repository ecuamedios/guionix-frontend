// app/api/test/route.ts - API test endpoint
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Test database connection
    const userCount = await prisma.user.count();
    const projectCount = await prisma.pelicula.count();
    
    // Get sample data
    const users = await prisma.user.findMany({
      take: 3,
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    const projects = await prisma.pelicula.findMany({
      take: 3,
      select: {
        id: true,
        titulo: true,
        status: true,
        createdAt: true,
        owner: {
          select: {
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      database: {
        connected: true,
        userCount,
        projectCount,
      },
      samples: {
        users,
        projects,
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        nextauthUrl: process.env.NEXTAUTH_URL,
        hasOpenAI: !!process.env.OPENAI_API_KEY,
        hasGoogleOAuth: !!process.env.GOOGLE_CLIENT_ID,
      },
    });
  } catch (error: unknown) {
    console.error("API Test Error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
