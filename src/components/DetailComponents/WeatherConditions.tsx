import { weatherDataInterface } from "../../interfaces/interface";
import React from "react";
import PressureSvg from "./WeatherConditionsSvg/PressureSvg";
import CloudSvg from "./WeatherConditionsSvg/CloudSvg";
import PrecipitationSvg from "./WeatherConditionsSvg/PrecipitationSvg";
import WindSpeedSvg from "./WeatherConditionsSvg/WindSpeedSvg";
import HumiditySvg from "./WeatherConditionsSvg/HumiditySvg";
import VisibilitySvg from "./WeatherConditionsSvg/VisibilitySvg";
import WindDirectionSvg from "./WeatherConditionsSvg/WindDirectionSvg";
const WeatherConditions: React.FC<{ weatherData: weatherDataInterface }> = ({
  weatherData,
}) => {
  return (
    <div className="flex flex-col p-3 w-full space-y-2 h-full">
      <h4 className="uppercase text-sm font-mono font-medium">
        weather conditions
      </h4>
      <div className="flex flex-col space-y-4 md:flex-row justify-start items-center p-2 h-full md:space-x-2 md:space-y-0">
        <div className="flex space-x-2 w-full md:w-1/2">
          <div className="flex flex-col space-y-4 w-1/2 h-full justify-around md:py-6">
            <div className="flex space-x-2">
              <PressureSvg />
              <div className="flex flex-col">
                <span>Ground level</span>
                <span className="text-xl md:text-2xl font-bold">
                  {weatherData.main.grnd_level} hPa
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <PressureSvg />
              <div className="flex flex-col">
                <span>Sea level</span>
                <span className="text-xl md:text-2xl font-bold">
                  {weatherData.main.sea_level} hPa
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-4 w-1/2  h-full justify-around md:py-6">
            <div className="flex space-x-2">
              <CloudSvg />
              <div className="flex flex-col">
                <span>Cloudiness</span>
                <span className="text-xl md:text-2xl font-bold">
                  {weatherData.clouds.all} %
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <PrecipitationSvg />
              <div className="flex flex-col">
                <span>Rain</span>
                <span className="text-xl md:text-2xl font-bold">
                  {weatherData.rain
                    ? weatherData.rain["1h"]
                      ? weatherData.rain["1h"]
                      : "0"
                    : "0"}{" "}
                  mm
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-2 w-full md:w-1/2">
          <div className="flex flex-col space-y-4 w-1/2 h-full justify-around md:py-6">
            <div className="flex space-x-2">
              <HumiditySvg />
              <div className="flex flex-col">
                <span>Humidity</span>
                <span className="text-xl md:text-2xl font-bold">
                  {weatherData.main.humidity} %
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <VisibilitySvg />
              <div className="flex flex-col">
                <span>Visibility</span>
                <span className="text-xl md:text-2xl font-bold">
                  {weatherData.visibility} m
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-4 w-1/2 h-full justify-around md:py-6">
            <div className="flex space-x-2">
              <WindSpeedSvg />
              <div className="flex flex-col">
                <span>Wind speed</span>
                <span className="text-xl md:text-2xl font-bold">
                  {weatherData.wind.speed} m/s
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <WindDirectionSvg />
              <div className="flex flex-col">
                <span>Wind direction</span>
                <span className="text-xl md:text-2xl font-bold">
                  {weatherData.wind.deg} deg
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WeatherConditions;
