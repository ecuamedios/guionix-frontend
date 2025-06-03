import { Film } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-gray-900 to-gray-800 relative">
      {/* Film/cinema themed background */}
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
      {/* Branding */}
      <header className="z-10 flex flex-col items-center mb-8 mt-8">
        <Film className="w-12 h-12 text-yellow-400 mb-2 animate-pulse" aria-hidden="true" />
        <h1 className="text-3xl font-bold text-white tracking-wide drop-shadow-lg">GUIONIX</h1>
        <p className="text-gray-400 mt-2 text-center max-w-md">
          Plataforma profesional para guionistas y equipos creativos.
        </p>
      </header>
      {/* Auth Form */}
      <main className="z-10 w-full max-w-md flex-1 flex flex-col justify-center items-center">
        {children}
      </main>
      {/* Footer */}
      <footer className="z-10 w-full max-w-md mx-auto py-6 text-center text-gray-500 text-xs mt-8">
        <div className="flex justify-center gap-4 mb-2">
          <Link href="/terms" className="hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400">Términos</Link>
          <Link href="/privacy" className="hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400">Privacidad</Link>
          <Link href="mailto:soporte@guionix.com" className="hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400">Soporte</Link>
        </div>
        <span>
          &copy; {new Date().getFullYear()} GUIONIX. Todos los derechos reservados.
        </span>
      </footer>
      {/* Loading animation overlay (optional, controlled by parent if needed) */}
      {/* <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
        <Loader2 className="w-10 h-10 text-yellow-400 animate-spin" />
      </div> */}
    </div>
  );
}