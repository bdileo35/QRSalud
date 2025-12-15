# ⚡ Configuración Rápida de Google Fit

## 🎯 Resumen Rápido

1. **Google Cloud Console** → Crear proyecto → Habilitar Fitness API → Crear OAuth Client ID
2. **Copiar credenciales** → Crear `.env.local` con las credenciales
3. **Instalar dependencias** → `npm install`
4. **Sincronizar Mi Fitness** → En la app móvil, conectar con Google Fit
5. **Probar** → `npm run dev` → Ir a `/mediciones` → Conectar

---

## 📋 Checklist Visual

### ✅ Paso 1: Google Cloud Console (5 minutos)

- [ ] Ir a https://console.cloud.google.com/
- [ ] Crear proyecto "QRSalud"
- [ ] Habilitar "Fitness API"
- [ ] Configurar pantalla de consentimiento OAuth
- [ ] Crear OAuth Client ID (tipo: Web application)
- [ ] Copiar Client ID y Client Secret

**URIs a configurar:**
- JavaScript origins: `http://localhost:3000`
- Redirect URIs: `http://localhost:3000/api/auth/google-fit/callback`

---

### ✅ Paso 2: Variables de Entorno (2 minutos)

Crear archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=tu_client_id_aqui.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu_client_secret_aqui
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google-fit/callback
```

**Verificar configuración:**
```bash
npm run verify-config
```

---

### ✅ Paso 3: Instalar Dependencias (1 minuto)

```bash
npm install
```

---

### ✅ Paso 4: Sincronizar Mi Fitness (2 minutos)

**En tu teléfono Android:**

1. Abre **Mi Fitness**
2. Ve a **Perfil** → **Datos de terceros**
3. Selecciona **Google Fit**
4. Conecta tu cuenta de Google
5. Autoriza la sincronización

---

### ✅ Paso 5: Probar (1 minuto)

```bash
npm run dev
```

1. Abre http://localhost:3000/mediciones
2. Haz clic en **"Conectar con Google Fit"**
3. Autoriza en Google
4. ¡Deberías ver tus datos!

---

## 🔗 Enlaces Rápidos

- **Google Cloud Console:** https://console.cloud.google.com/
- **Fitness API:** https://console.cloud.google.com/apis/library/fitness.googleapis.com
- **Credenciales OAuth:** https://console.cloud.google.com/apis/credentials
- **Guía detallada:** `scripts/setup-google-fit.md`

---

## 🐛 Problemas Comunes

| Error | Solución |
|-------|----------|
| `redirect_uri_mismatch` | Verifica que la URI en `.env.local` coincida exactamente con Google Cloud Console |
| `invalid_client` | Verifica que Client ID y Secret sean correctos |
| No aparecen datos | Verifica que Mi Fitness esté sincronizado con Google Fit |
| No veo el botón de conectar | Verifica que el servidor esté corriendo y estés en `/mediciones` |

---

## 📞 ¿Necesitas ayuda paso a paso?

Consulta la guía detallada en: `scripts/setup-google-fit.md`

¡Listo para empezar! 🚀

