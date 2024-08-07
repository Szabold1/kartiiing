import { defaultFilterValues, filterKeys } from "../data";
import { IoCalendarOutline } from "react-icons/io5";
// Hooks
import useFetchRaces from "../hooks/useFetchRaces";
import useRaceFilters from "../hooks/useRaceFilters";
// PageHeader
import PageHeader from "../components/PageHeader/PageHeader";
import PageIntro from "../components/PageHeader/PageIntro";
import PageTitle from "../components/PageHeader/PageTitle";
import IntroText from "../components/PageHeader/IntroText";
import Filters from "../components/Filters/Filters";
// RaceList
import RaceList from "../components/Races/RaceList";

export default function Calendar() {
  const { races, isLoading } = useFetchRaces();
  const {
    filteredRaces,
    filterOptions,
    appliedFilters,
    groupedRaces,
    handleFilterChange,
  } = useRaceFilters(races, filterKeys, defaultFilterValues);

  return (
    <>
      <PageHeader>
        <PageIntro>
          <PageTitle>
            <IoCalendarOutline size="28" />
            <h3>Calendar</h3>
          </PageTitle>

          <IntroText>
            Explore our calendar with {races.length || 0} races from{" "}
            {filterOptions.years[0]} to{" "}
            {filterOptions.years[filterOptions.years.length - 1]}, across{" "}
            {filterOptions.championships.length || 0} championships in{" "}
            {filterOptions.countries.length || 0} countries.
          </IntroText>
        </PageIntro>

        <Filters
          appliedFilters={appliedFilters}
          filterOptions={filterOptions}
          onFilterChange={handleFilterChange}
          filteredRaces={filteredRaces}
        />
      </PageHeader>

      <RaceList groupedRaces={groupedRaces} isLoading={isLoading} />
    </>
  );
}
