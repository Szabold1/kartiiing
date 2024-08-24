import { useState, useEffect } from "react";
import { createInitialFilters } from "../helpers/filterHelpers";

// Create a provider for data
function DataProvider({
  children,
  type, // races, circuits
  context, // context to pass to children (CircuitsContext, RacesContext)
  fetchData, // function to fetch data from Supabase (fetchRaces, fetchCircuits)
  extractFilterOptions, // function to extract filter options
  applyFilters, // function to apply filters
  filterKeys,
  defaultFilterValues,
}) {
  const [fetchedData, setFetchedData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const [filteredData, setFilteredData] = useState([]);
  const [groupedData, setGroupedData] = useState(new Map());

  const [filterOptions, setFilterOptions] = useState(
    createInitialFilters(filterKeys)
  );
  const [appliedFilters, setAppliedFilters] = useState({
    ...createInitialFilters(filterKeys),
    ...defaultFilterValues,
  });

  // Fetch data from Supabase
  useEffect(() => {
    async function fetchDataFromSupabase() {
      setIsFetching(true);
      const { data, error } = await fetchData();
      if (error) {
        console.error(`Error fetching ${type}`, error);
      } else {
        console.log(`${type} fetched successfully`, data);
        setFetchedData(data);
      }
      setIsFetching(false);
    }

    fetchDataFromSupabase();
  }, [fetchData, type]);

  // Update filter options when data changes
  useEffect(() => {
    setFilterOptions(extractFilterOptions(fetchedData));
  }, [fetchedData, extractFilterOptions]);

  // Update the filtered and grouped data when the filters or data change
  useEffect(() => {
    const { filtered, groupedBy } = applyFilters(fetchedData, appliedFilters);
    setFilteredData(filtered);
    setGroupedData(groupedBy);
  }, [appliedFilters, fetchedData, applyFilters]);

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
    <context.Provider
      value={{
        fetchedData,
        isFetching,
        filteredData,
        groupedData,
        filterOptions,
        appliedFilters,
        handleFilterChange,
        resetFilters,
      }}
    >
      {children}
    </context.Provider>
  );
}

export { DataProvider };
