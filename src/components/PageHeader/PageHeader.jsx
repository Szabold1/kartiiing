import styled from "styled-components";

const StyledPageHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1.8rem;
  padding: 0 0 1.8rem 0;
  color: ${({ theme }) => theme.colors.text[0]};
`;

export default function PageHeader({ children }) {
  return <StyledPageHeader>{children}</StyledPageHeader>;
}
