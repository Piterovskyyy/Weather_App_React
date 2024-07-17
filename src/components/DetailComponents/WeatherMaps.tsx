import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { weatherDataInterface } from "../../interfaces/interface";
import CloudSvg from "./WeatherConditionsSvg/CloudSvg";
import PrecipitationSvg from "./WeatherConditionsSvg/PrecipitationSvg";
import PressureSvg from "./WeatherConditionsSvg/PressureSvg";
import WindSpeedSvg from "./WeatherConditionsSvg/WindSpeedSvg";
import TemperatureSvg from "./WeatherConditionsSvg/TemperatureSvg";
const API_KEY = import.meta.env.VITE_API_KEY;

const WeatherMaps: React.FC<{ weatherData: weatherDataInterface }> = ({
  weatherData,
}) => {
  const [mapLayer, setMapLayer] = useState("clouds_new");

  return (
    <div className="flex flex-col p-3 w-full space-y-2 h-[500px] lg:h-full">
      <h4 className="uppercase text-sm font-mono font-medium">Weather map</h4>
      <div className="flex flex-col md:flex-row justify-start items-center p-2 flex-1 space-y-4 md:space-y-0">
        <div className="w-full flex items-center justify-center md:w-1/2 md:flex-col md:space-y-2 md:px-12 space-x-4 md:space-x-0 text-sm lg:text-base">
          <button
            className={`flex flex-row items center justify-start space-x-4 md:w-full border-2 p-2 border-white rounded-xl ${
              mapLayer === "clouds_new"
                ? "bg-gray-500"
                : "bg-transparent hover:bg-gray-500"
            } duration-150`}
            onClick={() => {
              setMapLayer("clouds_new");
            }}
          >
            <CloudSvg />
            <span className="hidden md:block">Clouds Map</span>
          </button>
          <button
            className={`flex flex-row items center justify-start space-x-4 md:w-full border-2 border-white  rounded-xl p-2 ${
              mapLayer === "precipitation_new"
                ? "bg-blue-700"
                : "bg-transparent hover:bg-blue-700"
            } duration-150`}
            onClick={() => {
              setMapLayer("precipitation_new");
            }}
          >
            <PrecipitationSvg />
            <span className="hidden md:block">Precipitation Map </span>
          </button>
          <button
            className={`flex flex-row items center justify-start space-x-4 md:w-full border-2 border-white rounded-xl p-2 ${
              mapLayer === "pressure_new"
                ? "bg-orange-400"
                : "bg-transparent hover:bg-orange-400"
            } duration-150`}
            onClick={() => {
              setMapLayer("pressure_new");
            }}
          >
            <PressureSvg />
            <span className="hidden md:block">Sea level pressure Map</span>
          </button>
          <button
            className={`flex flex-row items center justify-start space-x-4 md:w-full border-2 border-white  rounded-xl p-2 ${
              mapLayer === "wind_new"
                ? "bg-indigo-400"
                : "bg-transparent hover:bg-indigo-400"
            } duration-150`}
            onClick={() => {
              setMapLayer("wind_new");
            }}
          >
            <WindSpeedSvg />
            <span className="hidden md:block">Wind speed Map</span>
          </button>
          <button
            className={`flex flex-row items center justify-start space-x-4 md:w-full border-2 border-white rounded-xl p-2 ${
              mapLayer === "temp_new"
                ? "bg-red-500"
                : "bg-transparent hover:bg-red-500"
            } duration-150`}
            onClick={() => {
              setMapLayer("temp_new");
            }}
          >
            <TemperatureSvg />
            <span className="hidden md:block">Temperature Map</span>
          </button>
        </div>
        <div className="w-full md:w-1/2 h-full">
          <MapContainer
            center={[weatherData.coord.lat, weatherData.coord.lon]}
            zoom={7}
            style={{
              height: "100%",
              width: "100%",
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
              borderBottomLeftRadius: "16px",
              borderBottomRightRadius: "16px",
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <TileLayer
              url={`https://tile.openweathermap.org/map/${mapLayer}/{z}/{x}/{y}.png?appid=${API_KEY}`}
              attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
            />
            <Marker position={[weatherData.coord.lat, weatherData.coord.lon]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default WeatherMaps;
