"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Film, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

const schema = z.object({
  email: z.string().email({ message: "Email inválido" }),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSucess] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      });

      if (response.ok) {
        setSucess(true);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al procesar la solicitud');
      }
    } catch (err) {
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-2xl p-8 space-y-6 border border-gray-800">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="w-12 h-12 text-green-400 mb-4" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-4">
            ¡Correo enviado!
          </h2>
          <p className="text-gray-300 mb-6">
            Hemos enviado un enlace para restablecer tu contraseña a tu correo electrónico.
            Revisa tu bandeja de entrada y spam.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center text-yellow-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-2xl p-8 space-y-6 border border-gray-800">
      <div className="flex items-center justify-center mb-4">
        <Film className="w-8 h-8 text-yellow-400 mr-2" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-white tracking-wide">GUIONIX</h1>
      </div>
      
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">
          Recuperar contraseña
        </h2>
        <p className="text-gray-400 text-sm">
          Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-gray-300 mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="tu@email.com"
            {...register("email")}
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
            disabled={loading}
            className="bg-gray-800 text-white border-gray-700 focus:border-yellow-400"
          />
          {errors.email && (
            <span id="email-error" className="text-red-400 text-xs mt-1 block">
              {errors.email.message}
            </span>
          )}
        </div>

        {error && (
          <div className="bg-red-900 text-red-300 rounded p-3 text-center text-sm">
            {error}
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded transition-all duration-200 flex items-center justify-center"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2 w-4 h-4" />
              Enviando...
            </>
          ) : (
            "Enviar enlace de recuperación"
          )}
        </Button>

        <div className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center text-gray-400 hover:text-yellow-400 text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver al inicio de sesión
          </Link>
        </div>
      </form>
    </div>
  );
}
