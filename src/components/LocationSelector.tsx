'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, Navigation, AlertCircle } from 'lucide-react';

interface LocationSelectorProps {
  onLocationSelect: (lat: number, lon: number) => void;
  isLoading: boolean;
}

export function LocationSelector({ onLocationSelect, isLoading }: LocationSelectorProps) {
  const t = useTranslations('locationSelector');
  const tCommon = useTranslations('common');
  const [manualLocation, setManualLocation] = useState('');
  const [error, setError] = useState('');

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError(t('errorGeolocation'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onLocationSelect(latitude, longitude);
        setError('');
      },
      () => {
        setError(t('errorGeolocation'));
      }
    );
  };

  const handleManualLocation = async () => {
    if (!manualLocation.trim()) {
      return;
    }

    try {
      // Try to parse as coordinates (lat,lon)
      const coords = manualLocation.split(',').map(coord => parseFloat(coord.trim()));
      if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
        if (coords[0] < -90 || coords[0] > 90 || coords[1] < -180 || coords[1] > 180) {
          setError(t('errorInvalidCoordinates'));
          return;
        }
        onLocationSelect(coords[0], coords[1]);
        setError('');
        return;
      }

      // Search coordinates by city name using our API route
      const response = await fetch(
        `/api/geocode?q=${encodeURIComponent(manualLocation)}`
      );

      if (!response.ok) {
        throw new Error(t('errorGeneric'));
      }

      const data = await response.json();
      if (data.length === 0) {
        setError(t('errorCityNotFound'));
        return;
      }

      onLocationSelect(data[0].lat, data[0].lon);
      setError('');
    } catch (err) {
      setError(t('errorGeneric'));
    }
  };

  return (
    <div className="theme-bg-secondary theme-border border rounded-xl p-6 theme-shadow animate-slide-up">
      <div className="text-center mb-6">
        <Navigation className="w-12 h-12 theme-accent mx-auto mb-4" />
        <h2 className="text-2xl font-bold theme-text-primary mb-2">
          {t('title')}
        </h2>
        <p className="theme-text-secondary">
          {t('subtitle')}
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={getCurrentLocation}
          disabled={isLoading}
          className="w-full theme-accent-bg hover:opacity-90 disabled:opacity-50 text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200"
        >
          <MapPin className="w-5 h-5" />
          <span>{t('useCurrentLocation')}</span>
        </button>

        <div className="text-center theme-text-secondary">
          {tCommon('or')}
        </div>

        <div className="space-y-3">
          <input
            type="text"
            value={manualLocation}
            onChange={(e) => setManualLocation(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleManualLocation()}
            placeholder={t('searchPlaceholder')}
            className="w-full px-4 py-3 theme-bg-primary theme-border border rounded-lg theme-text-primary placeholder-theme-text-secondary focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <button
            onClick={handleManualLocation}
            disabled={isLoading || !manualLocation.trim()}
            className="w-full theme-accent-light-bg hover:opacity-90 disabled:opacity-50 theme-text-primary py-3 px-6 rounded-lg transition-all duration-200"
          >
            {t('searchButton')}
          </button>
        </div>

        {error && (
          <div className="flex items-center space-x-2 theme-text-primary bg-red-50 border border-red-200 rounded-lg p-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}
