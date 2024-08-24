import styled from "styled-components";
import { useParams } from "react-router-dom";
import useRaces from "../hooks/useRaces";
import StyledMessage from "../components/styled/StyledMessage";
import RaceEventSummary from "../components/RaceEventPage/RaceEventSummary";
import RaceEventBtns from "../components/RaceEventPage/RaceEventBtns";
import { addStatusToRace } from "../helpers/racesFilterHelpers";
import RaceEventHeader from "../components/RaceEventPage/RaceEventHeader";

const StyledContent = styled.div`
  max-width: 55rem;
  margin: 0 auto;
  margin-top: -2rem;
  margin-bottom: 2rem;
  padding: 1.3rem 1rem;
  background-color: ${({ theme }) =>
    theme.name === "dark" ? "rgb(0, 17, 27)" : "rgb(240, 244, 244)"};
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.2);
  position: relative;

  @media screen and (min-width: 50rem) {
    padding: 1.6rem;
  }
  @media screen and (min-width: 55rem) {
    border-radius: 1.2rem;
  }
`;

const StyledLive = styled.div`
  z-index: 2;
  position: absolute;
  top: -0.75rem;
  left: 1rem;
  margin-bottom: 0.3rem;
  width: fit-content;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.02rem;
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.colors.live[0]};
  padding: 0.3rem 0.5rem;
  border-radius: 0.3rem;
  color: ${({ theme }) => theme.colors.text[1]};

  @media screen and (min-width: 50rem) {
    left: 1.6rem;
    font-size: 0.9rem;
    padding: 0.4rem 0.6rem;
    top: -0.85rem;
  }
`;

export default function RaceEventPage() {
  const { series_date: url } = useParams();
  const { fetchedData: races, isFetching } = useRaces();

  // Find the race based on the url
  const [seriesName, endDate] = url.split("_");
  const race = addStatusToRace(
    races.find(
      (race) =>
        race.series.sort()[0].replaceAll(" ", "-").toLowerCase() ===
          seriesName && race.end_date === endDate
    )
  );

  if (isFetching) {
    return <StyledMessage>Loading...</StyledMessage>;
  }
  if (!race) {
    return <StyledMessage>No race found</StyledMessage>;
  }

  const { status } = race;
  return (
    <>
      <RaceEventHeader {...race} />
      <StyledContent>
        {status === "ongoing" && <StyledLive>live</StyledLive>}

        <RaceEventBtns {...race} />
        <RaceEventSummary {...race} />
      </StyledContent>
    </>
  );
}
