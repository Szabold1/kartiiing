import styled from "styled-components";
import CircuitItem from "./CircuitItem";
import StyledMessage from "../styled/StyledMessage";
import Section from "../Section/Section";
import useCircuits from "../../hooks/useCircuits";
import useLocation from "../../hooks/useLocation";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export default function CircuitList() {
  const { appliedFilters, filteredData: circuits, isFetching } = useCircuits();
  const { locationName } = useLocation();

  const filterName = appliedFilters.sorting.toString().toLowerCase();
  const hasDistance =
    circuits.length > 0 ? Object.hasOwn(circuits[0], "distanceKm") : false;

  const showDistance = hasDistance && filterName.includes("distance");
  const showLength = filterName.includes("length");

  const title = "Circuits" + (showDistance ? ` near ${locationName}` : "");

  if (isFetching) {
    return <StyledMessage>Loading...</StyledMessage>;
  }
  if (circuits.length === 0) {
    return <StyledMessage>No circuits found</StyledMessage>;
  }

  return (
    <StyledContainer>
      <Section title={title}>
        {circuits.map((circuit) => (
          <CircuitItem
            key={circuit.id}
            {...circuit}
            showLength={showLength}
            showDistance={showDistance}
          />
        ))}
      </Section>
    </StyledContainer>
  );
}
