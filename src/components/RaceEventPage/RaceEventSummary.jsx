import {
  IoCalendarOutline,
  IoLocationOutline,
  IoSpeedometerOutline,
  IoListOutline,
} from "react-icons/io5";
import {
  removeTimeFromDate,
  formatDate,
  getYearsAndMonths,
} from "../../helpers/dateHelpers";
import { renderArray } from "../../helpers/helpers";
import { openGoogleMaps } from "../../helpers/mapHelpers";
import Section from "../Section/Section";
import SummaryItem from "./SummaryItem";

// render the text based on the time to the race
function renderTimeToRace(startDate, endDate) {
  if (startDate === null) startDate = endDate;

  const sDate = removeTimeFromDate(new Date(startDate));
  const eDate = removeTimeFromDate(new Date(endDate));
  const today = removeTimeFromDate(new Date());

  if (sDate > today) {
    const { years, days } = getYearsAndMonths(sDate);
    return renderFutureDate(years, days);
  } else if (eDate < today) {
    const { years, days } = getYearsAndMonths(eDate);
    return renderPastDate(years, days);
  } else {
    return "Live now!";
  }
}

// handle the text in case the race is in the future
function renderFutureDate(years, days) {
  let text = "Starts in ";
  if (years > 0) {
    text += `${years} year${years > 1 ? "s" : ""} and ${days} day${
      days > 1 ? "s" : ""
    }`;
  } else {
    text += `${days} day${days > 1 ? "s" : ""}`;
  }

  return text;
}

// handle the text in case the race is in the past
function renderPastDate(years, days) {
  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} and ${days} day${
      days > 1 ? "s" : ""
    } ago`;
  } else {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
}

export default function RaceEventSummary({ ...race }) {
  const { start_date, end_date, circuits, engine_type, categories } = race;
  const formattedStartDate = formatDate(start_date);
  const formattedEndDate = formatDate(end_date);

  return (
    <Section title="Summary" titleSize="1.25rem" stickyHeader={false}>
      <SummaryItem icon={IoCalendarOutline}>
        <span>
          {formattedStartDate === null ? "" : formattedStartDate + " - "}
          {formattedEndDate === null ? "" : formattedEndDate + " "}
        </span>
        <span>({renderTimeToRace(start_date, end_date)})</span>
      </SummaryItem>

      {circuits && circuits.long_name && circuits.countries?.name && (
        <SummaryItem
          icon={IoLocationOutline}
          onClick={() =>
            openGoogleMaps(`${circuits.long_name}, ${circuits.countries.name}`)
          }
        >
          {circuits.long_name}, {circuits.countries.name}
        </SummaryItem>
      )}

      {engine_type && engine_type.length > 0 && (
        <SummaryItem icon={IoSpeedometerOutline}>
          {renderArray(engine_type, true)}
        </SummaryItem>
      )}

      {categories && categories.length > 0 && (
        <SummaryItem icon={IoListOutline}>
          {renderArray(categories)}
        </SummaryItem>
      )}
    </Section>
  );
}
