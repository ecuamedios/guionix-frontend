export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">🎬 GUIONIX</h1>
        <p className="text-xl mb-8">Sistema de Generación de Guiones con IA</p>
        <div className="space-x-4">
          <a 
            href="/login" 
            className="bg-amber-600 hover:bg-amber-700 px-6 py-3 rounded-lg font-medium"
          >
            Iniciar Sesión
          </a>
          <a 
            href="/dashboard" 
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
          >
            Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
