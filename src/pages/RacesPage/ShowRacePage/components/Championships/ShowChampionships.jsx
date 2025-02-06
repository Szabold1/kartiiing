import styled from "styled-components";
import useRaces from "@hooks/useRaces";
import ShowChampionshipRaces from "./ShowChampionshipRaces";
import StyledH3 from "@components/styled/StyledH3";

const StyledChampionshipsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export default function ShowChampionships({ race }) {
  const { data } = useRaces();

  return (
    <StyledChampionshipsContainer>
      {race.championships.length > 1 && (
        <StyledH3 color="orange">Championships</StyledH3>
      )}
      {race.championships.length === 1 && (
        <StyledH3 color="orange">Championship</StyledH3>
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
