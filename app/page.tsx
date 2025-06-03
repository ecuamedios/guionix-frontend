"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LandingPage from "../components/landing/LandingPage";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Si hay sesión, redirigir al dashboard
  useEffect(() => {
    if (status === "authenticated" && session) {
      router.push("/projects");
    }
  }, [status, session, router]);

  // Si está cargando, mostrar loading
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#17202a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#cb4335]"></div>
      </div>
    );
  }

  // Si hay sesión, mostrar loading mientras redirige
  if (status === "authenticated" && session) {
    return (
      <div className="min-h-screen bg-[#17202a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#cb4335]"></div>
      </div>
    );
  }

  // Si no hay sesión, mostrar landing page
  return <LandingPage />;
}
