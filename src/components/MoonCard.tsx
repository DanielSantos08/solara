'use client';

import { useTranslations } from 'next-intl';
import { Moon, Sparkles } from 'lucide-react';
import { MoonData } from '@/types';
import { getMoonEmoji } from '@/utils/moon';

interface MoonCardProps {
  moon: MoonData;
}

export function MoonCard({ moon }: MoonCardProps) {
  const t = useTranslations('moonCard');
  // Map phase name to translation key
  const phaseKey = moon.phaseName.toLowerCase().replace(/\s+/g, '') as
    'nova' | 'crescente' | 'quartocrescente' | 'crescentegibosa' |
    'cheia' | 'minguantegibosa' | 'quartominguante' | 'minguante';

  return (
    <div className="theme-bg-secondary theme-border border rounded-xl p-6 theme-shadow animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold theme-text-primary">
          {t('title')}
        </h2>
        <Moon className="w-6 h-6 theme-accent" />
      </div>

      <div className="text-center">
        <div className="text-7xl mb-4">
          {getMoonEmoji(moon.phase)}
        </div>

        <h3 className="text-2xl font-bold theme-text-primary mb-2">
          {t(`phases.${phaseKey}.name`)}
        </h3>

        <div className="mb-4">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-500"
              style={{ width: `${moon.illumination}%` }}
            />
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="w-4 h-4 theme-accent-light" />
            <span className="theme-text-secondary text-sm">
              {moon.illumination}% {t('illuminated')}
            </span>
          </div>
        </div>

        <div className="theme-bg-primary rounded-lg p-3">
          <p className="text-sm theme-text-secondary">
            {t(`phases.${phaseKey}.description`)}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t theme-border">
          <p className="text-xs theme-text-secondary">
            {t('phaseInfo')}: {(moon.phase * 100).toFixed(1)}% {t('ofCycle')}
          </p>
        </div>
      </div>
    </div>
  );
}

