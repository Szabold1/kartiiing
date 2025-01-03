import { ThemeProvider } from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import useThemeMode from "@hooks/useThemeMode";
import GlobalStyle from "@styles/globalStyles";
import { routesConfig } from "@config/routesConfig";

const router = createBrowserRouter(routesConfig, { basename: "/kartiiing" });

export default function App() {
  const theme = useThemeMode();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
