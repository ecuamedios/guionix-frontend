"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Film, CheckCircle, ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const schema = z.object({
  password: z.string().min(8, { message: "Mínimo 8 caracteres" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          token,
          password: data.password 
        }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al restablecer la contraseña');
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
            ¡Contraseña actualizada!
          </h2>
          <p className="text-gray-300 mb-6">
            Tu contraseña ha sido restablecida exitosamente. 
            Ahora puedes iniciar sesión con tu nueva contraseña.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center text-yellow-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Ir al inicio de sesión
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
          Nueva contraseña
        </h2>
        <p className="text-gray-400 text-sm">
          Ingresa tu nueva contraseña segura
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="password" className="block text-gray-300 mb-1">
            Nueva contraseña
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••"
              {...register("password")}
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
              disabled={loading}
              className="bg-gray-800 text-white border-gray-700 focus:border-yellow-400 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <span id="password-error" className="text-red-400 text-xs mt-1 block">
              {errors.password.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-gray-300 mb-1">
            Confirmar contraseña
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••"
              {...register("confirmPassword")}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby="confirmPassword-error"
              disabled={loading}
              className="bg-gray-800 text-white border-gray-700 focus:border-yellow-400 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <span id="confirmPassword-error" className="text-red-400 text-xs mt-1 block">
              {errors.confirmPassword.message}
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
              Actualizando...
            </>
          ) : (
            "Restablecer contraseña"
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
