# Integración con Mi Fitness - QRSalud

## 📱 Opciones de Integración

### 1. **Google Fit (Recomendado - Más Accesible)**

**Ventajas:**
- API pública y bien documentada
- Sincronización automática desde Mi Fitness
- Acceso a múltiples tipos de datos de salud
- Gratis para uso personal

**Datos disponibles:**
- Pasos diarios
- Frecuencia cardíaca
- Presión arterial
- Peso / IMC
- Oxígeno en sangre (SpO2)
- Sueño
- Actividad física
- Calorías

**Implementación:**
1. Usuario sincroniza Mi Fitness con Google Fit (desde la app)
2. QRSalud se conecta a Google Fit API
3. Obtiene datos sincronizados automáticamente

**Requisitos:**
- Cuenta de Google
- OAuth 2.0 para autenticación
- Google Fit API habilitada

---

### 2. **Health Connect (Android)**

**Ventajas:**
- Plataforma nativa de Android
- Integración directa con apps de salud
- Privacidad mejorada
- Sin intermediarios

**Datos disponibles:**
- Todos los datos de Mi Fitness
- Datos de otras apps de salud compatibles

**Implementación:**
- Requiere app Android nativa o React Native
- No funciona directamente en web pura
- Necesitaría un puente (backend o app móvil)

---

### 3. **Plataformas Intermediarias (Thryve, Spike, ROOK)**

**Ventajas:**
- APIs unificadas
- Múltiples dispositivos compatibles
- Documentación y soporte

**Desventajas:**
- Costos de suscripción
- Dependencia de terceros
- Puede requerir configuración adicional

---

## 🎯 Recomendación para QRSalud

### Opción A: Google Fit API (Ideal para Web)

**Flujo:**
```
Mi Fitness → Google Fit (sincronización automática)
         ↓
    QRSalud Web → Google Fit API → Datos en tiempo real
```

**Implementación técnica:**
1. **Frontend (Next.js):**
   - Botón "Conectar con Google Fit"
   - OAuth 2.0 flow
   - Almacenar token de acceso

2. **Backend (API Routes en Next.js):**
   - Endpoint para obtener datos de Google Fit
   - Sincronización periódica
   - Almacenamiento en base de datos local (opcional)

3. **Datos a obtener:**
   - Pasos diarios
   - Frecuencia cardíaca (últimas 24h)
   - Presión arterial (si está disponible)
   - Peso / IMC
   - Oxígeno en sangre
   - Sueño (última noche)

**Ejemplo de estructura:**
```typescript
// app/api/google-fit/route.ts
export async function GET(request: Request) {
  // Obtener token del usuario
  // Llamar a Google Fit API
  // Retornar datos formateados
}
```

---

### Opción B: Importación Manual (Más Simple)

**Flujo:**
```
Mi Fitness → Exportar datos (CSV/JSON)
         ↓
    Usuario → Subir archivo en QRSalud
         ↓
    QRSalud → Procesar y mostrar datos
```

**Implementación:**
1. Usuario exporta datos desde Mi Fitness
2. QRSalud permite subir archivo
3. Procesamiento y visualización

**Ventajas:**
- Sin APIs externas
- Control total de datos
- Más privado

**Desventajas:**
- Requiere acción manual del usuario
- No es en tiempo real

---

## 📊 Datos que podemos obtener de Mi Fitness

### Disponibles vía Google Fit:
- ✅ Pasos diarios
- ✅ Frecuencia cardíaca
- ✅ Peso / IMC
- ✅ Actividad física
- ✅ Calorías
- ✅ Sueño
- ⚠️ Presión arterial (depende del dispositivo)
- ⚠️ Oxígeno en sangre (depende del dispositivo)
- ⚠️ Estrés (puede no estar disponible)

### Estructura de datos sugerida:
```json
{
  "pasos": {
    "fecha": "2024-01-15",
    "total": 1345,
    "objetivo": 3000
  },
  "frecuenciaCardiaca": {
    "fecha": "2024-01-15",
    "hora": "17:01",
    "valor": 104,
    "unidad": "LPM"
  },
  "presionArterial": {
    "fecha": "2024-01-15",
    "hora": "07:32",
    "sistolica": 127,
    "diastolica": 87,
    "unidad": "mmHg"
  },
  "oxigenoSangre": {
    "fecha": "2024-01-15",
    "hora": "17:01",
    "valor": 95,
    "unidad": "%"
  },
  "peso": {
    "fecha": "2024-01-15",
    "hora": "09:04",
    "valor": 104.50,
    "unidad": "kg"
  },
  "sueño": {
    "fecha": "2024-01-15",
    "duracion": "6h 13min",
    "calidad": "Regular"
  }
}
```

---

## 🚀 Próximos Pasos

### Fase 1: Preparación
1. Crear cuenta de desarrollador en Google Cloud
2. Habilitar Google Fit API
3. Configurar OAuth 2.0 credentials

### Fase 2: Implementación
1. Agregar botón "Conectar con Google Fit" en QRSalud
2. Implementar flujo de autenticación
3. Crear endpoints para obtener datos
4. Actualizar componentes para mostrar datos de Mi Fitness

### Fase 3: Integración
1. Sincronización automática (cada X horas)
2. Mostrar datos en secciones correspondientes
3. Agregar indicadores de fuente de datos

---

## 📝 Notas Importantes

- **Privacidad:** Todos los datos de salud son sensibles. Implementar medidas de seguridad adecuadas.
- **Permisos:** El usuario debe autorizar explícitamente el acceso a sus datos.
- **Limitaciones:** No todos los dispositivos Xiaomi soportan todas las métricas.
- **Actualizaciones:** Mi Fitness puede cambiar su API o métodos de sincronización.

---

## 🔗 Recursos

- [Google Fit API Documentation](https://developers.google.com/fit)
- [Mi Fitness - Sincronización con Google Fit](https://www.mi.com/es/support/faq/details/KA-744156/)
- [Health Connect Documentation](https://developer.android.com/guide/health-and-fitness/health-connect)

