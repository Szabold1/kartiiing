import styled from "styled-components";

const StyledContent = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.bg[1]};
  padding-top: 0.7rem;
  border-top: 1px solid ${({ theme, $color }) => theme.colors[$color][1]};
`;

export default function SectionContent({ color = "cyan", children }) {
  return <StyledContent $color={color}>{children}</StyledContent>;
}
