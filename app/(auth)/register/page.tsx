// app/(auth)/register/page.tsx
import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";
import { Film } from "lucide-react";

export const metadata: Metadata = {
  title: "Registro | GUIONIX",
  description: "Crea tu cuenta en GUIONIX para comenzar a escribir guiones profesionales con IA.",
  robots: "index, follow",
  openGraph: {
    title: "Registro | GUIONIX", 
    description: "Únete a la plataforma profesional para guionistas y equipos creativos.",
    url: "https://guionix.com/register",
    siteName: "GUIONIX",
    type: "website",
  },
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      <div className="flex flex-col items-center mb-8">
        <Film className="w-12 h-12 text-yellow-400 mb-2" aria-hidden="true" />
        <h1 className="text-3xl font-bold text-white tracking-wide">GUIONIX</h1>
        <p className="text-gray-400 mt-2 text-center max-w-md">
          Únete a la plataforma profesional para guionistas y equipos creativos.
        </p>
      </div>
      <section className="w-full max-w-md">
        <RegisterForm />
        <div className="mt-6 text-center text-gray-400 text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/login"
            className="text-yellow-400 hover:underline font-medium"
          >
            Inicia sesión aquí
          </Link>
        </div>
      </section>
    </main>
  );
}