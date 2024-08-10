import styled from "styled-components";

const StyledPageTitle = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  > h3 {
    font-size: 2rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
  }

  @media screen and (min-width: 70rem) {
    > h3 {
      font-size: 2.2rem;
    }
  }
`;

export default function PageTitle({ children }) {
  return <StyledPageTitle>{children}</StyledPageTitle>;
}
