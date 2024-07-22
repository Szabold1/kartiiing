import styled from "styled-components";
import DateHeader from "./DateHeader";
import EventItemContent from "./EventItemContent";
import Btn from "../Btn";

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
`;

export default function EventItem({
  start_date,
  end_date,
  series,
  circuits,
  engine_type,
}) {
  return (
    <StyledItem>
      <DateHeader date={{ start: start_date, end: end_date }} />

      <EventItemContent
        name={series}
        location={circuits}
        engine_type={engine_type}
      />

      <div>
        <Btn>More Info</Btn>
      </div>
    </StyledItem>
  );
}
