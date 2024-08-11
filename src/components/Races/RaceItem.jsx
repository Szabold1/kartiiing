import styled from "styled-components";
import RaceItemDate from "./RaceItemDate";
import RaceItemContent from "./RaceItemContent";
import { useContext } from "react";
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

  return (
    <StyledItem $cWidth={containerWidth}>
      {status === "ongoing" ? <span className="live">live</span> : null}

      <RaceItemDate {...race} />
      <RaceItemContent {...race} />
    </StyledItem>
  );
}
