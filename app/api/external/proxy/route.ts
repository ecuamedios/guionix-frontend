// app/api/external/proxy/route.ts (AVANZADO)
// filepath: app/api/external/proxy/route.ts
import { NextRequest, NextResponse } from "next/server";

// Configura aquí la URL base de Railway u otro servicio externo
const RAILWAY_API_BASE = process.env.RAILWAY_API_BASE || "https://your-railway-api-url.com";

export async function POST(req: NextRequest) {
  try {
    const { path, method = "POST", body, headers = {} } = await req.json();

    // Seguridad: solo permite rutas específicas si lo deseas
    if (!path || typeof path !== "string") {
      return NextResponse.json({ error: "Ruta externa requerida" }, { status: 400 });
    }

    const url = `${RAILWAY_API_BASE}${path.startsWith("/") ? path : "/" + path}`;

    const proxyRes = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const contentType = proxyRes.headers.get("content-type");
    const data = contentType?.includes("application/json")
      ? await proxyRes.json()
      : await proxyRes.text();

    return NextResponse.json({ data, status: proxyRes.status });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Error en proxy externo" }, { status: 500 });
  }
}