import styled from "styled-components";

const StyledPageIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media screen and (min-width: 70rem) {
    align-items: flex-start;
  }
`;

export default function PageIntro({ children }) {
  return <StyledPageIntro>{children}</StyledPageIntro>;
}
