'use client';

import { useTranslations } from 'next-intl';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { BarChart3 } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LuxChartProps {
  estimatedLux: number;
  sunrise: string; // Formato "HH:MM"
  sunset: string;  // Formato "HH:MM"
  clouds: number;  // Porcentagem de cobertura de nuvens
}

export function LuxChart({ estimatedLux, sunrise, sunset, clouds }: LuxChartProps) {
  const t = useTranslations('luxChart');

  const generateLuxData = () => {
    const hours = [];
    const luxValues = [];

    // Converter sunrise e sunset para minutos
    const [sunriseHour, sunriseMin] = sunrise.split(':').map(Number);
    const [sunsetHour, sunsetMin] = sunset.split(':').map(Number);

    const sunriseMinutes = sunriseHour * 60 + sunriseMin;
    const sunsetMinutes = sunsetHour * 60 + sunsetMin;
    const dayLengthMinutes = sunsetMinutes - sunriseMinutes;

    // Fator de nuvens (0% nuvens = 100% luz, 100% nuvens = 10% luz)
    const cloudFactor = Math.max(0.1, 1 - (clouds / 100) * 0.9);
    const maxLux = 100000;

    for (let hour = 0; hour < 24; hour++) {
      hours.push(`${hour.toString().padStart(2, '0')}:00`);

      const currentMinutes = hour * 60;
      let lux = 0;

      // Se for noite (antes do nascer ou depois do pôr do sol)
      if (currentMinutes < sunriseMinutes || currentMinutes > sunsetMinutes) {
        lux = 10 + (hour % 40); // Luz artificial mínima
      } else {
        // Durante o dia - usar curva senoidal baseada nos horários reais
        const minutesSinceSunrise = currentMinutes - sunriseMinutes;
        const dayProgress = minutesSinceSunrise / dayLengthMinutes;
        const solarIntensity = Math.sin(dayProgress * Math.PI);

        lux = maxLux * solarIntensity * cloudFactor;
      }

      luxValues.push(Math.max(0, Math.round(lux)));
    }

    return { hours, luxValues };
  };

  const { hours, luxValues } = generateLuxData();

  const data = {
    labels: hours,
    datasets: [
      {
        label: t('luminosity'),
        data: luxValues,
        borderColor: 'rgb(251, 191, 36)',
        backgroundColor: 'rgba(251, 191, 36, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(251, 191, 36)',
        pointBorderColor: 'rgb(255, 255, 255)',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgb(251, 191, 36)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#64748b',
          maxTicksLimit: 8,
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#64748b',
          callback: function(value: any) {
            return value.toLocaleString() + ' lux';
          },
        },
      },
    },
  };

  return (
    <div className="theme-bg-secondary theme-border border rounded-xl p-6 theme-shadow animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold theme-text-primary">
          {t('title')}
        </h2>
        <BarChart3 className="w-6 h-6 theme-accent" />
      </div>

      <div className="h-64">
        <Line data={data} options={options} />
      </div>

      <div className="mt-4 pt-4 theme-border border-t">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="theme-text-secondary">
            <span className="theme-accent font-medium">{t('current')}:</span> {estimatedLux.toLocaleString()} lux
          </div>
          <div className="theme-text-secondary">
            <span className="theme-accent font-medium">☀️ {t('sunrise')}:</span> {sunrise}
          </div>
          <div className="theme-text-secondary">
            <span className="theme-accent font-medium">🌅 {t('sunset')}:</span> {sunset}
          </div>
        </div>
        <div className="mt-2 text-xs theme-text-secondary text-center">
          {t('curveCalculation', { clouds })}
        </div>
      </div>
    </div>
  );
}
