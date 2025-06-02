// app/(dashboard)/analytics/page.tsx - Server-side analytics
import { BarChart2, Users, FileText, Sparkles } from "lucide-react";

// Server-side data fetching (simulated)
async function getAnalyticsData() {
  // In production, this would fetch from your database
  return {
    totalProjects: 42,
    totalBeats: 256,
    totalUsers: 18,
    aiUsage: 89,
    mostActiveUser: "director@guionix.com"
  };
}

export default async function AnalyticsPage() {
  const data = await getAnalyticsData();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">📊 Analytics Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <FileText className="w-8 h-8 text-blue-400 mr-3" />
              <h3 className="text-lg font-semibold">Proyectos</h3>
            </div>
            <p className="text-3xl font-bold text-blue-400">{data.totalProjects}</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <BarChart2 className="w-8 h-8 text-green-400 mr-3" />
              <h3 className="text-lg font-semibold">Beats</h3>
            </div>
            <p className="text-3xl font-bold text-green-400">{data.totalBeats}</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Users className="w-8 h-8 text-purple-400 mr-3" />
              <h3 className="text-lg font-semibold">Usuarios</h3>
            </div>
            <p className="text-3xl font-bold text-purple-400">{data.totalUsers}</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Sparkles className="w-8 h-8 text-amber-400 mr-3" />
              <h3 className="text-lg font-semibold">Uso IA</h3>
            </div>
            <p className="text-3xl font-bold text-amber-400">{data.aiUsage}%</p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Usuario Más Activo</h2>
          <p className="text-gray-300">{data.mostActiveUser}</p>
        </div>
      </div>
    </div>
  );
}
