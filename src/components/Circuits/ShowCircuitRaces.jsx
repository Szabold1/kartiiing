import { useState } from "react";
import useRaces from "@hooks/useRaces";
import StyledMessage from "@components/styled/StyledMessage";
import SectionWithDropdown from "@components/Section/SectionWithDropdown";
import RaceItem from "@components/Races/RaceItem/RaceItem";
import { sortRaces, sortIntoGroups, filterByCircuit } from "@utils/racesFilter";

export default function ShowCircuitRaces({
  circuitName,
  title = `Races in ${circuitName}`,
  initialYear = new Date().getFullYear().toString(),
}) {
  const { data: races, isFetching } = useRaces();

  const sortedRaces = sortIntoGroups(
    sortRaces(filterByCircuit(races, circuitName), "ascending"),
    "ascending"
  );

  const availableYears = Array.from(sortedRaces.keys());

  const [activeYear, setActiveYear] = useState(
    availableYears.includes(initialYear)
      ? initialYear
      : availableYears[availableYears.length - 1]
  );

  if (isFetching) {
    return <StyledMessage>Loading...</StyledMessage>;
  }
  if (sortedRaces.size === 0) {
    return;
  }

  return (
    <SectionWithDropdown
      title={title}
      titleSize="1.25rem"
      items={Array.from(sortedRaces.keys())}
      btnLabel={activeYear}
      onItemSelect={(year) => setActiveYear(year)}
      color="lime"
    >
      {sortedRaces.get(activeYear)?.map((race) => {
        return <RaceItem key={race.id} race={race} />;
      })}
    </SectionWithDropdown>
  );
}
