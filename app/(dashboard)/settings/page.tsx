"use client";

import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/hooks/useTheme";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Save,
  ArrowLeft,
  Sun,
  Moon,
  Monitor
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Ensure component is mounted before accessing browser APIs
  useEffect(() => {
    setMounted(true);
  }, []);

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      projectUpdates: true,
      aiSuggestions: false,
      weeklyReports: true
    },
    preferences: {
      language: 'es',
      autoSave: true,
      darkMode: false, // Initialize with safe default
      compactView: false
    },
    privacy: {
      profileVisibility: 'team',
      dataSharing: false,
      analytics: true
    }
  });

  // Update darkMode setting when theme changes and component is mounted
  useEffect(() => {
    if (mounted) {
      setSettings(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          darkMode: theme === 'dark'
        }
      }));
    }
  }, [theme, mounted]);

  const handleSave = () => {
    if (typeof window === 'undefined') return; // Guard against SSR
    // In a real app, this would save to API
    console.log('Saving settings:', settings);
    // Show success message or redirect
  };

  // Show loading state during SSR and initial hydration
  if (!mounted || status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#17202a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cb4335] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando configuración...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated (only after mounting)
  if (mounted && !session) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#17202a] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Configuración</h1>
              <p className="text-gray-600 dark:text-gray-400">Personaliza tu experiencia en GUIONIX</p>
            </div>
          </div>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-[#cb4335] to-[#a93226] hover:from-[#a93226] hover:to-[#922b21] text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Guardar Cambios
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <div className="space-y-2">
            <div className="bg-white dark:bg-[#1a252f] rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <nav className="space-y-1">
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-[#cb4335] to-[#a93226] text-white">
                  <Settings className="w-4 h-4" />
                  <span>General</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <User className="w-4 h-4" />
                  <span>Perfil</span>
                  <Badge className="ml-auto bg-yellow-100 text-yellow-800 text-xs">Próximamente</Badge>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Shield className="w-4 h-4" />
                  <span>Privacidad</span>
                  <Badge className="ml-auto bg-yellow-100 text-yellow-800 text-xs">Próximamente</Badge>
                </button>
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Theme Settings */}
            <Card className="bg-white dark:bg-[#1a252f] border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <Palette className="w-5 h-5 mr-2 text-[#cb4335]" />
                  Apariencia
                </CardTitle>
                <CardDescription>
                  Personaliza el tema y la apariencia de la aplicación
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Tema</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Selecciona tu tema preferido
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={theme === 'light' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => theme !== 'light' && toggleTheme()}
                      className={theme === 'light' ? 'bg-[#cb4335] hover:bg-[#a93226]' : ''}
                    >
                      <Sun className="w-4 h-4 mr-1" />
                      Claro
                    </Button>
                    <Button
                      variant={theme === 'dark' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => theme !== 'dark' && toggleTheme()}
                      className={theme === 'dark' ? 'bg-[#cb4335] hover:bg-[#a93226]' : ''}
                    >
                      <Moon className="w-4 h-4 mr-1" />
                      Oscuro
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="bg-white dark:bg-[#1a252f] border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <Bell className="w-5 h-5 mr-2 text-[#cb4335]" />
                  Notificaciones
                </CardTitle>
                <CardDescription>
                  Controla qué notificaciones quieres recibir
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Actualizaciones de proyectos</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Recibir notificaciones sobre cambios en tus proyectos
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.projectUpdates}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            projectUpdates: e.target.checked
                          }
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#cb4335]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Sugerencias de IA</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Recibir notificaciones sobre nuevas ideas generadas por IA
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.aiSuggestions}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            aiSuggestions: e.target.checked
                          }
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#cb4335]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Reportes semanales</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Recibir resumen semanal de tu progreso
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.weeklyReports}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            weeklyReports: e.target.checked
                          }
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#cb4335]"></div>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* General Preferences */}
            <Card className="bg-white dark:bg-[#1a252f] border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <Globe className="w-5 h-5 mr-2 text-[#cb4335]" />
                  Preferencias Generales
                </CardTitle>
                <CardDescription>
                  Configuración general de la aplicación
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Guardado automático</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Guardar automáticamente los cambios en tus proyectos
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.preferences.autoSave}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          autoSave: e.target.checked
                        }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#cb4335]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Idioma</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Selecciona el idioma de la interfaz
                    </p>
                  </div>
                  <select 
                    value={settings.preferences.language}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        language: e.target.value
                      }
                    }))}
                    className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#cb4335] focus:border-transparent"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
