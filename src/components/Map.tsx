import React, { useState, CSSProperties } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
  ZoomableGroup,
} from "react-simple-maps";
import geoMap from "../custom.geo.json";

interface WorldMapProps {
  fill?: string;
  selectedFill?: string;
  stroke?: string;
  customCSS?: CSSProperties;
}

interface Country {
  name: string;
  capital: string;
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

  const handleCountryClick = (geo: GeographiesProps): void => {
    const { name, capital } = geo.properties;
    setSelectedCountry({
      name: name as string,
      capital: capital as string,
    });
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center">
      <div className="relative flex justify-center items-center w-full h-full">
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
          </ZoomableGroup>
        </ComposableMap>
        {selectedCountry && (
          <div className="absolute bottom-0 left-0 bg-white p-2 shadow-md">
            <p>Selected Country: {selectedCountry.name}</p>
            <p>Capital City: {selectedCountry.capital}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorldMap;
