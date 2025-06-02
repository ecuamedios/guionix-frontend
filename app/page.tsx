import Link from 'next/link';
import { Film, Zap, Users, Download, Brain, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Film className="h-8 w-8 text-amber-500" />
            <span className="text-2xl font-bold text-white">GUIONIX</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/login" 
              className="text-slate-300 hover:text-white transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link 
              href="/register" 
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Registrarse
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Title */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Genera Guiones
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                con Inteligencia Artificial
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
              Sistema profesional de escritura cinematográfica con IA. 
              Estructura Blake Snyder, contexto cultural mexicano y exportación a múltiples formatos.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              href="/dashboard" 
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              <Film className="inline-block w-5 h-5 mr-2" />
              Crear Guión Ahora
            </Link>
            <Link 
              href="/studio" 
              className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-lg font-bold text-lg border border-slate-600 transition-all transform hover:scale-105"
            >
              <Brain className="inline-block w-5 h-5 mr-2" />
              Script Studio
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8 hover:bg-slate-800/70 transition-all">
              <Zap className="h-12 w-12 text-amber-500 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white mb-3">Triple IA Avanzada</h3>
              <p className="text-slate-300">
                OpenAI, X.AI y Claude trabajando juntos para generar contenido de calidad cinematográfica profesional.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8 hover:bg-slate-800/70 transition-all">
              <Users className="h-12 w-12 text-blue-500 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white mb-3">Colaboración en Tiempo Real</h3>
              <p className="text-slate-300">
                Sistema multi-usuario con roles jerárquicos y edición colaborativa para equipos profesionales.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8 hover:bg-slate-800/70 transition-all">
              <Download className="h-12 w-12 text-green-500 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white mb-3">Exportación Profesional</h3>
              <p className="text-slate-300">
                PDF, Fountain, Final Draft y Celtx. Compatible con todos los estándares de la industria cinematográfica.
              </p>
            </div>
          </div>

          {/* Blake Snyder Section */}
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-2xl p-12 mb-20">
            <Sparkles className="h-16 w-16 text-purple-400 mb-6 mx-auto" />
            <h2 className="text-3xl font-bold text-white mb-4">Estructura Blake Snyder Integrada</h2>
            <p className="text-lg text-slate-300 mb-8 max-w-3xl mx-auto">
              Sistema de nomenclatura jerárquica: <strong>Película → Capa → Minuto → Beat</strong>
              <br />
              110 minutos = 11 capas × 10 minutos = 550 beats × 36 palabras precisas
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="font-bold text-amber-400">15 Beats</div>
                <div className="text-slate-300">Blake Snyder</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="font-bold text-blue-400">550 Beats</div>
                <div className="text-slate-300">Total Sistema</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="font-bold text-green-400">36 Palabras</div>
                <div className="text-slate-300">Por Beat</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="font-bold text-purple-400">110 Min</div>
                <div className="text-slate-300">Duración Total</div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-semibold">Sistema Online y Funcionando</span>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-green-300 mt-2">
              6º Servicio Railway Activo | Base de Datos Conectada | IA Configurada
            </p>
          </div>
        </div>
      </main>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
