'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import laboratorioData from '@/data/laboratorio.json';

export default function LaboratorioPage() {
  const { estudios } = laboratorioData;
  const [expandedEstudios, setExpandedEstudios] = useState<{[key: string]: boolean}>({});
  const [fechaIndices, setFechaIndices] = useState<{[key: string]: number}>({});

  const toggleEstudio = (estudioId: string) => {
    setExpandedEstudios(prev => ({
      ...prev,
      [estudioId]: !prev[estudioId]
    }));
  };

  const navegarFechas = (estudioId: string, direccion: 'prev' | 'next') => {
    const estudio = estudios.find(e => e.id === estudioId);
    if (!estudio) return;

    const indiceActual = fechaIndices[estudioId] || 0;
    const totalFechas = estudio.fechas.length;
    
    let nuevoIndice = indiceActual;
    if (direccion === 'prev' && indiceActual > 0) {
      nuevoIndice = indiceActual - 1;
    } else if (direccion === 'next' && indiceActual < totalFechas - 2) {
      nuevoIndice = indiceActual + 1;
    }

    setFechaIndices(prev => ({
      ...prev,
      [estudioId]: nuevoIndice
    }));
  };

  const formatearFecha = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header nombre="Juan" />
      
      <main className="px-4 py-4 space-y-3 max-w-md mx-auto">
        {estudios.map((estudio) => {
          const estudioId = estudio.id;
          const isExpanded = expandedEstudios[estudioId] !== false;
          const indiceFecha = fechaIndices[estudioId] || 0;
          const fechasVisibles = estudio.fechas.slice(indiceFecha, indiceFecha + 2);
          const puedeAnterior = indiceFecha > 0;
          const puedeSiguiente = indiceFecha < estudio.fechas.length - 2;

          return (
            <div key={estudioId} className="bg-white rounded-lg border border-gray-300 overflow-hidden">
              {/* Header expandible */}
              <div 
                className="px-3 py-2 border-b border-gray-300 cursor-pointer hover:opacity-80 bg-gray-200"
                onClick={() => toggleEstudio(estudioId)}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-gray-800">{estudio.nombre}</h2>
                  <button className="text-gray-400 hover:text-gray-300 text-lg">
                    {isExpanded ? '▼' : '▲'}
                  </button>
                </div>
              </div>

              {/* Contenido expandible */}
              {isExpanded && (
                <div className="px-3 py-2">
                  {/* Navegación de fechas con 2 columnas */}
                  <div className="flex items-center gap-2 mb-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navegarFechas(estudioId, 'prev');
                      }}
                      disabled={!puedeAnterior}
                      className={`text-primary-600 ${puedeAnterior ? 'hover:text-primary-700 cursor-pointer' : 'opacity-30 cursor-not-allowed'}`}
                    >
                      ◀
                    </button>
                    
                    <div className="grid grid-cols-[auto_auto] gap-2 flex-1 justify-end">
                      {fechasVisibles.map((fechaData, idx) => (
                        <div key={idx} className="text-center text-xs text-gray-600 bg-gray-50 py-1 px-2 rounded min-w-[70px]">
                          {formatearFecha(fechaData.fecha)}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navegarFechas(estudioId, 'next');
                      }}
                      disabled={!puedeSiguiente}
                      className={`text-primary-600 ${puedeSiguiente ? 'hover:text-primary-700 cursor-pointer' : 'opacity-30 cursor-not-allowed'}`}
                    >
                      ▶
                    </button>
                  </div>

                  {/* Parámetros con valores en columnas */}
                  {fechasVisibles.length > 0 && fechasVisibles[0].parametros.map((parametro, paramIdx) => {
                    // Obtener el valor correspondiente de cada fecha
                    const valores = fechasVisibles.map(fechaData => {
                      const param = fechaData.parametros[paramIdx];
                      return param || null;
                    });

                    return (
                      <div
                        key={paramIdx}
                        className={`py-1 px-2 ${
                          parametro.dentroRango
                            ? 'bg-success-50'
                            : 'bg-danger-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {/* Nombre del parámetro a la izquierda */}
                          <div className="flex-1 text-sm text-gray-800">
                            {parametro.nombre}
                          </div>
                          {/* Contenedor de valores alineado con las fechas - mismo layout que fechas */}
                          <div className="grid grid-cols-[auto_auto] gap-2 ml-auto">
                            {valores.map((valor, fechaIdx) => (
                              <div key={fechaIdx} className="text-right min-w-[70px] px-2">
                                {valor && (
                                  <span className={`text-sm font-semibold ${
                                    valor.dentroRango ? 'text-success-600' : 'text-danger-600'
                                  }`}>
                                    {valor.valor} {valor.unidad}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </main>

      <Navbar />
    </div>
  );
}
