import { useState, useEffect } from "react";
import {
  createInitialFilters,
  extractFilterOptions,
  applyFilters,
} from "../filterHelpers";

export default function useRaceFilters(races, filterKeys, defaultFilterValues) {
  const [filteredRaces, setFilteredRaces] = useState([]);
  const [filterOptions, setFilterOptions] = useState(
    createInitialFilters(filterKeys)
  );
  const [appliedFilters, setAppliedFilters] = useState({
    ...createInitialFilters(filterKeys),
    ...defaultFilterValues,
  });
  const [groupedRaces, setGroupedRaces] = useState(new Map());

  // Update filter options when the races change
  useEffect(() => {
    setFilterOptions(extractFilterOptions(races));
  }, [races]);

  // Update the filtered and grouped races when the filters or races change
  useEffect(() => {
    const { filtered, groupedByYear } = applyFilters(races, appliedFilters);
    setFilteredRaces(filtered);
    setGroupedRaces(groupedByYear);
  }, [appliedFilters, races]);

  function handleFilterChange(filterName, value) {
    setAppliedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  }

  return {
    filteredRaces,
    filterOptions,
    appliedFilters,
    groupedRaces,
    handleFilterChange,
  };
}
