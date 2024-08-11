import styled from "styled-components";
import { Link } from "react-router-dom";
import useRaces from "../hooks/useRaces";
import { addStatusToRace, sortRaces } from "../filterHelpers";

import Section from "../components/Section/Section";
import RaceItem from "../components/Races/RaceItem";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 70rem) {
    flex-direction: row;
    gap: 1.6rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.accent[0]};
  padding: 0.6rem 0 0.5rem 0;
  text-align: center;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.accent[1]};
  }
`;

// Return first 'limit' number of races with 'status' from 'sortedRaces'
function getRacesByStatus(status, limit, sortedRaces) {
  return sortedRaces.filter((race) => race.status === status).slice(0, limit);
}

export default function HomePage() {
  const { fetchedRaces } = useRaces();
  const racesWithStatus = fetchedRaces.map((race) => addStatusToRace(race));
  const racesAscending = sortRaces(racesWithStatus, "ascending");
  const racesDescending = sortRaces(racesWithStatus, "descending");

  const ongoingRaces = getRacesByStatus("ongoing", 5, racesAscending);
  const nextRaces = getRacesByStatus(
    "upcoming",
    5 - ongoingRaces.length,
    racesAscending
  );
  const lastRaces = getRacesByStatus("finished", 5, racesDescending);

  return (
    <StyledContainer>
      <Section title={"Ongoing Races"} titleSize={"1.25rem"}>
        {[...ongoingRaces, ...nextRaces]?.map((race) => (
          <RaceItem key={race.id} {...race} />
        ))}
        <StyledLink to="/calendar">View all</StyledLink>
      </Section>

      <Section title="Recent Races" titleSize="1.25rem">
        {lastRaces?.map((race) => (
          <RaceItem key={race.id} {...race} />
        ))}
        <StyledLink to="/calendar">View all</StyledLink>
      </Section>
    </StyledContainer>
  );
}
