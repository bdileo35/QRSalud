import { NextRequest, NextResponse } from 'next/server';
import { getTokens } from '@/lib/google-fit';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(new URL('/mediciones?error=auth_cancelled', request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/mediciones?error=no_code', request.url));
  }

  try {
    const tokens = await getTokens(code);
    
    // En producción, guardar tokens en base de datos o sesión segura
    // Por ahora, los retornamos en la URL (no recomendado para producción)
    const redirectUrl = new URL('/mediciones', request.url);
    redirectUrl.searchParams.set('access_token', tokens.access_token || '');
    if (tokens.refresh_token) {
      redirectUrl.searchParams.set('refresh_token', tokens.refresh_token);
    }
    
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Error obteniendo tokens:', error);
    return NextResponse.redirect(new URL('/mediciones?error=token_error', request.url));
  }
}

