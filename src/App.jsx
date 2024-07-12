import styled, { ThemeProvider } from "styled-components";
import useThemeMode from "./hooks/useThemeMode";
import GlobalStyle from "./styles/globalStyles";
import EventList from "./components/EventList";

const StyledContainer = styled.div`
  margin: 0 auto;
  padding: 0 1rem;
  max-width: 1600px;

  @media screen and (min-width: 768px) {
    padding: 0 2rem;
  }

  @media screen and (min-width: 1024px) {
    padding: 0 3rem;
  }

  @media screen and (min-width: 1440px) {
    padding: 0 4rem;
  }
`;

export default function App() {
  const theme = useThemeMode();

  return (
    <ThemeProvider theme={theme.theme}>
      <GlobalStyle />
      <StyledContainer>
        <EventList />
      </StyledContainer>
    </ThemeProvider>
  );
}
