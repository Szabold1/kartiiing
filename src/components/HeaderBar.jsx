import styled from "styled-components";
import { useState } from "react";
import { IoCalendar } from "react-icons/io5";
import Filters from "./Filters/Filters";

const StyledHeaderBar = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.text[1]};
  background-color: ${({ theme }) => theme.colors.accent[0]};
  border-radius: 0.7rem;
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  margin-bottom: 1rem;

  > div:nth-child(1),
  > div:nth-child(2) {
    padding: 1rem;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;

    & hr {
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
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <StyledHeaderBar $showDropdown={showDropdown}>
      <div>
        <IoCalendar size={20} />
        <hr />
        <h3>CALENDAR</h3>
      </div>
      <Filters
        filterOptions={filterOptions}
        onFilterChange={onFilterChange}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
      />
    </StyledHeaderBar>
  );
}
