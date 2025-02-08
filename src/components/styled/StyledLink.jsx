import styled from "styled-components";

const StyledL = styled.a`
  text-decoration: none;
  color: ${({ theme, $color }) => theme.colors[$color][0]};
  padding: 0.6rem 0 0.5rem 0;
  text-align: center;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  margin-top: auto;

  &:hover {
    color: ${({ theme, $color }) => theme.colors[$color][1]};
  }
`;

export default function StyledLink({ children, color = "blue", onClick }) {
  return (
    <StyledL $color={color} onClick={onClick}>
      {children}
    </StyledL>
  );
}
