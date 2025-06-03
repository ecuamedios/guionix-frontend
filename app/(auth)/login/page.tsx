import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";
import { Film } from "lucide-react";

export const metadata = {
  title: "Iniciar sesión | GUIONIX",
  description: "Accede a GUIONIX para crear y gestionar tus guiones de cine y TV con IA.",
  robots: "index, follow",
  openGraph: {
    title: "Iniciar sesión | GUIONIX",
    description: "Plataforma profesional para guionistas y equipos creativos.",
    url: "https://guionix.com/login",
    siteName: "GUIONIX",
    type: "website",
  },
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      <div className="flex flex-col items-center mb-8">
        <Film className="w-12 h-12 text-yellow-400 mb-2" aria-hidden="true" />
        <h1 className="text-3xl font-bold text-white tracking-wide">GUIONIX</h1>
        <p className="text-gray-400 mt-2 text-center max-w-md">
          Plataforma profesional para guionistas y equipos creativos.
        </p>
      </div>
      <section className="w-full max-w-md">
        <LoginForm />
        <div className="mt-6 text-center text-gray-400 text-sm">
          ¿No tienes cuenta?{" "}
          <Link
            href="/register"
            className="text-yellow-400 hover:underline font-medium"
          >
            Regístrate aquí
          </Link>
        </div>
      </section>
    </main>
  );
}