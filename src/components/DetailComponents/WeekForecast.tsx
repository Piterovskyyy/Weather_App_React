import React, { useState } from "react";
import { WeatherForecastDataInterface } from "../../interfaces/interface";
import WeekForecastListElement from "./WeekForecastListElement";

const WeekForecast: React.FC<{
  weatherForecastData: WeatherForecastDataInterface;
}> = ({ weatherForecastData }) => {
  const [isDayActive, setIsDayActive] = useState(true);
  const filterWeatherForecastData = weatherForecastData.list.filter(
    (dayData) => {
      const date = new Date(
        (dayData.dt + weatherForecastData.city.timezone - 14400) * 1000
      );
      const time = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      if (isDayActive) {
        if (time == "11:00" || time == "12:00" || time == "13:00") {
          return true;
        } else {
          return false;
        }
      } else {
        if (time == "23:00" || time == "00:00" || time == "01:00") {
          return true;
        } else {
          return false;
        }
      }
    }
  );
  return (
    <div className="flex flex-col p-3 w-full space-y-2 h-full">
      <div className="flex justify-between">
        <h4 className="uppercase text-sm font-mono font-medium">
          5-day Forecast
        </h4>
        <div className="flex space-x-3">
          <button
            className={`w-8 h-8 ${
              isDayActive ? "bg-dayIconActive" : "bg-dayIcon"
            } bg-cover`}
            onClick={() => {
              setIsDayActive(true);
            }}
          ></button>
          <button
            className={`w-8 h-8 ${
              isDayActive ? "bg-nightIcon" : "bg-nightIconActive"
            } bg-cover`}
            onClick={() => {
              setIsDayActive(false);
            }}
          ></button>
        </div>
      </div>

      <div className="flex justify-start items-centerv overflow-y-auto w-full">
        <ul className="w-full px-2 md:px-6">
          {filterWeatherForecastData.map((dayData) => (
            <WeekForecastListElement
              key={dayData.dt}
              dayData={dayData}
              timezone={weatherForecastData.city.timezone}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeekForecast;
