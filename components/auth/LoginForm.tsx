"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils"; // Si usas shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Film } from "lucide-react";
import Link from "next/link";

const schema = z.object({
  email: z.string().min(1, { message: "Email es requerido" }).email({ message: "Email inválido" }),
  password: z.string().min(1, { message: "Contraseña es requerida" }).min(6, { message: "Mínimo 6 caracteres" }),
  remember: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { 
      email: "",
      password: "",
      remember: false 
    },
    mode: "onSubmit", // Only validate on submit
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("🔐 Attempting login with:", data.email);
      console.log("🔐 NextAuth configuration check...");
      
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      
      console.log("🔐 Login response:", res);
      console.log("🔐 Response ok:", res?.ok);
      console.log("🔐 Response error:", res?.error);
      console.log("🔐 Response url:", res?.url);
      
      if (res?.error) {
        console.error("❌ Login error:", res.error);
        setError("Email o contraseña incorrectos");
      } else if (res?.ok) {
        console.log("✅ Login successful!");
        console.log("🔄 Waiting for session to update...");
        
        // Wait a moment for session to update
        setTimeout(async () => {
          console.log("🔄 Redirecting to dashboard...");
          // Force a hard redirect to ensure session is recognized
          window.location.href = "/";
        }, 100);
      } else {
        console.error("❌ Unexpected login response:", res);
        setError("Error inesperado al iniciar sesión");
      }
    } catch (error) {
      console.error("❌ Login exception:", error);
      setError("Error al iniciar sesión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md bg-gray-900 rounded-xl shadow-2xl p-8 space-y-6 border border-gray-800"
      aria-label="Formulario de inicio de sesión"
    >
      <div className="flex items-center justify-center mb-4">
        <Film className="w-8 h-8 text-yellow-400 mr-2" aria-hidden="true" />
        <h2 className="text-2xl font-bold text-white tracking-wide">Iniciar sesión</h2>
      </div>
        <div>
          <label htmlFor="email" className="block text-gray-300 mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
            disabled={loading}
            className={cn(
              "bg-gray-800 text-white border-gray-700 focus:border-yellow-400",
              errors.email && "border-red-500"
            )}
          />
          {errors.email && (
            <span id="email-error" className="text-red-400 text-xs">
              {errors.email.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-300 mb-1">
            Contraseña
          </label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register("password")}
            aria-invalid={!!errors.password}
            aria-describedby="password-error"
            disabled={loading}
            className={cn(
              "bg-gray-800 text-white border-gray-700 focus:border-yellow-400",
              errors.password && "border-red-500"
            )}
          />
          {errors.password && (
            <span id="password-error" className="text-red-400 text-xs">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" {...register("remember")} disabled={loading} />
            <label htmlFor="remember" className="text-gray-400 text-sm">
              Recordarme
            </label>
          </div>
          <Link
            href="/forgot-password"
            className="text-yellow-400 text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        {error && (
          <div className="bg-red-900 text-red-300 rounded p-2 text-center text-sm">{error}</div>
        )}
        <Button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded transition-all duration-200 flex items-center justify-center"
          disabled={loading || isSubmitting}
          aria-busy={loading || isSubmitting}
        >
          {(loading || isSubmitting) ? <Loader2 className="animate-spin mr-2" /> : null}
          {(loading || isSubmitting) ? "Ingresando..." : "Ingresar"}
        </Button>
        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-700" />
          <span className="mx-2 text-gray-400">o</span>
          <hr className="flex-1 border-gray-700" />
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center border border-gray-700 bg-gray-800 text-white hover:bg-gray-700 transition-all"
          onClick={() => signIn("google")}
          disabled={loading}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48" aria-hidden="true">
            <path
              fill="#FFC107"
              d="M43.6 20.5h-1.9V20H24v8.1h11.3c-1.6 4.3-5.7 7.4-11.3 7.4-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 3.1l6.1-6.1C35.3 5.1 29.9 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 20-9 20-20 0-1.3-.1-2.7-.4-4z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.3 16.1 18.8 13 24 13c3.1 0 5.9 1.1 8.1 3.1l6.1-6.1C35.3 5.1 29.9 3 24 3c-7.1 0-13.1 3.7-16.7 9.3z"
            />
            <path
              fill="#4CAF50"
              d="M24 43c5.4 0 10.1-1.8 13.5-4.9l-6.2-5.1c-1.7 1.1-3.9 1.7-7.3 1.7-5.6 0-10.3-3.7-12-8.7l-6.6 5.1C7.9 39.3 15.3 43 24 43z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5h-1.9V20H24v8.1h11.3c-0.7 2-2.1 3.7-4.1 4.9l6.2 5.1C41.1 36.3 44 30.3 44 23c0-1.3-.1-2.7-.4-4z"
            />
          </svg>
          Ingresar con Google
        </Button>
    </form>
  );
}