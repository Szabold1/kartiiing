import styled from "styled-components";
import _ from "lodash";
import RaceItem from "./RaceItem";
import StyledMessage from "../styled/StyledMessage";

const StyledRaceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin-top: 0.5rem;
`;

const StyledYear = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: 0.05rem;
  padding-bottom: 3.5rem;

  @media screen and (min-width: 70rem) {
    font-size: 2.2rem;
    position: sticky;
    top: 4.3rem;
    padding: 1.3rem 4.8rem 0.7rem 4.8rem;
    background-color: ${({ theme }) => theme.colors.bg[1]};
    border-radius: 1rem 1rem 0 0;
    box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.1);
    text-align: left;
  }
`;

const StyledRaceItems = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 2.6rem 1.6rem;
  justify-items: center;

  @media screen and (min-width: 70rem) {
    display: flex;
    flex-direction: column;
    gap: 0;
    background-color: ${({ theme }) => theme.colors.bg[1]};
    padding: 0.7rem;
    border-radius: 0 0 1rem 1rem;
    box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.1);
  }
`;

export default function RaceList({ groupedRaces, isLoading }) {
  const nbOfRaces = _.sumBy(Array.from(groupedRaces.values()), "length");

  if (isLoading) {
    return <StyledMessage>Loading...</StyledMessage>;
  }
  if (nbOfRaces === 0) {
    return <StyledMessage>No races found</StyledMessage>;
  }

  return (
    <StyledRaceList>
      {Array.from(groupedRaces.keys()).map((year) => (
        <div key={year}>
          <StyledYear>{year}</StyledYear>
          <StyledRaceItems>
            {groupedRaces.get(year).map((race) => (
              <RaceItem key={race.id} {...race} />
            ))}
          </StyledRaceItems>
        </div>
      ))}
    </StyledRaceList>
  );
}
