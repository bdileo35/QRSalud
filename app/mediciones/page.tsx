'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import GoogleFitConnect from '@/components/GoogleFitConnect';
import GoogleFitChart from '@/components/GoogleFitChart';
import GoogleFitData from '@/components/GoogleFitData';
import GoogleFitPromedios from '@/components/GoogleFitPromedios';

export default function MedicionesPage() {
  const [googleFitToken, setGoogleFitToken] = useState<string | null>(null);

  useEffect(() => {
    // Verificar si hay token de Google Fit
    const token = localStorage.getItem('google_fit_access_token');
    if (token) {
      setGoogleFitToken(token);
    }
  }, []);

  const handleGoogleFitConnect = (token: string) => {
    setGoogleFitToken(token);
  };

  const handleGoogleFitDisconnect = () => {
    setGoogleFitToken(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header nombre="Juan" />
      
      <main className="px-4 py-4 space-y-3 max-w-md mx-auto">
        {/* Componente de conexión con Google Fit */}
        <GoogleFitConnect 
          onConnect={handleGoogleFitConnect}
          onDisconnect={handleGoogleFitDisconnect}
        />

        {/* Gráfico de actividad */}
        {googleFitToken && (
          <GoogleFitChart accessToken={googleFitToken} />
        )}

        {/* Datos de Google Fit */}
        {googleFitToken && (
          <GoogleFitData accessToken={googleFitToken} />
        )}

        {/* Promedios */}
        {googleFitToken && (
          <GoogleFitPromedios accessToken={googleFitToken} />
        )}
      </main>

      <Navbar />
    </div>
  );
}
