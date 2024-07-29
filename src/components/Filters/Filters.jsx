import styled from "styled-components";
import { useEffect, useRef } from "react";
import { IoOptions } from "react-icons/io5";
import FilterItem from "./FilterItem";

const StyledFilters = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 1rem;
  cursor: pointer;
  z-index: 110;
`;

const StyledDropdownContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  transition: all 0.2s ease-in-out;
  pointer-events: ${({ $show }) => ($show ? "auto" : "none")};
  visibility: ${({ $show }) => ($show ? "visible" : "hidden")};
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transform: translateY(${({ $show }) => ($show ? 0 : -1)});
  z-index: 100;
`;

const StyledDropdown = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.5rem;
  margin-top: 3.75rem;
  background-color: ${({ theme }) => theme.colors.accent[0]};
  border-radius: 0.7rem;
  backdrop-filter: blur(1.5rem);
  -webkit-backdrop-filter: blur(1.5rem);
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
    <div ref={filtersRef} onMouseLeave={() => setShowDropdown(false)}>
      <StyledFilters
        onClick={handleFilterClick}
        onMouseEnter={() => setShowDropdown(true)}
      >
        <span>FILTERS</span>
        <hr />
        <IoOptions size={20} />
      </StyledFilters>

      <StyledDropdownContainer $show={showDropdown}>
        <StyledDropdown>
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
      </StyledDropdownContainer>
    </div>
  );
}
