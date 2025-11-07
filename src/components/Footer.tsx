'use client';

import { useTranslations } from 'next-intl';
import { Heart } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="theme-bg-primary theme-border border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="theme-text-primary font-medium">
              {t('madeWith')} ☀️
            </span>
          </div>

          <p className="theme-text-secondary text-sm">
            © {currentYear} {t('copyright')}
          </p>

          <p className="theme-text-secondary text-xs mt-2">
            {t('dataProvidedBy')}
          </p>
        </div>
      </div>
    </footer>
  );
}
