import { useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Timer from "./Timer";
import { autoComplateDataInterface } from "../interfaces/interface";
const RapidAPI_Key = import.meta.env.VITE_RAPIDAPI_KEY;

const Header = () => {
  const [cityName, setCityName] = useState("");
  const [cityNameMobile, setCityNameMobile] = useState("");
  const [autoComplateData, setAutoComplateData] =
    useState<autoComplateDataInterface | null>();

  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    async function acutoComplate(text: string) {
      const signal = controller.signal;
      const url = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
      const options = {
        method: "GET",
        signal: signal,
        headers: {
          "X-RapidAPI-Key": RapidAPI_Key,
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
      };
      try {
        const response = await fetch(
          url + `?minPopulation=5000&namePrefix=${text}`,
          options
        );
        const result: autoComplateDataInterface = await response.json();
        setAutoComplateData(result);
      } catch (error) {
        console.error(error);
      }
    }
    let timeOut: ReturnType<typeof setTimeout>;
    if (cityName.trim().length > 0) {
      setCityNameMobile("");
      timeOut = setTimeout(() => {
        acutoComplate(cityName);
      }, 100);
    } else {
      setAutoComplateData(null);
    }
    if (cityNameMobile.trim().length > 0) {
      setCityName("");
      timeOut = setTimeout(() => {
        acutoComplate(cityNameMobile);
      }, 100);
    } else {
      setAutoComplateData(null);
    }

    return () => {
      clearTimeout(timeOut);
      controller.abort();
    };
  }, [cityName, cityNameMobile]);

  const onSearchCity = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cityName.trim().length > 0) {
      navigate("/" + cityName, {
        state: { cityName: cityName },
      });
      setCityName("");
    }
    if (cityNameMobile.trim().length > 0) {
      navigate("/" + cityNameMobile);
      setCityNameMobile("");
    }
  };
  const changeCityName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(event.target.value);
  };
  const changeCityNameMobile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityNameMobile(event.target.value);
  };

  const complateInput = (cityName: string) => {
    setCityName(cityName);
  };
  const complateInputMobile = (cityName: string) => {
    setCityNameMobile(cityName);
  };

  return (
    <header className="flex flex-col p-4 mx-auto items-center space-y-2 md:flex-row md:space-y-0 md:w-full md:mx-0 md:justify-between md:px-12 lg:px-24 md:space-x-6 ">
      <Link to="/">
        <h1 className="font-bold text-2xl md:text-4xl">Weather App</h1>
      </Link>
      <div className="relative flex-1 max-w-md hidden md:block">
        <form
          onSubmit={onSearchCity}
          className="hidden relative rounded-lg py-2 px-6 space-x-6 items-center bg-gray-200 md:flex z-50"
        >
          <input
            type="text"
            className="rounded-lg flex-1 outline-none hidden md:block  bg-gray-200"
            placeholder="Search City"
            onChange={changeCityName}
            value={cityName}
          />
          <button className="flex items-center justify-center " type="submit">
            SEARCH
          </button>
        </form>
        {autoComplateData?.data ? (
          autoComplateData?.data.length > 0 ? (
            <div className="absolute top-8 pt-2 left-0 w-full bg-gray-200 z-20  rounded-b-2xl">
              <ul className="max-h-28 overflow-auto flex flex-col items-center p-2">
                {autoComplateData?.data
                  .filter((element) => element.type == "CITY")
                  .map((element) => (
                    <li
                      key={element.id}
                      className="px-6 py-2 flex space-x-1 border-b-2 w-full border-b-slate-700 hover:border-b-blue-800 hover:text-blue-800 cursor-pointer"
                      onClick={() => complateInput(element.name)}
                    >
                      <h2 className="font-bold">{element.name}</h2>
                      <span className="text-slate-400">{element.country}</span>
                    </li>
                  ))}
              </ul>
            </div>
          ) : (
            <div className="absolute top-8 pt-2 left-0 w-full bg-white z-20  text-center rounded-b-2xl">
              <span className="p-6">Couldn't find city name</span>
            </div>
          )
        ) : null}
      </div>
      <Timer />
      <div className="relative flex-1 max-w-md md:hidden">
        <form
          onSubmit={onSearchCity}
          className="flex rounded-lg  py-2 px-6 space-x-6 items-center bg-white md:hidden"
        >
          <input
            type="text"
            className="rounded-lg flex-1 outline-none block md:hidden"
            placeholder="Search City"
            onChange={changeCityNameMobile}
            value={cityNameMobile}
          />
          <button className="flex items-center justify-center" type="submit">
            SEARCH
          </button>
        </form>
        {autoComplateData?.data ? (
          autoComplateData?.data.length > 0 ? (
            <div className="absolute top-8 pt-2 left-0 w-full bg-white z-20  rounded-b-2xl">
              <ul className="max-h-28 overflow-auto flex flex-col items-center p-2">
                {autoComplateData?.data
                  .filter((element) => element.type == "CITY")
                  .map((element) => (
                    <li
                      key={element.id}
                      className="px-6 py-2 flex space-x-1 border-b-2 w-full border-b-slate-700 hover:border-b-blue-800 hover:text-blue-800 cursor-pointer"
                      onClick={() => complateInputMobile(element.name)}
                    >
                      <h2 className="font-bold">{element.name}</h2>
                      <span className="text-slate-400">{element.country}</span>
                    </li>
                  ))}
              </ul>
            </div>
          ) : (
            <div className="absolute top-8 pt-2 left-0 w-full bg-white z-20  text-center rounded-b-2xl">
              <span className="p-6">Couldn't find city name</span>
            </div>
          )
        ) : null}
      </div>
    </header>
  );
};

export default Header;
