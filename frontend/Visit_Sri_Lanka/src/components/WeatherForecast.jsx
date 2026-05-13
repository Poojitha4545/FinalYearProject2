// WeatherForecast.jsx
// Drop-in replacement for the static 7-Day Forecast card in DestinationDetailPage.jsx
// Uses Open-Meteo API — free, no API key required.
//
// USAGE: Replace the entire "Weather" sidebar card with <WeatherForecast />.

import { useState, useEffect } from "react";

// ── Icons ─────────────────────────────────────────────────────────────────────

function IconSun({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}
function IconCloud({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  );
}
function IconCloudRain({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 19v2m4-2v2m4-2v2" />
    </svg>
  );
}
function IconThunder({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10l-2 4h4l-2 4" />
    </svg>
  );
}
function IconSnow({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 3v18M3.75 7.5l16.5 9M3.75 16.5l16.5-9" />
    </svg>
  );
}
function IconFog({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M5 16h14M7 8h10" />
    </svg>
  );
}
function IconWind({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M17.7 7.7a2.5 2.5 0 111.8 4.3H2m15.7 6.3a2.5 2.5 0 101.8-4.3H2" />
    </svg>
  );
}
function IconDroplet({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
    </svg>
  );
}
function IconUV({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4" strokeWidth={2} />
      <path strokeLinecap="round" strokeWidth={2}
        d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function interpretWMO(code) {
  if (code === 0)  return { label: "Clear",         type: "sun",     emoji: "☀️" };
  if (code <= 2)   return { label: "Partly Cloudy", type: "cloud",   emoji: "⛅" };
  if (code === 3)  return { label: "Overcast",      type: "cloud",   emoji: "☁️" };
  if (code <= 48)  return { label: "Foggy",         type: "fog",     emoji: "🌫️" };
  if (code <= 57)  return { label: "Drizzle",       type: "rain",    emoji: "🌦️" };
  if (code <= 67)  return { label: "Rain",          type: "rain",    emoji: "🌧️" };
  if (code <= 77)  return { label: "Snow",          type: "snow",    emoji: "❄️" };
  if (code <= 82)  return { label: "Showers",       type: "rain",    emoji: "🌨️" };
  if (code <= 99)  return { label: "Thunderstorm",  type: "thunder", emoji: "⛈️" };
  return                  { label: "Unknown",       type: "cloud",   emoji: "🌡️" };
}

function WeatherIcon({ type, className = "w-5 h-5" }) {
  switch (type) {
    case "sun":     return <IconSun className={`${className} text-yellow-500`} />;
    case "rain":    return <IconCloudRain className={`${className} text-blue-400`} />;
    case "thunder": return <IconThunder className={`${className} text-purple-400`} />;
    case "snow":    return <IconSnow className={`${className} text-sky-300`} />;
    case "fog":     return <IconFog className={`${className} text-gray-400`} />;
    default:        return <IconCloud className={`${className} text-gray-400`} />;
  }
}

function uvLabel(uv) {
  if (uv <= 2)  return { text: "Low",       color: "text-green-600" };
  if (uv <= 5)  return { text: "Moderate",  color: "text-yellow-500" };
  if (uv <= 7)  return { text: "High",      color: "text-orange-500" };
  if (uv <= 10) return { text: "Very High", color: "text-red-500" };
  return             { text: "Extreme",     color: "text-purple-600" };
}

const SIGIRIYA   = { lat: 7.957, lng: 80.760 };
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ── Component ──────────────────────────────────────────────────────────────────

export default function WeatherForecast() {
  const [data, setData]               = useState(null);
  const [error, setError]             = useState(null);
  const [loading, setLoading]         = useState(true);
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${SIGIRIYA.lat}&longitude=${SIGIRIYA.lng}` +
      `&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,uv_index_max` +
      `&current_weather=true` +
      `&hourly=relativehumidity_2m` +
      `&timezone=Asia%2FColombo` +
      `&forecast_days=7`;

    fetch(url)
      .then((r) => { if (!r.ok) throw new Error("Network error"); return r.json(); })
      .then((json) => { setData(json); setLoading(false); })
      .catch((e)   => { setError(e.message); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <IconSun className="w-5 h-5 text-yellow-500 animate-spin" style={{ animationDuration: "3s" }} />
          <h3 className="text-base font-bold text-foreground">7-Day Forecast</h3>
        </div>
        <div className="p-6 flex flex-col items-center gap-3 text-muted-foreground">
          <div className="w-7 h-7 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">Fetching live weather…</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <IconSun className="w-5 h-5 text-yellow-500" />
          <h3 className="text-base font-bold text-foreground">7-Day Forecast</h3>
        </div>
        <div className="p-5 text-sm text-muted-foreground text-center">
          <p>⚠️ Unable to load live weather.</p>
          <p className="mt-1 text-xs opacity-70">{error}</p>
        </div>
      </div>
    );
  }

  const { daily, current_weather, hourly } = data;

  const todayHumidity = Math.round(
    hourly.relativehumidity_2m.slice(0, 24).reduce((a, b) => a + b, 0) / 24
  );
  const current = interpretWMO(current_weather.weathercode);

  const days = daily.time.map((dateStr, i) => {
    const d = new Date(dateStr + "T00:00:00");
    return {
      label: i === 0 ? "Today" : DAY_LABELS[d.getDay()],
      date:  d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      wmo:   interpretWMO(daily.weathercode[i]),
      high:  Math.round(daily.temperature_2m_max[i]),
      low:   Math.round(daily.temperature_2m_min[i]),
      rain:  daily.precipitation_sum[i].toFixed(1),
      wind:  Math.round(daily.windspeed_10m_max[i]),
      uv:    Math.round(daily.uv_index_max[i]),
    };
  });

  const sel = days[selectedDay];
  const uv  = uvLabel(sel.uv);

  return (
    <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">

      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <IconSun className="w-5 h-5 text-yellow-500" />
          7-Day Forecast
        </h3>
        <span className="text-[11px] bg-green-100 text-green-700 rounded-full px-2 py-0.5 font-semibold">
          ● Live
        </span>
      </div>

      {/* Current conditions */}
      <div className="px-4 py-3 bg-primary/5 border-b border-border">
        <p className="text-[11px] text-muted-foreground mb-1.5">Right now · Sigiriya</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WeatherIcon type={current.type} className="w-7 h-7" />
            <span className="text-2xl font-bold text-foreground leading-none">
              {Math.round(current_weather.temperature)}°C
            </span>
            <span className="text-sm text-muted-foreground">{current.label}</span>
          </div>
          <div className="text-right text-xs text-muted-foreground space-y-1">
            <div className="flex items-center justify-end gap-1">
              <IconWind className="w-3 h-3" />
              <span>{Math.round(current_weather.windspeed)} km/h</span>
            </div>
            <div className="flex items-center justify-end gap-1">
              <IconDroplet className="w-3 h-3" />
              <span>{todayHumidity}% humidity</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">

        {/* ── 7-day ROWS (not columns) — fits any sidebar width ── */}
        <div className="space-y-0.5">
          {days.map((day, i) => (
            <button
              key={i}
              onClick={() => setSelectedDay(i)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-left ${
                selectedDay === i
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "hover:bg-muted"
              }`}
            >
              {/* Day name */}
              <span className={`w-9 text-xs font-semibold shrink-0 ${
                selectedDay === i ? "text-primary-foreground" : "text-muted-foreground"
              }`}>
                {day.label.slice(0, 3)}
              </span>

              {/* Icon */}
              <WeatherIcon
                type={day.wmo.type}
                className={`w-4 h-4 shrink-0 ${selectedDay === i ? "text-white" : ""}`}
              />

              {/* Condition */}
              <span className={`flex-1 text-xs truncate ${
                selectedDay === i ? "text-primary-foreground/80" : "text-muted-foreground"
              }`}>
                {day.wmo.label}
              </span>

              {/* Low */}
              <span className={`text-xs w-7 text-right shrink-0 ${
                selectedDay === i ? "text-primary-foreground/60" : "text-muted-foreground"
              }`}>
                {day.low}°
              </span>

              {/* Temp bar */}
              <div className={`w-10 h-1.5 rounded-full shrink-0 ${
                selectedDay === i ? "bg-white/30" : "bg-muted"
              }`}>
                <div
                  className={`h-full rounded-full ${selectedDay === i ? "bg-white" : "bg-primary"}`}
                  style={{ width: `${Math.min(100, Math.max(10, ((day.high - 20) / 18) * 100))}%` }}
                />
              </div>

              {/* High */}
              <span className={`text-xs font-bold w-7 text-right shrink-0 ${
                selectedDay === i ? "text-primary-foreground" : "text-foreground"
              }`}>
                {day.high}°
              </span>
            </button>
          ))}
        </div>

        {/* ── Selected day detail panel ── */}
        <div className="rounded-xl border border-border bg-muted/40 p-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-bold text-foreground text-sm">{sel.label}</p>
              <p className="text-xs text-muted-foreground">{sel.date}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg leading-none">{sel.wmo.emoji}</span>
              <span className="text-xs font-medium text-foreground">{sel.wmo.label}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* Rain */}
            <div className="flex flex-col items-center gap-0.5 bg-card rounded-lg py-2 border border-border">
              <IconDroplet className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] text-muted-foreground mt-0.5">Rain</span>
              <span className="text-xs font-bold text-foreground">{sel.rain} mm</span>
            </div>
            {/* Wind */}
            <div className="flex flex-col items-center gap-0.5 bg-card rounded-lg py-2 border border-border">
              <IconWind className="w-4 h-4 text-gray-400" />
              <span className="text-[10px] text-muted-foreground mt-0.5">Wind</span>
              <span className="text-xs font-bold text-foreground">{sel.wind} km/h</span>
            </div>
            {/* UV */}
            <div className="flex flex-col items-center gap-0.5 bg-card rounded-lg py-2 border border-border">
              <IconUV className="w-4 h-4 text-orange-400" />
              <span className="text-[10px] text-muted-foreground mt-0.5">UV</span>
              <span className={`text-xs font-bold ${uv.color}`}>{uv.text}</span>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-muted-foreground text-center">
          Data from Open-Meteo · Updated on page load
        </p>
      </div>
    </div>
  );
}