"use client";

import { useState, useEffect } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Film, Eye, EyeOff, Loader2, Lock, Mail, ArrowRight, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ModernLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Credenciales incorrectas. Por favor, verifica tu email y contraseña.');
      } else {
        // Verificar sesión y recargar página
        const session = await getSession();
        if (session) {
          window.location.reload();
        }
      }
    } catch (error) {
      setError('Error de conexión. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-[#17202a] dark:via-[#1b2631] dark:to-[#17202a] flex items-center justify-center p-4 transition-colors duration-300">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#cb4335]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#cb4335]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#cb4335]/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo y Título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#cb4335] to-[#a93226] rounded-3xl mb-6 shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <Film className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">GUIONIX</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sistema Profesional de Guiones con IA
          </p>
        </div>

        {/* Formulario de Login */}
        <div className="bg-white/90 dark:bg-[#1f2937]/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-14 bg-gray-50 dark:bg-[#17202a]/50 border-gray-200 dark:border-gray-600 focus:border-[#cb4335] focus:ring-[#cb4335] text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-xl"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-14 bg-gray-50 dark:bg-[#17202a]/50 border-gray-200 dark:border-gray-600 focus:border-[#cb4335] focus:ring-[#cb4335] text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-xl"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <Alert className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-500/50 text-red-700 dark:text-red-200 rounded-xl">
                <AlertDescription className="font-medium">{error}</AlertDescription>
              </Alert>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-gradient-to-r from-[#cb4335] to-[#a93226] hover:from-[#a93226] hover:to-[#922b21] text-white font-bold text-lg rounded-xl shadow-xl transform transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                <>
                  Iniciar Sesión
                  <ArrowRight className="w-5 h-5 ml-3" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-[#1f2937]/90 text-gray-500 dark:text-gray-400 font-medium">
                Credenciales de prueba
              </span>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-[#17202a]/50 dark:to-[#1a252f]/50 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-600/30">
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
              <Monitor className="w-4 h-4 mr-2" />
              Acceso Demo:
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4 mr-2 text-[#cb4335]" />
                Email: <span className="text-[#cb4335] font-mono ml-2 font-medium">test@guionix.com</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Lock className="w-4 h-4 mr-2 text-[#cb4335]" />
                Password: <span className="text-[#cb4335] font-mono ml-2 font-medium">test123</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setEmail('test@guionix.com');
                setPassword('test123');
              }}
              className="mt-4 w-full text-sm text-[#cb4335] hover:text-[#a93226] font-semibold bg-white dark:bg-[#17202a] rounded-lg py-2 border border-[#cb4335]/20 hover:border-[#cb4335]/40 transition-colors"
            >
              Usar credenciales de prueba →
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>© 2024 GUIONIX. Sistema profesional de guiones con IA.</p>
        </div>
      </div>
    </div>
  );
}
