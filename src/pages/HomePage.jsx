import styled from "styled-components";
import useRaces from "../hooks/useRaces";
import StyledWrapper from "../components/styled/StyledWrapper";
import { addStatusToRace, sortRaces } from "../helpers/racesFilterHelpers";
import RaceOverviewSection from "../components/Races/RaceOverviewSection";

const StyledRacesOverview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  @media screen and (min-width: 70rem) {
    flex-direction: row;
  }
`;

// Return first 'limit' number of races with 'status' from 'sortedRaces'
function getRacesByStatus(status, limit, sortedRaces) {
  return sortedRaces.filter((race) => race.status === status).slice(0, limit);
}

export default function HomePage() {
  const { fetchedData: races } = useRaces();
  const racesWithStatus = races?.map((race) => addStatusToRace(race));
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
    <StyledWrapper>
      <StyledRacesOverview>
        <RaceOverviewSection
          title="Upcoming Races"
          races={[...ongoingRaces, ...nextRaces]}
        />
        <RaceOverviewSection title="Recent Races" races={lastRaces} />
      </StyledRacesOverview>
    </StyledWrapper>
  );
}
