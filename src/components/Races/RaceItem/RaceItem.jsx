import styled from "styled-components";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WidthContext } from "@contexts/WidthContext";
import RaceItemDate from "@components/Races/RaceItem/RaceItemDate";
import RaceItemContent from "@components/Races/RaceItem/RaceItemContent";

const StyledItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: ${({ $cWidth }) => ($cWidth < 600 ? "0.65rem" : "0.5rem")};
  cursor: pointer;
  border-radius: 0.6rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg[2]};
  }

  > .live {
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 0.5rem;
    font-weight: 700;
    letter-spacing: 0.02rem;
    text-transform: uppercase;
    background-color: ${({ theme }) => theme.colors.red[0]};
    padding: 0.2rem 0.3rem;
    border-radius: 0.2rem;
    color: ${({ theme }) =>
      theme.name === "light" ? theme.colors.text[1] : theme.colors.text[0]};
  }
`;

export default function RaceItem({ race }) {
  const navigate = useNavigate();
  const containerWidth = useContext(WidthContext);

  function handleClick() {
    // Get the series name and end date and navigate to the show race page
    const seriesName = race.series[0].replaceAll(" ", "-").toLowerCase();
    navigate(`/races/${seriesName}_${race.end_date}`);
  }

  return (
    <StyledItem $cWidth={containerWidth} onClick={handleClick}>
      {race.status === "ongoing" ? <span className="live">live</span> : null}

      <RaceItemDate date={race.end_date} />
      <RaceItemContent race={race} />
    </StyledItem>
  );
}
