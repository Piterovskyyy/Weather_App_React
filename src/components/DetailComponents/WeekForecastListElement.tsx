import React from "react";
import { WeatherDataInterface } from "../../interfaces/interface";

const WeekForecastListElement: React.FC<{
  dayData: WeatherDataInterface;
  timezone: number;
}> = ({ dayData, timezone }) => {
  const date = new Date((dayData.dt + timezone - 14400) * 1000);
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
  const iconURL = `https://openweathermap.org/img/wn/${dayData.weather[0].icon}.png`;

  return (
    <li className="w-full flex items-center border-b-2  border-white last:border-none text-center p-1 justify-between">
      <h5 className="w-1/4 text-left text-xs md:text-base">{dayOfWeek}</h5>
      <div className="w-1/2 flex space-x-2 items-center justify-center">
        <div className="w-1/2 flex justify-end items-center">
          <img src={iconURL} alt="icon" className="h-12 w-12 md:h-14 md:w-14" />
        </div>
        <div className="w-1/2 flex justify-start items-center text-left">
          <h5 className="text-xs md:text-base">
            {dayData.weather[0].description}
          </h5>
        </div>
      </div>
      <h5 className="w-1/4 text-right text-lg md:text-xl font-bold">
        {Math.floor(dayData.main.temp_max - 273.15)}&#176;
      </h5>
    </li>
  );
};

export default WeekForecastListElement;
