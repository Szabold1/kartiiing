import styled from "styled-components";
import { Outlet } from "react-router-dom";
import NavHeader from "../components/NavHeader/NavHeader";
import { RacesProvider } from "../contexts/RacesContext";
import { CircuitsProvider } from "../contexts/CircuitsContext";
import {
  raceFilterKeys,
  defaultRaceFilterValues,
  circuitsFilterKeys,
  defaultCircuitFilterValues,
} from "../data";

const StyledHeader = styled.header`
  z-index: 120;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bg[5]};
  backdrop-filter: blur(1rem);
  color: ${({ theme }) =>
    theme.name === "dark" ? "rgba(241, 241, 241, 0.9)" : theme.colors.text[1]};
  box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.3);
`;

export default function RootLayout() {
  return (
    <>
      <StyledHeader>
        <NavHeader />
      </StyledHeader>

      <RacesProvider
        filterKeys={raceFilterKeys}
        defaultFilterValues={defaultRaceFilterValues}
      >
        <CircuitsProvider
          filterKeys={circuitsFilterKeys}
          defaultFilterValues={defaultCircuitFilterValues}
        >
          <main>
            <Outlet />
          </main>
        </CircuitsProvider>
      </RacesProvider>
    </>
  );
}
