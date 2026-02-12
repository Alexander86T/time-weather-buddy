

# 🌙 Russian Voice Assistant App

A dark-themed app with two large interactive buttons that speak the current time and weather in Russian.

## Screen Layout
- **Full dark screen** with a minimal, elegant design
- **Two large icon buttons** centered on screen: a **Clock** icon and a **Weather** icon
- Subtle animations on hover/tap for visual feedback
- Clean, modern look with soft icon styling against the dark background

## Features

### 🕐 Clock Button
- Tapping the Clock icon speaks the **current local time** in Russian using the browser's built-in speech synthesis
- Example output: *"Сейчас четырнадцать часов тридцать минут"*
- Uses the device's local timezone automatically

### 🌤️ Weather Button
- Tapping the Weather icon:
  1. Detects the user's **current location** via browser geolocation
  2. Fetches today's weather from **Open-Meteo** (free, no API key needed)
  3. Speaks a **weather summary in Russian** including temperature, conditions, and forecast
- Example output: *"Сегодня облачно, температура пять градусов, ожидается дождь"*

### Speech
- Uses the **browser's built-in Web Speech API** with Russian language voice
- No backend or API keys required

