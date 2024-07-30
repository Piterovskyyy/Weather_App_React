import RootLayout from "./Layouts/RootLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Details from "./components/Details";
import { loader as DetailsLoader } from "./components/Details";
import ErrorDetails from "./errors/ErrorDetails";
import { FavouriteCitiesProvider } from "./Context/FavouriteCitiesContext";
import WorldMap from "./components/Map";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <WorldMap />,
      },
      {
        path: "/:cityName",
        element: <Details />,
        loader: DetailsLoader,
        errorElement: <ErrorDetails />,
      },
    ],
  },
]);

function App() {
  return (
    <FavouriteCitiesProvider>
      <RouterProvider router={router} />
    </FavouriteCitiesProvider>
  );
}

export default App;
