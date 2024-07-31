import React, { useState, CSSProperties } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
  ZoomableGroup,
  Annotation,
} from "react-simple-maps";
import geoMap from "../custom.geo.json";
import { weatherDataInterface } from "../interfaces/interface";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_KEY;

interface WorldMapProps {
  fill?: string;
  selectedFill?: string;
  stroke?: string;
  customCSS?: CSSProperties;
}

interface Country {
  name: string;
  capital: string;
  coord?: [number, number];
  icon?: string;
  weatherDescription?: string;
  temp?: number;
}

interface Properties {
  name: string;
  capital: string;
}

interface GeographiesProps {
  properties: Properties;
  rsmKey: string;
}

interface Position {
  coordinates: [number, number];
  zoom: number;
}

const WorldMap: React.FC<WorldMapProps> = ({
  fill = "#D6D6DA",
  selectedFill = "#FF5722",
  stroke = "#000000",
  customCSS = { outline: "none", border: "none" },
}) => {
  const [position, setPosition] = useState<Position>({
    coordinates: [0, 0],
    zoom: 1,
  });
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const handleMoveEnd = (position: Position) => {
    setPosition(position);
  };

  const handleCountryClick = async (geo: GeographiesProps): Promise<void> => {
    const { name, capital } = geo.properties;
    if (capital) {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}`
      );

      const data: weatherDataInterface = await response.json();

      const iconId = data.weather[0].icon;
      const iconURL = `https://openweathermap.org/img/wn/${iconId}@2x.png`;
      setSelectedCountry({
        name: name as string,
        capital: capital as string,
        coord: [data.coord.lon, data.coord.lat],
        icon: iconURL,
        weatherDescription: data.weather[0].main,
        temp: data.main.temp,
      });
    } else {
      setSelectedCountry({
        name: name as string,
        capital: "",
      });
    }
  };

  const zoomIn = () => {
    if (position.zoom >= 7) return;
    setPosition((prev) => ({ ...prev, zoom: prev.zoom * 1.2 }));
  };

  const zoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((prev) => ({ ...prev, zoom: prev.zoom / 1.2 }));
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center">
      <div className="relative flex justify-center items-center w-full h-full flex-col">
        <ComposableMap
          className="w-full md:w-[1200px] md:h-[800px]"
          width={900}
          height={800}
          projectionConfig={{ rotate: [-10, 0, 0], scale: 160 }}
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={handleMoveEnd}
            translateExtent={[
              [0, 0],
              [900, 800],
            ]}
          >
            <Sphere
              id="sphere"
              fill="transparent"
              stroke="#000"
              strokeWidth={0.3}
            />
            <Graticule stroke="#000" strokeWidth={0.3} />
            <Geographies geography={geoMap}>
              {({ geographies }) =>
                geographies.map((geo: GeographiesProps) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={
                      selectedCountry?.name === geo.properties.name
                        ? selectedFill
                        : fill
                    }
                    stroke={stroke}
                    onClick={() => handleCountryClick(geo)}
                    style={{
                      default: customCSS,
                      hover: customCSS,
                      pressed: customCSS,
                    }}
                    className="transition-all duration-500"
                  />
                ))
              }
            </Geographies>
            {selectedCountry && selectedCountry.coord && (
              <Annotation
                subject={[selectedCountry.coord[0], selectedCountry.coord[1]]}
                dx={-90}
                dy={-30}
                connectorProps={{
                  stroke: "#000",
                  strokeWidth: 1,
                  strokeLinecap: "round",
                }}
              >
                <foreignObject x="-150" y="-100" width="200" height="250">
                  <div
                    style={{
                      backgroundColor: "white",
                      border: "1px solid black",
                      borderRadius: "5px",
                      padding: "10px",
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <div
                      style={{
                        marginBottom: "2px",
                        textAlign: "center",
                        fontSize: 16,
                      }}
                    >
                      <strong>{selectedCountry.name}</strong>
                    </div>
                    <div
                      style={{
                        marginBottom: "2px",
                        textAlign: "center",
                        fontSize: 14,
                      }}
                    >
                      {selectedCountry.capital}
                    </div>
                    <div
                      style={{
                        marginBottom: "2px",
                        textAlign: "center",
                        fontSize: 16,
                      }}
                    >
                      <strong>
                        {Math.floor(selectedCountry.temp! - 273.15)}&#176;
                      </strong>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        fontSize: 14,
                      }}
                    >
                      <img
                        src={selectedCountry.icon}
                        alt="weather icon"
                        style={{
                          width: "60px",
                          height: "60px",
                          marginRight: "5px",
                        }}
                      />
                      <span>{selectedCountry.weatherDescription}</span>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <Link
                        to={`/${selectedCountry.capital}`}
                        style={{
                          color: "blue",
                          textDecoration: "underline",
                          display: "block",
                          textAlign: "center",
                          marginTop: "10px",
                        }}
                      >
                        Show More
                      </Link>
                    </div>
                  </div>
                </foreignObject>
              </Annotation>
            )}
          </ZoomableGroup>
        </ComposableMap>
        <div className=" p-4">
          <p className="text-center text-gray-500 text-sm opacity-80">
            Click on a country to see its capital and weather. Zoom in and out
            using your mouse, touchscreen, or the zoom buttons.
          </p>
        </div>
        <div
          className="absolute top-16 md:top-32 w-full flex space-x-2 justify-center"
          style={{ zIndex: 20 }}
        >
          <button
            onClick={zoomIn}
            style={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>+</span>
          </button>
          <button
            onClick={zoomOut}
            style={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>–</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
