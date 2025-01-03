import styled from "styled-components";
import CircuitItem from "@components/Circuits/CircuitItem/CircuitItem";
import StyledMessage from "@components/styled/StyledMessage";
import Section from "@components/Section/Section";
import useLocation from "@hooks/useLocation";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export default function CircuitList({ appliedFilters, isFetching, circuits }) {
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
