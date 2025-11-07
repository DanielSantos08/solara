'use client';

import { useTranslations } from 'next-intl';
import { Sun, Zap, Sunrise, Sunset } from 'lucide-react';

interface LuxCardProps {
  estimatedLux: number;
  sunrise: string;
  sunset: string;
}

function useLuxDescription(lux: number) {
  const t = useTranslations('luxCard');

  if (lux < 100) return {
    description: t('veryLow'),
    color: 'text-blue-600',
    emoji: '🌙'
  };
  if (lux < 1000) return {
    description: t('low'),
    color: 'text-indigo-600',
    emoji: '🌅'
  };
  if (lux < 10000) return {
    description: t('moderate'),
    color: 'text-yellow-600',
    emoji: '⛅'
  };
  if (lux < 50000) return {
    description: t('high'),
    color: 'text-orange-600',
    emoji: '🌤️'
  };
  return {
    description: t('veryHigh'),
    color: 'text-red-600',
    emoji: '☀️'
  };
}

export function LuxCard({ estimatedLux, sunrise, sunset }: LuxCardProps) {
  const t = useTranslations('luxCard');
  const luxInfo = useLuxDescription(estimatedLux);
  
  return (
    <div className="theme-bg-secondary theme-border border rounded-xl p-6 theme-shadow animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold theme-text-primary">
          {t('title')}
        </h2>
        <Sun className="w-6 h-6 theme-accent" />
      </div>
      
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Zap className="w-8 h-8 theme-accent-light mr-2" />
          <div className="text-4xl font-bold theme-accent">
            {estimatedLux.toLocaleString()}
          </div>
          <span className="theme-text-secondary ml-2">lux</span>
        </div>

        <div className={`text-lg font-medium ${luxInfo.color} mb-4`}>
          {luxInfo.emoji} {luxInfo.description}
        </div>

        <div className="theme-bg-primary rounded-full h-3 mb-6 overflow-hidden">
          <div
            className="theme-accent-light-bg h-full transition-all duration-1000 ease-out"
            style={{
              width: `${Math.min(100, (estimatedLux / 100000) * 100)}%`
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="theme-bg-primary rounded-lg p-3">
            <div className="flex items-center justify-center mb-1">
              <Sunrise className="w-5 h-5 theme-accent mr-2" />
              <span className="text-xs theme-text-secondary">{t('sunrise')}</span>
            </div>
            <div className="text-xl font-bold theme-accent">{sunrise}</div>
          </div>

          <div className="theme-bg-primary rounded-lg p-3">
            <div className="flex items-center justify-center mb-1">
              <Sunset className="w-5 h-5 theme-accent mr-2" />
              <span className="text-xs theme-text-secondary">{t('sunset')}</span>
            </div>
            <div className="text-xl font-bold theme-accent">{sunset}</div>
          </div>
        </div>

        <div className="text-xs theme-text-secondary">
          <p>💡 {t('calculation')}</p>
        </div>
      </div>
    </div>
  );
}
