import { createContext, useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import {
  createInitialFilters,
  extractFilterOptions,
  applyFilters,
} from "../helpers/filterHelpers";

// 1. Create a context for races
const RacesContext = createContext();

// 2. Create a provider for races
function RacesProvider({ children, filterKeys, defaultFilterValues }) {
  const [fetchedRaces, setFetchedRaces] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const [filteredRaces, setFilteredRaces] = useState([]);
  const [filterOptions, setFilterOptions] = useState(
    createInitialFilters(filterKeys)
  );
  const [appliedFilters, setAppliedFilters] = useState({
    ...createInitialFilters(filterKeys),
    ...defaultFilterValues,
  });
  const [groupedRaces, setGroupedRaces] = useState(new Map());

  // Fetch races data from Supabase
  useEffect(() => {
    async function fetchRaces() {
      setIsFetching(true);
      const { data, error } = await supabase
        .from("races")
        .select(`*, circuits (*, countries (*))`);
      if (error) {
        console.error("Error fetching races", error);
      } else {
        console.log("Races fetched successfully", data);
        setFetchedRaces(data);
      }
      setIsFetching(false);
    }
    fetchRaces();
  }, []);

  // Update filter options when the races change
  useEffect(() => {
    setFilterOptions(extractFilterOptions(fetchedRaces));
  }, [fetchedRaces]);

  // Update the filtered and grouped races when the filters or races change
  useEffect(() => {
    const { filtered, groupedByYear } = applyFilters(
      fetchedRaces,
      appliedFilters
    );
    setFilteredRaces(filtered);
    setGroupedRaces(groupedByYear);
  }, [appliedFilters, fetchedRaces]);

  // Handle filter changes
  function handleFilterChange(filterName, value) {
    setAppliedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  }

  // Reset filters based on resetType
  function resetFilters(resetType = "") {
    setAppliedFilters(createInitialFilters(filterKeys));
    if (resetType === "toDefault") {
      setAppliedFilters({ ...defaultFilterValues });
    }
  }

  return (
    <RacesContext.Provider
      value={{
        fetchedRaces,
        isFetching,
        filteredRaces,
        filterOptions,
        appliedFilters,
        groupedRaces,
        handleFilterChange,
        resetFilters,
      }}
    >
      {children}
    </RacesContext.Provider>
  );
}

export { RacesContext, RacesProvider };
