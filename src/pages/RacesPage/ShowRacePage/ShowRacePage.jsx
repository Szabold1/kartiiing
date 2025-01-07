import styled from "styled-components";
import { useParams } from "react-router-dom";
import useRaces from "@hooks/useRaces";
import StyledMessage from "@components/styled/StyledMessage";
import StyledPageContentWrapper from "@components/styled/StyledPageContentWrapper";
import ShowRaceBtns from "@pages/RacesPage/ShowRacePage/components/ShowRaceBtns";
import ShowRaceHeader from "@pages/RacesPage/ShowRacePage/components/ShowRaceHeader";
import ShowRaceSummary from "@pages/RacesPage/ShowRacePage/components/ShowRaceSummary";
import ShowChampionships from "@pages/RacesPage/ShowRacePage/components/Championships/ShowChampionships";

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

const StyledTables = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

export default function ShowRacePage() {
  const { raceName_date: url } = useParams();
  const { data: races, isFetching } = useRaces();

  // Find the race based on the url
  const [seriesName, endDate] = url.split("_");
  const race = races.find(
    (race) =>
      race.series.sort()[0].replaceAll(" ", "-").toLowerCase() === seriesName &&
      race.end_date === endDate
  );

  if (isFetching) {
    return <StyledMessage>Loading...</StyledMessage>;
  }
  if (!race) {
    return <StyledMessage>No race found</StyledMessage>;
  }

  return (
    <>
      <ShowRaceHeader race={race} />
      <StyledPageContentWrapper>
        {race.status === "ongoing" && <StyledLive>live</StyledLive>}

        <ShowRaceBtns race={race} />
        <StyledTables>
          <ShowRaceSummary race={race} />
          <ShowChampionships race={race} />
        </StyledTables>
      </StyledPageContentWrapper>
    </>
  );
}
