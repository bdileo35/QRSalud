'use client';

import { useState, useEffect } from 'react';

interface GoogleFitPromediosProps {
  accessToken: string;
}

interface PromediosData {
  pasos: number;
  calorias: number;
  frecuenciaCardiaca?: number;
  peso?: number;
}

export default function GoogleFitPromedios({ accessToken }: GoogleFitPromediosProps) {
  const [periodo, setPeriodo] = useState<'semana' | 'mes'>('semana');
  const [promedios, setPromedios] = useState<PromediosData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromedios = async () => {
      try {
        setLoading(true);
        // Por ahora, datos mockeados
        // En producción, esto vendría de la API calculando promedios
        const mockPromedios: PromediosData = periodo === 'semana' 
          ? {
              pasos: 7300,
              calorias: 1814,
              frecuenciaCardiaca: 72,
              peso: 75.2
            }
          : {
              pasos: 6800,
              calorias: 1700,
              frecuenciaCardiaca: 74,
              peso: 75.5
            };
        setPromedios(mockPromedios);
      } catch (error) {
        console.error('Error obteniendo promedios:', error);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchPromedios();
    }
  }, [accessToken, periodo]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-300 p-4">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!promedios) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
      {/* Header con radio buttons */}
      <div className="px-3 py-2 border-b border-gray-300 bg-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800">Valores promedios</h2>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="periodo"
                value="semana"
                checked={periodo === 'semana'}
                onChange={() => setPeriodo('semana')}
                className="w-4 h-4 text-primary-600"
              />
              <span className="text-xs text-gray-700">Semana</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="periodo"
                value="mes"
                checked={periodo === 'mes'}
                onChange={() => setPeriodo('mes')}
                className="w-4 h-4 text-primary-600"
              />
              <span className="text-xs text-gray-700">Mes</span>
            </label>
          </div>
        </div>
      </div>

      {/* Contenido con promedios */}
      <div className="px-3 py-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">Pasos promedio</div>
            <div className="text-xl font-bold text-gray-800">
              {promedios.pasos.toLocaleString()}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">Calorías promedio</div>
            <div className="text-xl font-bold text-gray-800">
              {promedios.calorias.toLocaleString()}
            </div>
          </div>

          {promedios.frecuenciaCardiaca && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-600 mb-1">Frecuencia cardíaca promedio</div>
              <div className="text-xl font-bold text-gray-800">
                {promedios.frecuenciaCardiaca} LPM
              </div>
            </div>
          )}

          {promedios.peso && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-600 mb-1">Peso promedio</div>
              <div className="text-xl font-bold text-gray-800">
                {promedios.peso} kg
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

