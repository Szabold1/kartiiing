import styled from "styled-components";
import { useContext } from "react";
import { WidthContext } from "@contexts/WidthContext";

const StyledContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.4rem;

  font-size: 1.1rem;
  letter-spacing: 0.03rem;

  h4 {
    font-weight: 500;
  }

  span.separator {
    color: ${({ theme, $color }) => theme.colors[$color][0]};
  }
`;

export default function CircuitItemContent({ circuit, color = "green" }) {
  const width = useContext(WidthContext);

  return (
    <StyledContent $color={color}>
      <h4>{circuit.location_name}</h4>
      {width > 640 && (
        <>
          <span className="separator">&middot;</span>
          <span>{circuit.circuit_name}</span>
        </>
      )}
    </StyledContent>
  );
}
