'use client';

import { useLocale } from 'next-intl';
import { useState, useTransition } from 'react';

const languages = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
];

export function LanguageSelector() {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const changeLocale = (newLocale: string) => {
    startTransition(() => {
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
      setIsOpen(false);
      window.location.reload();
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-2 p-2 rounded-lg theme-bg-primary theme-border border hover:opacity-80 transition-all disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed active:scale-95"
        aria-label="Select language"
      >
        <span className="text-xl">{currentLanguage.flag}</span>
        <span className="text-sm font-medium theme-text-primary hidden sm:inline">
          {currentLanguage.name}
        </span>
        <svg
          className={`w-4 h-4 theme-text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 theme-bg-secondary rounded-lg shadow-lg theme-border border z-20">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLocale(lang.code)}
                disabled={isPending}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:opacity-80 transition-all first:rounded-t-lg last:rounded-b-lg disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed active:scale-95 ${
                  lang.code === locale ? 'theme-accent-bg' : ''
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="text-sm font-medium theme-text-primary">
                  {lang.name}
                </span>
                {lang.code === locale && (
                  <svg
                    className="w-5 h-5 ml-auto theme-accent"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

