import styled from "styled-components";
import useElementWidth from "../../hooks/useElementWidth";
import { WidthProvider } from "../../contexts/WidthContext";

const StyledSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0.4rem;
  background-color: ${({ theme }) => theme.colors.bg[1]};
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.1);
  border-radius: 0.8rem;
  width: 100%;
`;

export default function SectionContainer({ children }) {
  const { ref, width } = useElementWidth();

  return (
    <WidthProvider width={width}>
      <StyledSectionContainer ref={ref}>{children}</StyledSectionContainer>
    </WidthProvider>
  );
}
