// Create an initial filters object with empty arrays for each filter key
function createInitialFilters(filterKeys) {
  const initialFilters = {};
  filterKeys.forEach((key) => (initialFilters[key] = []));
  return initialFilters;
}

export { createInitialFilters };
