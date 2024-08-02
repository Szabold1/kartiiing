import styled from "styled-components";
import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import {
  createInitialFilters,
  extractFilterOptions,
  applyFilters,
} from "../filterHelpers";
import { filterKeys } from "../data";
import PageHeader from "./PageHeader";
import EventList from "./EventList";

const StyledMainContainer = styled.div`
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

export default function MainContainer() {
  const [races, setRaces] = useState([]);
  const [filteredRaces, setFilteredRaces] = useState([]);
  const [filterOptions, setFilterOptions] = useState(
    createInitialFilters(filterKeys)
  );
  const [filters, setFilters] = useState(createInitialFilters(filterKeys));
  const [isLoading, setIsLoading] = useState(true);

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
        handleFilterChange("status", ["Upcoming"]);
        setFilterOptions(extractFilterOptions(data));
      }
      setIsLoading(false);
    }
    fetchRaces();
  }, []);

  // Filter races based on selected filters
  useEffect(() => {
    setFilteredRaces(applyFilters(races, filters));
  }, [filters, races]);

  function handleFilterChange(filterName, value) {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  }

  return (
    <StyledMainContainer>
      <PageHeader
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
        races={filteredRaces}
      />
      <EventList races={filteredRaces} isLoading={isLoading} />
    </StyledMainContainer>
  );
}
