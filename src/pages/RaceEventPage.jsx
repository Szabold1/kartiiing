import { useParams } from "react-router-dom";
import useRaces from "../hooks/useRaces";
import StyledMessage from "../components/styled/StyledMessage";
import RaceEventHeader from "../components/RaceEventPage/RaceEventHeader";

export default function RaceEventPage() {
  const { series_date: url } = useParams();
  const { fetchedRaces, isFetching } = useRaces();

  // Find the race based on the url
  const [seriesName, endDate] = url.split("_");
  const race = fetchedRaces.find(
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
      <RaceEventHeader {...race} />
    </>
  );
}
