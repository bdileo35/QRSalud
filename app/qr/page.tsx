'use client';

import { useState } from 'react';
import QRCode from 'react-qr-code';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import VisorMedico from '@/components/VisorMedico';

export default function QRPage() {
  const [mostrarVisor, setMostrarVisor] = useState(false);

  const qrValue = JSON.stringify({
    paciente: 'Juan Pérez',
    id: 'QR-SALUD-2024-001',
    fecha: new Date().toISOString()
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header nombre="Juan" />
      
      <main className="px-4 py-6 max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">QR Salud</h2>
          <p className="text-sm text-gray-600 mb-6">
            Escanea este código para acceder a tu información médica
          </p>
          
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <QRCode
                value={qrValue}
                size={256}
                level="H"
              />
            </div>
          </div>

          <button
            onClick={() => setMostrarVisor(true)}
            className="w-full bg-primary-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-md"
          >
            Simular Escaneo
          </button>

          <p className="text-xs text-gray-500 mt-4">
            Muestra este QR a tu médico para que pueda acceder a tu información
          </p>
        </div>
      </main>

      {mostrarVisor && (
        <VisorMedico onClose={() => setMostrarVisor(false)} />
      )}

      <Navbar />
    </div>
  );
}

