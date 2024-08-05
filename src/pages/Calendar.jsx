import styled from "styled-components";
import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import {
  createInitialFilters,
  extractFilterOptions,
  applyFilters,
} from "../filterHelpers";
import { defaultFilterValues, filterKeys } from "../data";
import PageHeader from "../components/PageHeader/PageHeader";
import EventList from "../components/EventList";

const StyledCalendarContainer = styled.div`
  margin: 0 auto;
  padding: 0 1rem;
  max-width: 1400px;

  @media screen and (min-width: 40rem) {
    padding: 0 2rem;
  }

  @media screen and (min-width: 50rem) {
    padding: 0 3rem;
  }
`;

export default function Calendar() {
  const [races, setRaces] = useState([]);
  const [filteredRaces, setFilteredRaces] = useState([]);
  const [filterOptions, setFilterOptions] = useState(
    createInitialFilters(filterKeys)
  );
  const [filters, setFilters] = useState({
    ...createInitialFilters(filterKeys),
    ...defaultFilterValues,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [groupedRaces, setGroupedRaces] = useState(new Map());

  // Fetch races from Supabase and extract filter options
  useEffect(() => {
    async function fetchRaces() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("races")
        .select(`*, circuits (*, countries (*))`)
        .order("end_date", { ascending: true });
      if (error) {
        console.error("Error fetching races", error);
      } else {
        console.log("Races fetched successfully", data);
        setRaces(data);
        setFilterOptions(extractFilterOptions(data));
      }
      setIsLoading(false);
    }
    fetchRaces();
  }, []);

  // Filter races based on selected filters
  useEffect(() => {
    const { filtered, groupedByYear } = applyFilters(races, filters);
    setFilteredRaces(filtered);
    setGroupedRaces(groupedByYear);
  }, [filters, races]);

  function handleFilterChange(filterName, value) {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  }

  return (
    <StyledCalendarContainer>
      <PageHeader
        filterOptions={filterOptions}
        filters={filters}
        onFilterChange={handleFilterChange}
        races={filteredRaces}
        originalRaces={races}
      />
      <EventList groupedRaces={groupedRaces} isLoading={isLoading} />
    </StyledCalendarContainer>
  );
}
