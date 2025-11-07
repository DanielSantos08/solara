export interface WeatherData {
  temp: number;
  feelsLike: number;
  description: string;
  weatherCode: number; // Código da condição climática (OpenWeatherMap)
  weatherMain: string; // Categoria principal (Rain, Snow, Clear, etc)
  clouds: number;
  sunrise: string;
  sunset: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  rain?: number; // mm na última hora
  snow?: number; // mm na última hora
}

export interface MoonData {
  phase: number; // 0-1 (0 = nova, 0.25 = crescente, 0.5 = cheia, 0.75 = minguante)
  phaseName: string; // Nome da fase em português
  illumination: number; // Porcentagem de iluminação (0-100)
}

export interface AQIData {
  location: string;
  pm25: number;
  pm10: number;
  measurements: Array<{
    parameter: string;
    value: number;
    unit: string;
    lastUpdated: string;
  }>;
}

export interface ThemeData {
  id: 'morning' | 'day' | 'golden' | 'night';
  name: string;
  intensity: number;
}

export interface DashboardData {
  weather: WeatherData;
  aqi: AQIData;
  estimatedLux: number;
  theme: ThemeData;
  moon: MoonData;
  location: {
    city: string;
    country: string;
    timezone: number; // Offset em segundos do UTC
  };
}

export interface LocationData {
  lat: number;
  lon: number;
  city?: string;
}

export interface ChartDataPoint {
  time: string;
  lux: number;
}

export interface ThemeConfig {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  gradient?: string;
}
