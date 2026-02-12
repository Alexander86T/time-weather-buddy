const weatherDescriptions: Record<number, string> = {
  0: 'ясно',
  1: 'преимущественно ясно',
  2: 'переменная облачность',
  3: 'облачно',
  45: 'туман',
  48: 'туман с изморозью',
  51: 'лёгкая морось',
  53: 'морось',
  55: 'сильная морось',
  61: 'небольшой дождь',
  63: 'дождь',
  65: 'сильный дождь',
  71: 'небольшой снег',
  73: 'снег',
  75: 'сильный снег',
  80: 'ливень',
  81: 'сильный ливень',
  82: 'очень сильный ливень',
  95: 'гроза',
  96: 'гроза с градом',
  99: 'сильная гроза с градом',
};

function tempWord(t: number): string {
  const abs = Math.abs(Math.round(t));
  const last = abs % 10;
  const lastTwo = abs % 100;
  if (lastTwo >= 11 && lastTwo <= 19) return 'градусов';
  if (last === 1) return 'градус';
  if (last >= 2 && last <= 4) return 'градуса';
  return 'градусов';
}

export async function getWeatherTextInRussian(): Promise<string> {
  const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
  });

  const { latitude, longitude } = pos.coords;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=1`;

  const res = await fetch(url);
  const data = await res.json();

  const currentTemp = Math.round(data.current.temperature_2m);
  const currentCode = data.current.weather_code;
  const maxTemp = Math.round(data.daily.temperature_2m_max[0]);
  const minTemp = Math.round(data.daily.temperature_2m_min[0]);

  const condition = weatherDescriptions[currentCode] || 'неизвестная погода';
  const sign = currentTemp < 0 ? 'минус ' : '';

  return `Сейчас ${condition}, температура ${sign}${Math.abs(currentTemp)} ${tempWord(currentTemp)}. Сегодня максимум ${maxTemp} ${tempWord(maxTemp)}, минимум ${minTemp} ${tempWord(minTemp)}.`;
}
