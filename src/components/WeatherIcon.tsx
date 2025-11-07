"use client";
import { useMemo } from "react";
import { WeatherData, ThemeData, MoonData } from '@/types';
import { getMoonEmoji } from '@/utils/moon';

interface WeatherIconProps {
  weather: WeatherData;
  theme: ThemeData;
  moon: MoonData;
  className?: string;
}

/**
 * Determina o tipo de condição climática baseado no código do OpenWeatherMap
 * Códigos: https://openweathermap.org/weather-conditions
 */
function getWeatherCondition(weatherCode: number, weatherMain: string): string {
  // Trovoada (200-232)
  if (weatherCode >= 200 && weatherCode < 300) return "thunder";

  // Garoa/Chuvisco (300-321)
  if (weatherCode >= 300 && weatherCode < 400) return "drizzle";

  // Chuva (500-531)
  if (weatherCode >= 500 && weatherCode < 600) return "rain";

  // Neve (600-622)
  if (weatherCode >= 600 && weatherCode < 700) return "snow";

  // Atmosfera (névoa, neblina, fumaça) (701-781)
  if (weatherCode >= 700 && weatherCode < 800) return "fog";

  // Céu limpo (800)
  if (weatherCode === 800) return "clear";

  // Nuvens (801-804)
  if (weatherCode > 800 && weatherCode < 900) return "cloudy";

  // Fallback baseado no weatherMain
  return weatherMain.toLowerCase();
}

// ============================
// ÍCONES SEPARADOS
// ============================

const Sun = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full">
    {/* Brilho externo */}
    <circle cx="32" cy="32" r="16" className="fill-yellow-200 opacity-30" />

    {/* Raios rotativos */}
    <g className="animate-[spin_20s_linear_infinite] origin-center">
      {Array.from({ length: 8 }).map((_, i) => (
        <rect
          key={i}
          x="30.5"
          y="4"
          width="3"
          height="10"
          rx="1.5"
          transform={`rotate(${45 * i} 32 32)`}
          className="fill-yellow-400"
        />
      ))}
    </g>

    {/* Núcleo do sol com gradiente */}
    <defs>
      <radialGradient id="sunGradient">
        <stop offset="0%" stopColor="#FCD34D" />
        <stop offset="100%" stopColor="#F59E0B" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="12" fill="url(#sunGradient)" />

    {/* Brilho interno */}
    <circle cx="28" cy="28" r="4" className="fill-yellow-100 opacity-60" />
  </svg>
);

/**
 * Ícone da lua com emoji baseado na fase
 */
const Moon = ({ phase }: { phase: number }) => {
  const moonEmoji = getMoonEmoji(phase);

  return (
    <div className="w-full h-full flex items-center justify-center" style={{ fontSize: '3.5rem' }}>
      <span role="img" aria-label={`Lua fase ${phase.toFixed(2)}`}>
        {moonEmoji}
      </span>
    </div>
  );
};

/**
 * Nuvem com variações de densidade
 */
const Cloud = ({ density = 'medium' }: { density?: 'light' | 'medium' | 'heavy' }) => {
  const getCloudColors = () => {
    switch (density) {
      case 'light':
        return {
          main: '#F3F4F6',      // gray-100 (mais claro)
          shadow: '#E5E7EB',    // gray-200
          highlight: '#FFFFFF', // white
          opacity: 0.7,         // mais translúcido
        };
      case 'heavy':
        return {
          main: '#6B7280',      // gray-500
          shadow: '#4B5563',    // gray-600
          highlight: '#9CA3AF', // gray-400
          opacity: 1,
        };
      default:
        return {
          main: '#9CA3AF',      // gray-400
          shadow: '#6B7280',    // gray-500
          highlight: '#D1D5DB', // gray-300
          opacity: 0.9,
        };
    }
  };

  const colors = getCloudColors();

  return (
    <svg viewBox="0 0 100 60" className="w-full h-full" preserveAspectRatio="xMidYMid meet" opacity={colors.opacity}>
      <defs>
        <filter id={`cloudShadow-${density}`}>
          <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
          <feOffset dx="0" dy="2" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Sombra da nuvem */}
      <ellipse
        cx="50"
        cy="55"
        rx="35"
        ry="3"
        fill={colors.shadow}
        opacity="0.2"
      />

      {/* Nuvem principal - formato mais bonito */}
      <g filter={`url(#cloudShadow-${density})`}>
        {/* Círculo esquerdo */}
        <circle cx="25" cy="35" r="12" fill={colors.main} />

        {/* Círculo central (maior) */}
        <circle cx="45" cy="28" r="16" fill={colors.main} />

        {/* Círculo direito */}
        <circle cx="65" cy="35" r="13" fill={colors.main} />

        {/* Base da nuvem */}
        <ellipse cx="45" cy="38" rx="30" ry="12" fill={colors.main} />

        {/* Brilhos para dar volume */}
        <ellipse cx="40" cy="26" rx="8" ry="6" fill={colors.highlight} opacity="0.5" />
        <ellipse cx="60" cy="32" rx="6" ry="4" fill={colors.highlight} opacity="0.4" />
      </g>
    </svg>
  );
};

