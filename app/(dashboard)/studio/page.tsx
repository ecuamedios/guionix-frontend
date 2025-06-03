"use client";
import { Suspense } from "react";
import StudioUnified from "@/components/studio/StudioUnified";
import { Loader2 } from "lucide-react";

function StudioLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-white mx-auto mb-4" />
        <p className="text-white/70">Cargando GUIONIX Studio...</p>
      </div>
    </div>
  );
}

export default function StudioPage() {
  return (
    <Suspense fallback={<StudioLoading />}>
      <StudioUnified />
    </Suspense>
  );
}