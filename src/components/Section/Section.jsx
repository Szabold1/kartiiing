import styled from "styled-components";
import useElementWidth from "../../hooks/useElementWidth";
import { WidthProvider } from "../../contexts/WidthContext";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0.4rem;
  background-color: ${({ theme }) => theme.colors.bg[1]};
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.1);
  border-radius: 0.8rem;
  margin-bottom: 1.6rem;
  width: 100%;
`;

export default function Section({ children }) {
  const { ref, width } = useElementWidth();

  return (
    <WidthProvider width={width}>
      <StyledSection ref={ref}>{children}</StyledSection>
    </WidthProvider>
  );
}
