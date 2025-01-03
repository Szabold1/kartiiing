import { ThemeProvider } from "styled-components";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import useThemeMode from "@hooks/useThemeMode";
import GlobalStyle from "@styles/globalStyles";

// Pages
import HomePage from "@pages/HomePage/HomePage";
import RacesPage from "@pages/RacesPage/RacesPage";
import ShowRacePage from "@pages/RacesPage/ShowRacePage/ShowRacePage";
import CircuitsPage from "@pages/CircuitsPage/CircuitsPage";
import NotFoundPage from "@pages/ErrorPages/NotFoundPage";
import ErrorPage from "@pages/ErrorPages/ErrorPage";

// Layouts
import RootLayout from "@layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<HomePage />} />
      <Route path={"races"} element={<RacesPage />} />
      <Route path={"races/:series_date"} element={<ShowRacePage />} />
      <Route path={"circuits"} element={<CircuitsPage />} />
      <Route path={"circuits/:circuit_name"} element={<CircuitsPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  ),
  { basename: "/kartiiing" }
);

export default function App() {
  const theme = useThemeMode();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
