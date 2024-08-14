import { useParams } from "react-router-dom";
import useRaces from "../hooks/useRaces";
import StyledMessage from "../components/styled/StyledMessage";
import RaceEventHeader from "../components/RaceEventPage/RaceEventHeader";
import RaceEventSummary from "../components/RaceEventPage/RaceEventSummary";
import { addStatusToRace } from "../helpers/filterHelpers";

export default function RaceEventPage() {
  const { series_date: url } = useParams();
  const { fetchedRaces, isFetching } = useRaces();

  // Find the race based on the url
  const [seriesName, endDate] = url.split("_");
  const race = addStatusToRace(
    fetchedRaces.find(
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

  return (
    <>
      <RaceEventHeader {...race} />
      <RaceEventSummary {...race} />
    </>
  );
}
