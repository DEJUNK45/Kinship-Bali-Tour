
export interface WeatherData {
  condition: 'Sunny' | 'Partly Cloudy' | 'Cloudy' | 'Rainy' | 'Stormy';
  tempMin: number;
  tempMax: number;
  humidity: number;
}

const getLocationModifier = (location: string) => {
  const loc = location.toLowerCase();
  if (loc.includes('ubud') || loc.includes('kintamani') || loc.includes('bedugul')) {
    return { temp: -3, rainProb: 1.2 }; // Cooler and wetter in highlands
  }
  if (loc.includes('uluwatu') || loc.includes('bukit')) {
    return { temp: 1, rainProb: 0.8 }; // Hotter and drier in south
  }
  return { temp: 0, rainProb: 1.0 };
};

export const getWeatherForecast = (location: string, dateStr: string): WeatherData => {
  const date = new Date(dateStr);
  const month = date.getMonth(); // 0-11
  const modifier = getLocationModifier(location);
  
  // Bali Seasons:
  // Wet: October (9) to March (2)
  // Dry: April (3) to September (8)
  
  const isWetSeason = month >= 9 || month <= 2;
  
  let baseMax = 31;
  let baseMin = 24;
  let condition: WeatherData['condition'] = 'Sunny';
  let humidity = 75;

  if (isWetSeason) {
    baseMax = 30;
    baseMin = 24;
    humidity = 85;
    // Randomize slightly
    const rand = Math.random() * modifier.rainProb;
    if (rand > 0.6) condition = 'Rainy';
    else if (rand > 0.4) condition = 'Cloudy';
    else if (rand > 0.2) condition = 'Partly Cloudy';
    else condition = 'Sunny';
    
    if (Math.random() > 0.8 && isWetSeason) condition = 'Stormy';
  } else {
    // Dry season
    baseMax = 29;
    baseMin = 22;
    humidity = 65;
    
    const rand = Math.random() * modifier.rainProb;
    if (rand > 0.85) condition = 'Rainy'; // Occasional rain
    else if (rand > 0.6) condition = 'Partly Cloudy';
    else condition = 'Sunny';
  }

  // Apply modifiers
  const tempMax = Math.round(baseMax + modifier.temp + (Math.random() * 2 - 1));
  const tempMin = Math.round(baseMin + modifier.temp + (Math.random() * 2 - 1));

  return {
    condition,
    tempMax,
    tempMin,
    humidity: Math.min(100, Math.round(humidity + (Math.random() * 10 - 5)))
  };
};
