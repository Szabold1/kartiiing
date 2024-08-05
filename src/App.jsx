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
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Results from "./pages/Results";
import Circuits from "./pages/Circuits";
import EnginesCategories from "./pages/EnginesCategories";
import Championships from "./pages/Championships";
import Teams from "./pages/Teams";
import NotFound from "./pages/NotFound";

// Layouts
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path={"calendar"} element={<Calendar />} />
      <Route path={"results"} element={<Results />} />
      <Route path={"circuits"} element={<Circuits />} />
      <Route path={"engines-categories"} element={<EnginesCategories />} />
      <Route path={"championships"} element={<Championships />} />
      <Route path={"teams"} element={<Teams />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
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
