import styled from "styled-components";
import { useState, useEffect } from "react";
import _ from "lodash";
import supabase from "../config/supabaseClient";
import { seriesData } from "../data";
import EventList from "./EventList";
import StyledNoRaces from "./styled/StyledNoRaces";
import SubHeader from "./SubHeader";

const StyledMainContainer = styled.div`
  margin: 0 auto;
  padding: 6rem 1rem;
  max-width: 1600px;

  @media screen and (min-width: 40rem) {
    padding: 6rem 2rem;
  }

  @media screen and (min-width: 50rem) {
    padding: 6rem 3rem;
  }
`;

export default function MainContainer() {
  const [races, setRaces] = useState([]);
  const [filteredRaces, setFilteredRaces] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    years: [],
    months: [],
    categories: [],
    series: [],
    countries: [],
  });
  const [filters, setFilters] = useState({
    years: null,
    months: null,
    categories: null,
    series: null,
    countries: null,
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
        handleFilterChange("years", new Date().getFullYear().toString());
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

    const series = seriesData.sort();

    const countries = _.uniq(
      _.flatMap(data, (race) => race.circuits.countries.name)
    ).sort();
    setFilterOptions({
      years,
      months,
      categories,
      series,
      countries,
    });
  }

  // Filter races based on selected filters
  useEffect(() => {
    function applyFilters() {
      let filtered = races;
      if (filters.years) {
        filtered = filtered.filter(
          (race) => filters.years === race.end_date.slice(0, 4)
        );
      }

      if (filters.months) {
        filtered = filtered.filter((race) => {
          const startDate = new Date(race.start_date).toLocaleString(
            "default",
            { month: "long" }
          );
          const endDate = new Date(race.end_date).toLocaleString("default", {
            month: "long",
          });
          return filters.months === startDate || filters.months === endDate;
        });
      }

      if (filters.categories) {
        filtered = filtered.filter((race) =>
          race.engine_type.includes(filters.categories)
        );
      }

      if (filters.series) {
        filtered = filtered.filter(
          (race) =>
            race.series.filter((series) =>
              series.toLowerCase().includes(filters.series.toLowerCase())
            ).length
        );
      }

      if (filters.countries) {
        filtered = filtered.filter(
          (race) => race.circuits.countries.name === filters.countries
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
      <SubHeader filters={filters} races={filteredRaces} />
      <EventList races={filteredRaces} isLoading={isLoading} />
    </StyledMainContainer>
  );
}
