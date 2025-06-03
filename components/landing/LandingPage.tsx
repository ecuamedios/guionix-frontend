"use client";

import { useState, useEffect } from 'react';
import { Film, Sparkles, Users, FileText, ArrowRight, Check, Play, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Film className="w-8 h-8 text-yellow-400" />
              <span className="text-2xl font-bold text-white">GUIONIX</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
                  Comenzar Gratis
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 px-6 py-20">
          <div className="max-w-7xl mx-auto text-center">
            <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Crea Guiones
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600">
                  Con Inteligencia Artificial
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                La plataforma más avanzada para guionistas profesionales. 
                Escribe, colabora y produce contenido audiovisual de clase mundial.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/register">
                  <Button 
                    size="lg" 
                    className="bg-yellow-400 text-black hover:bg-yellow-500 text-lg px-8 py-4 rounded-xl font-semibold group"
                  >
                    Comenzar Gratis
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-gray-600 text-white hover:bg-gray-800 text-lg px-8 py-4 rounded-xl"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Ver Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">1000+</div>
                  <div className="text-gray-400">Guiones Creados</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">500+</div>
                  <div className="text-gray-400">Usuarios Activos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">50+</div>
                  <div className="text-gray-400">Producciones</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Todo lo que necesitas para crear
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Herramientas profesionales respaldadas por IA para llevar tus ideas del concepto a la pantalla
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300">
              <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">IA Avanzada</h3>
              <p className="text-gray-400 mb-6">
                Genera diálogos, personajes y tramas con nuestra IA especializada en narrativa audiovisual.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center"><Check className="w-4 h-4 text-green-400 mr-2" />Generación de personajes</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-green-400 mr-2" />Diálogos naturales</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-green-400 mr-2" />Desarrollo de tramas</li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300">
              <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Colaboración</h3>
              <p className="text-gray-400 mb-6">
                Trabaja en tiempo real con tu equipo. Comentarios, revisiones y control de versiones.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center"><Check className="w-4 h-4 text-green-400 mr-2" />Edición colaborativa</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-green-400 mr-2" />Comentarios en tiempo real</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-green-400 mr-2" />Control de versiones</li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Formato Profesional</h3>
              <p className="text-gray-400 mb-6">
                Exporta en formatos estándar de la industria. Final Draft, PDF, y más.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center"><Check className="w-4 h-4 text-green-400 mr-2" />Formato Final Draft</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-green-400 mr-2" />Exportación PDF</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-green-400 mr-2" />Plantillas profesionales</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para crear tu próximo éxito?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Únete a miles de creativos que ya están transformando sus ideas en realidad.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/register">
              <Button 
                size="lg" 
                className="bg-yellow-400 text-black hover:bg-yellow-500 text-lg px-8 py-4 rounded-xl font-semibold group"
              >
                Comenzar Gratis Ahora
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link href="/login">
              <Button 
                variant="outline" 
                size="lg"
                className="border-gray-600 text-white hover:bg-gray-800 text-lg px-8 py-4 rounded-xl"
              >
                Ya tengo cuenta
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Film className="w-8 h-8 text-yellow-400" />
              <span className="text-2xl font-bold text-white">GUIONIX</span>
            </div>
            
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2025 GUIONIX. Todos los derechos reservados.</p>
              <p className="text-sm mt-1">La plataforma del futuro para guionistas.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
