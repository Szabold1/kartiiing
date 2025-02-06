// import styled from "styled-components";
import { useParams } from "react-router-dom";
import useCircuits from "@hooks/useCircuits";
import StyledMessage from "@components/styled/StyledMessage";
import StyledPageContentWrapper from "@components/styled/StyledPageContentWrapper";
import ShowCircuitHeader from "@pages/CircuitsPage/ShowCircuitPage/components/ShowCircuitHeader";
import ShowCircuitSummary from "@pages/CircuitsPage/ShowCircuitPage/components/ShowCircuitSummary";
import ShowCircuitRaces from "@components/Circuits/ShowCircuitRaces";

export default function ShowCircuitPage() {
  const { circuitName: url } = useParams();
  const { data: circuits, isFetching } = useCircuits();

  // Find the circuit based on the url
  const circuit = circuits.find(
    (circuit) => circuit.circuit_name.toLowerCase().replaceAll(" ", "-") === url
  );

  if (isFetching) {
    return <StyledMessage>Loading...</StyledMessage>;
  }
  if (!circuit) {
    return <StyledMessage>No circuit found</StyledMessage>;
  }

  return (
    <>
      <ShowCircuitHeader circuit={circuit} />
      <StyledPageContentWrapper
        style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}
      >
        <ShowCircuitSummary circuit={circuit} />
        <ShowCircuitRaces circuitName={circuit.location_name} />
      </StyledPageContentWrapper>
    </>
  );
}
