import styled from "styled-components";
import RaceItemDate from "./RaceItemDate";
import RaceItemContent from "./RaceItemContent";
import StyledBtn from "../styled/StyledBtn";

const StyledItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.3rem;
  width: 100%;
  min-width: 20rem;
  max-width: 35rem;
  border-radius: 0.75rem;
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.bg[1]};
  padding: 0 1rem 1.2rem 1rem;
  transition: transform 0.2s ease-in-out;

  > div:nth-child(3) {
    margin-top: auto;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
    background-color: ${({ theme }) => theme.colors.bg[2]};
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.1);
    background-color: ${({ theme }) => theme.colors.bg[1]};
  }

  @media screen and (min-width: 70rem) {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 1.5rem;
    max-width: 100%;
    padding: 0.8rem;
    box-shadow: none;

    > div:nth-child(3) {
      margin-top: 0;
    }

    &:hover {
      transform: none;
      flex-shrink: 0;
      box-shadow: none;
    }
  }

  @media screen and (min-width: 90rem) {
    padding: 1rem;
  }
`;

export default function RaceItem({
  start_date,
  end_date,
  series,
  circuits,
  engine_type,
}) {
  return (
    <StyledItem>
      <RaceItemDate date={{ start: start_date, end: end_date }} />

      <RaceItemContent
        name={series}
        location={circuits}
        engine_type={engine_type}
      />

      <div>
        <StyledBtn>More Info</StyledBtn>
      </div>
    </StyledItem>
  );
}
