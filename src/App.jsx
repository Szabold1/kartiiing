import styled, { ThemeProvider } from "styled-components";
import useThemeMode from "./hooks/useThemeMode";
import GlobalStyle from "./styles/globalStyles";
import FilterEventContainer from "./components/FilterEventContainer";

const StyledContainer = styled.div`
  margin: 2rem auto;
  padding: 0 1rem;
  max-width: 1600px;

  @media screen and (min-width: 36rem) {
    padding: 0 2rem;
  }

  @media screen and (min-width: 48rem) {
    padding: 0 3rem;
  }

  @media screen and (min-width: 64rem) {
    padding: 0 4rem;
  }
`;

export default function App() {
  const theme = useThemeMode();

  return (
    <ThemeProvider theme={theme.theme}>
      <GlobalStyle />
      <StyledContainer>
        <FilterEventContainer />
      </StyledContainer>
    </ThemeProvider>
  );
}
