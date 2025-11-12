'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/Header';
import { Dashboard } from '@/components/Dashboard';
import { LocationSelector } from '@/components/LocationSelector';
import { SEOContent } from '@/components/SEOContent';
import { Footer } from '@/components/Footer';
import { ThemeProvider, useTheme } from '@/components/ThemeProvider';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { DashboardData } from '@/types';

function MainContent() {
  const t = useTranslations('page');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { setTheme } = useTheme();

  const fetchDashboardData = async (lat: number, lon: number) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/dashboard?lat=${lat}&lon=${lon}`);

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data: DashboardData = await response.json();
      setDashboardData(data);
      setTheme(data.theme);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = (lat: number, lon: number) => {
    fetchDashboardData(lat, lon);
  };

  return (
    <div className="min-h-screen theme-bg-primary">
      <Header
        isLoading={isLoading}
        themeId={dashboardData?.theme.id}
        weather={dashboardData?.weather}
        theme={dashboardData?.theme}
        moon={dashboardData?.moon}
        showHomeButton={!!dashboardData} // Mostrar apenas quando houver dados
      />

      <main className="min-h-screen">
        {isLoading && dashboardData === null ? (
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold theme-text-primary mb-4 animate-fade-in">
                  {t('welcome')}
                </h1>
                <p className="text-xl theme-text-secondary animate-fade-in">
                  {t('subtitle')}
                </p>
              </div>

              <div className="theme-bg-secondary theme-border border rounded-xl p-12 theme-shadow animate-slide-up">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <LoadingSpinner size="lg" className="theme-accent" />
                  <p className="theme-text-primary font-medium text-lg">
                    {t('loading') || 'Carregando dados...'}
                  </p>
                  <p className="theme-text-secondary text-sm">
                    {t('pleaseWait') || 'Por favor, aguarde'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : !dashboardData ? (
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold theme-text-primary mb-4 animate-fade-in">
                  {t('welcome')}
                </h1>
                <p className="text-xl theme-text-secondary animate-fade-in">
                  {t('subtitle')}
                </p>
              </div>

              <LocationSelector
                onLocationSelect={handleLocationSelect}
                isLoading={isLoading}
              />

              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-slide-up">
                  <p className="text-red-700 text-center">{error}</p>
                </div>
              )}
            </div>

            {/* SEO Content - Only shown on homepage */}
            <SEOContent />
          </div>
        ) : (
          <Dashboard data={dashboardData} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}
