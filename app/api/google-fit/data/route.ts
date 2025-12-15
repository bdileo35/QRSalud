import { NextRequest, NextResponse } from 'next/server';
import { getFitData } from '@/lib/google-fit';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const accessToken = searchParams.get('access_token');

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Token de acceso requerido' },
      { status: 401 }
    );
  }

  try {
    const data = await getFitData(accessToken);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error obteniendo datos de Google Fit:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener datos de Google Fit' },
      { status: 500 }
    );
  }
}

