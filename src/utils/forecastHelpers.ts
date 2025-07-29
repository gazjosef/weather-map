import { DailyForecast, ForecastItem, DayData } from "../types/weather";

export const processDailyForecast = (
  forecastList: ForecastItem[]
): DailyForecast[] => {
  const dailyMap = new Map<number, DayData>();
  const currentDateTimestamp = new Date().setHours(0, 0, 0, 0);

  forecastList.forEach((entry) => {
    const date = new Date(entry.dt * 1000).setHours(0, 0, 0, 0);
    if (date >= currentDateTimestamp) {
      if (!dailyMap.has(date)) {
        dailyMap.set(date, {
          temps: [],
          windSpeeds: [],
          descriptions: [],
          icons: [],
        });
      }
      const dayData = dailyMap.get(date);
      if (!dayData) return;
      dayData.temps.push(entry.main.temp);
      dayData.windSpeeds.push(entry.wind.speed);
      dayData.descriptions.push(entry.weather[0].description);
      dayData.icons.push(entry.weather[0].icon);
    }
  });

  return Array.from(dailyMap.entries())
    .sort(([a], [b]) => a - b)
    .slice(0, 5)
    .map(([dt, data]) => ({
      dt: dt / 1000,
      temp: {
        day: Math.max(...data.temps),
        night: Math.min(...data.temps),
      },
      weather: [
        {
          description: mostFrequent(data.descriptions),
          icon: mostFrequent(data.icons),
        },
      ],
      wind: {
        speed: average(data.windSpeeds),
      },
    }));
};

const mostFrequent = (arr: string[]): string =>
  arr
    .sort(
      (a, b) =>
        arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
    )
    .pop()!;

const average = (arr: number[]): number =>
  arr.reduce((sum, val) => sum + val, 0) / arr.length;
