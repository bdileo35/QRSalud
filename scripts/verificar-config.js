#!/usr/bin/env node

/**
 * Script para verificar la configuración de Google Fit API
 * Ejecutar con: node scripts/verificar-config.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración de Google Fit API...\n');

// Verificar archivo .env.local
const envPath = path.join(process.cwd(), '.env.local');
const envExists = fs.existsSync(envPath);

if (!envExists) {
  console.log('❌ No se encontró el archivo .env.local');
  console.log('   Crea el archivo .env.local en la raíz del proyecto con:');
  console.log('   NEXT_PUBLIC_GOOGLE_CLIENT_ID=tu_client_id');
  console.log('   GOOGLE_CLIENT_SECRET=tu_client_secret');
  console.log('   NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google-fit/callback\n');
  process.exit(1);
}

console.log('✅ Archivo .env.local encontrado');

// Leer y verificar variables
const envContent = fs.readFileSync(envPath, 'utf8');
const lines = envContent.split('\n');

const requiredVars = {
  'NEXT_PUBLIC_GOOGLE_CLIENT_ID': false,
  'GOOGLE_CLIENT_SECRET': false,
  'NEXT_PUBLIC_GOOGLE_REDIRECT_URI': false,
};

lines.forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key] = trimmed.split('=');
    if (requiredVars.hasOwnProperty(key)) {
      requiredVars[key] = true;
    }
  }
});

let allPresent = true;
Object.entries(requiredVars).forEach(([key, present]) => {
  if (present) {
    console.log(`✅ ${key} configurado`);
  } else {
    console.log(`❌ ${key} NO configurado`);
    allPresent = false;
  }
});

if (!allPresent) {
  console.log('\n⚠️  Faltan algunas variables de entorno');
  console.log('   Revisa el archivo .env.local\n');
  process.exit(1);
}

// Verificar formato de valores
const clientIdMatch = envContent.match(/NEXT_PUBLIC_GOOGLE_CLIENT_ID=(.+)/);
const redirectUriMatch = envContent.match(/NEXT_PUBLIC_GOOGLE_REDIRECT_URI=(.+)/);

if (clientIdMatch && !clientIdMatch[1].includes('.apps.googleusercontent.com')) {
  console.log('\n⚠️  El Client ID debería terminar en .apps.googleusercontent.com');
}

if (redirectUriMatch && !redirectUriMatch[1].includes('localhost:3000')) {
  console.log('\n⚠️  El Redirect URI debería incluir localhost:3000 para desarrollo');
}

// Verificar node_modules
const nodeModulesPath = path.join(process.cwd(), 'node_modules', 'googleapis');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('\n⚠️  googleapis no está instalado');
  console.log('   Ejecuta: npm install\n');
} else {
  console.log('\n✅ googleapis instalado');
}

console.log('\n✅ Configuración básica verificada');
console.log('\n📝 Próximos pasos:');
console.log('   1. Verifica que Fitness API esté habilitada en Google Cloud Console');
console.log('   2. Verifica que OAuth Client ID esté configurado correctamente');
console.log('   3. Sincroniza Mi Fitness con Google Fit en tu teléfono');
console.log('   4. Ejecuta: npm run dev');
console.log('   5. Ve a http://localhost:3000/mediciones y conecta con Google Fit\n');

