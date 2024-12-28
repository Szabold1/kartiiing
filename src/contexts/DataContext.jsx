import { useState, useEffect } from "react";
import { createInitialFilters } from "../helpers/filterHelpers";

// Create a provider for data
function DataProvider({
  children,
  type, // races, circuits
  context, // context to pass to children (CircuitsContext, RacesContext)
  data, // e.g. circuits, races
  isFetching,
  extractFilterOptions, // function to extract filter options
  applyFilters, // function to apply filters
  filterKeys,
  defaultFilterValues,
}) {
  const [filteredData, setFilteredData] = useState([]);
  const [groupedData, setGroupedData] = useState(new Map());

  const [filterOptions, setFilterOptions] = useState(
    createInitialFilters(filterKeys)
  );
  const [appliedFilters, setAppliedFilters] = useState({
    ...createInitialFilters(filterKeys),
    ...defaultFilterValues,
  });

  // Update filter options when data changes
  useEffect(() => {
    setFilterOptions(extractFilterOptions(data));
  }, [data, extractFilterOptions]);

  // Update the filtered and grouped data when the filters or data change
  useEffect(() => {
    const { filtered, groupedBy } = applyFilters(data, appliedFilters);
    setFilteredData(filtered);
    setGroupedData(groupedBy);
  }, [appliedFilters, data, applyFilters]);

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
        type,
        data,
        isFetching,
        filteredData,
        groupedData,
        filterOptions,
        appliedFilters,
        defaultFilterValues,
        handleFilterChange,
        resetFilters,
      }}
    >
      {children}
    </context.Provider>
  );
}

export { DataProvider };
