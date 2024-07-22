import styled from "styled-components";
import { IoCalendar } from "react-icons/io5";
import { IoOptions } from "react-icons/io5";

const StyledFiltersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  }
`;

export default function FiltersHeader({ title, onFilterClick }) {
  return (
    <StyledFiltersHeader>
      <div>
        <IoCalendar size={20} />
        <span>|</span>
        <h3>{title.toUpperCase()}</h3>
      </div>
      <div style={{ cursor: "pointer" }} onClick={onFilterClick}>
        <span>FILTERS</span>
        <span>|</span>
        <IoOptions size={20} />
      </div>
    </StyledFiltersHeader>
  );
}
