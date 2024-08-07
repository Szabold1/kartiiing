import styled from "styled-components";

const StyledIntroText = styled.p`
  font-size: 1.2rem;
  line-height: 1.7rem;
  letter-spacing: 0.04rem;
  text-align: center;
`;

export default function IntroText({ children }) {
  return <StyledIntroText>{children}</StyledIntroText>;
}
