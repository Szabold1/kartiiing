import styled from "styled-components";
import { useState } from "react";
import { defaultFilterValues } from "../../data";

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

  > span {
    padding: 0.6rem 0.85rem;
    border-radius: 0.5rem;
    border: 1.5px solid ${({ theme }) => theme.colors.accent[1]};
    font-size: 1.1rem;
    letter-spacing: 0.05rem;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.accent[2]};
    }

    &.chosen {
      background-color: ${({ theme }) => theme.colors.accent[1]};
    }
  }
`;

export default function FilterItem({ name, options, onFilterChange }) {
  const [selectedValues, setSelectedValues] = useState(
    defaultFilterValues[name] || []
  );

  // if option is already selected, remove it, otherwise add it to selectedValues
  function handleOptionClick(option) {
    if (selectedValues.includes(option)) {
      setSelectedValues(selectedValues.filter((o) => o !== option));
      onFilterChange(
        name,
        selectedValues.filter((o) => o !== option)
      );
    } else {
      setSelectedValues([...selectedValues, option]);
      onFilterChange(name, [...selectedValues, option]);
    }
  }

  return (
    <StyledContainer>
      <StyledFilterName>
        {name[0].toUpperCase() + name.slice(1)}
      </StyledFilterName>
      <StyledOptions>
        {options.map((option) => (
          <span
            key={option}
            onClick={() => handleOptionClick(option)}
            className={selectedValues.includes(option) ? "chosen" : ""}
          >
            {option}
          </span>
        ))}
      </StyledOptions>
    </StyledContainer>
  );
}
