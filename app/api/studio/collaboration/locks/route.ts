// app/api/studio/collaboration/locks/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const resourceId = searchParams.get("resourceId");
  
  if (!resourceId) {
    return NextResponse.json({ error: "resourceId requerido" }, { status: 400 });
  }

  // TODO: Implement when collaboration models are ready
  return NextResponse.json({ locks: [], message: "Collaboration locks not implemented yet" });
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // TODO: Implement when collaboration models are ready
  return NextResponse.json({ message: "Collaboration locks not implemented yet" });
}

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // TODO: Implement when collaboration models are ready
  return NextResponse.json({ message: "Lock liberado" });
}