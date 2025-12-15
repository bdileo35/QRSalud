import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import resumenData from '@/data/resumen.json';

export default function ResumenPage() {
  const { datosPersonales, medicacionActual, enfermedades, alergias, cirugias } = resumenData;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header nombre="Juan" />
      
      <main className="px-4 py-6 space-y-6 max-w-md mx-auto">
        {/* Datos Personales */}
        <section className="bg-white rounded-xl shadow-md p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Datos Personales</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Nombre:</span>
              <span className="font-medium text-gray-800">{datosPersonales.nombre} {datosPersonales.apellido}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Edad:</span>
              <span className="font-medium text-gray-800">{datosPersonales.edad} años</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Grupo Sanguíneo:</span>
              <span className="font-medium text-gray-800">{datosPersonales.grupoSanguineo}</span>
            </div>
          </div>
        </section>

        {/* Medicación Actual */}
        <section className="bg-white rounded-xl shadow-md p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Medicación Actual</h2>
          <div className="space-y-4">
            {medicacionActual.map((medicacion) => (
              <div key={medicacion.id} className="border-l-4 border-primary-500 pl-4">
                <div className="font-semibold text-gray-800">{medicacion.nombre}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {medicacion.dosis} - {medicacion.frecuencia}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Indicación: {medicacion.indicacion}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Desde: {medicacion.inicio}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enfermedades */}
        <section className="bg-white rounded-xl shadow-md p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Enfermedades en Tratamiento</h2>
          <div className="space-y-4">
            {enfermedades.map((enfermedad) => (
              <div
                key={enfermedad.id}
                className={`p-4 rounded-lg ${
                  enfermedad.estado === 'Controlada'
                    ? 'bg-primary-50 border border-primary-200'
                    : 'bg-yellow-50 border border-yellow-200'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold text-gray-800">{enfermedad.diagnostico}</div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      enfermedad.estado === 'Controlada'
                        ? 'bg-primary-200 text-primary-800'
                        : 'bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    {enfermedad.estado}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Diagnóstico: {enfermedad.fechaDiagnostico}
                </div>
                <div className="text-sm text-gray-700 mt-2">{enfermedad.observaciones}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Alergias */}
        {alergias.length > 0 && (
          <section className="bg-white rounded-xl shadow-md p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Alergias</h2>
            <div className="space-y-3">
              {alergias.map((alergia) => (
                <div
                  key={alergia.id}
                  className="p-3 bg-danger-50 border border-danger-200 rounded-lg"
                >
                  <div className="font-semibold text-gray-800">{alergia.sustancia}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Reacción: {alergia.reaccion} ({alergia.severidad})
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Cirugías */}
        {cirugias.length > 0 && (
          <section className="bg-white rounded-xl shadow-md p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Cirugías</h2>
            <div className="space-y-3">
              {cirugias.map((cirugia) => (
                <div key={cirugia.id} className="border-l-4 border-gray-400 pl-4">
                  <div className="font-semibold text-gray-800">{cirugia.procedimiento}</div>
                  <div className="text-sm text-gray-600 mt-1">Fecha: {cirugia.fecha}</div>
                  {cirugia.observaciones && (
                    <div className="text-sm text-gray-600 mt-1">{cirugia.observaciones}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="text-xs text-gray-500 text-center pt-4">
          Última actualización: {resumenData.ultimaActualizacion}
        </div>
      </main>

      <Navbar />
    </div>
  );
}

