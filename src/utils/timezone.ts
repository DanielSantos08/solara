/**
 * Calcula a hora local de uma cidade baseado no timezone offset
 * @param timezoneOffset Offset em segundos do UTC
 * @returns Objeto Date com a hora local da cidade
 */
export function getCityLocalTime(timezoneOffset: number): Date {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const cityTime = new Date(utc + (timezoneOffset * 1000));
  return cityTime;
}

/**
 * Formata a hora local da cidade
 * @param timezoneOffset Offset em segundos do UTC
 * @returns String formatada "HH:MM:SS"
 */
export function formatCityTime(timezoneOffset: number): string {
  const cityTime = getCityLocalTime(timezoneOffset);
  return cityTime.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/**
 * Calcula a diferença de fuso horário entre o usuário e a cidade
 * @param timezoneOffset Offset em segundos do UTC da cidade
 * @returns String descritiva da diferença
 */
export function getTimezoneInfo(timezoneOffset: number): string {
  const userOffset = new Date().getTimezoneOffset() * -60; // segundos
  const diff = (timezoneOffset - userOffset) / 3600; // horas
  
  if (diff === 0) return "Mesmo fuso horário que você";
  if (diff > 0) return `${diff}h à frente de você`;
  return `${Math.abs(diff)}h atrás de você`;
}

/**
 * Retorna o nome do timezone em formato legível
 * @param timezoneOffset Offset em segundos do UTC
 * @returns String "UTC+X" ou "UTC-X"
 */
export function getTimezoneLabel(timezoneOffset: number): string {
  const hours = timezoneOffset / 3600;
  if (hours === 0) return "UTC";
  if (hours > 0) return `UTC+${hours}`;
  return `UTC${hours}`;
}

