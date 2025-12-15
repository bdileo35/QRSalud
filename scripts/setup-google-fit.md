# 🚀 Guía Paso a Paso: Configurar Google Fit API

## Paso 1: Crear Proyecto en Google Cloud Console

1. **Abre Google Cloud Console:**
   - Ve a: https://console.cloud.google.com/
   - Inicia sesión con tu cuenta de Google

2. **Crear nuevo proyecto:**
   - Haz clic en el selector de proyectos (arriba a la izquierda)
   - Haz clic en **"NUEVO PROYECTO"**
   - Nombre: `QRSalud` (o el que prefieras)
   - Haz clic en **"CREAR"**
   - Espera unos segundos y selecciona el proyecto recién creado

---

## Paso 2: Habilitar Google Fitness API

1. **Ir a la biblioteca de APIs:**
   - En el menú lateral izquierdo, busca **"APIs y servicios"** > **"Biblioteca"**
   - O ve directamente a: https://console.cloud.google.com/apis/library

2. **Buscar y habilitar Fitness API:**
   - En el buscador, escribe: `Fitness API`
   - Selecciona **"Fitness API"** (debería aparecer con el logo de Google)
   - Haz clic en **"HABILITAR"**
   - Espera a que se habilite (puede tardar unos segundos)

---

## Paso 3: Configurar Pantalla de Consentimiento OAuth

1. **Ir a la configuración de OAuth:**
   - En el menú lateral: **"APIs y servicios"** > **"Pantalla de consentimiento de OAuth"**
   - O ve a: https://console.cloud.google.com/apis/credentials/consent

2. **Configurar la pantalla:**
   - **Tipo de usuario:** Selecciona **"Externo"** (External)
   - Haz clic en **"CREAR"**

3. **Completar información:**
   - **Nombre de la aplicación:** `QRSalud`
   - **Email de soporte al usuario:** Tu email
   - **Email del desarrollador:** Tu email
   - Haz clic en **"GUARDAR Y CONTINUAR"**

4. **Ámbitos (Scopes):**
   - Haz clic en **"AGREGAR O QUITAR ÁMBITOS"**
   - Busca y agrega estos ámbitos:
     - `.../auth/fitness.activity.read`
     - `.../auth/fitness.heart_rate.read`
     - `.../auth/fitness.body.read`
     - `.../auth/fitness.sleep.read`
     - `.../auth/fitness.blood_pressure.read`
     - `.../auth/fitness.oxygen_saturation.read`
   - Haz clic en **"ACTUALIZAR"** y luego **"GUARDAR Y CONTINUAR"**

5. **Usuarios de prueba (para desarrollo):**
   - Agrega tu email de Google como usuario de prueba
   - Haz clic en **"AGREGAR USUARIOS"**
   - Ingresa tu email
   - Haz clic en **"GUARDAR Y CONTINUAR"**

6. **Resumen:**
   - Revisa la información
   - Haz clic en **"VOLVER AL PANEL"**

---

## Paso 4: Crear Credenciales OAuth 2.0

1. **Ir a Credenciales:**
   - En el menú lateral: **"APIs y servicios"** > **"Credenciales"**
   - O ve a: https://console.cloud.google.com/apis/credentials

2. **Crear OAuth Client ID:**
   - Haz clic en **"+ CREAR CREDENCIALES"**
   - Selecciona **"ID de cliente de OAuth"**

3. **Configurar el cliente:**
   - **Tipo de aplicación:** `Aplicación web`
   - **Nombre:** `QRSalud Web Client`

4. **JavaScript origins autorizados:**
   - Haz clic en **"+ AGREGAR URI"**
   - Agrega: `http://localhost:3000`
   - (Para producción, agrega también tu dominio de Vercel)

5. **URI de redirección autorizados:**
   - Haz clic en **"+ AGREGAR URI"**
   - Agrega: `http://localhost:3000/api/auth/google-fit/callback`
   - (Para producción, agrega también: `https://tu-dominio.vercel.app/api/auth/google-fit/callback`)

6. **Crear:**
   - Haz clic en **"CREAR"**
   - **¡IMPORTANTE!** Copia el **ID de cliente** y el **Secreto de cliente**
   - Guárdalos en un lugar seguro (los necesitarás en el siguiente paso)

