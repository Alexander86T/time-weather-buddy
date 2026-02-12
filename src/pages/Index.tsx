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
    <div className="flex min-h-screen items-center justify-center bg-background gap-16">
      <button
        onClick={handleClock}
        className={`group flex flex-col items-center gap-4 transition-all duration-300 ${
          activeButton === "clock" ? "scale-110" : "hover:scale-105"
        }`}
      >
        <div className={`rounded-full border-2 border-muted p-8 transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] ${
          activeButton === "clock" ? "border-primary shadow-[0_0_40px_hsl(var(--primary)/0.4)]" : ""
        }`}>
          <Clock size={64} className="text-muted-foreground transition-colors group-hover:text-primary" />
        </div>
        <span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">Время</span>
      </button>

      <button
        onClick={handleWeather}
        disabled={loading}
        className={`group flex flex-col items-center gap-4 transition-all duration-300 ${
          activeButton === "weather" ? "scale-110" : "hover:scale-105"
        } ${loading ? "opacity-60 cursor-wait" : ""}`}
      >
        <div className={`rounded-full border-2 border-muted p-8 transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] ${
          activeButton === "weather" ? "border-primary shadow-[0_0_40px_hsl(var(--primary)/0.4)]" : ""
        }`}>
          <CloudSun size={64} className="text-muted-foreground transition-colors group-hover:text-primary" />
        </div>
        <span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
          {loading ? "Загрузка..." : "Погода"}
        </span>
      </button>
    </div>
  );
};

export default Index;
