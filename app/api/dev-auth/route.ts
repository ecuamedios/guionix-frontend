// app/api/dev-auth/route.ts - Development authentication (remove in production)
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  }

  try {
    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.status !== "ACTIVE") {
      return NextResponse.json({ error: "User not active" }, { status: 403 });
    }

    // Create a simple session token (not secure - only for development)
    const sessionData = {
      userId: user.id,
      email: user.email,
      role: user.role,
      timestamp: Date.now(),
    };

    const token = Buffer.from(JSON.stringify(sessionData)).toString('base64');

    // Set cookie
    const cookieStore = cookies();
    cookieStore.set('dev-session', token, {
      httpOnly: true,
      secure: false, // Development only
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        role: user.role,
      },
    });

  } catch (error: any) {
    console.error("Dev Auth Error:", error);
    return NextResponse.json({
      error: "Authentication failed",
      details: error.message,
    }, { status: 500 });
  }
}
