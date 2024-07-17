import React from "react";
import { WeatherForecastDataInterface } from "../../interfaces/interface";
import TodayForecastListElement from "./TodayForecastListElement";

const TodayForecast: React.FC<{
  weatherForecastData: WeatherForecastDataInterface;
}> = ({ weatherForecastData }) => {
  return (
    <div className="flex flex-col p-3 w-full space-y-2">
      <h4 className="uppercase text-sm font-mono font-medium">
        Today's Forecast
      </h4>
      <div className="flex justify-start items-center overflow-x-auto">
        <ul className="flex py-4">
          {weatherForecastData.list.slice(0, 9).map((dayData) => (
            <TodayForecastListElement
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

export default TodayForecast;
