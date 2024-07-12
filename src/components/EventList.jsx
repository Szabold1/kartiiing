import styled from "styled-components";
import { eventsData } from "../data";
import EventItem from "./EventItem";

const StyledList = styled.ol`
  display: grid;
  justify-content: center;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 2.5rem 1.25rem;
  padding: 3rem 0;
`;

// flatten data then return an array where data is ordered by date
function prepareData(data) {
  let flatData = Object.values(data).flat();

  flatData
    .sort((a, b) => {
      return new Date(a.date?.start) - new Date(b.date?.start);
    })
    .forEach((item, index) => {
      item.id = index + 1;
    });

  return flatData;
}

export default function EventList() {
  const allData = prepareData(eventsData);

  return (
    <StyledList>
      {allData.map((data) => (
        <EventItem key={data.id} {...data} />
      ))}
    </StyledList>
  );
}
