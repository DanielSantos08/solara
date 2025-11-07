/**
 * Retorna emoji da lua baseado na fase
 * @param phase - Fase da lua (0-1)
 * @returns Emoji correspondente à fase
 */
export function getMoonEmoji(phase: number): string {
  if (phase < 0.0625 || phase >= 0.9375) {
    return '🌑'; // Nova
  } else if (phase < 0.1875) {
    return '🌒'; // Crescente
  } else if (phase < 0.3125) {
    return '🌓'; // Quarto Crescente
  } else if (phase < 0.4375) {
    return '🌔'; // Crescente Gibosa
  } else if (phase < 0.5625) {
    return '🌕'; // Cheia
  } else if (phase < 0.6875) {
    return '🌖'; // Minguante Gibosa
  } else if (phase < 0.8125) {
    return '🌗'; // Quarto Minguante
  } else {
    return '🌘'; // Minguante
  }
}

