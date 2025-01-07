import { useState } from "react";
import SectionWithDropdown from "@components/Section/SectionWithDropdown";
import RaceItem from "@components/Races/RaceItem/RaceItem";
import {
  sortRaces,
  sortIntoGroups,
  filterByChampionships,
} from "@utils/racesFilter";

export default function ChampionshipRaces({ championship, data, initialYear }) {
  const [activeYear, setActiveYear] = useState(initialYear);

  const filtered = filterByChampionships(data, [championship]);
  const sortedRaces = sortIntoGroups(
    sortRaces(filtered, "ascending"),
    "ascending"
  );

  return (
    <SectionWithDropdown
      title={`${championship} in`}
      titleSize="1.25rem"
      items={Array.from(sortedRaces.keys())}
      btnLabel={activeYear}
      onItemSelect={(year) => setActiveYear(year)}
    >
      {sortedRaces.get(activeYear)?.map((race) => {
        if (race.championships.includes(championship)) {
          return <RaceItem key={race.id} race={race} />;
        }
      })}
    </SectionWithDropdown>
  );
}
