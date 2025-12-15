'use client';

interface ModalAgregarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalAgregar({ isOpen, onClose }: ModalAgregarProps) {
  if (!isOpen) return null;

  const opciones = [
    {
      id: 'mediciones',
      titulo: 'Cargar mediciones',
      icono: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      accion: () => {
        alert('Simulación: Cargar mediciones');
        onClose();
      }
    },
    {
      id: 'laboratorio',
      titulo: 'Cargar laboratorio',
      icono: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      accion: () => {
        alert('Simulación: Cargar laboratorio');
        onClose();
      }
    },
    {
      id: 'estudios',
      titulo: 'Cargar estudio por imágenes',
      icono: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      accion: () => {
        alert('Simulación: Cargar estudio por imágenes');
        onClose();
      }
    },
    {
      id: 'documento',
      titulo: 'Cargar otro documento',
      icono: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      accion: () => {
        alert('Simulación: Cargar otro documento');
        onClose();
      }
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
      <div className="bg-white rounded-t-3xl w-full max-w-md p-6 animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Agregar nuevo</h2>
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
        <div className="space-y-3">
          {opciones.map((opcion) => (
            <button
              key={opcion.id}
              onClick={opcion.accion}
              className="w-full flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
            >
              <div className="text-primary-600">{opcion.icono}</div>
              <span className="text-gray-800 font-medium">{opcion.titulo}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

