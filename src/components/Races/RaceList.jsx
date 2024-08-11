import useRaces from "../../hooks/useRaces";

import RaceItem from "./RaceItem";
import StyledMessage from "../styled/StyledMessage";
import Section from "../Section/Section";

export default function RaceList() {
  const { groupedRaces, isFetching, filteredRaces } = useRaces();

  if (isFetching) {
    return <StyledMessage>Loading...</StyledMessage>;
  }
  if (filteredRaces.length === 0) {
    return <StyledMessage>No races found</StyledMessage>;
  }

  return (
    <>
      {Array.from(groupedRaces.keys()).map((year) => (
        <Section key={year} title={year}>
          {groupedRaces.get(year).map((race) => (
            <RaceItem key={race.id} {...race} />
          ))}
        </Section>
      ))}
    </>
  );
}
