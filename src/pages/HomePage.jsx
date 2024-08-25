import styled from "styled-components";
import useRaces from "../hooks/useRaces";
import StyledWrapper from "../components/styled/StyledWrapper";
import { addStatusToRace, sortRaces } from "../helpers/racesFilterHelpers";
import RaceOverviewSection from "../components/Races/RaceOverviewSection";
import CircuitsNearby from "../components/Circuits/CircuitsNearby";

const StyledRacesOverview = styled.div`
  display: grid;
  grid-gap: 1.6rem;
  grid-template-columns: 1fr;

  @media screen and (min-width: 67rem) {
    grid-template-columns: 2fr 1fr;
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
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}
        >
          <RaceOverviewSection
            title="Upcoming Races"
            races={[...ongoingRaces, ...nextRaces]}
          />
          <RaceOverviewSection title="Recent Races" races={lastRaces} />
        </div>

        <CircuitsNearby />
      </StyledRacesOverview>
    </StyledWrapper>
  );
}
