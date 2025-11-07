'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Clock } from 'lucide-react';
import { WeatherCard } from './WeatherCard';
import { AQICard } from './AQICard';
import { LuxCard } from './LuxCard';
import { ThemeCard } from './ThemeCard';
import { MoonCard } from './MoonCard';
import { LuxChart } from './LuxChart';
import { WeatherDetailsCard } from './WeatherDetailsCard';
import { StructuredData } from './StructuredData';
import { DashboardData } from '@/types';
import { formatCityTime, getTimezoneLabel } from '@/utils/timezone';
import { useEffect, useState } from 'react';

interface DashboardProps {
  data: DashboardData;
}

export function Dashboard({ data }: DashboardProps) {
  const t = useTranslations('dashboard');
  const [currentTime, setCurrentTime] = useState(formatCityTime(data.location.timezone));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(formatCityTime(data.location.timezone));
    }, 1000);

    return () => clearInterval(interval);
  }, [data.location.timezone]);

  return (
    <>
      {/* SEO: Structured Data for Google */}
      <StructuredData data={data} />

      <div className="container mx-auto px-4 py-8">
        {/* Cabeçalho com localização */}
        <div className="mb-6 text-center animate-fade-in">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <MapPin className="w-5 h-5 theme-accent" />
          <h2 className="text-2xl font-bold theme-text-primary">
            {data.location.city}, {data.location.country}
          </h2>
        </div>

        {/* Hora local da cidade */}
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Clock className="w-4 h-4 theme-accent" />
          <p className="theme-text-primary font-semibold font-mono tabular-nums">
            {currentTime}
          </p>
          <span className="theme-text-secondary text-xs">
            ({getTimezoneLabel(data.location.timezone)})
          </span>
        </div>

        <p className="theme-text-secondary text-sm">
          {t('realTimeData')} • {t('themeBasedOnLocalTime')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <WeatherCard weather={data.weather} />
        <AQICard aqi={data.aqi} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <LuxCard
          estimatedLux={data.estimatedLux}
          sunrise={data.weather.sunrise}
          sunset={data.weather.sunset}
        />
        <ThemeCard theme={data.theme} />
      </div>

      {/* Card de Fase da Lua e Detalhes Meteorológicos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <MoonCard moon={data.moon} />
        <WeatherDetailsCard weather={data.weather} />
      </div>

      <div className="mb-8">
        <LuxChart
          estimatedLux={data.estimatedLux}
          sunrise={data.weather.sunrise}
          sunset={data.weather.sunset}
          clouds={data.weather.clouds}
        />
      </div>
      </div>
    </>
  );
}
