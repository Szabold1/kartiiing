import RootLayout from "@layouts/RootLayout";
import ErrorPage from "@pages/ErrorPages/ErrorPage";
import NotFoundPage from "@pages/ErrorPages/NotFoundPage";
import HomePage from "@pages/HomePage/HomePage";
import RacesPage from "@pages/RacesPage/RacesPage";
import ShowRacePage from "@pages/RacesPage/ShowRacePage/ShowRacePage";
import CircuitsPage from "@pages/CircuitsPage/CircuitsPage";
import ShowCircuitPage from "@pages/CircuitsPage/ShowCircuitPage/ShowCircuitPage";

export const routesConfig = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "races", element: <RacesPage /> },
      { path: "races/:raceName_date", element: <ShowRacePage /> },
      { path: "circuits", element: <CircuitsPage /> },
      { path: "circuits/:circuitName", element: <ShowCircuitPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];
