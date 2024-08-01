import styled from "styled-components";
import { useState, useEffect } from "react";
import _ from "lodash";
import supabase from "../config/supabaseClient";
import { championshipsData } from "../data";
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
  const [filterOptions, setFilterOptions] = useState({
    years: [],
    months: [],
    categories: [],
    championships: [],
    countries: [],
  });
  const [filters, setFilters] = useState({
    years: [],
    months: [],
    categories: [],
    championships: [],
    countries: [],
  });
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
        handleFilterChange("years", [new Date().getFullYear().toString()]);
        extractFilterOptions(data);
      }
      setIsLoading(false);
    }
    fetchRaces();
  }, []);

  //   Extract filter options which will be displayed in the dropdown
  function extractFilterOptions(data) {
    const years = _.uniq(
      data.map((race) => race.end_date.slice(0, 4))
    ).reverse();

    const months = _.uniq(
      data.map((race) => new Date(race.end_date).getMonth())
    )
      .sort((a, b) => a - b)
      .map((month) =>
        new Date(0, month).toLocaleString("default", { month: "long" })
      );

    const categories = _.uniq(
      _.flatMap(data, (race) => race.engine_type)
    ).sort();

    const championships = championshipsData.sort();

    const countries = _.uniq(
      _.flatMap(data, (race) => race.circuits.countries.name)
    ).sort();
    setFilterOptions({
      years,
      months,
      categories,
      championships,
      countries,
    });
  }

  // Filter races based on selected filters
  useEffect(() => {
    function applyFilters() {
      let filtered = races;

      if (filters.years?.length > 0) {
        filtered = filtered.filter((race) =>
          filters.years.includes(race.end_date.slice(0, 4))
        );
      }

      if (filters.months?.length > 0) {
        filtered = filtered.filter((race) => {
          const startDate = new Date(race.start_date).toLocaleString(
            "default",
            { month: "long" }
          );
          const endDate = new Date(race.end_date).toLocaleString("default", {
            month: "long",
          });
          return (
            filters.months.includes(startDate) ||
            filters.months.includes(endDate)
          );
        });
      }

      if (filters.categories?.length > 0) {
        filtered = filtered.filter((race) =>
          race.engine_type.some((type) => filters.categories.includes(type))
        );
      }

      if (filters.championships?.length > 0) {
        filtered = filtered.filter((race) =>
          race.series.some((series) =>
            filters.championships.some((championship) =>
              series.toLowerCase().includes(championship.toLowerCase())
            )
          )
        );
      }

      if (filters.countries?.length > 0) {
        filtered = filtered.filter((race) =>
          filters.countries.includes(race.circuits.countries.name)
        );
      }

      setFilteredRaces(filtered);
    }

    applyFilters();
  }, [filters, races]);

  function handleFilterChange(filterName, value) {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  }

  return (
    <StyledMainContainer>
      <PageHeader
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
      />
      <EventList races={filteredRaces} isLoading={isLoading} />
    </StyledMainContainer>
  );
}
