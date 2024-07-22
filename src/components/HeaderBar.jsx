import styled from "styled-components";
import { IoCalendar } from "react-icons/io5";
import Filters from "./Filters/Filters";

const StyledHeaderBar = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.text[1]};
  background-color: ${({ theme }) => theme.colors.accent[0]};
  border-radius: 0.5rem;
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 1rem;

    > hr {
      height: 1rem;
      width: 1.25px;
      margin: 0;
      border-radius: 0.5px;
      border: none;
      background-color: ${({ theme }) => theme.colors.text[1]};
    }
  }
`;

export default function HeaderBar({ filterOptions, onFilterChange }) {
  return (
    <StyledHeaderBar>
      <div>
        <IoCalendar size={20} />
        <hr />
        <h3>CALENDAR</h3>
      </div>
      <Filters filterOptions={filterOptions} onFilterChange={onFilterChange} />
    </StyledHeaderBar>
  );
}
