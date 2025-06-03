import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import Link from "next/link";
import { Film } from "lucide-react";

export const metadata = {
  title: "Recuperar contraseña | GUIONIX",
  description: "Recupera tu contraseña de GUIONIX para volver a acceder a tu cuenta.",
  robots: "index, follow",
  openGraph: {
    title: "Recuperar contraseña | GUIONIX",
    description: "Restablece tu contraseña para acceder a GUIONIX.",
    url: "https://guionix.com/forgot-password",
    siteName: "GUIONIX",
    type: "website",
  },
};

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      <div className="flex flex-col items-center mb-8">
        <Film className="w-12 h-12 text-yellow-400 mb-2" aria-hidden="true" />
        <h1 className="text-3xl font-bold text-white tracking-wide">GUIONIX</h1>
        <p className="text-gray-400 mt-2 text-center max-w-md">
          Recupera el acceso a tu cuenta
        </p>
      </div>
      <section className="w-full max-w-md">
        <ForgotPasswordForm />
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
