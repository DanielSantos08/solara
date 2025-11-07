import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * API Route para geocoding (conversão de nome de cidade para coordenadas)
 * Protege a chave da API do OpenWeatherMap no servidor
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        { error: 'Parâmetro "q" (nome da cidade) é obrigatório' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENWEATHER_KEY;

    if (!apiKey) {
      throw new Error('OPENWEATHER_KEY não configurada');
    }

    // Chamar API de geocoding do OpenWeatherMap
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Solara/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na API de Geocoding: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Retornar resultados formatados
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Erro na API de geocoding:', error);

    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';

    return NextResponse.json(
      {
        error: 'Erro ao buscar coordenadas da cidade',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

