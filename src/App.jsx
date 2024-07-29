import styled, { ThemeProvider } from "styled-components";
import useThemeMode from "./hooks/useThemeMode";
import GlobalStyle from "./styles/globalStyles";
import MainContainer from "./components/MainContainer";

const StyledDiv = styled.div`
  margin: 2rem auto;
  padding: 0 1rem;
  max-width: 1600px;

  @media screen and (min-width: 40rem) {
    padding: 0 2rem;
  }

  @media screen and (min-width: 50rem) {
    padding: 0 3rem;
  }
`;

export default function App() {
  const theme = useThemeMode();

  return (
    <ThemeProvider theme={theme.theme}>
      <GlobalStyle />
      <StyledDiv>
        <MainContainer />
      </StyledDiv>
    </ThemeProvider>
  );
}
