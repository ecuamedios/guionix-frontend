import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

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
    <>
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
    </>
  );
}