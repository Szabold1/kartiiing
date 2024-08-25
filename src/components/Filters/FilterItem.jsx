import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import FilterItemOption from "./FilterItemOption";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledFilterName = styled.h5`
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 0.1rem;
  margin-top: 1rem;
`;

const StyledOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export default function FilterItem({ context, name, options }) {
  const { handleFilterChange, appliedFilters, defaultFilterValues } =
    useContext(context);
  const [selectedValues, setSelectedValues] = useState(
    defaultFilterValues[name] || []
  );

  // if reset is true, reset selectedValues and call handleFilterChange with empty array
  useEffect(() => {
    setSelectedValues(appliedFilters[name] || []);
  }, [appliedFilters, name]);

  // if option is already selected, remove it, otherwise add it to selectedValues
  function handleOptionClick(option) {
    if (selectedValues.includes(option) && name !== "sorting") {
      setSelectedValues(selectedValues.filter((o) => o !== option));
      handleFilterChange(
        name,
        selectedValues.filter((o) => o !== option)
      );
    } else {
      if (name === "status" || name === "sorting") {
        setSelectedValues([option]);
        handleFilterChange(name, [option]);
      } else {
        setSelectedValues([...selectedValues, option]);
        handleFilterChange(name, [...selectedValues, option]);
      }
    }
  }

  return (
    <StyledContainer>
      <StyledFilterName>
        {name !== "sorting" && name[0].toUpperCase() + name.slice(1)}
        {name === "sorting" && "Sort"}
      </StyledFilterName>

      <StyledOptions>
        {options.map((option) => (
          <FilterItemOption
            key={option}
            optionName={name}
            optionValue={option}
            selectedValues={selectedValues}
            onOptionClick={handleOptionClick}
          />
        ))}
      </StyledOptions>
    </StyledContainer>
  );
}
