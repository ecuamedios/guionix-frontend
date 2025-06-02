"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const passwordStrength = (password: string) => {
  if (password.length < 6) return "Débil";
  if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.length >= 8) return "Fuerte";
  return "Media";
};

const schema = z.object({
  firstName: z.string().min(2, "Nombre requerido"),
  lastName: z.string().min(2, "Apellido requerido"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  confirmPassword: z.string().min(6, "Confirma tu contraseña"),
  role: z.enum(["SUPER_ADMIN", "DIRECTOR", "SUPERVISOR", "EDITOR", "VIEWER"], {
    required_error: "Selecciona un rol",
  }),
  terms: z.literal(true, { errorMap: () => ({ message: "Debes aceptar los términos" }) }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: "EDITOR", terms: false },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const password = watch("password");

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.message || "Error al registrar usuario");
      } else {
        setSuccess(true);
      }
    } catch (e) {
      setError("Error de red o servidor");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-gray-900 rounded-xl shadow-2xl p-8 space-y-6 border border-gray-800"
        aria-label="Formulario de registro"
      >
        <div className="flex items-center justify-center mb-4">
          <UserPlus className="w-8 h-8 text-yellow-400 mr-2" aria-hidden="true" />
          <h1 className="text-2xl font-bold text-white tracking-wide">Registro GUIONIX</h1>
        </div>
        <div className="flex gap-2">
          <div className="w-1/2">
            <label htmlFor="firstName" className="block text-gray-300 mb-1">Nombre</label>
            <Input
              id="firstName"
              {...register("firstName")}
              aria-invalid={!!errors.firstName}
              disabled={loading}
              className={cn("bg-gray-800 text-white border-gray-700", errors.firstName && "border-red-500")}
            />
            {errors.firstName && <span className="text-red-400 text-xs">{errors.firstName.message}</span>}
          </div>
          <div className="w-1/2">
            <label htmlFor="lastName" className="block text-gray-300 mb-1">Apellido</label>
            <Input
              id="lastName"
              {...register("lastName")}
              aria-invalid={!!errors.lastName}
              disabled={loading}
              className={cn("bg-gray-800 text-white border-gray-700", errors.lastName && "border-red-500")}
            />
            {errors.lastName && <span className="text-red-400 text-xs">{errors.lastName.message}</span>}
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-300 mb-1">Email</label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
            aria-invalid={!!errors.email}
            disabled={loading}
            className={cn("bg-gray-800 text-white border-gray-700", errors.email && "border-red-500")}
          />
          {errors.email && <span className="text-red-400 text-xs">{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-300 mb-1">Contraseña</label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            {...register("password")}
            aria-invalid={!!errors.password}
            disabled={loading}
            className={cn("bg-gray-800 text-white border-gray-700", errors.password && "border-red-500")}
          />
          <div className="text-xs mt-1 text-gray-400">
            Seguridad:{" "}
            <span
              className={cn(
                passwordStrength(password) === "Fuerte" && "text-green-400",
                passwordStrength(password) === "Media" && "text-yellow-400",
                passwordStrength(password) === "Débil" && "text-red-400"
              )}
            >
              {passwordStrength(password)}
            </span>
          </div>
          {errors.password && <span className="text-red-400 text-xs">{errors.password.message}</span>}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-gray-300 mb-1">Confirmar contraseña</label>
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            {...register("confirmPassword")}
            aria-invalid={!!errors.confirmPassword}
            disabled={loading}
            className={cn("bg-gray-800 text-white border-gray-700", errors.confirmPassword && "border-red-500")}
          />
          {errors.confirmPassword && <span className="text-red-400 text-xs">{errors.confirmPassword.message}</span>}
        </div>
        <div>
          <label htmlFor="role" className="block text-gray-300 mb-1">Rol</label>
          <select
            id="role"
            {...register("role")}
            disabled={loading}
            className={cn(
              "w-full bg-gray-800 text-white border-gray-700 rounded px-3 py-2",
              errors.role && "border-red-500"
            )}
          >
            <option value="SUPER_ADMIN">Super Admin</option>
            <option value="DIRECTOR">Director</option>
            <option value="SUPERVISOR">Supervisor</option>
            <option value="EDITOR">Editor</option>
            <option value="VIEWER">Viewer</option>
          </select>
          {errors.role && <span className="text-red-400 text-xs">{errors.role.message}</span>}
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" {...register("terms")} disabled={loading} />
          <label htmlFor="terms" className="text-gray-400 text-sm">
            Acepto los{" "}
            <Link href="/terms" className="text-yellow-400 hover:underline" tabIndex={-1}>
              términos y condiciones
            </Link>
          </label>
        </div>
        {errors.terms && <span className="text-red-400 text-xs">{errors.terms.message}</span>}
        {error && <div className="bg-red-900 text-red-300 rounded p-2 text-center text-sm">{error}</div>}
        {success && <div className="bg-green-900 text-green-300 rounded p-2 text-center text-sm">¡Registro exitoso! Ahora puedes iniciar sesión.</div>}
        <Button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded transition-all duration-200 flex items-center justify-center"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? <Loader2 className="animate-spin mr-2" /> : null}
          Registrarme
        </Button>
        <div className="text-center text-gray-400 text-sm mt-2">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-yellow-400 hover:underline">
            Inicia sesión
          </Link>
        </div>
      </form>
    </div>
  );
}