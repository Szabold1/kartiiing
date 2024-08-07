import styled from "styled-components";

const StyledPageHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2.6rem 0 2rem 0;
  color: ${({ theme }) => theme.colors.text[0]};

  @media screen and (min-width: 70rem) {
    align-items: flex-start;
    padding: 3.2rem 1.5rem 2rem 1.5rem;
  }
`;

export default function PageHeader({ children }) {
  return <StyledPageHeader>{children}</StyledPageHeader>;
}
