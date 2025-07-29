export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: { description: string; icon: string }[];
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
  };
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like?: number;
    temp_min?: number;
    temp_max?: number;
    pressure?: number;
    humidity?: number;
    temp_kf?: number;
  };
  weather: {
    id?: number;
    main?: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg?: number;
    gust?: number;
  };
  dt_txt?: string;
}

// HourlyForecast interface for hourly weather forecast
export interface HourlyForecast {
  dt: number; // timestamp of the forecast
  temp: number;
  weather: { description: string }[];
  wind: {
    speed: number;
  };
}

// DailyForecast interface for daily weather forecast
export interface DailyForecast {
  dt: number; // timestamp of the forecast
  temp: {
    day: number;
    night: number;
  };
  weather: { description: string; icon: string }[];
  wind: {
    speed: number;
  };
}

export type DayData = {
  temps: number[];
  windSpeeds: number[];
  descriptions: string[];
  icons: string[];
};
