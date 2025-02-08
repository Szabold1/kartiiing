import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledNavDesktop = styled.ul`
  display: flex;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  display: block;
  letter-spacing: 0.1rem;
  padding: 1.8rem 1.2rem;
  cursor: pointer;
  transition: all 0.25s ease-in-out;

  span {
    padding: 0.35rem;
  }

  &.active {
    span {
      border-bottom: 2px solid ${({ theme, $color }) => theme.colors[$color][0]};
    }
  }

  &:hover {
    span {
      border-bottom: 2px solid ${({ theme, $color }) => theme.colors[$color][0]};
    }
  }
`;

export default function NavDesktop({ navLinks }) {
  return (
    <StyledNavDesktop>
      {navLinks.map((link) =>
        link.path !== "/" ? (
          <li key={link.path}>
            <StyledNavLink
              to={link.path}
              $color={link.color}
              onClick={() => link.resetFilters && link.resetFilters()}
            >
              <span>{link.label}</span>
            </StyledNavLink>
          </li>
        ) : null
      )}
    </StyledNavDesktop>
  );
}
