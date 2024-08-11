import styled from "styled-components";

const StyledContent = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.bg[1]};
  padding-top: 0.7rem;
  border-top: 1px solid ${({ theme }) => theme.colors.accent[1]};
`;

export default function SectionContent({ children }) {
  return <StyledContent>{children}</StyledContent>;
}
