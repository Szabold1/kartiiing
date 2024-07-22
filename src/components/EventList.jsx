import styled from "styled-components";
import EventItem from "./EventItem/EventItem";

const StyledList = styled.ol`
  display: grid;
  justify-content: center;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 2.5rem 1.25rem;
  padding: 3rem 0;
`;

export default function EventList({ races }) {
  return (
    <StyledList>
      {races
        ? races.map((data) => <EventItem key={data.id} {...data} />)
        : "Loading..."}
    </StyledList>
  );
}
