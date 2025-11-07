'use client';

import { useTranslations } from 'next-intl';
import { Thermometer, Eye, CloudRain, CloudSnow } from 'lucide-react';
import { WeatherData } from '@/types';

interface WeatherDetailsCardProps {
  weather: WeatherData;
}

export function WeatherDetailsCard({ weather }: WeatherDetailsCardProps) {
  const t = useTranslations('weatherDetailsCard');
  const visibilityKm = (weather.visibility / 1000).toFixed(1);

  const useVisibilityQuality = (visibility: number) => {
    if (visibility >= 10000) return { text: t('excellent'), color: 'text-green-600' };
    if (visibility >= 5000) return { text: t('good'), color: 'text-blue-600' };
    if (visibility >= 2000) return { text: t('moderate'), color: 'text-yellow-600' };
    return { text: t('low'), color: 'text-red-600' };
  };

  const visibilityQuality = useVisibilityQuality(weather.visibility);

  return (
    <div className="theme-bg-secondary theme-border border rounded-xl p-6 theme-shadow animate-slide-up">
      <h3 className="text-xl font-bold theme-text-primary mb-4">
        {t('title')}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-start space-x-3 p-3 theme-bg-primary rounded-lg">
          <div className="theme-accent-light-bg p-2 rounded-lg">
            <Thermometer className="w-5 h-5 theme-accent" />
          </div>
          <div className="flex-1">
            <p className="text-sm theme-text-secondary">{t('feelsLike')}</p>
            <p className="text-2xl font-bold theme-text-primary">
              {weather.feelsLike}°C
            </p>
            <p className="text-xs theme-text-secondary mt-1">
              {weather.feelsLike > weather.temp
                ? `${(weather.feelsLike - weather.temp).toFixed(1)}°C ${t('warmer')}`
                : weather.feelsLike < weather.temp
                ? `${(weather.temp - weather.feelsLike).toFixed(1)}°C ${t('colder')}`
                : t('sameAsTemp')}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-3 theme-bg-primary rounded-lg">
          <div className="theme-accent-light-bg p-2 rounded-lg">
            <Eye className="w-5 h-5 theme-accent" />
          </div>
          <div className="flex-1">
            <p className="text-sm theme-text-secondary">{t('visibility')}</p>
            <p className="text-2xl font-bold theme-text-primary">
              {visibilityKm} km
            </p>
            <p className={`text-xs font-semibold mt-1 ${visibilityQuality.color}`}>
              {visibilityQuality.text}
            </p>
          </div>
        </div>

        {weather.rain !== undefined && weather.rain > 0 && (
          <div className="flex items-start space-x-3 p-3 theme-bg-primary rounded-lg">
            <div className="bg-blue-100 p-2 rounded-lg">
              <CloudRain className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm theme-text-secondary">{t('rain')}</p>
              <p className="text-2xl font-bold theme-text-primary">
                {weather.rain.toFixed(1)} mm
              </p>
              <p className="text-xs theme-text-secondary mt-1">
                {weather.rain < 2.5
                  ? t('lightRain')
                  : weather.rain < 10
                  ? t('moderateRain')
                  : t('heavyRain')}
              </p>
            </div>
          </div>
        )}

        {weather.snow !== undefined && weather.snow > 0 && (
          <div className="flex items-start space-x-3 p-3 theme-bg-primary rounded-lg">
            <div className="bg-cyan-100 p-2 rounded-lg">
              <CloudSnow className="w-5 h-5 text-cyan-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm theme-text-secondary">{t('snow')}</p>
              <p className="text-2xl font-bold theme-text-primary">
                {weather.snow.toFixed(1)} mm
              </p>
              <p className="text-xs theme-text-secondary mt-1">
                {weather.snow < 2.5
                  ? t('lightSnow')
                  : weather.snow < 10
                  ? t('moderateSnow')
                  : t('heavySnow')}
              </p>
            </div>
          </div>
        )}
      </div>

      {(!weather.rain || weather.rain === 0) && (!weather.snow || weather.snow === 0) && (
        <div className="mt-4 p-3 theme-bg-primary rounded-lg text-center">
          <p className="text-sm theme-text-secondary">
            ☀️ {t('noPrecipitation')}
          </p>
        </div>
      )}
    </div>
  );
}

