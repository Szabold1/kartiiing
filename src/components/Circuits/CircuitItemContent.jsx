import styled from "styled-components";
import { useContext } from "react";
import { WidthContext } from "../../contexts/WidthContext";

const StyledContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.4rem;

  font-size: 1.1rem;
  letter-spacing: 0.03rem;
`;

export default function CircuitItemContent({ ...circuit }) {
  const width = useContext(WidthContext);

  return (
    <StyledContent>
      <h4 style={{ fontWeight: "500" }}>{circuit.short_name}</h4>
      {width > 640 && (
        <>
          <span style={{ color: "rgb(0, 180, 180)" }}>&middot;</span>
          <span>{circuit.long_name}</span>
        </>
      )}
    </StyledContent>
  );
}