const Raindrops = () => (
  <div className="absolute inset-x-0 bottom-0 flex justify-around px-2">
    {[0, 0.15, 0.3, 0.45].map((delay, i) => (
      <svg
        key={i}
        viewBox="0 0 8 16"
        className="w-2 h-5 animate-[drop_0.9s_infinite_ease-in]"
        style={{ animationDelay: `${delay}s` }}
      >
        {/* Gota de chuva com formato realista */}
        <path
          d="M4 0 C4 0, 1 8, 1 11 C1 13.5, 2.5 15, 4 15 C5.5 15, 7 13.5, 7 11 C7 8, 4 0, 4 0 Z"
          className="fill-blue-400 opacity-80"
        />
        {/* Brilho na gota */}
        <ellipse cx="3" cy="10" rx="1" ry="2" className="fill-blue-200 opacity-60" />
      </svg>
    ))}
  </div>
);

const Bolt = () => (
  <svg
    viewBox="0 0 24 24"
    className="absolute w-7 h-7 animate-[flash_1.5s_infinite] bottom-2 left-1/2 -translate-x-1/2"
  >
    {/* Brilho do raio */}
    <path
      d="M13 2 L3 14 h7 L11 22 L21 10 h-7z"
      className="fill-yellow-200 opacity-60 blur-sm"
    />
    {/* Raio principal */}
    <path
      d="M13 2 L3 14 h7 L11 22 L21 10 h-7z"
      className="fill-yellow-400"
    />
    {/* Brilho interno */}
    <path
      d="M12.5 4 L6 13 h5 L11.5 19 L18 11 h-5z"
      className="fill-yellow-100 opacity-80"
    />
  </svg>
);

const Snowflakes = () => (
  <div className="absolute inset-x-0 bottom-0 flex justify-around px-1">
    {[0, 0.3, 0.6, 0.9].map((delay, i) => (
      <svg
        key={i}
        viewBox="0 0 24 24"
        className="w-4 h-4 animate-[fall_3s_infinite_ease-in]"
        style={{ animationDelay: `${delay}s` }}
      >
        {/* Floco de neve detalhado */}
        <g className="fill-none stroke-blue-100 stroke-2">
          {/* Linhas principais */}
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="5" y1="5" x2="19" y2="19" />
          <line x1="19" y1="5" x2="5" y2="19" />

          {/* Ramificações */}
          <line x1="12" y1="5" x2="10" y2="7" />
          <line x1="12" y1="5" x2="14" y2="7" />
          <line x1="12" y1="19" x2="10" y2="17" />
          <line x1="12" y1="19" x2="14" y2="17" />

          <line x1="5" y1="12" x2="7" y2="10" />
          <line x1="5" y1="12" x2="7" y2="14" />
          <line x1="19" y1="12" x2="17" y2="10" />
          <line x1="19" y1="12" x2="17" y2="14" />
        </g>
        {/* Centro do floco */}
        <circle cx="12" cy="12" r="2" className="fill-white opacity-80" />
      </svg>
    ))}
  </div>
);

