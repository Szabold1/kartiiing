import _ from "lodash";

// Extract circuit filter options and return them as an object
function extractCircuitsFilterOptions(circuits) {
  const sorting = ["Name ascending", "Name descending"];

  const countries = _.uniq(
    _.flatMap(circuits, (circuit) => circuit.countries.name)
  ).sort();

  return {
    sorting,
    countries,
  };
}

// Takes 'circuits' (array of circuits (objects)) and 'sorting' (string containing 'ascending' or 'descending')
function sortCircuits(circuits, sorting) {
  const circuitsCopy = [...circuits];

  if (sorting.includes("ascending")) {
    return circuitsCopy.sort((a, b) =>
      a.short_name.localeCompare(b.short_name)
    );
  } else if (sorting.includes("descending")) {
    return circuitsCopy.sort((a, b) =>
      b.short_name.localeCompare(a.short_name)
    );
  }
}

function filterByCountries(circuits, countries) {
  return circuits.filter((circuit) =>
    countries.includes(circuit.countries.name)
  );
}

function applyCircuitsFilters(circuits, filters) {
  let filtered = circuits;

  if (filters.sorting?.length > 0)
    filtered = sortCircuits(filtered, filters.sorting[0]);

  if (filters.countries?.length > 0)
    filtered = filterByCountries(filtered, filters.countries);

  return { filtered, groupedBy: null };
}

export { extractCircuitsFilterOptions, applyCircuitsFilters };
