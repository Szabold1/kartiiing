import styled from "styled-components";
import RaceItem from "@components/Races/RaceItem/RaceItem";
import StyledMessage from "@components/styled/StyledMessage";
import Section from "@components/Section/Section";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export default function RaceList({ groupedRaces, isFetching }) {
  if (isFetching) {
    return <StyledMessage>Loading...</StyledMessage>;
  }
  if (groupedRaces.size === 0) {
    return <StyledMessage>No races found</StyledMessage>;
  }

  return (
    <StyledContainer>
      {Array.from(groupedRaces.keys()).map((year) => (
        <Section key={year} title={year}>
          {groupedRaces.get(year).map((race) => (
            <RaceItem key={race.id} race={race} />
          ))}
        </Section>
      ))}
    </StyledContainer>
  );
}
