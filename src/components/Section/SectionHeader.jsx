import styled from "styled-components";

const StyledHeader = styled.h2`
  font-weight: 500;
  letter-spacing: 0.04rem;
  padding: 0.5rem 0.75rem;
  top: 4.15rem;
  background-color: inherit;
  z-index: 5;
  line-height: 1.3;

  @media screen and (min-width: 70rem) {
    top: 4.5rem;
  }
`;

export default function SectionHeader({ title, fontSize = "1.5rem", sticky }) {
  return (
    <StyledHeader style={{ fontSize, position: sticky && "sticky" }}>
      {title}
    </StyledHeader>
  );
}
