import styled from "styled-components";
import useRaces from "../../hooks/useRaces";
import RaceItem from "./RaceItem";
import StyledMessage from "../styled/StyledMessage";
import Section from "../Section/Section";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export default function RaceList() {
  const {
    groupedData: groupedRaces,
    isFetching,
    filteredData: filteredRaces,
  } = useRaces();

  if (isFetching) {
    return <StyledMessage>Loading...</StyledMessage>;
  }
  if (filteredRaces.length === 0) {
    return <StyledMessage>No races found</StyledMessage>;
  }

  return (
    <StyledContainer>
      {Array.from(groupedRaces.keys()).map((year) => (
        <Section key={year} title={year}>
          {groupedRaces.get(year).map((race) => (
            <RaceItem key={race.id} {...race} />
          ))}
        </Section>
      ))}
    </StyledContainer>
  );
}
