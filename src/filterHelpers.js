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
  const sorting = ["Date ascending", "Date descending"];

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
    sorting,
    status,
    years,
    months,
    categories,
    championships,
    countries,
  };
}

// Filter the races based on the filters selected
// Returns 'filtered' (array of filtered races) and 'groupedByYear' (map of sorted races grouped by year)
function applyFilters(races, filters) {
  let filtered = races;

  if (filters.sorting?.length > 0) {
    if (filters.sorting[0].includes("ascending")) {
      filtered = filtered.sort(
        (a, b) => new Date(a.end_date) - new Date(b.end_date)
      );
    } else if (filters.sorting[0].includes("descending")) {
      filtered = filtered.sort(
        (a, b) => new Date(b.end_date) - new Date(a.end_date)
      );
    }
  }

  if (filters.status?.length > 0) {
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

  // Sort races by year in ascending or descending order based on the sorting option
  // If no sorting option is selected, sort races by year in ascending order
  // Returns sorted races by year as a map
  function sortIntoGroups(races, sorting) {
    const groupedByYear = _.groupBy(races, (race) => race.end_date.slice(0, 4));
    let sortedYears = Object.keys(groupedByYear).sort();

    if (sorting?.length > 0 && sorting[0]?.includes("descending")) {
      sortedYears = Object.keys(groupedByYear).sort().reverse();
    }

    const sortedGroupedByYear = new Map();
    sortedYears.forEach((year) => {
      sortedGroupedByYear.set(year, groupedByYear[year]);
    });

    return sortedGroupedByYear;
  }

  const groupedByYear = sortIntoGroups(filtered, filters.sorting);
  return { filtered, groupedByYear };
}

export { createInitialFilters, extractFilterOptions, applyFilters };
