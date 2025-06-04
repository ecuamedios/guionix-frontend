// components/dashboard/AdvancedComponents.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Film, 
  Clock, 
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Brain
} from "lucide-react";

// Datos de ejemplo
const analyticsData = [
  { name: 'Ene', guiones: 12, colaboraciones: 8, ideas: 45 },
  { name: 'Feb', guiones: 19, colaboraciones: 12, ideas: 52 },
  { name: 'Mar', guiones: 15, colaboraciones: 18, ideas: 48 },
  { name: 'Abr', guiones: 25, colaboraciones: 22, ideas: 61 },
  { name: 'May', guiones: 22, colaboraciones: 25, ideas: 58 },
  { name: 'Jun', guiones: 30, colaboraciones: 28, ideas: 72 }
];

const genreData = [
  { name: 'Drama', value: 35, color: '#cb4335' },
  { name: 'Comedia', value: 25, color: '#3498db' },
  { name: 'Thriller', value: 20, color: '#f39c12' },
  { name: 'Romance', value: 15, color: '#e74c3c' },
  { name: 'Otros', value: 5, color: '#95a5a6' }
];

// Componente de Métrica Avanzada
interface AdvancedMetricProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
  description?: string;
}

function AdvancedMetric({ title, value, change, icon: Icon, description }: AdvancedMetricProps) {
  const isPositive = change >= 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white dark:bg-[#1a252f] border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </CardTitle>
          <Icon className="h-4 w-4 text-[#cb4335]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {value}
          </div>
          <div className="flex items-center text-xs">
            {isPositive ? (
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
            )}
            <span className={isPositive ? "text-green-500" : "text-red-500"}>
              {Math.abs(change)}%
            </span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">
              vs mes anterior
            </span>
          </div>
          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {description}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Gráfico de Área Avanzado
function AdvancedAreaChart() {
  return (
    <Card className="bg-white dark:bg-[#1a252f] border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-[#cb4335]" />
          Progreso Mensual
        </CardTitle>
        <CardDescription>
          Evolución de guiones, colaboraciones e ideas IA
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="name" 
              className="text-xs text-gray-500"
            />
            <YAxis className="text-xs text-gray-500" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1a252f',
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="guiones" 
              stackId="1"
              stroke="#cb4335" 
              fill="#cb4335" 
              fillOpacity={0.6}
            />
            <Area 
              type="monotone" 
              dataKey="colaboraciones" 
              stackId="1"
              stroke="#3498db" 
              fill="#3498db" 
              fillOpacity={0.6}
            />
            <Area 
              type="monotone" 
              dataKey="ideas" 
              stackId="1"
              stroke="#f39c12" 
              fill="#f39c12" 
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// Gráfico de Dona para Géneros
function GenrePieChart() {
  return (
    <Card className="bg-white dark:bg-[#1a252f] border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white flex items-center">
          <Film className="w-5 h-5 mr-2 text-[#cb4335]" />
          Distribución por Género
        </CardTitle>
        <CardDescription>
          Tipos de guiones más populares
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={genreData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {genreData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1a252f',
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {genreData.map((genre) => (
            <div key={genre.name} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: genre.color }}
              />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {genre.name}: {genre.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Actividad Reciente Avanzada
function AdvancedActivityFeed() {
  const activities = [
    {
      id: 1,
      type: 'guion',
      title: 'Nuevo guión "El Último Verano" creado',
      time: 'Hace 2 horas',
      icon: Film,
      color: 'text-[#cb4335]'
    },
    {
      id: 2,
      type: 'colaboracion',
      title: 'María García se unió al proyecto "Medianoche"',
      time: 'Hace 4 horas',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      id: 3,
      type: 'ia',
      title: 'IA generó 5 nuevas ideas para "Romance en París"',
      time: 'Hace 6 horas',
      icon: Brain,
      color: 'text-purple-500'
    },
    {
      id: 4,
      type: 'revision',
      title: 'Revisión completada en "Thriller Nocturno"',
      time: 'Hace 1 día',
      icon: Target,
      color: 'text-green-500'
    }
  ];

  return (
    <Card className="bg-white dark:bg-[#1a252f] border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white flex items-center">
          <Clock className="w-5 h-5 mr-2 text-[#cb4335]" />
          Actividad Reciente
        </CardTitle>
        <CardDescription>
          Últimas acciones en tu espacio de trabajo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-700 ${activity.color}`}>
                <activity.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full mt-4 text-[#cb4335] hover:bg-[#cb4335] hover:text-white"
        >
          Ver toda la actividad
        </Button>
      </CardContent>
    </Card>
  );
}

// Exportar componentes principales
export {
  AdvancedAreaChart,
  GenrePieChart,
  AdvancedActivityFeed,
  AdvancedMetric
};
