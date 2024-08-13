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

// Get date difference compared to current date in years and days
function getYearsAndMonths(comparedDate) {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const compDate = removeTimeFromDate(comparedDate);
  const today = removeTimeFromDate(new Date());

  let years = today.getFullYear() - compDate.getFullYear();

  const dateForCalcDays = new Date(compDate);
  dateForCalcDays.setFullYear(today.getFullYear());

  if (today < dateForCalcDays && years > 0) {
    years--;
    dateForCalcDays.setFullYear(today.getFullYear() - 1);
  }

  const days = Math.ceil(Math.abs((today - dateForCalcDays) / MS_PER_DAY));

  return { years, days };
}

export { removeTimeFromDate, formatDate, getYearsAndMonths };
