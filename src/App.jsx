import { ThemeProvider } from "styled-components";
import useThemeMode from "./hooks/useThemeMode";
import GlobalStyle from "./styles/globalStyles";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import CalendarPage from "./pages/CalendarPage";
import ResultsPage from "./pages/ResultsPage";
import CircuitsPage from "./pages/CircuitsPage";
import EnginesCategoriesPage from "./pages/EnginesCategoriesPage";
import ChampionshipsPage from "./pages/ChampionshipsPage";
import TeamsPage from "./pages/TeamsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorPage from "./pages/ErrorPage";

// Layouts
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<HomePage />} />
      <Route path={"calendar"} element={<CalendarPage />} />
      <Route path={"results"} element={<ResultsPage />} />
      <Route path={"circuits"} element={<CircuitsPage />} />
      <Route path={"engines-categories"} element={<EnginesCategoriesPage />} />
      <Route path={"championships"} element={<ChampionshipsPage />} />
      <Route path={"teams"} element={<TeamsPage />} />

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
