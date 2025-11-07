/**
 * SEO Utilities
 *
 * Generate dynamic metadata for better search engine optimization
 */

import { Metadata } from 'next';
import { DashboardData } from '@/types';

interface GenerateMetadataParams {
  data: DashboardData;
  locale: string;
}

export function generateWeatherMetadata({ data, locale }: GenerateMetadataParams): Metadata {
  const { weather, location, moon } = data;
  
  const isPortuguese = locale === 'pt';
  
  // Generate dynamic title with keywords
  const title = isPortuguese
    ? `${location.city} Clima Agora: ${weather.temp}°C, ${weather.description} | Solara`
    : `${location.city} Weather Now: ${weather.temp}°C, ${weather.description} | Solara`;

  // Generate rich description with keywords
  const description = isPortuguese
    ? `Clima em ${location.city}, ${location.country} agora: ${weather.description}, ${weather.temp}°C. ` +
      `Umidade ${weather.humidity}%, vento ${weather.windSpeed} m/s. ` +
      `Fase da lua: ${moon.phaseName} (${Math.round(moon.illumination * 100)}% iluminada). ` +
      `Previsão do tempo, qualidade do ar e luminosidade em tempo real.`
    : `Weather in ${location.city}, ${location.country} now: ${weather.description}, ${weather.temp}°C. ` +
      `Humidity ${weather.humidity}%, wind ${weather.windSpeed} m/s. ` +
      `Moon phase: ${moon.phaseName} (${Math.round(moon.illumination * 100)}% illuminated). ` +
      `Real-time weather forecast, air quality and luminosity.`;

  // Keywords optimized for search
  const keywords = isPortuguese
    ? [
        `clima ${location.city.toLowerCase()}`,
        `tempo ${location.city.toLowerCase()}`,
        `previsão do tempo ${location.city.toLowerCase()}`,
        `temperatura ${location.city.toLowerCase()}`,
        `vai chover ${location.city.toLowerCase()}`,
        `fase da lua hoje`,
        `lua hoje`,
        `qualidade do ar ${location.city.toLowerCase()}`,
        `nascer do sol ${location.city.toLowerCase()}`,
        `pôr do sol ${location.city.toLowerCase()}`,
        weather.description,
        moon.phaseName.toLowerCase(),
        'clima agora',
        'tempo agora',
        'previsão tempo',
      ]
    : [
        `weather ${location.city.toLowerCase()}`,
        `${location.city.toLowerCase()} weather`,
        `weather forecast ${location.city.toLowerCase()}`,
        `temperature ${location.city.toLowerCase()}`,
        `will it rain ${location.city.toLowerCase()}`,
        'moon phase today',
        'moon today',
        `air quality ${location.city.toLowerCase()}`,
        `sunrise ${location.city.toLowerCase()}`,
        `sunset ${location.city.toLowerCase()}`,
        weather.description,
        moon.phaseName.toLowerCase(),
        'weather now',
        'current weather',
        'weather forecast',
      ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isPortuguese ? 'pt_BR' : 'en_US',
      siteName: 'Solara',
      images: [
        {
          url: '/logo-solara.png',
          width: 1200,
          height: 630,
          alt: `Solara - ${location.city} Weather`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/logo-solara.png'],
    },
    alternates: {
      canonical: `/${location.city.toLowerCase().replace(/\s+/g, '-')}`,
      languages: {
        'pt-BR': `/pt/${location.city.toLowerCase().replace(/\s+/g, '-')}`,
        'en-US': `/en/${location.city.toLowerCase().replace(/\s+/g, '-')}`,
      },
    },
  };
}

export function generateHomeMetadata(locale: string): Metadata {
  const isPortuguese = locale === 'pt';
  
  const title = isPortuguese
    ? 'Solara - Clima, Fase da Lua e Qualidade do Ar em Tempo Real'
    : 'Solara - Weather, Moon Phase and Air Quality in Real Time';

  const description = isPortuguese
    ? 'Consulte o clima, temperatura, fase da lua, qualidade do ar e luminosidade de qualquer cidade do mundo em tempo real. ' +
      'Previsão do tempo precisa, nascer e pôr do sol, umidade, vento e muito mais.'
    : 'Check weather, temperature, moon phase, air quality and luminosity of any city in the world in real time. ' +
      'Accurate weather forecast, sunrise and sunset, humidity, wind and more.';

  const keywords = isPortuguese
    ? [
        'clima',
        'tempo',
        'previsão do tempo',
        'fase da lua',
        'lua hoje',
        'qualidade do ar',
        'temperatura',
        'vai chover',
        'nascer do sol',
        'pôr do sol',
        'umidade',
        'vento',
        'luminosidade',
        'clima agora',
        'tempo agora',
      ]
    : [
        'weather',
        'weather forecast',
        'moon phase',
        'moon today',
        'air quality',
        'temperature',
        'will it rain',
        'sunrise',
        'sunset',
        'humidity',
        'wind',
        'luminosity',
        'current weather',
        'weather now',
      ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isPortuguese ? 'pt_BR' : 'en_US',
      siteName: 'Solara',
      images: ['/logo-solara.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/logo-solara.png'],
    },
  };
}

// Popular cities for sitemap generation
export const popularCities = [
  // Brasil
  { name: 'São Paulo', country: 'BR', lat: -23.5505, lon: -46.6333 },
  { name: 'Rio de Janeiro', country: 'BR', lat: -22.9068, lon: -43.1729 },
  { name: 'Brasília', country: 'BR', lat: -15.8267, lon: -47.9218 },
  { name: 'Salvador', country: 'BR', lat: -12.9714, lon: -38.5014 },
  { name: 'Fortaleza', country: 'BR', lat: -3.7172, lon: -38.5433 },
  { name: 'Belo Horizonte', country: 'BR', lat: -19.9167, lon: -43.9345 },
  { name: 'Manaus', country: 'BR', lat: -3.1190, lon: -60.0217 },
  { name: 'Curitiba', country: 'BR', lat: -25.4284, lon: -49.2733 },
  { name: 'Recife', country: 'BR', lat: -8.0476, lon: -34.8770 },
  { name: 'Porto Alegre', country: 'BR', lat: -30.0346, lon: -51.2177 },
  { name: 'Itabuna', country: 'BR', lat: -14.7858, lon: -39.2797 },
  
  // Internacional
  { name: 'New York', country: 'US', lat: 40.7128, lon: -74.0060 },
  { name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 },
  { name: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522 },
  { name: 'Tokyo', country: 'JP', lat: 35.6762, lon: 139.6503 },
  { name: 'Sydney', country: 'AU', lat: -33.8688, lon: 151.2093 },
  { name: 'Dubai', country: 'AE', lat: 25.2048, lon: 55.2708 },
  { name: 'Singapore', country: 'SG', lat: 1.3521, lon: 103.8198 },
  { name: 'Los Angeles', country: 'US', lat: 34.0522, lon: -118.2437 },
  { name: 'Miami', country: 'US', lat: 25.7617, lon: -80.1918 },
  { name: 'Barcelona', country: 'ES', lat: 41.3851, lon: 2.1734 },
];

