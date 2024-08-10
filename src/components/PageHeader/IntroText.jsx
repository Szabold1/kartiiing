import styled from "styled-components";

const StyledIntroText = styled.p`
  font-size: 1.15rem;
  line-height: 1.5rem;
  letter-spacing: 0.03rem;
  text-align: center;
`;

export default function IntroText({ children }) {
  return <StyledIntroText>{children}</StyledIntroText>;
}
