import styled from "styled-components";
import { useEffect, useRef } from "react";
import { IoOptions } from "react-icons/io5";
import FilterItem from "./FilterItem";

const StyledFilters = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
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
`;

export default function Filters({
  filterOptions,
  onFilterChange,
  showDropdown,
  setShowDropdown,
}) {
  const filtersRef = useRef(null);

  function handleFilterClick() {
    setShowDropdown((prev) => !prev);
  }

  // Close dropdown when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (filtersRef.current && !filtersRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowDropdown]);

  return (
    <div ref={filtersRef}>
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
    </div>
  );
}
