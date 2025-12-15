import { NextRequest, NextResponse } from 'next/server';
import { getAuthUrl } from '@/lib/google-fit';

export async function GET(request: NextRequest) {
  try {
    const authUrl = getAuthUrl();
    return NextResponse.json({ authUrl });
  } catch (error) {
    console.error('Error generating auth URL:', error);
    return NextResponse.json(
      { error: 'Error al generar URL de autenticación' },
      { status: 500 }
    );
  }
}

