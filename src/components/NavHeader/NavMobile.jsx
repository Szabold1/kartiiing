import styled, { keyframes } from "styled-components";
import { useNavigate, NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform:  translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
`;

const StyledNavMobile = styled.div`
  z-index: -1;
  position: fixed;
  right: 0;
  top: 0rem;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 1.5rem 0;
  background-color: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(2rem);
  -webkit-backdrop-filter: blur(2rem);
  transition: visibility 0.15s ease-in-out, opacity 0.15s ease-in-out;
  pointer-events: ${({ $show }) => ($show ? "auto" : "none")};
  visibility: ${({ $show }) => ($show ? "visible" : "hidden")};
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  animation: ${({ $show }) => ($show ? slideIn : slideOut)} 0.4s forwards;

  > ul {
    margin: 15vh auto;
    width: 70%;
    max-width: 22rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;

    > li {
      width: 100%;
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  display: block;
  max-width: 22rem;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  padding: 1.2rem;
  cursor: pointer;
  background-color: ${({ theme }) =>
    theme.name === "dark" ? "rgba(241, 241, 241, 0.2)" : "rgba(0, 0, 0, 0.2)"};
  border-radius: 0.6rem;
  transition: all 0.25s ease-in-out;

  &.active {
    background-color: ${({ theme }) => theme.colors.accent[1]};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent[2]};
  }
`;

export default function NavMobile({ showNav, setShowNav, navLinks, iconRef }) {
  const navigate = useNavigate();
  const linksRef = useRef();

  // Close navigation if clicked outside of a link and disable scrolling when open
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        linksRef.current &&
        !linksRef.current.contains(e.target) &&
        iconRef.current &&
        !iconRef.current.contains(e.target)
      )
        setShowNav(false);
    }

    if (showNav) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [showNav, setShowNav, iconRef]);

  function handleClick(path) {
    setShowNav(false);
    navigate(path);
  }

  return (
    <StyledNavMobile $show={showNav}>
      <ul ref={linksRef}>
        {navLinks.map((link) => (
          <li key={link.path} onClick={() => handleClick(link.path)}>
            <StyledNavLink to={link.path}>{link.label}</StyledNavLink>
          </li>
        ))}
      </ul>
    </StyledNavMobile>
  );
}
