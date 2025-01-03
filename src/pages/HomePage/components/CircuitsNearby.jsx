import styled from "styled-components";
import Section from "@components/Section/Section";
import StyledMessage from "@components/styled/StyledMessage";
import CircuitItem from "@components/Circuits/CircuitItem/CircuitItem";
import useLocation from "@hooks/useLocation";
import useCircuits from "@hooks/useCircuits";

const StyledItems = styled.ol`
  max-height: 19.6rem; /* 1 item is 2.8rem */
  overflow-y: hidden;

  @media screen and (min-width: 67rem) {
    max-height: 42rem;
  }
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.accent[0]};
  padding: 0.6rem 0 0.5rem 0;
  text-align: center;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  margin-top: auto;

  &:hover {
    color: ${({ theme }) => theme.colors.accent[1]};
  }
`;

export default function CircuitsNearby() {
  const { locationName } = useLocation();
  const { filteredData, isFetching } = useCircuits();

  const circuits = filteredData?.sort((a, b) => a.distanceKm - b.distanceKm);

  return (
    <Section
      title={`Circuits near ${locationName}`}
      titleSize={"1.25rem"}
      stickyHeader={false}
    >
      {isFetching && (
        <StyledMessage style={{ margin: "8rem 0", fontSize: "1.25rem" }}>
          Loading...
        </StyledMessage>
      )}

      {!isFetching && (
        <StyledItems>
          {circuits?.map((circuit) => (
            <CircuitItem key={circuit.id} showDistance {...circuit} />
          ))}
        </StyledItems>
      )}

      <StyledLink>View all</StyledLink>
    </Section>
  );
}
