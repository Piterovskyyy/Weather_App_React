import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface City {
  id: number;
  city: string;
}

interface FavouriteCitiesContextType {
  favList: City[];
  setFavList: React.Dispatch<React.SetStateAction<City[]>>;
}

const FavouriteCitiesContext = createContext<
  FavouriteCitiesContextType | undefined
>(undefined);

export const FavouriteCitiesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favList, setFavList] = useState<City[]>([]);

  useEffect(() => {
    const favouriteCities = JSON.parse(
      localStorage.getItem("favouriteCities") || "[]"
    );

    const formattedData = favouriteCities.map(
      (city: string, index: number) => ({
        id: index + 1,
        city: city,
      })
    );

    setFavList(formattedData);
  }, []);

  return (
    <FavouriteCitiesContext.Provider value={{ favList, setFavList }}>
      {children}
    </FavouriteCitiesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFavouriteCities = () => {
  const context = useContext(FavouriteCitiesContext);
  if (context === undefined) {
    throw new Error(
      "useFavouriteCities must be used within a FavouriteCitiesProvider"
    );
  }
  return context;
};
