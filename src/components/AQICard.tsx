'use client';

import { useTranslations } from 'next-intl';
import { Activity, MapPin } from 'lucide-react';
import { AQIData } from '@/types';

interface AQICardProps {
  aqi: AQIData;
}

function useAQIStatus(pm25: number) {
  const t = useTranslations('aqiCard');

  if (pm25 <= 12) return { status: t('good'), color: 'text-green-600', bg: 'bg-green-100' };
  if (pm25 <= 35) return { status: t('moderate'), color: 'text-yellow-600', bg: 'bg-yellow-100' };
  if (pm25 <= 55) return { status: t('unhealthy'), color: 'text-orange-600', bg: 'bg-orange-100' };
  if (pm25 <= 150) return { status: t('veryUnhealthy'), color: 'text-red-600', bg: 'bg-red-100' };
  return { status: t('hazardous'), color: 'text-purple-600', bg: 'bg-purple-100' };
}

export function AQICard({ aqi }: AQICardProps) {
  const t = useTranslations('aqiCard');
  const pm25Status = useAQIStatus(aqi.pm25);
  
  return (
    <div className="theme-bg-secondary theme-border border rounded-xl p-6 theme-shadow animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold theme-text-primary">
          {t('title')}
        </h2>
        <Activity className="w-6 h-6 theme-accent" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-3">
          <MapPin className="w-4 h-4 theme-text-secondary" />
          <span className="theme-text-secondary text-sm">{aqi.location}</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className={`text-2xl font-bold ${pm25Status.color} mb-1`}>
              {aqi.pm25}
            </div>
            <p className="theme-text-secondary text-sm">PM2.5 (μg/m³)</p>
            <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${pm25Status.bg} ${pm25Status.color} mt-2`}>
              {pm25Status.status}
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold theme-text-primary mb-1">
              {aqi.pm10}
            </div>
            <p className="theme-text-secondary text-sm">PM10 (μg/m³)</p>
          </div>
        </div>

        {aqi.measurements.length > 0 && (
          <div className="mt-4 pt-4 theme-border border-t">
            <h3 className="theme-text-primary font-medium mb-2">{t('recentMeasurements')}</h3>
            <div className="space-y-2">
              {aqi.measurements.slice(0, 3).map((measurement, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="theme-text-secondary capitalize">
                    {measurement.parameter}
                  </span>
                  <span className="theme-text-primary font-medium">
                    {measurement.value} {measurement.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
