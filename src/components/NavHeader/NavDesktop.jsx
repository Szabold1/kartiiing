import styled from "styled-components";
import { useNavigate, NavLink } from "react-router-dom";

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

  &.active {
    color: rgb(0, 222, 222);
  }

  &:hover {
    color: rgba(0, 222, 222, 0.75);
  }
`;

export default function NavDesktop({ navLinks }) {
  const navigate = useNavigate();

  return (
    <StyledNavDesktop>
      {navLinks.map((link) => (
        <li key={link.path} onClick={() => navigate(link.path)}>
          <StyledNavLink to={link.path}>{link.label}</StyledNavLink>
        </li>
      ))}
    </StyledNavDesktop>
  );
}
