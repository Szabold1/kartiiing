import styled from "styled-components";
import _ from "lodash";
import EventItem from "./EventItem/EventItem";
import StyledNoRaces from "./styled/StyledNoRaces";

const StyledEventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin-top: 2.5rem;
`;

const StyledYear = styled.h2`
  text-align: center;
  font-size: 2.2rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  margin-bottom: 3.5rem;
`;

const StyledEventItems = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 2.6rem 1.6rem;
  justify-items: center;
  align-items: center;
`;

export default function EventList({ races }) {
  const groupedRaces =
    races?.length > 0
      ? _.groupBy(races, (race) => race.end_date.slice(0, 4))
      : {};

  if (races?.length === 0) {
    return <StyledNoRaces>No races found</StyledNoRaces>;
  }

  return (
    <StyledEventList>
      {Object.keys(groupedRaces).map((year) => (
        <div key={year}>
          <StyledYear>{year}</StyledYear>
          <StyledEventItems>
            {groupedRaces[year].map((race) => (
              <EventItem key={race.id} {...race} />
            ))}
          </StyledEventItems>
        </div>
      ))}
    </StyledEventList>
  );
}
