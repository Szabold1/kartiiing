import styled from "styled-components";
import { useState } from "react";
import { HiOutlineArrowPath } from "react-icons/hi2";
import FiltersHeader from "./FiltersHeader";
import FilterItem from "./FilterItem";

const StyledFilters = styled.div`
  color: ${({ theme }) => theme.colors.text[1]};
  position: relative;

  > div {
    background-color: ${({ theme }) => theme.colors.accent[0]};
    border-radius: 0.5rem;
    box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
  }
`;

const StyledDropdown = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  position: absolute;
  right: 0;
  padding: 1rem 0.75rem;
  width: 15rem;
  transition: all 0.2s ease-in-out;
  visibility: hidden;
  opacity: 0;
  transform: translateY(-1rem);
  z-index: 100;
  margin-top: -0.5rem;

  &.show {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }

  @media screen and (min-width: 80rem) {
    flex-direction: row;
    align-items: center;
    width: fit-content;
    padding: 0.6rem 0.75rem;
  }
`;

const StyledResetFilters = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  padding: 0.66rem 1.4rem;
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.1);
  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.colors.bg[3]};
  color: ${({ theme }) => theme.colors.text[0]};
  font-weight: 600;
  margin-top: 0.5rem;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.bg[4]};
    color: ${({ theme }) => theme.colors.text[1]};
  }

  > svg {
    stroke-width: 2.2;
  }

  @media screen and (min-width: 80rem) {
    margin-top: 0;
  }
`;

export default function Filters({ filterOptions, onFilterChange }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const options = [
    { name: "years", options: filterOptions.years },
    { name: "months", options: filterOptions.months },
    { name: "categories", options: filterOptions.categories },
    { name: "series", options: filterOptions.series },
    { name: "countries", options: filterOptions.countries },
  ];

  function handleFilterClick() {
    setShowDropdown((prev) => !prev);
  }

  return (
    <StyledFilters>
      <FiltersHeader title="calendar" onFilterClick={handleFilterClick} />
      <StyledDropdown className={showDropdown ? "show" : ""}>
        {options.map((option) => (
          <FilterItem
            key={option.name}
            name={option.name}
            options={option.options}
            onFilterChange={onFilterChange}
          />
        ))}
        <StyledResetFilters>
          <HiOutlineArrowPath size={17} />
          <span>Reset</span>
        </StyledResetFilters>
      </StyledDropdown>
    </StyledFilters>
  );
}
