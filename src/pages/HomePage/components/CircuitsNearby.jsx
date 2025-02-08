import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Section from "@components/Section/Section";
import StyledMessage from "@components/styled/StyledMessage";
import StyledLink from "@components/styled/StyledLink";
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

export default function CircuitsNearby() {
  const navigate = useNavigate();
  const { locationName } = useLocation();
  const { filteredData, isFetching, resetFilters, handleFilterChange } =
    useCircuits();

  function handleViewAllClick() {
    resetFilters();
    handleFilterChange("sorting", ["Distance ascending"]);

    navigate("/circuits");
  }

  const circuits = filteredData?.sort((a, b) => a.distanceKm - b.distanceKm);

  return (
    <Section
      title={`Circuits near ${locationName}`}
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
          {circuits?.map((circuit) => (
            <CircuitItem
              key={circuit.id}
              showDistance
              distanceKm={circuit.distanceKm}
              circuit={circuit}
            />
          ))}
        </StyledItems>
      )}

      <StyledLink onClick={handleViewAllClick} color="green">
        View all
      </StyledLink>
    </Section>
  );
}
