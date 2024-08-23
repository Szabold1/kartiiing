import { createContext, useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import { createInitialFilters } from "../helpers/filterHelpers";
import {
  extractCircuitsFilterOptions,
  applyCircuitsFilters,
} from "../helpers/circuitsFilterHelpers";

// 1. Create a context for circuits
const CircuitsContext = createContext();

// 2. Create a provider for circuits
function CircuitsProvider({ children, filterKeys, defaultFilterValues }) {
  const [fetchedCircuits, setFetchedCircuits] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const [filteredCircuits, setFilteredCircuits] = useState([]);
  const [filterOptions, setFilterOptions] = useState(
    createInitialFilters(filterKeys)
  );
  const [appliedFilters, setAppliedFilters] = useState({
    ...createInitialFilters(filterKeys),
    ...defaultFilterValues,
  });

  // Fetch circuits data from Supabase
  useEffect(() => {
    async function fetchCircuits() {
      setIsFetching(true);
      const { data, error } = await supabase
        .from("circuits")
        .select(`*, countries (*)`);
      if (error) {
        console.error("Error fetching circuits", error);
      } else {
        console.log("Circuits fetched successfully", data);
        setFetchedCircuits(data);
      }
      setIsFetching(false);
    }
    fetchCircuits();
  }, []);

  // Update filter options when the circuits change
  useEffect(() => {
    setFilterOptions(extractCircuitsFilterOptions(fetchedCircuits));
  }, [fetchedCircuits]);

  // Update the filtered and grouped circuits when the filters or circuits change
  useEffect(() => {
    const filtered = applyCircuitsFilters(fetchedCircuits, appliedFilters);
    setFilteredCircuits(filtered);
  }, [appliedFilters, fetchedCircuits]);

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
    <CircuitsContext.Provider
      value={{
        fetchedCircuits,
        isFetching,
        filteredCircuits,
        filterOptions,
        appliedFilters,
        handleFilterChange,
        resetFilters,
      }}
    >
      {children}
    </CircuitsContext.Provider>
  );
}

export { CircuitsContext, CircuitsProvider };
