import React from "react";
import { WeatherDataInterface } from "../../interfaces/interface";

const TodayForecastListElement: React.FC<{
  dayData: WeatherDataInterface;
  timezone: number;
}> = ({ dayData, timezone }) => {
  const date = new Date((dayData.dt + timezone - 14400) * 1000);
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const iconURL = `https://openweathermap.org/img/wn/${dayData.weather[0].icon}.png`;

  return (
    <li className="w-28 flex flex-col items-center border-r-2  border-white last:border-none text-center p-2">
      <h5 className="text-sm md:text-base">{time}</h5>
      <img src={iconURL} alt="icon" className="h-12 w-12 md:h-14 md:w-14" />
      <div className="flex flex-col items-center justify-center space-y-2 text-center">
        <h5 className="text-xs">{dayData.weather[0].description}</h5>
        <h5 className="text-lg md:text-2xl font-bold">
          {Math.floor(dayData.main.temp - 273.15)}&#176;
        </h5>
      </div>
    </li>
  );
};

export default TodayForecastListElement;
