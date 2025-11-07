import { NextRequest, NextResponse } from 'next/server';
import { DashboardData, WeatherData, AQIData, ThemeData, MoonData } from '@/types';

// Cache para evitar muitas chamadas às APIs externas
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos
const cache = new Map<string, { data: DashboardData; timestamp: number }>();

export const dynamic = 'force-dynamic';

/**
 * Calcula a fase da lua baseado na data
 * Algoritmo simplificado baseado no ciclo lunar de ~29.53 dias
 */
function calculateMoonPhase(date: Date = new Date()): MoonData {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Fórmula simplificada para calcular a fase da lua
  let c = 0;
  let e = 0;
  let jd = 0;

  if (month < 3) {
    const yearAdjusted = year - 1;
    const monthAdjusted = month + 12;
    c = yearAdjusted / 100;
    e = 2 - c + Math.floor(c / 4);
    jd = Math.floor(365.25 * (yearAdjusted + 4716)) + Math.floor(30.6001 * (monthAdjusted + 1)) + day + e - 1524.5;
  } else {
    c = year / 100;
    e = 2 - c + Math.floor(c / 4);
    jd = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + e - 1524.5;
  }

  // Calcular dias desde a lua nova conhecida (01/01/2000)
  const daysSinceNew = jd - 2451549.5;
  const newMoons = daysSinceNew / 29.53;
  const phase = newMoons - Math.floor(newMoons);

  // Calcular iluminação (0-100%)
  const illumination = Math.round((1 - Math.cos(phase * 2 * Math.PI)) * 50);

  // Determinar nome da fase
  let phaseName = '';
  if (phase < 0.0625 || phase >= 0.9375) {
    phaseName = 'Nova';
  } else if (phase < 0.1875) {
    phaseName = 'Crescente';
  } else if (phase < 0.3125) {
    phaseName = 'Quarto Crescente';
  } else if (phase < 0.4375) {
    phaseName = 'Crescente Gibosa';
  } else if (phase < 0.5625) {
    phaseName = 'Cheia';
  } else if (phase < 0.6875) {
    phaseName = 'Minguante Gibosa';
  } else if (phase < 0.8125) {
    phaseName = 'Quarto Minguante';
  } else {
    phaseName = 'Minguante';
  }

  return {
    phase,
    phaseName,
    illumination,
  };
}

interface OpenWeatherResponse {
  name: string; // Nome da cidade
  timezone: number; // Offset em segundos do UTC
  sys: {
   country: string; // Código do país
    sunrise: number;
    sunset: number;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    id: number; // Código da condição climática
    main: string; // Categoria principal (Rain, Snow, Clear, etc)
    description: string;
  }>;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
  };
  visibility: number;
  rain?: {
    '1h': number;
  };
  snow?: {
    '1h': number;
  };
}

interface OpenWeatherAirPollutionResponse {
  list: Array<{
    main: {
      aqi: number; // 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor
    };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
    dt: number;
  }>;
}

function calculateEstimatedLux(
  clouds: number,
  sunrise: number,
  sunset: number,
  timezone: number
): number {
  // Calcular hora atual na cidade pesquisada (em minutos desde meia-noite)
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const cityTime = new Date(utc + (timezone * 1000));
  const currentTimeInMinutes = cityTime.getUTCHours() * 60 + cityTime.getUTCMinutes();

  // Converter timestamps UTC para minutos do dia no timezone da cidade
  const sunriseUTC = new Date(sunrise * 1000);
  const sunsetUTC = new Date(sunset * 1000);

  // Ajustar para o timezone da cidade
  const sunriseCity = new Date(sunriseUTC.getTime() + (timezone * 1000));
  const sunsetCity = new Date(sunsetUTC.getTime() + (timezone * 1000));

  const sunriseMinutes = sunriseCity.getUTCHours() * 60 + sunriseCity.getUTCMinutes();
  const sunsetMinutes = sunsetCity.getUTCHours() * 60 + sunsetCity.getUTCMinutes();

  // Se for noite (antes do nascer do sol ou depois do pôr do sol)
  if (currentTimeInMinutes < sunriseMinutes || currentTimeInMinutes > sunsetMinutes) {
    // Luz artificial mínima à noite (0-50 lux)
    return Math.round(10 + (currentTimeInMinutes % 40));
  }

  // Calcular progresso do dia (0 a 1)
  const dayLengthMinutes = sunsetMinutes - sunriseMinutes;
  const minutesSinceSunrise = currentTimeInMinutes - sunriseMinutes;
  const dayProgress = minutesSinceSunrise / dayLengthMinutes;

  // Curva senoidal para simular a intensidade solar (pico ao meio-dia)
  const solarIntensity = Math.sin(dayProgress * Math.PI);

  // Lux máximo ao meio-dia em dia claro
  const maxLux = 100000;

  // Fator de redução baseado na cobertura de nuvens
  // 0% nuvens = 100% luz, 100% nuvens = 10% luz (ainda há luz difusa)
  const cloudFactor = Math.max(0.1, 1 - (clouds / 100) * 0.9);

  // Calcular lux final
  const calculatedLux = maxLux * solarIntensity * cloudFactor;

  return Math.round(Math.max(0, calculatedLux));
}

