'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeData } from '@/types';

interface ThemeContextType {
  theme: ThemeData;
  setTheme: (theme: ThemeData) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeData>({
    id: 'day',
    name: 'Dia',
    intensity: 1,
  });

  useEffect(() => {
    // Aplicar tema ao documento
    document.documentElement.setAttribute('data-theme', theme.id);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
}
