// app/api/studio/ai/generate/route.ts (AVANZADO)
// filepath: app/api/studio/ai/generate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { aiService } from "@/lib/services/aiService";
import { getToken } from "next-auth/jwt";
import { z } from "zod";

const aiSchema = z.object({
  prompt: z.string().min(5),
  model: z.enum(["gpt-4", "gpt-3.5", "claude", "xai"]).default("gpt-4"),
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().min(16).max(2048).optional(),
  projectId: z.string().optional(),
  context: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let data;
  try {
    data = aiSchema.parse(await req.json());
  } catch (err: unknown) {
    const error = err as { errors?: Array<{ message?: string }> };
    return NextResponse.json({ error: error.errors?.[0]?.message || "Datos inválidos" }, { status: 400 });
  }

  try {
    const aiResult = await aiService.generateContent({
      ...data,
      userId: token.id,
    });
    return NextResponse.json(aiResult);
  } catch (e: unknown) {
    const error = e as { message?: string };
    return NextResponse.json({ error: error.message || "Error IA" }, { status: 500 });
  }
}