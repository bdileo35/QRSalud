import Header from '@/components/Header';
import Card from '@/components/Card';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header nombre="Juan" />
      
      <main className="px-4 py-6 space-y-4 max-w-md mx-auto">
        <Card
          title="Cargar nuevo estudio"
          description="Agrega mediciones, laboratorios o estudios"
          href="/"
          icon={
            <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          }
        />

        <Card
          title="QR Salud"
          description="Muestra tu información médica"
          href="/qr"
          icon={
            <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2.01M5 20h2.01M8 8h.01M8 20h.01M12 8h.01M12 20h.01M16 8h.01M16 20h.01M20 8h.01M20 20h.01" />
            </svg>
          }
        />

        <Card
          title="Resumen / Historial clínico"
          description="Consulta tu información médica completa"
          href="/resumen"
          icon={
            <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
      </main>

      <Navbar />
    </div>
  );
}

