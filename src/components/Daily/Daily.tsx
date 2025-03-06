// import styled from "styled-components";
// import { useWeatherData } from "../../services/useWeatherData";
// import { format } from "date-fns";

// // Styled Components
// const DailyForecastContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   padding: 1rem;
//   background-color: #222;
//   border-radius: 8px;
//   color: white;
// `;

// const ForecastItem = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 0.75rem;
//   background: rgba(255, 255, 255, 0.1);
//   border-radius: 0.8rem;
// `;

// const WeatherIcon = styled.img`
//   width: 40px;
//   height: 40px;
// `;

// const DailyForecast = () => {
//   const { forecast, forecastError } = useWeatherData();

//   if (forecastError) return <p>Forecast not found</p>;
//   if (!forecast) return <p>Loading...</p>;

//   // Group forecast data by day
//   const dailyData = forecast.list.reduce((acc, item) => {
//     const date = item.dt_txt.split(" ")[0]; // Extract YYYY-MM-DD
//     if (!acc[date]) {
//       acc[date] = {
//         tempSum: 0,
//         tempMin: item.main.temp,
//         tempMax: item.main.temp,
//         count: 0,
//         popSum: 0,
//         icon: item.weather[0].icon,
//       };
//     }
//     acc[date].tempSum += item.main.temp;
//     acc[date].tempMin = Math.min(acc[date].tempMin, item.main.temp);
//     acc[date].tempMax = Math.max(acc[date].tempMax, item.main.temp);
//     acc[date].popSum += item.pop || 0;
//     acc[date].count += 1;
//     return acc;
//   }, {});

//   // Convert grouped data into an array and calculate averages
//   const dailyForecast = Object.entries(dailyData)
//     .slice(0, 5) // Get only the next 5 days
//     .map(([date, data], index) => {
//       const avgTemp = Math.round(data.tempSum / data.count);
//       const popPercentage = Math.round((data.popSum / data.count) * 100);
//       const dayLabel = index === 0 ? "Today" : format(new Date(date), "EEEE");
//       return {
//         date,
//         dayLabel,
//         avgTemp,
//         tempMin: Math.round(data.tempMin),
//         tempMax: Math.round(data.tempMax),
//         popPercentage,
//         icon: data.icon,
//       };
//     });

//   return (
//     <DailyForecastContainer>
//       {dailyForecast.map((day) => (
//         <ForecastItem key={day.date}>
//           <span>{day.dayLabel}</span>
//           <WeatherIcon
//             src={`https://openweathermap.org/img/wn/${day.icon}.png`}
//             alt="weather"
//           />
//           <span>{day.avgTemp}°C</span>
//           <span>
//             ({day.tempMin}° / {day.tempMax}°)
//           </span>
//           <span>💧 {day.popPercentage}%</span>
//         </ForecastItem>
//       ))}
//     </DailyForecastContainer>
//   );
// };

// export default DailyForecast;
