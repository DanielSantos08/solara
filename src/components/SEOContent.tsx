/**
 * SEOContent Component
 *
 * Rich text content for SEO optimization
 * Helps with keyword ranking and provides value to users
 */

'use client';

import { useLocale } from 'next-intl';

export function SEOContent() {
  const locale = useLocale();
  const isPortuguese = locale === 'pt';

  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": isPortuguese ? [
      {
        "@type": "Question",
        "name": "Qual a fase da lua hoje?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O Solara mostra a fase da lua atual em tempo real, incluindo o nome da fase (Nova, Crescente, Cheia, Minguante), porcentagem de iluminação e descrição detalhada. A fase da lua é calculada astronomicamente e atualizada constantemente."
        }
      },
      {
        "@type": "Question",
        "name": "Como saber se vai chover hoje?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Digite o nome da sua cidade no campo de busca e o Solara mostrará as condições climáticas atuais, incluindo se está chovendo no momento e a quantidade de precipitação registrada na última hora."
        }
      },
      {
        "@type": "Question",
        "name": "Como consultar o clima de qualquer cidade?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Basta digitar o nome da cidade no campo de busca. Você pode pesquisar cidades do Brasil e do mundo inteiro, incluindo São Paulo, Rio de Janeiro, Salvador, New York, London, Tokyo e muito mais."
        }
      }
    ] : [
      {
        "@type": "Question",
        "name": "What is the moon phase today?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Solara shows the current moon phase in real-time, including the phase name (New, Waxing, Full, Waning), illumination percentage and detailed description. The moon phase is calculated astronomically and constantly updated."
        }
      },
      {
        "@type": "Question",
        "name": "How to know if it will rain today?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Enter your city name in the search field and Solara will show current weather conditions, including if it's raining now and the amount of precipitation recorded in the last hour."
        }
      },
      {
        "@type": "Question",
        "name": "How to check the weather of any city?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Just type the city name in the search field. You can search cities from Brazil and around the world, including São Paulo, Rio de Janeiro, Salvador, New York, London, Tokyo and many more."
        }
      }
    ]
  };

  return (
    <>
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* SEO-rich content section */}
        <section className="mb-12 theme-bg-secondary rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold theme-text-primary mb-6">
          {isPortuguese 
            ? 'Previsão do Tempo, Fase da Lua e Qualidade do Ar em Tempo Real'
            : 'Weather Forecast, Moon Phase and Air Quality in Real Time'}
        </h2>
        
        <div className="prose prose-lg theme-text-primary max-w-none">
          <p className="mb-4">
            {isPortuguese
              ? 'O Solara é sua fonte confiável para consultar o clima, temperatura, fase da lua e qualidade do ar de qualquer cidade do mundo. Nossa plataforma oferece dados meteorológicos precisos e atualizados em tempo real, incluindo:'
              : 'Solara is your reliable source to check weather, temperature, moon phase and air quality of any city in the world. Our platform offers accurate and real-time meteorological data, including:'}
          </p>

          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>{isPortuguese ? 'Temperatura atual e sensação térmica' : 'Current temperature and feels like'}</li>
            <li>{isPortuguese ? 'Umidade relativa do ar' : 'Relative humidity'}</li>
            <li>{isPortuguese ? 'Velocidade e direção do vento' : 'Wind speed and direction'}</li>
            <li>{isPortuguese ? 'Pressão atmosférica' : 'Atmospheric pressure'}</li>
            <li>{isPortuguese ? 'Visibilidade' : 'Visibility'}</li>
            <li>{isPortuguese ? 'Precipitação (chuva e neve)' : 'Precipitation (rain and snow)'}</li>
            <li>{isPortuguese ? 'Horário do nascer e pôr do sol' : 'Sunrise and sunset times'}</li>
            <li>{isPortuguese ? 'Fase da lua atual com porcentagem de iluminação' : 'Current moon phase with illumination percentage'}</li>
            <li>{isPortuguese ? 'Qualidade do ar (PM2.5 e PM10)' : 'Air quality (PM2.5 and PM10)'}</li>
            <li>{isPortuguese ? 'Estimativa de luminosidade solar' : 'Solar luminosity estimate'}</li>
          </ul>
        </div>
      </section>

      {/* FAQ Section for SEO */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold theme-text-primary mb-8 text-center">
          {isPortuguese ? 'Perguntas Frequentes' : 'Frequently Asked Questions'}
        </h2>

        <div className="space-y-6">
          {/* FAQ Item 1 */}
          <div className="theme-bg-secondary rounded-lg p-6 shadow">
            <h3 className="text-xl font-semibold theme-text-primary mb-3">
              {isPortuguese ? 'Qual a fase da lua hoje?' : 'What is the moon phase today?'}
            </h3>
            <p className="theme-text-secondary">
              {isPortuguese
                ? 'O Solara mostra a fase da lua atual em tempo real, incluindo o nome da fase (Nova, Crescente, Cheia, Minguante), porcentagem de iluminação e descrição detalhada. A fase da lua é calculada astronomicamente e atualizada constantemente.'
                : 'Solara shows the current moon phase in real time, including the phase name (New, Waxing, Full, Waning), illumination percentage and detailed description. The moon phase is calculated astronomically and constantly updated.'}
            </p>
          </div>

          {/* FAQ Item 2 */}
          <div className="theme-bg-secondary rounded-lg p-6 shadow">
            <h3 className="text-xl font-semibold theme-text-primary mb-3">
              {isPortuguese ? 'Como saber se vai chover hoje?' : 'How to know if it will rain today?'}
            </h3>
            <p className="theme-text-secondary">
              {isPortuguese
                ? 'Digite o nome da sua cidade no campo de busca e o Solara mostrará as condições climáticas atuais, incluindo se está chovendo no momento e a quantidade de precipitação registrada na última hora. Você também verá a cobertura de nuvens e umidade do ar.'
                : 'Type your city name in the search field and Solara will show current weather conditions, including if it is raining now and the amount of precipitation recorded in the last hour. You will also see cloud coverage and air humidity.'}
            </p>
          </div>

          {/* FAQ Item 3 */}
          <div className="theme-bg-secondary rounded-lg p-6 shadow">
            <h3 className="text-xl font-semibold theme-text-primary mb-3">
              {isPortuguese ? 'Como consultar o clima de qualquer cidade?' : 'How to check the weather of any city?'}
            </h3>
            <p className="theme-text-secondary">
              {isPortuguese
                ? 'É muito simples! Basta digitar o nome da cidade no campo de busca no topo da página. Você pode pesquisar cidades do Brasil e do mundo inteiro. O Solara suporta milhares de cidades, incluindo São Paulo, Rio de Janeiro, Salvador, New York, London, Tokyo e muito mais.'
                : 'It\'s very simple! Just type the city name in the search field at the top of the page. You can search for cities in Brazil and around the world. Solara supports thousands of cities, including São Paulo, Rio de Janeiro, Salvador, New York, London, Tokyo and many more.'}
            </p>
          </div>

          {/* FAQ Item 4 */}
          <div className="theme-bg-secondary rounded-lg p-6 shadow">
            <h3 className="text-xl font-semibold theme-text-primary mb-3">
              {isPortuguese ? 'O que é qualidade do ar e por que é importante?' : 'What is air quality and why is it important?'}
            </h3>
            <p className="theme-text-secondary">
              {isPortuguese
                ? 'A qualidade do ar mede a concentração de poluentes no ar que respiramos. O Solara monitora PM2.5 e PM10, partículas finas que podem afetar a saúde respiratória. Valores baixos indicam ar limpo e saudável, enquanto valores altos podem representar riscos à saúde, especialmente para pessoas com problemas respiratórios.'
                : 'Air quality measures the concentration of pollutants in the air we breathe. Solara monitors PM2.5 and PM10, fine particles that can affect respiratory health. Low values indicate clean and healthy air, while high values may pose health risks, especially for people with respiratory problems.'}
            </p>
          </div>

          {/* FAQ Item 5 */}
          <div className="theme-bg-secondary rounded-lg p-6 shadow">
            <h3 className="text-xl font-semibold theme-text-primary mb-3">
              {isPortuguese ? 'Que horas o sol nasce e se põe hoje?' : 'What time does the sun rise and set today?'}
            </h3>
            <p className="theme-text-secondary">
              {isPortuguese
                ? 'O Solara exibe os horários exatos do nascer e pôr do sol para a cidade pesquisada, ajustados ao fuso horário local. Esses dados são calculados com base na localização geográfica e data atual, sendo extremamente precisos.'
                : 'Solara displays the exact sunrise and sunset times for the searched city, adjusted to the local timezone. This data is calculated based on geographic location and current date, being extremely accurate.'}
            </p>
          </div>

          {/* FAQ Item 6 */}
          <div className="theme-bg-secondary rounded-lg p-6 shadow">
            <h3 className="text-xl font-semibold theme-text-primary mb-3">
              {isPortuguese ? 'Os dados são atualizados em tempo real?' : 'Is the data updated in real time?'}
            </h3>
            <p className="theme-text-secondary">
              {isPortuguese
                ? 'Sim! O Solara utiliza a API do OpenWeatherMap para obter dados meteorológicos atualizados constantemente. Cada vez que você pesquisa uma cidade, recebe as informações mais recentes disponíveis, incluindo temperatura, condições climáticas, qualidade do ar e fase da lua.'
                : 'Yes! Solara uses the OpenWeatherMap API to get constantly updated meteorological data. Every time you search for a city, you receive the most recent information available, including temperature, weather conditions, air quality and moon phase.'}
            </p>
          </div>

          {/* FAQ Item 7 */}
          <div className="theme-bg-secondary rounded-lg p-6 shadow">
            <h3 className="text-xl font-semibold theme-text-primary mb-3">
              {isPortuguese ? 'Posso usar o Solara em qualquer idioma?' : 'Can I use Solara in any language?'}
            </h3>
            <p className="theme-text-secondary">
              {isPortuguese
                ? 'Atualmente o Solara está disponível em Português (Brasil) e Inglês. Você pode alternar entre os idiomas usando o seletor no topo da página. Toda a interface, incluindo descrições climáticas e textos informativos, será traduzida automaticamente.'
                : 'Currently Solara is available in Portuguese (Brazil) and English. You can switch between languages using the selector at the top of the page. The entire interface, including weather descriptions and informative texts, will be automatically translated.'}
            </p>
          </div>

          {/* FAQ Item 8 */}
          <div className="theme-bg-secondary rounded-lg p-6 shadow">
            <h3 className="text-xl font-semibold theme-text-primary mb-3">
              {isPortuguese ? 'O que significa a luminosidade estimada?' : 'What does estimated luminosity mean?'}
            </h3>
            <p className="theme-text-secondary">
              {isPortuguese
                ? 'A luminosidade estimada (medida em lux) indica a quantidade de luz solar disponível no momento. O Solara calcula esse valor com base no horário do dia, posição do sol, cobertura de nuvens e localização geográfica. Valores mais altos indicam mais luz solar, útil para fotografia, agricultura e planejamento de atividades ao ar livre.'
                : 'Estimated luminosity (measured in lux) indicates the amount of sunlight available at the moment. Solara calculates this value based on time of day, sun position, cloud coverage and geographic location. Higher values indicate more sunlight, useful for photography, agriculture and outdoor activity planning.'}
            </p>
          </div>
        </div>
      </section>

      {/* Popular Cities Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold theme-text-primary mb-6 text-center">
          {isPortuguese ? 'Cidades Populares' : 'Popular Cities'}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(isPortuguese
            ? [
                'São Paulo', 'Rio de Janeiro', 'Salvador', 'Brasília',
                'Fortaleza', 'Belo Horizonte', 'Curitiba', 'Recife',
                'Porto Alegre', 'Manaus', 'Itabuna', 'Florianópolis',
                'Goiânia', 'Campinas', 'Vitória', 'Natal',
              ]
            : [
                'New York', 'London', 'Paris', 'Tokyo',
                'Sydney', 'Dubai', 'Singapore', 'Los Angeles',
                'Barcelona', 'Amsterdam', 'Berlin', 'Rome',
                'Madrid', 'Toronto', 'Miami', 'Chicago',
              ]
          ).map((city) => (
            <div
              key={city}
              className="theme-bg-secondary rounded-lg p-4 text-center hover:opacity-80 transition-opacity cursor-pointer"
            >
              <p className="theme-text-primary font-medium">{city}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Keywords footer for SEO */}
      <section className="text-center theme-text-secondary text-sm">
        <p className="mb-2">
          {isPortuguese
            ? 'Palavras-chave: clima, tempo, previsão do tempo, temperatura, vai chover, fase da lua, lua hoje, qualidade do ar, nascer do sol, pôr do sol, umidade, vento, pressão atmosférica, visibilidade, precipitação, meteorologia'
            : 'Keywords: weather, weather forecast, temperature, will it rain, moon phase, moon today, air quality, sunrise, sunset, humidity, wind, atmospheric pressure, visibility, precipitation, meteorology'}
        </p>
      </section>
      </div>
    </>
  );
}