---

## Paso 5: Configurar Variables de Entorno

1. **Crear archivo `.env.local`:**
   - En la raíz del proyecto QRSalud, crea un archivo llamado `.env.local`
   - (Si no existe, créalo)

2. **Agregar las credenciales:**
   ```env
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=tu_client_id_aqui.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=tu_client_secret_aqui
   NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google-fit/callback
   ```

3. **Reemplazar los valores:**
   - `tu_client_id_aqui` → Pega el **ID de cliente** que copiaste
   - `tu_client_secret_aqui` → Pega el **Secreto de cliente** que copiaste

4. **Guardar el archivo**

---

## Paso 6: Instalar Dependencias

Abre la terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

Esto instalará `googleapis` y otras dependencias necesarias.

---

## Paso 7: Sincronizar Mi Fitness con Google Fit

**En tu teléfono Android:**

1. Abre la app **Mi Fitness** (o **Mi Fit** si tienes una versión anterior)
2. Ve a **Perfil** (icono de persona en la esquina inferior derecha)
3. Busca **"Datos de terceros"** o **"Third-party data"**
4. Selecciona **"Google Fit"**
5. Toca **"Conectar"** o **"Connect"**
6. Inicia sesión con tu cuenta de Google
7. Autoriza la sincronización

**Nota:** Si no encuentras la opción, puede estar en:
- **Perfil** > **Configuración** > **Datos de terceros**
- O **Perfil** > **Ajustes de la aplicación** > **Sincronizar con la nube** (activar primero)

---

## Paso 8: Probar la Conexión

1. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

2. **Abrir en el navegador:**
   - Ve a: http://localhost:3000/mediciones

3. **Conectar con Google Fit:**
   - Deberías ver un banner que dice **"Conectar con Google Fit"**
   - Haz clic en el botón **"Conectar"**
   - Serás redirigido a Google para autorizar
   - Inicia sesión y autoriza los permisos
   - Serás redirigido de vuelta a QRSalud

4. **Verificar datos:**
   - Si todo está bien, deberías ver tus datos de Mi Fitness aparecer en la página
   - Datos como pasos, frecuencia cardíaca, peso, etc.

---

## 🐛 Solución de Problemas

### Error: "redirect_uri_mismatch"
**Solución:**
- Verifica que la URI en `.env.local` sea exactamente: `http://localhost:3000/api/auth/google-fit/callback`
- Verifica que en Google Cloud Console esté configurada la misma URI
- Asegúrate de que no haya espacios extra o caracteres especiales

### Error: "invalid_client"
**Solución:**
- Verifica que el Client ID y Client Secret en `.env.local` sean correctos
- Asegúrate de que el archivo `.env.local` esté en la raíz del proyecto
- Reinicia el servidor de desarrollo después de cambiar las variables

### No aparecen datos después de conectar
**Solución:**
- Verifica que Mi Fitness esté sincronizado con Google Fit
- Asegúrate de que tu dispositivo haya registrado datos recientes
- Algunos datos pueden tardar unos minutos en sincronizarse
- Revisa la consola del navegador (F12) para ver errores

### No veo la opción de conectar
**Solución:**
- Verifica que el servidor esté corriendo
- Asegúrate de estar en la página `/mediciones`
- Revisa que las variables de entorno estén cargadas correctamente

---

## ✅ Checklist de Configuración

- [ ] Proyecto creado en Google Cloud Console
- [ ] Fitness API habilitada
- [ ] Pantalla de consentimiento OAuth configurada
- [ ] OAuth Client ID creado
- [ ] Variables de entorno configuradas en `.env.local`
- [ ] Dependencias instaladas (`npm install`)
- [ ] Mi Fitness sincronizado con Google Fit
- [ ] Servidor de desarrollo corriendo
- [ ] Conexión probada exitosamente

---

## 📞 ¿Necesitas Ayuda?

Si tienes problemas en algún paso, revisa:
1. La consola del navegador (F12) para errores
2. Los logs del servidor en la terminal
3. La documentación en `docs/CONFIGURACION-GOOGLE-FIT.md`

¡Buena suerte! 🚀