function determineTheme(
  hour: number,
  sunrise: number,
  sunset: number,
  clouds: number,
  timezone: number
): ThemeData {
  // Converter timestamps UTC para hora local da cidade
  const sunriseUTC = new Date(sunrise * 1000);
  const sunsetUTC = new Date(sunset * 1000);

  // Ajustar para o timezone da cidade
  const sunriseCity = new Date(sunriseUTC.getTime() + (timezone * 1000));
  const sunsetCity = new Date(sunsetUTC.getTime() + (timezone * 1000));

  const sunriseHour = sunriseCity.getUTCHours();
  const sunsetHour = sunsetCity.getUTCHours();
  
  // Golden hour: 1 hora antes e depois do pôr do sol
  const goldenStart = sunsetHour - 1;
  const goldenEnd = sunsetHour + 1;
  
  if (hour >= 5 && hour < sunriseHour + 2) {
    return {
      id: 'morning',
      name: 'Manhã',
      intensity: Math.max(0.3, 1 - clouds / 100),
    };
  } else if (hour >= goldenStart && hour <= goldenEnd) {
    return {
      id: 'golden',
      name: 'Golden Hour',
      intensity: Math.max(0.7, 1 - clouds / 150),
    };
  } else if (hour >= sunriseHour + 2 && hour < goldenStart) {
    return {
      id: 'day',
      name: 'Dia',
      intensity: Math.max(0.5, 1 - clouds / 200),
    };
  } else {
    return {
      id: 'night',
      name: 'Noite',
      intensity: 0.2,
    };
  }
}



async function fetchWeatherData(lat: number, lon: number): Promise<{ weather: WeatherData; location: { city: string; country: string; timezone: number }; sunriseTimestamp: number; sunsetTimestamp: number }> {
  const apiKey = process.env.OPENWEATHER_KEY;

  if (!apiKey) {
    throw new Error('OPENWEATHER_KEY não configurada. Configure a chave da API no arquivo .env.local');
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Solara/1.0',
    },
  });

  if (!response.ok) {
    throw new Error(`Erro na API do OpenWeatherMap: ${response.status} ${response.statusText}`);
  }

  const data: OpenWeatherResponse = await response.json();

  // Calcular sunrise/sunset no timezone da cidade
  const sunriseUTC = new Date(data.sys.sunrise * 1000);
  const sunsetUTC = new Date(data.sys.sunset * 1000);

  // Ajustar para o timezone da cidade
  const sunriseCity = new Date(sunriseUTC.getTime() + (data.timezone * 1000));
  const sunsetCity = new Date(sunsetUTC.getTime() + (data.timezone * 1000));

  const sunriseFormatted = sunriseCity.toISOString().substring(11, 16); // "HH:MM"
  const sunsetFormatted = sunsetCity.toISOString().substring(11, 16); // "HH:MM"

  return {
    weather: {
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      description: data.weather[0]?.description || 'condições não disponíveis',
      weatherCode: data.weather[0]?.id || 800,
      weatherMain: data.weather[0]?.main || 'Clear',
      clouds: data.clouds?.all || 0,
      sunrise: sunriseFormatted,
      sunset: sunsetFormatted,
      humidity: data.main.humidity,
      windSpeed: data.wind?.speed || 0,
      pressure: data.main.pressure,
      visibility: data.visibility || 10000,
      rain: data.rain?.['1h'],
      snow: data.snow?.['1h'],
    },
    location: {
      city: data.name,
      country: data.sys.country,
      timezone: data.timezone,
    },
    sunriseTimestamp: data.sys.sunrise,
    sunsetTimestamp: data.sys.sunset,
  };
}

