import useRaces from "../../hooks/useRaces";

import RaceItem from "./RaceItem";
import StyledMessage from "../styled/StyledMessage";
import Section from "../Section/Section";
import SectionHeader from "../Section/SectionHeader";
import SectionContent from "../Section/SectionContent";

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
        <Section key={year}>
          <SectionHeader title={year} />
          <SectionContent>
            {groupedRaces.get(year).map((race) => (
              <RaceItem key={race.id} {...race} />
            ))}
          </SectionContent>
        </Section>
      ))}
    </>
  );
}
