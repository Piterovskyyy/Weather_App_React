import React, { useState } from "react";
import { useEffect } from "react";
import { weatherDataInterface } from "../../interfaces/interface.js";
import { NavLink } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_KEY;

const NavPanelElement: React.FC<{
  city: string;
}> = (props) => {
  const [fetchedCities, setFetchedCities] = useState<weatherDataInterface>();
  const [weatherIcon, setWeatherIcon] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${API_KEY}`
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${API_KEY}`
      );

      const data: weatherDataInterface = await response.json();

      const iconId = data.weather[0].icon;
      const iconURL = `https://openweathermap.org/img/wn/${iconId}@2x.png`;
      setIsLoading(false);
      setFetchedCities(data);
      setWeatherIcon(iconURL);
    };
    fetchData();
  }, [props.city]);
  let name, temp;
  if (fetchedCities) {
    name = fetchedCities.name;
    temp = Math.floor(fetchedCities.main.temp - 273.15);
  }
  if (isLoading) {
    return <li className={`w-full border-b-2 border-white p-2`}>Loading...</li>;
  }

  return (
    <li>
      <NavLink
        className={({ isActive }) => {
          const classes = isActive
            ? "flex justify-between items-center w-full border-b-2 border-gray-500 p-2 font-bold duration-150"
            : "flex justify-between items-center w-full border-b-2 border-white p-2";

          return classes;
        }}
        to={`/${name}`}
      >
        <div className="text-left">{name}</div>
        <div className="flex justify-center items-center text-white">
          <img src={weatherIcon} alt="icon" className="w-10 h-10" />
          {temp}&#176;
        </div>
      </NavLink>
    </li>
  );
};
export default NavPanelElement;
