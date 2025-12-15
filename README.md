# QRSalud

Historia clínica personal digital - Landing web funcional con look & feel de app mobile de salud.

## 🎯 Objetivo

QRSalud es una aplicación web que permite a una persona cargar estudios médicos (simulados), visualizar mediciones y resultados clínicos, y mostrar su información a un profesional mediante un QR, evitando pasar el teléfono.

## 🚀 Stack Tecnológico

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Datos mockeados en JSON**
- Sin backend
- Sin autenticación

## 📁 Estructura del Proyecto

```
QRSalud/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx              # Home
│   ├── mediciones/
│   │   └── page.tsx          # Pantalla de mediciones
│   ├── laboratorio/
│   │   └── page.tsx          # Pantalla de laboratorio
│   ├── resumen/
│   │   └── page.tsx          # Resumen clínico
│   └── qr/
│       └── page.tsx          # QR Salud
├── components/
│   ├── Header.tsx
│   ├── Navbar.tsx
│   ├── Card.tsx
│   ├── ModalAgregar.tsx
│   └── VisorMedico.tsx
├── data/
│   ├── mediciones.json
│   ├── laboratorio.json
│   └── resumen.json
└── public/
```

## 🏃‍♂️ Instalación y Uso

### Instalar dependencias

```bash
npm install
```

### Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### Build para producción

```bash
npm run build
npm start
```

## 📱 Características

### Home
- Header con saludo personalizado
- Cards principales:
  - Cargar nuevo estudio
  - QR Salud
  - Resumen / Historial clínico
- Navbar inferior fija con botón "+" central destacado

### Botón "+"
Modal con opciones para:
- Cargar mediciones
- Cargar laboratorio
- Cargar estudio por imágenes
- Cargar otro documento

### Mediciones
Pantalla con tarjetas mostrando últimas mediciones:
- Presión arterial
- Peso / IMC
- Glucemia
- Temperatura

### Laboratorio
Estudios agrupados con:
- Valor del parámetro
- Rango de referencia
- Indicador visual (verde/rojo suave) según esté dentro o fuera del rango

### Resumen Clínico
Información para médicos:
- Datos personales
- Medicación actual
- Enfermedades en tratamiento
- Alergias
- Cirugías

### QR Salud
- Código QR grande
- Botón para simular escaneo
- Visor médico con opciones seleccionables (solo lectura)

## 🎨 Diseño

- Look & feel de app mobile
- Diseño limpio y moderno
- Colores suaves (verde/rojo no agresivos)
- Tipografía legible
- Cards para organizar información
- Navbar inferior fija

## 🚢 Deploy en Vercel

1. Sube el proyecto a un repositorio Git (GitHub, GitLab, etc.)

2. Conecta el repositorio a Vercel:
   - Crea una cuenta en [Vercel](https://vercel.com)
   - Importa el proyecto desde tu repositorio
   - Vercel detectará automáticamente que es un proyecto Next.js

3. El proyecto se desplegará automáticamente

## 📝 Notas

- Todos los datos son simulados (mockeados)
- No hay backend ni autenticación
- El flujo de carga de archivos es simulado
- El escaneo del QR es simulado mediante un botón

## 📄 Licencia

Este proyecto es de uso personal/educativo.

