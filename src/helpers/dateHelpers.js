// Takes a Date object and returns a Date object with the year, month and day specified
// (basically removes the time from the Date object)
function removeTimeFromDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// format a string date (2022-01-01) into a more readable format (2022 Jan 1)
function formatDate(dateStr) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleDateString("default", { month: "short" });
  const year = date.getFullYear();
  return `${year} ${month} ${day}`;
}

// Get difference in years and days between two dates
// Returns an object with the years and days difference
// If the first date is in the past, the values will be negative
// e.g. (2024-12-01, 2022-06-01) => { years: 2, days: 183 }
function getYearsAndDaysDifference(date1, date2) {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const DAYS_PER_YEAR = 365.25;

  // Remove time components from both dates for accurate calculations
  const d1 = removeTimeFromDate(date1);
  const d2 = removeTimeFromDate(date2);

  // Determine which date is earlier and which is later
  const earlierDate = d1 < d2 ? d1 : d2;
  const laterDate = d1 < d2 ? d2 : d1;

  // Calculate the difference between the two dates in days and years
  const differenceInDays = Math.floor(laterDate - earlierDate) / MS_PER_DAY;
  const differenceInYears = Math.floor(differenceInDays / DAYS_PER_YEAR);
  const days = Math.floor(differenceInDays % DAYS_PER_YEAR);

  // Return negative values if first date is in the past
  if (earlierDate === d1) {
    return { years: -differenceInYears, days: -days };
  }

  return { years: differenceInYears, days };
}

export { removeTimeFromDate, formatDate, getYearsAndDaysDifference };
