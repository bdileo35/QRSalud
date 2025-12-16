'use client';

import { useState, useEffect } from 'react';
import type { GoogleFitData } from '@/lib/google-fit';

interface GoogleFitDataProps {
  accessToken: string;
}

export default function GoogleFitData({ accessToken }: GoogleFitDataProps) {
  const [data, setData] = useState<GoogleFitData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/google-fit/data?access_token=${accessToken}`);
        
        if (!response.ok) {
          throw new Error('Error al obtener datos');
        }

        const fitData = await response.json();
        setData(fitData);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
        <p className="text-sm text-gray-600 mt-2">Cargando datos de Google Fit...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
        <p className="text-sm text-danger-800">Error: {error}</p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
      {/* Header expandible */}
      <div 
        className="px-3 py-2 border-b border-gray-300 cursor-pointer hover:opacity-80 bg-gray-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800">Datos de Mi Fitness</h2>
          <button className="text-gray-400 hover:text-gray-300 text-lg">
            {isExpanded ? '▼' : '▲'}
          </button>
        </div>
      </div>

      {/* Contenido expandible */}
      {isExpanded && (
        <div className="px-3 py-2 space-y-3">
          {/* Tarjeta de Pasos */}
          {data.pasos && (
            <div className="bg-white rounded-lg border border-gray-300 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Pasos</div>
                  <div className="text-2xl font-bold text-gray-800">{data.pasos.total.toLocaleString()}</div>
                  {data.pasos.objetivo && (
                    <div className="text-xs text-gray-500">
                      Objetivo: {data.pasos.objetivo.toLocaleString()}
                    </div>
                  )}
                </div>
                <div className="text-primary-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Tarjeta de Calorías */}
          {data.calorias && (
            <div className="bg-white rounded-lg border border-gray-300 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Calorías</div>
                  <div className="text-2xl font-bold text-gray-800">{data.calorias.total.toLocaleString()}</div>
                  {data.calorias.objetivo && (
                    <div className="text-xs text-gray-500">
                      Objetivo: {data.calorias.objetivo.toLocaleString()} kcal
                    </div>
                  )}
                </div>
                <div className="text-orange-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

