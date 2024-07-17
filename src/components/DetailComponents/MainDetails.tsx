import React, { useEffect, useState } from "react";
import { weatherDataInterface } from "../../interfaces/interface";
import { useFavouriteCities } from "../../Context/FavouriteCitiesContext";

const MainDetails: React.FC<{
  weatherData: weatherDataInterface;
  iconURL: string;
}> = ({ weatherData, iconURL }) => {
  const [date, setDate] = useState("");
  const { favList, setFavList } = useFavouriteCities();
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const updateDate = () => {
      const utcDate = new Date();
      const localDate = new Date(
        utcDate.getTime() + weatherData.timezone * 1000
      );
      setDate(localDate.toLocaleString("en-GB", { timeZone: "UTC" }));
    };

    updateDate();
    const interval = setInterval(updateDate, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [weatherData.timezone]);

  useEffect(() => {
    setIsFavourite(favList.some((city) => city.city === weatherData.name));
  }, [favList, weatherData.name]);

  const addToFavourite = () => {
    if (!isFavourite) {
      const updatedList = [
        ...favList,
        { id: favList.length + 1, city: weatherData.name },
      ];
      setFavList(updatedList);
      localStorage.setItem(
        "favouriteCities",
        JSON.stringify(updatedList.map((city) => city.city))
      );
      setIsFavourite(true);
    }
  };

  const removeFromFavourite = () => {
    if (isFavourite) {
      const updatedList = favList.filter(
        (city) => city.city !== weatherData.name
      );
      setFavList(updatedList);
      localStorage.setItem(
        "favouriteCities",
        JSON.stringify(updatedList.map((city) => city.city))
      );
      setIsFavourite(false);
    }
  };

  return (
    <div className="flex justify-between w-full p-3 relative md:p-4">
      <div className="flex flex-col items-start space-y-3">
        <div className="flex flex-col space-y-1">
          <h2 className="text-3xl">{weatherData.name}</h2>
          <h3>{date}</h3>
        </div>
        <div className="flex flex-col space-y-1">
          <h1 className="text-5xl font-bold ">
            {Math.floor(weatherData.main.temp - 273.15)}&#176;
          </h1>
          <h3 className="text-xl">{weatherData.weather[0].description}</h3>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-1">
          <h3 className="text-xl">
            {Math.floor(weatherData.main.temp_max - 273.15)}&#176; /{" "}
            {Math.floor(weatherData.main.temp_min - 273.15)}&#176;
          </h3>
          <h3 className="text-xl">
            Real Feel {Math.floor(weatherData.main.feels_like - 273.15)}
            &#176;
          </h3>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <img src={iconURL} alt="icon" className="h-48 w-48" />
      </div>
      {isFavourite ? (
        <button
          className="absolute top-4 right-4 p-1"
          onClick={removeFromFavourite}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="yellow"
            stroke="yellow"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-star hover:scale-125 duration-200"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </button>
      ) : (
        <button className="absolute top-4 right-4 p-1" onClick={addToFavourite}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="yellow"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-star hover:scale-125 duration-200"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </button>
      )}
    </div>
  );
};

export default MainDetails;
