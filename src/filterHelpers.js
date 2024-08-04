import _ from "lodash";
import { championshipsData } from "./data";

// Create an initial filters object with empty arrays for each filter key
function createInitialFilters(filterKeys) {
  const initialFilters = {};
  filterKeys.forEach((key) => (initialFilters[key] = []));
  return initialFilters;
}

// Extract filter options and return them as an object
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

// Takes 'races' (array of races (objects)) and 'sorting' (string containing 'ascending' or 'descending')
function sortRaces(races, sorting) {
  if (sorting.includes("ascending")) {
    return races.sort((a, b) => new Date(a.end_date) - new Date(b.end_date));
  } else if (sorting.includes("descending")) {
    return races.sort((a, b) => new Date(b.end_date) - new Date(a.end_date));
  }

  return races;
}

// Takes 'races' (array of races (objects)) and 'status' (string equal to 'Upcoming', 'Ongoing' or 'Finished')
function filterByStatus(races, status) {
  const currentDate = new Date();

  if (status.toLowerCase() === "upcoming") {
    return races.filter((race) => new Date(race.end_date) > currentDate);
  } else if (status.toLowerCase() === "ongoing") {
    return races.filter(
      (race) =>
        new Date(race.start_date === null ? race.end_date : race.start_date) <=
          currentDate && new Date(race.end_date) >= currentDate
    );
  } else if (status.toLowerCase() === "finished") {
    return races.filter((race) => new Date(race.end_date) < currentDate);
  }

  return races;
}

// Takes 'races' (array of races (objects)) and 'years' (array of years (strings))
function filterByYears(races, years) {
  return races.filter((race) => years.includes(race.end_date.slice(0, 4)));
}

// Takes 'races' (array of races (objects)) and 'months' (array of months (strings))
function filterByMonths(races, months) {
  return races.filter((race) => {
    const startDate = new Date(race.start_date)?.toLocaleString("default", {
      month: "long",
    });
    const endDate = new Date(race.end_date)?.toLocaleString("default", {
      month: "long",
    });
    return months.includes(startDate) || months.includes(endDate);
  });
}

// Takes 'races' (array of races (objects)) and 'categories' (array of categories (strings))
function filterByCategories(races, categories) {
  return races.filter((race) =>
    race.engine_type.some((type) => categories.includes(type))
  );
}

// Takes 'races' (array of races (objects)) and 'championships' (array of championships (strings))
function filterByChampionships(races, championships) {
  console.log(races);
  return races.filter((race) =>
    race.series.some((series) =>
      championships.some((championship) =>
        series.toLowerCase().includes(championship.toLowerCase())
      )
    )
  );
}

// Takes 'races' (array of races (objects)) and 'countries' (array of countries (strings))
function filterByCountries(races, countries) {
  return races.filter((race) =>
    countries.includes(race.circuits.countries.name)
  );
}

// Takes 'races' (array of races (objects)) and 'sorting' (string containing 'ascending' or 'descending')
// Returns sorted races by year as a map
function sortIntoGroups(races, sorting) {
  const groupedByYear = _.groupBy(races, (race) => race.end_date.slice(0, 4));

  let sortedYears = Object.keys(groupedByYear).sort();
  if (sorting?.includes("descending")) {
    sortedYears = sortedYears.reverse();
  }

  const sortedGroupedByYear = new Map();
  sortedYears.forEach((year) => {
    sortedGroupedByYear.set(year, groupedByYear[year]);
  });

  return sortedGroupedByYear;
}

// Filter the races based on the filters selected
// Returns 'filtered' (array of filtered races) and 'groupedByYear' (map of sorted races grouped by year)
function applyFilters(races, filters) {
  let filtered = races;

  if (filters.sorting?.length > 0)
    filtered = sortRaces(filtered, filters.sorting[0]);

  if (filters.status?.length > 0)
    filtered = filterByStatus(filtered, filters.status[0]);

  if (filters.years?.length > 0)
    filtered = filterByYears(filtered, filters.years);

  if (filters.months?.length > 0)
    filtered = filterByMonths(filtered, filters.months);

  if (filters.categories?.length > 0)
    filtered = filterByCategories(filtered, filters.categories);

  if (filters.championships?.length > 0)
    filtered = filterByChampionships(filtered, filters.championships);

  if (filters.countries?.length > 0)
    filtered = filterByCountries(filtered, filters.countries);

  const groupedByYear = sortIntoGroups(filtered, filters.sorting[0]);

  return { filtered, groupedByYear };
}

export { createInitialFilters, extractFilterOptions, applyFilters };
