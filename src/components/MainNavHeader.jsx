import styled, { keyframes } from "styled-components";
import { IoMenu, IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateX(0) translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0) translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
`;

const StyledContainer = styled.div`
  z-index: 120;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bg[5]};
  backdrop-filter: blur(1rem);
  color: rgb(241, 241, 241);
  box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.3);
`;

const StyledNavHeader = styled.nav`
  background-color: ${({ theme }) => theme.colors.bg[5]};
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > h1 {
    padding: 1rem;
    font-size: 1.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    cursor: pointer;
    > span {
      color: rgb(0, 220, 220);
    }

    @media screen and (min-width: 70rem) {
      font-size: 1.9rem;
      letter-spacing: 0.2rem;
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
  padding: 0.7rem 1rem;
  cursor: pointer;

  @media screen and (min-width: 40rem) {
    padding: 0.85rem 1rem;
  }

  @media screen and (min-width: 50rem) {
    padding: 1rem 1rem;
  }

  @media screen and (min-width: 70rem) {
    display: none;
  }
`;

const StyledMobileNav = styled.div`
  z-index: -1;
  position: fixed;
  right: 0;
  top: 0rem;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 1.5rem 0;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(1rem);
  -webkit-backdrop-filter: blur(1rem);
  transition: visibility 0.15s ease-in-out, opacity 0.15s ease-in-out;
  pointer-events: ${({ $show }) => ($show ? "auto" : "none")};
  visibility: ${({ $show }) => ($show ? "visible" : "hidden")};
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  animation: ${({ $show }) => ($show ? slideIn : slideOut)} 0.15s forwards;

  > ul {
    margin-top: 15vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;

    > li {
      max-width: 22rem;
      width: 75%;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
      padding: 1.2rem;
      cursor: pointer;
      background-color: rgba(241, 241, 241, 0.2);
      border-radius: 0.6rem;
      transition: all 0.3s ease-in-out;

      &:hover {
        color: rgb(0, 220, 220);
      }
    }
  }
`;

const StyledDesktopNav = styled.ul`
  display: flex;

  > li {
    letter-spacing: 0.1rem;
    padding: 1.4rem 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border-bottom: 1.5px solid transparent;

    &:hover {
      color: rgb(0, 220, 220);
      border-bottom: 1.5px solid rgb(0, 220, 220);
    }

    @media screen and (min-width: 40rem) {
      padding: 1.8rem 1.2rem;
    }
  }
`;

export default function MainNavHeader() {
  const [showNav, setShowNav] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1120); // 70rem

  const navOptions = [
    "Calendar",
    "Results",
    "Circuits",
    "Engines & Categories",
    "Championships",
    "Teams",
  ];

  function handleNavClick() {
    setShowNav((prev) => !prev);
  }

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1120);
      if (window.innerWidth < 1120) {
        setShowNav(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <StyledContainer>
      <StyledNavHeader>
        <h1>
          kart<span>iiing</span>
        </h1>
        <StyledIconContainer onClick={handleNavClick}>
          {showNav ? <IoClose size={33} /> : <IoMenu size={33} />}
        </StyledIconContainer>

        {isMobile && (
          <StyledMobileNav $show={showNav}>
            <ul>
              {navOptions.map((option) => (
                <li key={option} onClick={handleNavClick}>
                  {option}
                </li>
              ))}
            </ul>
          </StyledMobileNav>
        )}

        {!isMobile && (
          <StyledDesktopNav $show={showNav}>
            {navOptions.map((option) => (
              <li key={option}>{option}</li>
            ))}
          </StyledDesktopNav>
        )}
      </StyledNavHeader>
    </StyledContainer>
  );
}
