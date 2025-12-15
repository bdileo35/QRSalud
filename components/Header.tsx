'use client';

import { usePathname } from 'next/navigation';

interface HeaderProps {
  nombre?: string;
}

const getPageInfo = (pathname: string) => {
  switch (pathname) {
    case '/':
      return {
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        ),
        title: 'Inicio'
      };
    case '/mediciones':
      return {
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        ),
        title: 'Mediciones'
      };
    case '/laboratorio':
      return {
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        ),
        title: 'Laboratorios'
      };
    case '/resumen':
      return {
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
        title: 'Resumen'
      };
    case '/qr':
      return {
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2.01M5 20h2.01M8 8h.01M8 20h.01M12 8h.01M12 20h.01M16 8h.01M16 20h.01M20 8h.01M20 20h.01" />
          </svg>
        ),
        title: 'QR Salud'
      };
    default:
      return {
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        ),
        title: 'Inicio'
      };
  }
};

export default function Header({ nombre = "Juan" }: HeaderProps) {
  const pathname = usePathname();
  const pageInfo = getPageInfo(pathname || '/');

  return (
    <header className="bg-white shadow-sm px-4 py-4">
      <div className="flex items-center justify-between">
        {/* Icono y título de la página a la izquierda */}
        <div className="flex items-center gap-2">
          <div className="text-primary-600">
            {pageInfo.icon}
          </div>
          <h1 className="text-lg font-semibold text-gray-800">
            {pageInfo.title}
          </h1>
        </div>

        {/* Hola, Juan con avatar circular a la derecha */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-800">Hola, {nombre}</span>
          <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-semibold">
            {nombre.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
