import { useState } from "react";
import { Clock, CloudSun } from "lucide-react";
import { getTimeTextInRussian, speakRussian } from "@/lib/speech";
import { getWeatherTextInRussian } from "@/lib/weather";

const Index = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClock = () => {
    setActiveButton("clock");
    const text = getTimeTextInRussian();
    speakRussian(text);
    setTimeout(() => setActiveButton(null), 1500);
  };

  const handleWeather = async () => {
    setActiveButton("weather");
    setLoading(true);
    try {
      const text = await getWeatherTextInRussian();
      speakRussian(text);
    } catch {
      speakRussian("Не удалось получить данные о погоде. Проверьте доступ к геолокации.");
    } finally {
      setLoading(false);
      setTimeout(() => setActiveButton(null), 1500);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background gap-20">
      <button
        onClick={handleClock}
        className={`group flex flex-col items-center gap-6 transition-all duration-300 ${
          activeButton === "clock" ? "scale-105" : "hover:scale-105"
        }`}
      >
        <div className={`rounded-full border-4 border-white bg-white p-12 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:shadow-white/20 ${
          activeButton === "clock" ? "shadow-xl shadow-white/30 ring-4 ring-white/50" : ""
        }`}>
          <Clock size={96} className="text-neutral-800 transition-colors group-hover:text-neutral-900" strokeWidth={2} />
        </div>
        <span className="text-2xl font-semibold text-white">Время</span>
      </button>

      <button
        onClick={handleWeather}
        disabled={loading}
        className={`group flex flex-col items-center gap-6 transition-all duration-300 ${
          activeButton === "weather" ? "scale-105" : "hover:scale-105"
        } ${loading ? "opacity-60 cursor-wait" : ""}`}
      >
        <div className={`rounded-full border-4 border-white bg-white p-12 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:shadow-white/20 ${
          activeButton === "weather" ? "shadow-xl shadow-white/30 ring-4 ring-white/50" : ""
        }`}>
          <CloudSun size={96} className="text-neutral-800 transition-colors group-hover:text-neutral-900" strokeWidth={2} />
        </div>
        <span className="text-2xl font-semibold text-white">
          {loading ? "Загрузка..." : "Погода"}
        </span>
      </button>
    </div>
  );
};

export default Index;
