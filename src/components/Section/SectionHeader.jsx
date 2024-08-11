import styled from "styled-components";

const StyledHeader = styled.h2`
  font-weight: 500;
  letter-spacing: 0.04rem;
  padding: 0.75rem;
  position: sticky;
  top: 4.1rem;
  background-color: inherit;
  z-index: 5;
`;

export default function SectionHeader({ title, fontSize = "1.5rem" }) {
  return <StyledHeader style={{ fontSize }}>{title}</StyledHeader>;
}
