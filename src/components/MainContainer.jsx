import { useState, useEffect } from "react";
import _ from "lodash";
import supabase from "../config/supabaseClient";
import { seriesData } from "../data";
import HeaderBar from "./HeaderBar";
import EventList from "./EventList";

export default function MainContainer() {
  const currentYear = new Date().getFullYear().toString();
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

  // Fetch races from Supabase and extract filter options
  useEffect(() => {
    async function fetchRaces() {
      const { data, error } = await supabase
        .from("races")
        .select(`*, circuits (*, countries (*))`)
        .order("end_date", { ascending: true });
      if (error) {
        console.error("Error fetching races", error);
      } else {
        console.log("Races fetched successfully", data);
        setRaces(data);
        setFilteredRaces(data);
        extractFilterOptions(data);
      }
    }
    fetchRaces();
  }, []);

  //   Extract filter options which will be displayed in the dropdown
  function extractFilterOptions(data) {
    const years = [
      "All years",
      ..._.uniq(data.map((race) => race.end_date.slice(0, 4)))
        .reverse()
        .filter((year) => year <= currentYear),
    ];
    const months = [
      "All months",
      ..._.uniq(
        data.map((race) =>
          new Date(race.end_date).toLocaleString("default", { month: "long" })
        )
      ),
    ];
    const categories = [
      "All categories",
      ..._.uniq(_.flatMap(data, (race) => race.engine_type)),
    ];
    const series = seriesData.sort();
    const countries = [
      "All countries",
      ..._.uniq(_.flatMap(data, (race) => race.circuits.countries.name)).sort(),
    ];
    setFilterOptions({
      years,
      months,
      categories,
      series,
      countries,
    });
  }

  useEffect(() => {
    function applyFilters() {
      let filtered = races;
      if (filters.years) {
        filtered = filtered.filter(
          (race) => filters.years === race.end_date.slice(0, 4)
        );
      }
      if (filters.months && filters.months !== "All months") {
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
      if (filters.categories && filters.categories !== "All categories") {
        filtered = filtered.filter((race) =>
          race.engine_type.includes(filters.categories)
        );
      }
      if (filters.series && filters.series !== "All series") {
        filtered = filtered.filter(
          (race) =>
            race.series.filter((series) => series.includes(filters.series))
              .length
        );
      }
      if (filters.countries && filters.countries !== "All countries") {
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
    <>
      <HeaderBar
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
      />
      <EventList races={filteredRaces} />
    </>
  );
}
