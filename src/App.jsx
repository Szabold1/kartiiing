import { ThemeProvider } from "styled-components";
import useThemeMode from "./hooks/useThemeMode";
import GlobalStyle from "./styles/globalStyles";
import MainNavHeader from "./components/MainNavHeader";
import MainContainer from "./components/MainContainer";

export default function App() {
  const theme = useThemeMode();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MainNavHeader />
      <MainContainer />
    </ThemeProvider>
  );
}
