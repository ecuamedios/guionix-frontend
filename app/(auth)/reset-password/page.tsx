import type { Metadata } from "next";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import Link from "next/link";
import { Film } from "lucide-react";

export const metadata: Metadata = {
  title: "Restablecer contraseña | GUIONIX",
  description: "Establece una nueva contraseña para tu cuenta de GUIONIX.",
  robots: "noindex, nofollow",
};

interface ResetPasswordPageProps {
  searchParams: { token?: string };
}

export default function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { token } = searchParams;

  if (!token) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
        <div className="flex flex-col items-center mb-8">
          <Film className="w-12 h-12 text-yellow-400 mb-2" aria-hidden="true" />
          <h1 className="text-3xl font-bold text-white tracking-wide">GUIONIX</h1>
        </div>
        <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-2xl p-8 space-y-6 border border-gray-800">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-4">
              Token inválido
            </h2>
            <p className="text-gray-400 mb-6">
              El enlace de restablecimiento de contraseña no es válido o ha expirado.
            </p>
            <Link
              href="/forgot-password"
              className="text-yellow-400 hover:underline font-medium"
            >
              Solicitar nuevo enlace
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      <div className="flex flex-col items-center mb-8">
        <Film className="w-12 h-12 text-yellow-400 mb-2" aria-hidden="true" />
        <h1 className="text-3xl font-bold text-white tracking-wide">GUIONIX</h1>
        <p className="text-gray-400 mt-2 text-center max-w-md">
          Establece tu nueva contraseña
        </p>
      </div>
      <section className="w-full max-w-md">
        <ResetPasswordForm token={token} />
        <div className="mt-6 text-center text-gray-400 text-sm">
          ¿Recordaste tu contraseña?{" "}
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
