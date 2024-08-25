import _ from "lodash";
import { removeTimeFromDate } from "./dateHelpers";
import { championshipsData } from "../data";

// Extract race filter options and return them as an object
function extractRacesFilterOptions(fetchedData) {
  const sorting = ["Date ascending", "Date descending"];

  const status = ["Upcoming", "Finished"];

  const years = _.uniq(
    fetchedData.map((race) => race.end_date.slice(0, 4))
  ).sort();

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
  const racesCopy = [...races];

  if (sorting.includes("ascending")) {
    return racesCopy.sort(
      (a, b) => new Date(a.end_date) - new Date(b.end_date)
    );
  } else if (sorting.includes("descending")) {
    return racesCopy.sort(
      (a, b) => new Date(b.end_date) - new Date(a.end_date)
    );
  }

  return racesCopy;
}

// Takes 'races' (array of races (objects)) and 'status' (string equal to 'Upcoming' or 'Finished')
function filterByStatus(races, status) {
  return races.filter((race) =>
    status.toLowerCase() === "upcoming"
      ? race.status.toLowerCase() === "upcoming" ||
        race.status.toLowerCase() === "ongoing"
      : race.status.toLowerCase() === "finished"
  );
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

// Add 'status' property to race object and return the updated object
function addStatusToRace(race) {
  if (!race || race.status) return race;
  const currentDate = removeTimeFromDate(new Date());
  const startDate = removeTimeFromDate(
    new Date(race.start_date || race.end_date)
  );
  const endDate = removeTimeFromDate(new Date(race.end_date));

  let status = "";

  if (startDate > currentDate) status = "upcoming";
  else if (endDate < currentDate) status = "finished";
  else status = "ongoing";

  return { ...race, status };
}

// Filter the races based on the filters selected
// Returns 'filtered' (array of filtered races) and 'groupedByYear' (map of sorted races grouped by year)
function applyRacesFilters(races, filters) {
  let filtered = races;

  const racesWithStatus = races.map((race) => addStatusToRace(race));

  filtered = racesWithStatus;

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

  return { filtered, groupedBy: groupedByYear };
}

export {
  extractRacesFilterOptions,
  applyRacesFilters,
  addStatusToRace,
  sortRaces,
};
