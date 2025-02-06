import styled from "styled-components";

const StyledHeader = styled.h3`
  font-weight: 500;
  font-size: 1.6rem;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  margin: 0.8rem 0 -0.1rem 0;
  padding: 0.15rem 0.9rem;
  border-left: 0.2rem solid ${({ theme, $color }) => theme.colors[$color][0]};
`;

export default function StyledH3({ children, color = "cyan" }) {
  return <StyledHeader $color={color}>{children}</StyledHeader>;
}
