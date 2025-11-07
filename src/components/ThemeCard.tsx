'use client';

import { useTranslations } from 'next-intl';
import { Palette, Sparkles } from 'lucide-react';
import { ThemeData } from '@/types';

interface ThemeCardProps {
  theme: ThemeData;
}

function getThemeIcon(themeId: string) {
  switch (themeId) {
    case 'morning':
      return '🌅';
    case 'day':
      return '☀️';
    case 'golden':
      return '🌇';
    case 'night':
      return '🌙';
    default:
      return '☀️';
  }
}

function getThemeGradient(themeId: string) {
  switch (themeId) {
    case 'morning':
      return 'gradient-sunrise';
    case 'day':
      return 'bg-gradient-to-r from-blue-400 to-blue-600';
    case 'golden':
      return 'gradient-golden';
    case 'night':
      return 'gradient-night';
    default:
      return 'bg-gradient-to-r from-gray-400 to-gray-600';
  }
}

export function ThemeCard({ theme }: ThemeCardProps) {
  const t = useTranslations('themeCard');

  return (
    <div className="theme-bg-secondary theme-border border rounded-xl p-6 theme-shadow animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold theme-text-primary">
          {t('title')}
        </h2>
        <Palette className="w-6 h-6 theme-accent" />
      </div>

      <div className="text-center">
        <div className="text-6xl mb-4">
          {getThemeIcon(theme.id)}
        </div>

        <h3 className="text-2xl font-bold theme-text-primary mb-2">
          {t(theme.id as 'morning' | 'day' | 'golden' | 'night')}
        </h3>

        <div className="mb-4">
          <div className={`h-3 rounded-full ${getThemeGradient(theme.id)} mb-2`} />
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="w-4 h-4 theme-accent-light" />
            <span className="theme-text-secondary">
              {t('intensity')}: {Math.round(theme.intensity * 100)}%
            </span>
          </div>
        </div>

        <div className="theme-bg-primary rounded-lg p-3">
          <p className="text-sm theme-text-secondary">
            {t('description')}
          </p>
        </div>
      </div>
    </div>
  );
}
