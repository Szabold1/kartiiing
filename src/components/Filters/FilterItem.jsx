import styled from "styled-components";
import { useEffect, useState } from "react";
import { defaultFilterValues } from "../../data";
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

export default function FilterItem({ name, options, onFilterChange, reset }) {
  const [selectedValues, setSelectedValues] = useState(
    defaultFilterValues[name] || []
  );

  // if reset is true, reset selectedValues and call onFilterChange with empty array
  useEffect(() => {
    if (reset) {
      setSelectedValues(defaultFilterValues[name] || []);
      onFilterChange(name, defaultFilterValues[name] || []);
    }
  }, [reset, onFilterChange, name]);

  // if option is already selected, remove it, otherwise add it to selectedValues
  function handleOptionClick(option) {
    if (selectedValues.includes(option) && name !== "sorting") {
      setSelectedValues(selectedValues.filter((o) => o !== option));
      onFilterChange(
        name,
        selectedValues.filter((o) => o !== option)
      );
    } else {
      if (name === "status" || name === "sorting") {
        setSelectedValues([option]);
        onFilterChange(name, [option]);
      } else {
        setSelectedValues([...selectedValues, option]);
        onFilterChange(name, [...selectedValues, option]);
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
