import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import LoginPage from "./pages/LoginPage.jsx";
import Hotels from "./pages/HotelsPage.jsx";
import Restaurants from "./pages/RestaurantsPage.jsx";
import TripsPage from "./pages/TripsPage.jsx";
import PackingPage from "./pages/PackingPage.jsx";
import EditTripPage from "./pages/EditTripPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LoginPage /> },
      {
        path: "trips/",
        
        element: <TripsPage />,
      },
      { path: "trips/:tripId", element: <EditTripPage /> },
      { path: "packing", element: <PackingPage /> },

      { path: "hotels", element: <Hotels /> },
      { path: "restaraunts", element: <Restaurants /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
