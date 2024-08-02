import _ from "lodash";
import { championshipsData } from "./data";

// Create an initial filters object with empty arrays for each filter key
function createInitialFilters(filterKeys) {
  const initialFilters = {};
  filterKeys.forEach((key) => (initialFilters[key] = []));
  return initialFilters;
}

//   Extract filter options and return them as an object
function extractFilterOptions(fetchedData) {
  const status = ["Upcoming", "Ongoing", "Finished"];

  const years = _.uniq(
    fetchedData.map((race) => race.end_date.slice(0, 4))
  ).reverse();

  const months = _.uniq(
    fetchedData.map((race) => new Date(race.end_date).getMonth())
  )
    .sort((a, b) => a - b)
    .map((month) =>
      new Date(0, month).toLocaleString("default", { month: "long" })
    );

  const categories = _.uniq(
    _.flatMap(fetchedData, (race) => race.engine_type)
  ).sort();

  const championships = championshipsData.sort();

  const countries = _.uniq(
    _.flatMap(fetchedData, (race) => race.circuits.countries.name)
  ).sort();

  return {
    status,
    years,
    months,
    categories,
    championships,
    countries,
  };
}

// Filter the races based on the filters selected and return the filtered races
function applyFilters(races, filters) {
  let filtered = races;

  if (filters.status) {
    const currentDate = new Date();
    if (filters.status.includes("Upcoming")) {
      filtered = filtered.filter(
        (race) => new Date(race.end_date) > currentDate
      );
    } else if (filters.status.includes("Ongoing")) {
      filtered = filtered.filter(
        (race) =>
          new Date(
            race.start_date === null ? race.end_date : race.start_date
          ) <= currentDate && new Date(race.end_date) >= currentDate
      );
    } else if (filters.status.includes("Finished")) {
      filtered = filtered.filter(
        (race) => new Date(race.end_date) < currentDate
      );
    }
  }

  if (filters.years?.length > 0) {
    filtered = filtered.filter((race) =>
      filters.years.includes(race.end_date.slice(0, 4))
    );
  }

  if (filters.months?.length > 0) {
    filtered = filtered.filter((race) => {
      const startDate = new Date(race.start_date).toLocaleString("default", {
        month: "long",
      });
      const endDate = new Date(race.end_date).toLocaleString("default", {
        month: "long",
      });
      return (
        filters.months.includes(startDate) || filters.months.includes(endDate)
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

  return filtered;
}

export { createInitialFilters, extractFilterOptions, applyFilters };