async function fetchAQIData(lat: number, lon: number): Promise<AQIData> {
  const apiKey = process.env.OPENWEATHER_KEY;

  if (!apiKey) {
    throw new Error('OPENWEATHER_KEY não configurada. Configure a chave da API no arquivo .env.local');
  }

  // Usando API Air Pollution do OpenWeatherMap
  const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Solara/1.0',
    },
  });

  if (!response.ok) {
    throw new Error(`Erro na API Air Pollution do OpenWeatherMap: ${response.status} ${response.statusText}`);
  }

  const data: OpenWeatherAirPollutionResponse = await response.json();

  if (data.list.length === 0) {
    throw new Error('Nenhum dado de qualidade do ar disponível para esta localização');
  }

  const airData = data.list[0];
  const pm25 = airData.components.pm2_5;
  const pm10 = airData.components.pm10;

  // Determinar localização baseada nas coordenadas (simplificado)
  const location = `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`;

  return {
    location,
    pm25: Math.round(pm25 * 10) / 10,
    pm10: Math.round(pm10 * 10) / 10,
    measurements: [
      {
        parameter: 'pm25',
        value: Math.round(pm25 * 10) / 10,
        unit: 'μg/m³',
        lastUpdated: new Date(airData.dt * 1000).toISOString(),
      },
      {
        parameter: 'pm10',
        value: Math.round(pm10 * 10) / 10,
        unit: 'μg/m³',
        lastUpdated: new Date(airData.dt * 1000).toISOString(),
      },
    ],
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = parseFloat(searchParams.get('lat') || '0');
    const lon = parseFloat(searchParams.get('lon') || '0');

    if (lat === 0 && lon === 0) {
      return NextResponse.json(
        { error: 'Coordenadas inválidas. Forneça latitude e longitude válidas.' },
        { status: 400 }
      );
    }

    // Verificar cache
    const cacheKey = `${lat},${lon}`;
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json(cached.data);
    }

    // Buscar dados das APIs externas (OpenWeatherMap)
    const [weatherResponse, aqiData] = await Promise.all([
      fetchWeatherData(lat, lon),
      fetchAQIData(lat, lon),
    ]);

    // Usar timestamps originais da API (já estão em UTC)
    const sunriseTimestamp = weatherResponse.sunriseTimestamp;
    const sunsetTimestamp = weatherResponse.sunsetTimestamp;
    const timezone = weatherResponse.location.timezone;

    // Calcular hora atual na cidade pesquisada
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const cityTime = new Date(utc + (timezone * 1000));
    const currentHour = cityTime.getHours();

    const estimatedLux = calculateEstimatedLux(
      weatherResponse.weather.clouds,
      sunriseTimestamp,
      sunsetTimestamp,
      timezone
    );

    const theme = determineTheme(
      currentHour,
      sunriseTimestamp,
      sunsetTimestamp,
      weatherResponse.weather.clouds,
      timezone
    );

    // Calcular fase da lua usando a hora da cidade
    const moonData = calculateMoonPhase(cityTime);

    const dashboardData: DashboardData = {
      weather: weatherResponse.weather,
      aqi: aqiData,
      estimatedLux,
      theme,
      moon: moonData,
      location: weatherResponse.location,
    };

    // Salvar no cache
    cache.set(cacheKey, {
      data: dashboardData,
      timestamp: Date.now(),
    });

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('❌ Erro na API dashboard:', error);

    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao buscar dados';

    return NextResponse.json(
      {
        error: 'Erro ao buscar dados climáticos e de qualidade do ar',
        details: errorMessage,
        hint: 'Verifique se a chave OPENWEATHER_KEY está configurada corretamente no arquivo .env.local'
      },
      { status: 500 }
    );
  }
}
