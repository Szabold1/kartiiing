import styled from "styled-components";
import useCircuits from "@hooks/useCircuits";
import CircuitItem from "@components/Circuits/CircuitItem/CircuitItem";
import StyledMessage from "@components/styled/StyledMessage";
import Section from "@components/Section/Section";

const StyledItems = styled.ol`
  max-height: 19.6rem; /* 1 item is 2.8rem */
  overflow-y: hidden;
`;

export default function ShowCircuitsNearby({ circuit }) {
  const { data, isFetching } = useCircuits();

  const closestCircuits = circuit.distancesToOtherCircuits
    .slice(0, 15)
    .map((c) => {
      const distanceCircuitToCircuit = c.distanceKm;
      const circuitData = data.find((circuitData) => circuitData.id === c.id);

      return { ...circuitData, distanceCircuitToCircuit };
    });

  return (
    <Section
      title={`Circuits near ${circuit.location_name}`}
      titleSize={"1.25rem"}
      stickyHeader={false}
      color="green"
    >
      {isFetching && (
        <StyledMessage style={{ margin: "8rem 0", fontSize: "1.25rem" }}>
          Loading...
        </StyledMessage>
      )}

      {!isFetching && (
        <StyledItems>
          {closestCircuits?.map((circuit) => (
            <CircuitItem
              key={circuit.id}
              showDistance
              distanceKm={circuit.distanceCircuitToCircuit}
              circuit={circuit}
            />
          ))}
        </StyledItems>
      )}
    </Section>
  );
}
