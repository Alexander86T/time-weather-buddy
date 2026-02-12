const ones = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
const onesF = ['', 'одна', 'две', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
const teens = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
const tens = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят'];

function hourWord(n: number): string {
  if (n === 1 || n === 21) return 'час';
  if ((n >= 2 && n <= 4) || (n >= 22 && n <= 24)) return 'часа';
  return 'часов';
}

function minuteWord(n: number): string {
  const last = n % 10;
  if (n >= 11 && n <= 19) return 'минут';
  if (last === 1) return 'минута';
  if (last >= 2 && last <= 4) return 'минуты';
  return 'минут';
}

function numberToRussian(n: number, feminine = false): string {
  if (n === 0) return 'ноль';
  if (n < 10) return feminine ? onesF[n] : ones[n];
  if (n < 20) return teens[n - 10];
  const ten = Math.floor(n / 10);
  const one = n % 10;
  return one === 0 ? tens[ten] : `${tens[ten]} ${feminine ? onesF[one] : ones[one]}`;
}

export function getTimeTextInRussian(): string {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const hourStr = numberToRussian(h);
  if (m === 0) return `Сейчас ${hourStr} ${hourWord(h)} ровно`;
  const minStr = numberToRussian(m, true);
  return `Сейчас ${hourStr} ${hourWord(h)} ${minStr} ${minuteWord(m)}`;
}

export function speakRussian(text: string) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ru-RU';
  const voices = window.speechSynthesis.getVoices();
  const ruVoice = voices.find(v => v.lang.startsWith('ru'));
  if (ruVoice) utterance.voice = ruVoice;
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}
