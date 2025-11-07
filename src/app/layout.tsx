import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: {
    default: "Solara - Clima, Fase da Lua e Qualidade do Ar em Tempo Real",
    template: "%s | Solara",
  },
  description: "Consulte o clima, temperatura, fase da lua, qualidade do ar e luminosidade de qualquer cidade do mundo. Previsão do tempo precisa, nascer e pôr do sol, umidade, vento e muito mais.",
  keywords: [
    "clima", "tempo", "previsão do tempo", "temperatura", "vai chover",
    "fase da lua", "lua hoje", "qualidade do ar", "nascer do sol", "pôr do sol",
    "umidade", "vento", "pressão atmosférica", "visibilidade", "meteorologia",
    "weather", "weather forecast", "moon phase", "air quality", "sunrise", "sunset",
  ],
  authors: [{ name: "Solara Team" }],
  creator: "Solara",
  publisher: "Solara",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: ['en_US'],
    url: '/',
    siteName: 'Solara',
    title: "Solara - Clima, Fase da Lua e Qualidade do Ar",
    description: "Consulte o clima, temperatura, fase da lua e qualidade do ar de qualquer cidade do mundo em tempo real",
    images: [
      {
        url: '/logo-solara.png',
        width: 1200,
        height: 630,
        alt: 'Solara - Weather and Moon Phase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Solara - Clima, Fase da Lua e Qualidade do Ar",
    description: "Consulte o clima, temperatura, fase da lua e qualidade do ar em tempo real",
    images: ['/logo-solara.png'],
    creator: '@solara',
  },
  verification: {
    google: 'google-site-verification-code', // Add your verification code
  },
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/pt',
      'en-US': '/en',
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
