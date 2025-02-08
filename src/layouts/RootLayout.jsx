import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { DataProviders } from "@contexts/DataProviders";
import NavHeader from "@layouts/components/Nav/NavHeader";
import ScrollToTop from "@layouts/components/ScrollToTop";

const StyledHeader = styled.header`
  z-index: 120;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid
    ${({ theme }) =>
      theme.name === "dark" ? theme.colors.bg[3] : "transparent"};
  background-color: ${({ theme }) => theme.colors.bg[0]};
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.15);
`;

export default function RootLayout() {
  return (
    <>
      <ScrollToTop />

      <DataProviders>
        <StyledHeader>
          <NavHeader />
        </StyledHeader>

        <main>
          <Outlet />
        </main>
      </DataProviders>
    </>
  );
}
