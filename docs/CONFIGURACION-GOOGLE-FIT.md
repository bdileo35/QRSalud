# Configuración de Google Fit API para QRSalud

## 📋 Requisitos Previos

1. Cuenta de Google
2. Acceso a Google Cloud Console
3. Proyecto Next.js configurado

## 🔧 Pasos de Configuración

### 1. Crear Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Nombra el proyecto (ej: "QRSalud")

### 2. Habilitar Google Fitness API

1. En el menú lateral, ve a **APIs & Services** > **Library**
2. Busca "Fitness API"
3. Haz clic en **Enable**

### 3. Configurar OAuth 2.0

1. Ve a **APIs & Services** > **Credentials**
2. Haz clic en **Create Credentials** > **OAuth client ID**
3. Si es la primera vez, configura la pantalla de consentimiento:
   - Tipo: **External**
   - Nombre de la app: **QRSalud**
   - Email de soporte: tu email
   - Dominios autorizados: (dejar vacío para desarrollo)
   - Guarda y continúa

4. Crea el OAuth Client ID:
   - Tipo de aplicación: **Web application**
   - Nombre: **QRSalud Web Client**
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (desarrollo)
     - `https://tu-dominio.vercel.app` (producción)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/google-fit/callback` (desarrollo)
     - `https://tu-dominio.vercel.app/api/auth/google-fit/callback` (producción)
   - Haz clic en **Create**

5. Copia el **Client ID** y **Client Secret**

### 4. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Google Fit API Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=tu_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_client_secret_aqui
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google-fit/callback
```

**⚠️ IMPORTANTE:**
- El archivo `.env.local` NO debe subirse a Git
- Agrega `.env.local` al `.gitignore`
- En producción (Vercel), configura estas variables en el dashboard de Vercel

### 5. Instalar Dependencias

```bash
npm install googleapis
```

### 6. Sincronizar Mi Fitness con Google Fit

**En el teléfono del usuario:**

1. Abre la app **Mi Fitness**
2. Ve a **Perfil** > **Datos de terceros**
3. Selecciona **Google Fit**
4. Conecta tu cuenta de Google
5. Autoriza la sincronización

Los datos se sincronizarán automáticamente con Google Fit.

## 🚀 Uso en la Aplicación

1. El usuario hace clic en **"Conectar con Google Fit"** en la página de Mediciones
2. Se redirige a Google para autorizar
3. Después de autorizar, regresa a QRSalud
4. Los datos se cargan automáticamente desde Google Fit

## 📊 Datos Disponibles

- ✅ Pasos diarios
- ✅ Frecuencia cardíaca
- ✅ Peso / IMC
- ✅ Oxígeno en sangre (SpO2) - si el dispositivo lo soporta
- ✅ Calorías
- ⚠️ Presión arterial - depende del dispositivo
- ⚠️ Sueño - requiere configuración adicional

## 🔒 Seguridad

- Los tokens se almacenan en `localStorage` (solo para desarrollo)
- **Para producción:** usar cookies httpOnly o base de datos
- Implementar refresh token para renovar tokens expirados
- Validar permisos del usuario antes de mostrar datos

## 🐛 Solución de Problemas

### Error: "redirect_uri_mismatch"
- Verifica que la URI en `.env.local` coincida exactamente con la configurada en Google Cloud Console
- Asegúrate de incluir `http://` o `https://` según corresponda

### Error: "invalid_client"
- Verifica que el Client ID y Client Secret sean correctos
- Asegúrate de que las variables de entorno estén cargadas

### No se obtienen datos
- Verifica que el usuario haya sincronizado Mi Fitness con Google Fit
- Revisa que el dispositivo haya registrado datos recientes
- Algunos datos pueden no estar disponibles según el dispositivo

## 📚 Recursos

- [Google Fit API Documentation](https://developers.google.com/fit)
- [OAuth 2.0 Setup Guide](https://developers.google.com/identity/protocols/oauth2)
- [Mi Fitness - Sincronización con Google Fit](https://www.mi.com/es/support/faq/details/KA-744156/)

