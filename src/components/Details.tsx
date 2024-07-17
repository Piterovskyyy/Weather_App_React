import {
  weatherDataInterface,
  WeatherForecastDataInterface,
} from "../interfaces/interface";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import TodayForecast from "./DetailComponents/TodayForecast";
import WeekForecast from "./DetailComponents/WeekForecast";
import WeatherMaps from "./DetailComponents/WeatherMaps";
import WeatherConditions from "./DetailComponents/WeatherConditions";
import MainDetails from "./DetailComponents/MainDetails";
const API_KEY = import.meta.env.VITE_API_KEY;

console.log(API_KEY);
const Details = () => {
  const { weatherData, weatherForecastData, iconURL } = useLoaderData() as {
    weatherData: weatherDataInterface;
    weatherForecastData: WeatherForecastDataInterface;
    iconURL: string;
  };

  // const location = useLocation();

  return (
    <div className="flex-1 flex flex-col items-center max-w-full space-y-4 p-2 md:px-8 md:py-4 text-white lg:flex-row md:justify-center lg:justify-start lg:space-y-0">
      <div className="flex flex-col w-full h-full lg:w-1/2 space-y-4 px-3">
        <MainDetails weatherData={weatherData} iconURL={iconURL} />
        <div className="bg-[#D0E5F2]/50 backdrop-blur-md w-full rounded-2xl">
          <TodayForecast weatherForecastData={weatherForecastData} />
        </div>
        <div className="flex-1 bg-[#D0E5F2]/50 backdrop-blur-md w-full rounded-2xl">
          <WeatherConditions weatherData={weatherData} />
        </div>
      </div>
      <div className="flex flex-col w-full h-full lg:w-1/2 space-y-4 px-3">
        <div className="bg-[#D0E5F2]/50 backdrop-blur-md w-full rounded-2xl lg:h-1/2">
          <WeekForecast weatherForecastData={weatherForecastData} />
        </div>
        <div className="bg-[#D0E5F2]/50 backdrop-blur-md w-full rounded-2xl lg:h-1/2">
          <WeatherMaps weatherData={weatherData} key={weatherData.id} />
        </div>
      </div>
    </div>
  );
};

export async function loader({ params }: LoaderFunctionArgs) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${params.cityName}&appid=${API_KEY}`
  );
  const response2 = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${params.cityName}&appid=${API_KEY}`
  );
  const weatherData: weatherDataInterface = await response.json();

  const weatherForecastData: WeatherForecastDataInterface =
    await response2.json();
  const iconId = weatherData.weather[0].icon;

  const iconURL = `https://openweathermap.org/img/wn/${iconId}@2x.png`;

  return { weatherData, weatherForecastData, iconURL };
}

export default Details;
