// app/page.tsx - Root page that redirects based on authentication
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { Film, Play, Users, FileText } from "lucide-react";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  
  // If user is authenticated, redirect to dashboard
  if (session) {
    redirect("/dashboard");
  }

  // If not authenticated, show landing page
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none select-none opacity-10"
          style={{
            backgroundImage:
              "url('/cinema-bg.svg'), repeating-linear-gradient(135deg, #222 0px, #222 2px, transparent 2px, transparent 40px)",
            backgroundRepeat: "no-repeat, repeat",
            backgroundPosition: "center, center",
            backgroundSize: "cover, auto",
          }}
        />
        
        <div className="relative z-10 px-6 py-24 mx-auto max-w-7xl">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <Film className="w-16 h-16 text-yellow-400 animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              GUIONIX
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Plataforma profesional para guionistas y equipos creativos.
              Crea, edita y produce guiones de cine y TV con IA avanzada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Iniciar Sesión
              </Link>
              <Link
                href="/register"
                className="border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                <Users className="w-5 h-5 mr-2" />
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            Herramientas Profesionales para Guionistas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800">
              <FileText className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Editor Colaborativo</h3>
              <p className="text-gray-400">
                Escribe y edita guiones en tiempo real con tu equipo. Control de versiones y bloqueos inteligentes.
              </p>
            </div>
            
            <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800">
              <Film className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Studio Profesional</h3>
              <p className="text-gray-400">
                Organiza tus proyectos con estructura de capas, minutos y beats. Validación Blake Snyder incluida.
              </p>
            </div>
            
            <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800">
              <Users className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Gestión de Equipos</h3>
              <p className="text-gray-400">
                Administra roles, permisos y colaboradores. Sistema completo de autenticación y autorización.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Film className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} GUIONIX. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
