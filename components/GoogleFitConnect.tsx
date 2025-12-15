'use client';

import { useState, useEffect } from 'react';

interface GoogleFitConnectProps {
  onConnect?: (accessToken: string) => void;
  onDisconnect?: () => void;
}

export default function GoogleFitConnect({ onConnect, onDisconnect }: GoogleFitConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // Verificar si hay token en localStorage
    const token = localStorage.getItem('google_fit_access_token');
    if (token) {
      setAccessToken(token);
      setIsConnected(true);
      onConnect?.(token);
    }

    // Verificar si hay token en URL (desde callback)
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('access_token');
    if (tokenFromUrl) {
      localStorage.setItem('google_fit_access_token', tokenFromUrl);
      setAccessToken(tokenFromUrl);
      setIsConnected(true);
      onConnect?.(tokenFromUrl);
      // Limpiar URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [onConnect]);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const response = await fetch('/api/auth/google-fit');
      const { authUrl } = await response.json();
      window.location.href = authUrl;
    } catch (error) {
      console.error('Error iniciando conexión:', error);
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem('google_fit_access_token');
    localStorage.removeItem('google_fit_refresh_token');
    setAccessToken(null);
    setIsConnected(false);
    onDisconnect?.();
  };

  if (isConnected) {
    return (
      <div className="bg-success-50 border border-success-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-success-800">
              Conectado con Google Fit
            </span>
          </div>
          <button
            onClick={handleDisconnect}
            className="text-xs text-success-600 hover:text-success-700 underline"
          >
            Desconectar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-1">
            Conectar con Google Fit
          </h3>
          <p className="text-xs text-gray-600">
            Sincroniza tus datos de Mi Fitness automáticamente
          </p>
        </div>
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isConnecting ? 'Conectando...' : 'Conectar'}
        </button>
      </div>
    </div>
  );
}

