"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Una vez que confirmamos la autenticación, redirigir al dashboard
  useEffect(() => {
    if (status === "authenticated" && session) {
      // Redirigir al dashboard principal que tiene toda la funcionalidad
      router.replace("/dashboard");
    } else if (status === "unauthenticated") {
      // Si no está autenticado, el middleware lo redirigirá a /login
      router.replace("/login");
    }
  }, [status, session, router]);

  // Mientras verificamos el estado de autenticación, mostrar loading
  return (
    <div className="min-h-screen bg-[#17202a] flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#cb4335]"></div>
    </div>
  );
}
