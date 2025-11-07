/**
 * StructuredData Component
 *
 * Generates JSON-LD structured data for SEO
 * Helps Google understand weather, location, and moon phase data
 */

import { DashboardData } from '@/types';

interface StructuredDataProps {
  data: DashboardData;
}

export function StructuredData({ data }: StructuredDataProps) {
  const { weather, location, aqi, moon } = data;

  // Weather Forecast Schema
  const weatherSchema = {
    '@context': 'https://schema.org',
    '@type': 'WeatherForecast',
    name: `Previsão do Tempo para ${location.city}, ${location.country}`,
    description: `Clima atual em ${location.city}: ${weather.description}. Temperatura: ${weather.temp}°C, Umidade: ${weather.humidity}%, Vento: ${weather.windSpeed} m/s`,
    datePublished: new Date().toISOString(),
    provider: {
      '@type': 'Organization',
      name: 'Solara',
      url: typeof window !== 'undefined' ? window.location.origin : 'https://solara.com',
    },
    location: {
      '@type': 'Place',
      name: `${location.city}, ${location.country}`,
    },
    temperature: {
      '@type': 'QuantitativeValue',
      value: weather.temp,
      unitCode: 'CEL',
    },
    humidity: {
      '@type': 'QuantitativeValue',
      value: weather.humidity,
      unitCode: 'P1',
    },
    windSpeed: {
      '@type': 'QuantitativeValue',
      value: weather.windSpeed,
      unitCode: 'MTS',
    },
    atmosphericPressure: {
      '@type': 'QuantitativeValue',
      value: weather.pressure,
      unitCode: 'HPA',
    },
  };

  // Air Quality Schema
  const airQualitySchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `Qualidade do Ar em ${location.city}`,
    description: `Dados de qualidade do ar: PM2.5: ${aqi.pm25} μg/m³, PM10: ${aqi.pm10} μg/m³`,
    spatialCoverage: {
      '@type': 'Place',
      name: `${location.city}, ${location.country}`,
    },
    temporalCoverage: new Date().toISOString(),
    variableMeasured: [
      {
        '@type': 'PropertyValue',
        name: 'PM2.5',
        value: aqi.pm25,
        unitText: 'μg/m³',
      },
      {
        '@type': 'PropertyValue',
        name: 'PM10',
        value: aqi.pm10,
        unitText: 'μg/m³',
      },
    ],
  };

  // Moon Phase Schema
  const moonSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `Fase da Lua: ${moon.phaseName}`,
    description: `Lua ${moon.phaseName.toLowerCase()} com ${Math.round(moon.illumination * 100)}% de iluminação`,
    startDate: new Date().toISOString(),
    location: {
      '@type': 'Place',
      name: 'Global',
    },
    eventStatus: 'https://schema.org/EventScheduled',
  };

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Solara',
    description: 'Monitoramento de clima, qualidade do ar e luminosidade em tempo real',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://solara.com',
    logo: typeof window !== 'undefined' ? `${window.location.origin}/logo-solara.png` : 'https://solara.com/logo-solara.png',
    sameAs: [],
  };

  // FAQ Schema for common questions
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Qual a fase da lua hoje?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Hoje a lua está na fase ${moon.phaseName.toLowerCase()} com ${Math.round(moon.illumination * 100)}% de iluminação`,
        },
      },
      {
        '@type': 'Question',
        name: `Qual o clima em ${location.city} hoje?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `O clima em ${location.city} está ${weather.description} com temperatura de ${weather.temp}°C, umidade de ${weather.humidity}% e vento de ${weather.windSpeed} m/s.`,
        },
      },
      {
        '@type': 'Question',
        name: `Vai chover em ${location.city} hoje?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: weather.rain && weather.rain > 0
            ? `Sim, está chovendo em ${location.city}. Precipitação registrada: ${weather.rain} mm na última hora.`
            : `Não há previsão de chuva em ${location.city} no momento. Condição atual: ${weather.description}.`,
        },
      },
      {
        '@type': 'Question',
        name: `Qual a qualidade do ar em ${location.city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `A qualidade do ar em ${location.city} está com PM2.5 de ${aqi.pm25} μg/m³ e PM10 de ${aqi.pm10} μg/m³.`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(weatherSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(airQualitySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(moonSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

