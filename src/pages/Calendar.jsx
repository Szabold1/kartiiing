import useFetchRaces from "../hooks/useFetchRaces";
import useRaceFilters from "../hooks/useRaceFilters";
import { defaultFilterValues, filterKeys } from "../data";
import PageHeader from "../components/PageHeader/PageHeader";
import EventList from "../components/Events/EventList";

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
      <PageHeader
        filterOptions={filterOptions}
        filters={appliedFilters}
        onFilterChange={handleFilterChange}
        races={filteredRaces}
        originalRaces={races}
      />
      <EventList groupedRaces={groupedRaces} isLoading={isLoading} />
    </>
  );
}
