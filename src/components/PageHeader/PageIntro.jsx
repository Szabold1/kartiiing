import styled from "styled-components";

const StyledPageIntro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export default function PageIntro({ children }) {
  return <StyledPageIntro>{children}</StyledPageIntro>;
}
