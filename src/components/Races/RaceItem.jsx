import styled from "styled-components";
import RaceItemDate from "./RaceItemDate";
import RaceItemContent from "./RaceItemContent";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WidthContext } from "../../contexts/WidthContext";

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
    background-color: rgb(230, 40, 0);
    padding: 0.2rem 0.3rem;
    border-radius: 0.2rem;
    color: ${({ theme }) => theme.colors.text[1]};
  }
`;

export default function RaceItem({ ...race }) {
  const { status } = race;
  const containerWidth = useContext(WidthContext);
  const navigate = useNavigate();

  function handleClick() {
    const seriesName = race.series[0].replaceAll(" ", "-").toLowerCase();
    navigate(`/calendar/${seriesName}_${race.end_date}`);
  }

  return (
    <StyledItem $cWidth={containerWidth} onClick={handleClick}>
      {status === "ongoing" ? <span className="live">live</span> : null}

      <RaceItemDate {...race} />
      <RaceItemContent {...race} />
    </StyledItem>
  );
}
