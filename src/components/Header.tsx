'use client';

import { Home, Sun } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import WeatherIcon from './WeatherIcon';
import { LanguageSelector } from './LanguageSelector';
import { WeatherData, ThemeData, MoonData } from '@/types';

interface HeaderProps {
  isLoading: boolean;
  themeId?: 'morning' | 'day' | 'golden' | 'night';
  weather?: WeatherData;
  theme?: ThemeData;
  moon?: MoonData;
  showHomeButton?: boolean;
}

export function Header({ isLoading, themeId, weather, theme, moon, showHomeButton = false }: HeaderProps) {
  const t = useTranslations('common');
  const logoSrc = themeId === 'night' ? '/logo-theme-black.png' : '/logo-solara.png';

  const handleGoHome = () => {
    window.location.reload();
  };

  return (
    <header className="theme-bg-primary theme-border border-b sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleGoHome}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div className="flex items-center justify-center">
              {weather && theme && moon ? (
                <WeatherIcon
                  weather={weather}
                  theme={theme}
                  moon={moon}
                  className="w-16 h-16"
                />
              ) : (
                <Sun className="w-10 h-10 theme-accent" />
              )}
            </div>
            <div className="w-40 h-25">
              <Image
                src={logoSrc}
                alt="Solara Logo"
                fill
                className="object-contain transition-opacity duration-500"
                priority
              />
            </div>
          </button>

          <div className="flex items-center space-x-4">
            <LanguageSelector />

            {showHomeButton && (
              <button
                onClick={handleGoHome}
                disabled={isLoading}
                className="theme-accent-bg hover:opacity-90 disabled:opacity-50 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200"
              >
                <Home
                  className="w-4 h-4"
                />
                <span className="hidden sm:inline">{t('backToStart')}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
