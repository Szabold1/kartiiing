import styled from "styled-components";
import useRaces from "@hooks/useRaces";
import ShowChampionshipRaces from "./ShowChampionshipRaces";

const StyledChampionshipsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StyledHeader = styled.h3`
  font-weight: 500;
  font-size: 1.6rem;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  margin: 0.8rem 0 -0.1rem 0;
  padding: 0.15rem 0.9rem;
  border-left: 0.2rem solid ${({ theme }) => theme.colors.orange[0]};
`;

export default function ShowChampionships({ race }) {
  const { data } = useRaces();

  return (
    <StyledChampionshipsContainer>
      {race.championships.length > 1 && (
        <StyledHeader>Championships</StyledHeader>
      )}
      {race.championships.length === 1 && (
        <StyledHeader>Championship</StyledHeader>
      )}

      {race.championships.map((championship) => (
        <ShowChampionshipRaces
          key={championship}
          championship={championship}
          data={data}
          initialYear={race.end_date.slice(0, 4)}
        />
      ))}
    </StyledChampionshipsContainer>
  );
}
