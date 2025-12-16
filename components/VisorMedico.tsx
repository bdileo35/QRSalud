'use client';

import { useState } from 'react';
import medicionesData from '@/data/mediciones.json';
import laboratorioData from '@/data/laboratorio.json';
import resumenData from '@/data/resumen.json';

interface VisorMedicoProps {
  onClose: () => void;
}

type VistaActiva = 'mediciones' | 'laboratorio' | 'estudios' | 'resumen' | null;

export default function VisorMedico({ onClose }: VisorMedicoProps) {
  const [vistaActiva, setVistaActiva] = useState<VistaActiva>(null);

  const opciones = [
    {
      id: 'mediciones' as VistaActiva,
      titulo: 'Ver mediciones',
      icono: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: 'laboratorio' as VistaActiva,
      titulo: 'Ver laboratorio',
      icono: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      id: 'estudios' as VistaActiva,
      titulo: 'Ver estudios',
      icono: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'resumen' as VistaActiva,
      titulo: 'Ver resumen clínico',
      icono: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  ];

  const renderContenido = () => {
    if (!vistaActiva) {
      return (
        <div className="space-y-3">
          {opciones.map((opcion) => (
            <button
              key={opcion.id || ''}
              onClick={() => setVistaActiva(opcion.id)}
              className="w-full flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
            >
              <div className="text-primary-600">{opcion.icono}</div>
              <span className="text-gray-800 font-medium">{opcion.titulo}</span>
            </button>
          ))}
        </div>
      );
    }

    if (vistaActiva === 'mediciones') {
      const { presionArterial, pesoIMC } = medicionesData;
      return (
        <div className="space-y-4">
          <button
            onClick={() => setVistaActiva(null)}
            className="text-primary-600 text-sm mb-4 flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </button>
          <h3 className="font-semibold text-gray-800 mb-3">Mediciones Recientes</h3>
          <div className="space-y-3">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Presión Arterial</div>
              <div className="text-2xl font-bold text-gray-800">
                {presionArterial[0].sistolica}/{presionArterial[0].diastolica} mmHg
              </div>
              <div className="text-xs text-gray-500 mt-1">{presionArterial[0].fecha}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Peso / IMC</div>
              <div className="text-2xl font-bold text-gray-800">
                {pesoIMC[0].peso} kg (IMC: {pesoIMC[0].imc})
              </div>
              <div className="text-xs text-gray-500 mt-1">{pesoIMC[0].fecha}</div>
            </div>
          </div>
        </div>
      );
    }

    if (vistaActiva === 'laboratorio') {
      return (
        <div className="space-y-4">
          <button
            onClick={() => setVistaActiva(null)}
            className="text-primary-600 text-sm mb-4 flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </button>
          <h3 className="font-semibold text-gray-800 mb-3">Estudios de Laboratorio</h3>
          <div className="space-y-3">
            {laboratorioData.estudios.slice(0, 2).map((estudio) => {
              const primeraFecha = estudio.fechas && estudio.fechas.length > 0 ? estudio.fechas[0] : null;
              const parametros = primeraFecha?.parametros || [];
              return (
                <div key={estudio.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium text-gray-800 mb-2">{estudio.nombre}</div>
                  {primeraFecha && (
                    <div className="text-xs text-gray-500 mb-2">{primeraFecha.fecha}</div>
                  )}
                  <div className="space-y-2">
                    {parametros.slice(0, 3).map((param, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-600">{param.nombre}:</span>
                        <span className={`font-medium ${param.dentroRango ? 'text-primary-700' : 'text-danger-700'}`}>
                          {param.valor} {param.unidad}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (vistaActiva === 'resumen') {
      return (
        <div className="space-y-4">
          <button
            onClick={() => setVistaActiva(null)}
            className="text-primary-600 text-sm mb-4 flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </button>
          <h3 className="font-semibold text-gray-800 mb-3">Resumen Clínico</h3>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-gray-800 mb-2">Medicación Actual</div>
              {resumenData.medicacionActual.map((med) => (
                <div key={med.id} className="text-sm text-gray-700 mt-1">
                  • {med.nombre} {med.dosis} - {med.frecuencia}
                </div>
              ))}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-gray-800 mb-2">Enfermedades</div>
              {resumenData.enfermedades.map((enf) => (
                <div key={enf.id} className="text-sm text-gray-700 mt-1">
                  • {enf.diagnostico} ({enf.estado})
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (vistaActiva === 'estudios') {
      return (
        <div className="space-y-4">
          <button
            onClick={() => setVistaActiva(null)}
            className="text-primary-600 text-sm mb-4 flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </button>
          <h3 className="font-semibold text-gray-800 mb-3">Estudios por Imágenes</h3>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-gray-600">No hay estudios por imágenes disponibles</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Visor Médico</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Cerrar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {renderContenido()}
      </div>
    </div>
  );
}

