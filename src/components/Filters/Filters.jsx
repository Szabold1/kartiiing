import styled from "styled-components";
import { IoOptions } from "react-icons/io5";
import FilterItem from "./FilterItem";

const StyledFilters = styled.div`
  cursor: pointer;
  position: relative;
`;

const StyledDropdown = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.4rem;
  position: absolute;
  right: 0;
  top: 0;
  padding: 0.5rem;
  transition: all 0.2s ease-in-out;
  visibility: hidden;
  opacity: 0;
  transform: translateY(-1rem);
  z-index: 100;
  margin-top: 3.75rem;
  background-color: ${({ theme }) => theme.colors.accent[0]};
  border-radius: 0.7rem;
  backdrop-filter: blur(1.5rem);
  -webkit-backdrop-filter: blur(1.5rem);

  &.show {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }

  @media screen and (min-width: 80rem) {
    flex-direction: row;
    align-items: center;
    width: auto;
  }
`;

export default function Filters({
  filterOptions,
  onFilterChange,
  showDropdown,
  setShowDropdown,
}) {
  function handleFilterClick() {
    setShowDropdown((prev) => !prev);
  }

  return (
    <>
      <StyledFilters onClick={handleFilterClick}>
        <span>FILTERS</span>
        <hr />
        <IoOptions size={20} />
      </StyledFilters>

      <StyledDropdown className={showDropdown ? "show" : ""}>
        {Object.keys(filterOptions).map((filterName) => (
          <FilterItem
            key={filterName}
            name={filterName}
            options={filterOptions[filterName]}
            showDropdown={showDropdown}
            onFilterChange={onFilterChange}
          />
        ))}
      </StyledDropdown>
    </>
  );
}