const Fog = () => (
  <svg viewBox="0 0 100 60" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
    <defs>
      <linearGradient id="fogGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#D1D5DB" stopOpacity="0.3" />
        <stop offset="50%" stopColor="#9CA3AF" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#D1D5DB" stopOpacity="0.3" />
      </linearGradient>
    </defs>

    <g>
      {/* Camadas de névoa com gradiente */}
      <rect x="5" y="18" width="90" height="3" rx="1.5" fill="url(#fogGradient)" opacity="0.6" />
      <rect x="10" y="25" width="80" height="3" rx="1.5" fill="url(#fogGradient)" opacity="0.7" />
      <rect x="3" y="32" width="94" height="3" rx="1.5" fill="url(#fogGradient)" opacity="0.8" />
      <rect x="8" y="39" width="84" height="3" rx="1.5" fill="url(#fogGradient)" opacity="0.7" />
      <rect x="12" y="46" width="76" height="3" rx="1.5" fill="url(#fogGradient)" opacity="0.6" />
    </g>
  </svg>
);

// ============================
// COMPONENTE PRINCIPAL
// ============================

export default function WeatherIcon({
  weather,
  theme,
  moon,
  className = "w-24 h-24",
}: WeatherIconProps) {
  const isNight = theme.id === 'night';
  const condition = getWeatherCondition(weather.weatherCode, weather.weatherMain);

  const icon = useMemo(() => {
    switch (condition) {
      case "clear":
        return isNight ? <Moon phase={moon.phase} /> : <Sun />;

      case "cloudy":
        if (weather.clouds > 70) {
          return (
            <div className="relative w-full h-full flex items-center justify-center">
              <Cloud density="heavy" />
            </div>
          );
        } else if (weather.clouds > 40) {
          return (
            <div className="relative w-full h-full flex items-center justify-center">
              <Cloud density="medium" />
            </div>
          );
        } else {
          return (
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              {/* Lua/Sol no fundo */}
              <div className="absolute inset-0 flex items-center justify-center">
                {isNight ? <Moon phase={moon.phase} /> : <Sun />}
              </div>

              {/* Nuvem principal passando na frente - mais translúcida */}
              <div className="absolute bottom-0 right-0 w-3/5 h-3/5 opacity-75 animate-drift">
                <Cloud density="light" />
              </div>

              {/* Segunda nuvem menor para profundidade - ainda mais translúcida */}
              {weather.clouds > 20 && (
                <div className="absolute top-1 left-0 w-2/5 h-2/5 opacity-50 animate-drift-slow">
                  <Cloud density="light" />
                </div>
              )}
            </div>
          );
        }

      case "drizzle":
        return (
          <div className="relative w-full h-full">
            <Cloud density="light" />
            <Raindrops />
          </div>
        );

      case "rain":
        return (
          <div className="relative w-full h-full">
            <Cloud density="medium" />
            <Raindrops />
          </div>
        );

      case "thunder":
        return (
          <div className="relative w-full h-full">
            <Cloud density="heavy" />
            <Bolt />
            <Raindrops />
          </div>
        );

      case "snow":
        return (
          <div className="relative w-full h-full">
            <Cloud density="medium" />
            <Snowflakes />
          </div>
        );

      case "fog":
        return <Fog />;

      default:
        return isNight ? <Moon phase={moon.phase} /> : <Sun />;
    }
  }, [condition, isNight, moon.phase, weather.clouds]);

  return (
    <div
      role="img"
      aria-label={`Ícone de clima: ${weather.description}`}
      className={`${className} grid place-items-center relative`}
    >
      {icon}
      <style jsx global>{`
        @keyframes drop {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          30% {
            transform: translateY(6px);
            opacity: 1;
          }
          100% {
            transform: translateY(18px);
            opacity: 0;
          }
        }
        @keyframes flash {
          0%,
          80%,
          100% {
            opacity: 0;
          }
          10%,
          40% {
            opacity: 1;
          }
        }
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          100% {
            transform: translateY(20px) rotate(180deg);
            opacity: 0;
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Animação mais suave para o sol */
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }

        /* Animação de nuvens passando */
        @keyframes drift {
          0% {
            transform: translateX(-10%);
          }
          50% {
            transform: translateX(10%);
          }
          100% {
            transform: translateX(-10%);
          }
        }

        .animate-drift {
          animation: drift 15s ease-in-out infinite;
        }

        .animate-drift-slow {
          animation: drift 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
