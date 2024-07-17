export interface WeatherForecastDataInterface {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherDataInterface[];
  city: City;
}

export interface WeatherDataInterface {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Precipitation;
  snow?: Precipitation;
  sys: Sys;
  dt_txt: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Precipitation {
  "1h": number;
  "3h": number;
}

interface Sys {
  pod: string;
}

interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface Coord {
  lat: number;
  lon: number;
}

export interface weatherDataInterface {
  base: string;
  clouds: Clouds;
  cod: number;
  coord: Coord;
  dt: number;
  id: number;
  main: Main;
  name: string;
  sys: Sys;
  timezone: number;
  visibility: number;
  weather: Weather[];
  wind: Wind;
  rain?: Precipitation;
  snow?: Precipitation;
}

export interface autoComplateDataInterface {
  data: {
    id: number;
    wikiDataId: string;
    country: string;
    countryCode: string;
    latitude: number;
    longitude: number;
    name: string;
    population: number;
    region: string;
    regionCode: string;
    regionWdId: string;
    type: string;
  }[];
}
