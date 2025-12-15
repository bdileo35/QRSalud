'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ModalAgregar from './ModalAgregar';

export default function Navbar() {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex items-center justify-around px-2 py-2 max-w-md mx-auto">
          <Link 
            href="/" 
            className={`flex flex-col items-center justify-center p-2 ${isActive('/') ? 'text-primary-600' : 'text-gray-500'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1">Inicio</span>
          </Link>

          <Link 
            href="/mediciones" 
            className={`flex flex-col items-center justify-center p-2 ${isActive('/mediciones') ? 'text-primary-600' : 'text-gray-500'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-xs mt-1">Mediciones</span>
          </Link>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors -mt-6"
            aria-label="Agregar"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>

          <Link 
            href="/laboratorio" 
            className={`flex flex-col items-center justify-center p-2 ${isActive('/laboratorio') ? 'text-primary-600' : 'text-gray-500'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="text-xs mt-1">Laboratorio</span>
          </Link>

          <button 
            className="flex flex-col items-center justify-center p-2 text-gray-500 relative"
            aria-label="Notificaciones"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0 right-0 w-2 h-2 bg-danger-500 rounded-full"></span>
            <span className="text-xs mt-1">Notificaciones</span>
          </button>
        </div>
      </nav>
      <ModalAgregar isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

