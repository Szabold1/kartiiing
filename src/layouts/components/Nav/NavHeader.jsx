import styled from "styled-components";
import { IoMenu, IoClose } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import NavMobile from "@layouts/components/Nav/NavMobile";
import NavDesktop from "@layouts/components/Nav/NavDesktop";
import StyledNavLink from "@components/styled/StyledNavLink";
import useNavLinks from "@hooks/useNavLinks";

const StyledNavHeader = styled.nav`
  background-color: ${({ theme }) => theme.colors.bg[0]};
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > h1 {
    font-size: 1.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    cursor: pointer;

    @media screen and (min-width: 70rem) {
      font-size: 1.9rem;
      letter-spacing: 0.2rem;
      padding-left: 0.2rem;
    }
  }

  @media screen and (min-width: 40rem) {
    padding: 0 1rem;
  }

  @media screen and (min-width: 50rem) {
    padding: 0 2rem;
  }
`;

const StyledIconContainer = styled.div`
  padding: 0.9rem 1rem;
  cursor: pointer;

  @media screen and (min-width: 70rem) {
    display: none;
  }
`;

export default function NavHeader() {
  const navLinks = useNavLinks();
  const iconRef = useRef();

  const [showNav, setShowNav] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1120); // 70rem

  function handleHomeClick() {
    if (navLinks?.[0]?.resetFilters) {
      navLinks[0].resetFilters();
    }
    setShowNav(false);
  }

  function handleNavClick() {
    setShowNav((prev) => !prev);
  }

  // Update isMobile and showNav states on window resize
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1120);
      setShowNav(false);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <StyledNavHeader>
      <h1>
        <StyledNavLink
          to={"/"}
          onClick={handleHomeClick}
          style={{ padding: "1rem" }}
        >
          Kart
          <span style={{ color: "rgb(229,44,44) " }}>i</span>
          <span style={{ color: "rgb(0, 110, 229)" }}>i</span>
          <span style={{ color: "rgb(255, 215, 0)" }}>i</span>
          <span style={{ color: "rgb(0,229,91)" }}>n</span>
          <span style={{ color: "rgb(255,107,0)" }}>g</span>
        </StyledNavLink>
      </h1>

      <StyledIconContainer onClick={handleNavClick} ref={iconRef}>
        {showNav ? <IoClose size={35} /> : <IoMenu size={35} />}
      </StyledIconContainer>

      {isMobile && (
        <NavMobile
          showNav={showNav}
          setShowNav={setShowNav}
          iconRef={iconRef}
          navLinks={navLinks}
        />
      )}

      {!isMobile && <NavDesktop navLinks={navLinks} />}
    </StyledNavHeader>
  );
}
