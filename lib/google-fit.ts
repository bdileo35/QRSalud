import { google } from 'googleapis';

export interface GoogleFitData {
  pasos?: {
    fecha: string;
    total: number;
    objetivo?: number;
  };
  frecuenciaCardiaca?: {
    fecha: string;
    hora: string;
    valor: number;
    unidad: string;
  };
  presionArterial?: {
    fecha: string;
    hora: string;
    sistolica: number;
    diastolica: number;
    unidad: string;
  };
  peso?: {
    fecha: string;
    hora: string;
    valor: number;
    unidad: string;
  };
  oxigenoSangre?: {
    fecha: string;
    hora: string;
    valor: number;
    unidad: string;
  };
  sueno?: {
    fecha: string;
    duracion: string;
    calidad?: string;
  };
  calorias?: {
    fecha: string;
    total: number;
    objetivo?: number;
  };
}

const oauth2Client = new google.auth.OAuth2(
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI
);

export function getAuthUrl(): string {
  const scopes = [
    'https://www.googleapis.com/auth/fitness.activity.read',
    'https://www.googleapis.com/auth/fitness.heart_rate.read',
    'https://www.googleapis.com/auth/fitness.body.read',
    'https://www.googleapis.com/auth/fitness.sleep.read',
    'https://www.googleapis.com/auth/fitness.blood_pressure.read',
    'https://www.googleapis.com/auth/fitness.oxygen_saturation.read',
  ];

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent',
  });
}

export async function getTokens(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}

export function setCredentials(tokens: any) {
  oauth2Client.setCredentials(tokens);
}

export async function getFitData(accessToken: string): Promise<GoogleFitData> {
  oauth2Client.setCredentials({ access_token: accessToken });
  const fitness = google.fitness('v1');

  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));
  
  const startTimeNanos = startOfDay.getTime() * 1000000;
  const endTimeNanos = endOfDay.getTime() * 1000000;

  const data: GoogleFitData = {};

  try {
    // Obtener pasos
    const stepsResponse = await fitness.users.dataset.aggregate({
      userId: 'me',
      requestBody: {
        aggregateBy: [{
          dataTypeName: 'com.google.step_count.delta',
          dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps'
        }],
        bucketByTime: { durationMillis: '86400000' },
        startTimeMillis: String(startOfDay.getTime()),
        endTimeMillis: String(endOfDay.getTime()),
      },
      auth: oauth2Client,
    });

    if (stepsResponse.data.bucket?.[0]?.dataset?.[0]?.point?.[0]?.value?.[0]?.intVal) {
      data.pasos = {
        fecha: today.toISOString().split('T')[0],
        total: stepsResponse.data.bucket[0].dataset[0].point[0].value[0].intVal || 0,
        objetivo: 3000, // Objetivo por defecto
      };
    }
  } catch (error) {
    console.error('Error obteniendo pasos:', error);
  }

  try {
    // Obtener frecuencia cardíaca
    const heartRateResponse = await fitness.users.dataSources.datasets.get({
      userId: 'me',
      dataSourceId: 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm',
      datasetId: `${startTimeNanos}-${endTimeNanos}`,
      auth: oauth2Client,
    });

    const points = heartRateResponse.data.point || [];
    if (points.length > 0) {
      const latest = points[points.length - 1];
      const timestamp = latest.startTimeNanos ? Number(latest.startTimeNanos) / 1000000 : Date.now();
      const date = new Date(timestamp);
      
      data.frecuenciaCardiaca = {
        fecha: date.toISOString().split('T')[0],
        hora: date.toTimeString().split(' ')[0].substring(0, 5),
        valor: latest.value?.[0]?.fpVal || 0,
        unidad: 'LPM',
      };
    }
  } catch (error) {
    console.error('Error obteniendo frecuencia cardíaca:', error);
  }

  try {
    // Obtener peso
    const weightResponse = await fitness.users.dataSources.datasets.get({
      userId: 'me',
      dataSourceId: 'derived:com.google.weight:com.google.android.gms:merge_weight',
      datasetId: `${startTimeNanos}-${endTimeNanos}`,
      auth: oauth2Client,
    });

    const points = weightResponse.data.point || [];
    if (points.length > 0) {
      const latest = points[points.length - 1];
      const timestamp = latest.startTimeNanos ? Number(latest.startTimeNanos) / 1000000 : Date.now();
      const date = new Date(timestamp);
      
      data.peso = {
        fecha: date.toISOString().split('T')[0],
        hora: date.toTimeString().split(' ')[0].substring(0, 5),
        valor: latest.value?.[0]?.fpVal || 0,
        unidad: 'kg',
      };
    }
  } catch (error) {
    console.error('Error obteniendo peso:', error);
  }

  try {
    // Obtener oxígeno en sangre
    const spo2Response = await fitness.users.dataSources.datasets.get({
      userId: 'me',
      dataSourceId: 'derived:com.google.oxygen_saturation:com.google.android.gms:merge_oxygen_saturation',
      datasetId: `${startTimeNanos}-${endTimeNanos}`,
      auth: oauth2Client,
    });

    const points = spo2Response.data.point || [];
    if (points.length > 0) {
      const latest = points[points.length - 1];
      const timestamp = latest.startTimeNanos ? Number(latest.startTimeNanos) / 1000000 : Date.now();
      const date = new Date(timestamp);
      
      data.oxigenoSangre = {
        fecha: date.toISOString().split('T')[0],
        hora: date.toTimeString().split(' ')[0].substring(0, 5),
        valor: latest.value?.[0]?.fpVal || 0,
        unidad: '%',
      };
    }
  } catch (error) {
    console.error('Error obteniendo oxígeno en sangre:', error);
  }

  try {
    // Obtener calorías
    const caloriesResponse = await fitness.users.dataset.aggregate({
      userId: 'me',
      requestBody: {
        aggregateBy: [{
          dataTypeName: 'com.google.calories.expended',
          dataSourceId: 'derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended'
        }],
        bucketByTime: { durationMillis: '86400000' },
        startTimeMillis: String(startOfDay.getTime()),
        endTimeMillis: String(endOfDay.getTime()),
      },
      auth: oauth2Client,
    });

    if (caloriesResponse.data.bucket?.[0]?.dataset?.[0]?.point?.[0]?.value?.[0]?.fpVal) {
      data.calorias = {
        fecha: today.toISOString().split('T')[0],
        total: Math.round(caloriesResponse.data.bucket[0].dataset[0].point[0].value[0].fpVal || 0),
        objetivo: 2000, // Objetivo por defecto
      };
    }
  } catch (error) {
    console.error('Error obteniendo calorías:', error);
  }

  return data;
}

