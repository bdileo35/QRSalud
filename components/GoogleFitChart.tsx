'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface GoogleFitChartProps {
  accessToken: string;
}

interface ChartData {
  fecha: string;
  pasos: number;
  calorias: number;
}

export default function GoogleFitChart({ accessToken }: GoogleFitChartProps) {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        // Por ahora, datos mockeados para el gráfico
        // En producción, esto vendría de la API de Google Fit
        const mockData: ChartData[] = [
          { fecha: 'Lun', pasos: 8500, calorias: 2100 },
          { fecha: 'Mar', pasos: 7200, calorias: 1800 },
          { fecha: 'Mié', pasos: 9100, calorias: 2200 },
          { fecha: 'Jue', pasos: 6800, calorias: 1700 },
          { fecha: 'Vie', pasos: 9500, calorias: 2400 },
          { fecha: 'Sáb', pasos: 5200, calorias: 1300 },
          { fecha: 'Dom', pasos: 4800, calorias: 1200 },
        ];
        setChartData(mockData);
      } catch (error) {
        console.error('Error obteniendo datos del gráfico:', error);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchChartData();
    }
  }, [accessToken]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-300 p-4">
        <div className="animate-pulse">
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-4">
      <h3 className="text-sm font-semibold text-gray-800 mb-4">Actividad de los últimos 7 días</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="fecha" 
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <Bar 
            dataKey="pasos" 
            fill="#2563eb" 
            radius={[4, 4, 0, 0]}
            name="Pasos"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

