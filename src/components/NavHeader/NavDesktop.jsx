import styled from "styled-components";
import StyledNavLink from "../styled/StyledNavLink";

const StyledNavDesktop = styled.ul`
  display: flex;

  > li {
    letter-spacing: 0.1rem;
    padding: 1.4rem 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border-bottom: 1.5px solid transparent;

    &:hover {
      color: rgb(0, 222, 222);
      border-bottom: 1.5px solid rgb(0, 222, 222);
    }

    @media screen and (min-width: 40rem) {
      padding: 1.8rem 1.2rem;
    }
  }
`;

export default function NavDesktop({ navLinks }) {
  return (
    <StyledNavDesktop>
      {navLinks.map((link) => (
        <li key={link.path}>
          <StyledNavLink to={link.path}>{link.label}</StyledNavLink>
        </li>
      ))}
    </StyledNavDesktop>
  );
}
