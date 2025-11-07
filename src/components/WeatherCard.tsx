'use client';

import { useTranslations } from 'next-intl';
import { Thermometer, Cloud, Droplets, Wind, Eye } from 'lucide-react';
import { WeatherData } from '@/types';

interface WeatherCardProps {
  weather: WeatherData;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const t = useTranslations('weatherCard');

  return (
    <div className="theme-bg-secondary theme-border border rounded-xl p-6 theme-shadow animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold theme-text-primary">
          {t('title')}
        </h2>
        <Thermometer className="w-6 h-6 theme-accent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-4xl font-bold theme-accent mb-2">
            {weather.temp}°C
          </div>
          <p className="theme-text-secondary capitalize">
            {weather.description}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Cloud className="w-4 h-4 theme-text-secondary" />
              <span className="theme-text-secondary">{t('clouds')}</span>
            </div>
            <span className="theme-text-primary font-medium">
              {weather.clouds}%
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Droplets className="w-4 h-4 theme-text-secondary" />
              <span className="theme-text-secondary">{t('humidity')}</span>
            </div>
            <span className="theme-text-primary font-medium">
              {weather.humidity}%
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wind className="w-4 h-4 theme-text-secondary" />
              <span className="theme-text-secondary">{t('wind')}</span>
            </div>
            <span className="theme-text-primary font-medium">
              {weather.windSpeed} m/s
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 theme-text-secondary" />
              <span className="theme-text-secondary">{t('pressure')}</span>
            </div>
            <span className="theme-text-primary font-medium">
              {weather.pressure} hPa
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 theme-border border-t">
        <div className="flex justify-between text-sm">
          <div className="text-center">
            <p className="theme-text-secondary">Nascer do Sol</p>
            <p className="theme-text-primary font-medium">{weather.sunrise}</p>
          </div>
          <div className="text-center">
            <p className="theme-text-secondary">Pôr do Sol</p>
            <p className="theme-text-primary font-medium">{weather.sunset}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
