
import React, { useMemo } from 'react';
import { getWeatherForecast } from '../services/weatherService';

interface WeatherWidgetProps {
  location: string;
  date: string; // YYYY-MM-DD
}

const WeatherIcon: React.FC<{ condition: string, className?: string }> = ({ condition, className = "w-8 h-8" }) => {
  switch (condition) {
    case 'Sunny':
      return (
        <svg className={`${className} text-yellow-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    case 'Partly Cloudy':
      return (
        <svg className={`${className} text-blue-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      );
    case 'Cloudy':
      return (
        <svg className={`${className} text-stone-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      );
    case 'Rainy':
      return (
        <svg className={`${className} text-blue-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 16.2A4.5 4.5 0 0017.5 8h-1.8c-.7-2.1-2.9-3.5-5.2-3.3-2.7.2-4.8 2.3-5.2 5a4.5 4.5 0 00-5.6 5.5c.2.6.5 1.2.9 1.7M8 20v-2m4 2v-4m4 4v-2" />
        </svg>
      );
    case 'Stormy':
      return (
        <svg className={`${className} text-purple-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    default:
      return (
        <svg className={`${className} text-yellow-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
  }
};

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ location, date }) => {
  const weather = useMemo(() => getWeatherForecast(location, date), [location, date]);

  const formattedDate = new Date(date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' });

  return (
    <div className="flex items-center bg-blue-50 rounded-lg px-3 py-2 border border-blue-100 shadow-sm min-w-[180px]">
      <div className="mr-3">
        <WeatherIcon condition={weather.condition} />
      </div>
      <div>
        <div className="text-xs text-blue-800 font-medium">{formattedDate}</div>
        <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-stone-800">{weather.tempMax}°</span>
            <span className="text-xs text-stone-500">/ {weather.tempMin}°</span>
        </div>
        <div className="text-xs text-stone-600 capitalize">{weather.condition}</div>
      </div>
    </div>
  );
};
