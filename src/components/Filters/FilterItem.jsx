import styled from "styled-components";
import { useState } from "react";
import Select from "react-select";
import { defaultFilterValues } from "../../data";

const StyledSelectWrapper = styled.div`
  .custom-select__control {
    background-color: ${({ theme }) => theme.colors.bg[3]};
    box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.1);
    border: none;
    border-radius: 0.5rem;
    padding: 0.06rem;
    min-width: 14rem;

    &:hover {
      cursor: ${({ $showDropdown }) => ($showDropdown ? "pointer" : "default")};
      background-color: ${({ theme }) => theme.colors.bg[4]};
    }

    @media screen and (min-width: 80rem) {
      min-width: 15rem;
    }
  }

  .custom-select__placeholder {
    color: ${({ theme }) => theme.colors.text[0]};
    filter: opacity(0.6);
  }

  .custom-select__single-value {
    color: ${({ theme }) => theme.colors.text[0]};
  }

  .custom-select__menu {
    background-color: ${({ theme }) => theme.colors.bg[3]};
    color: ${({ theme }) => theme.colors.text[0]};
    backdrop-filter: blur(1.5rem);
    -webkit-backdrop-filter: blur(1.5rem);
    border: 1px solid ${({ theme }) => theme.colors.bg[3]};
    border-radius: 0.5rem;
    padding: 0.3rem;
    margin-top: 0.3rem;
  }

  .custom-select__option {
    background-color: inherit;
    border-radius: 0.5rem;
    padding: 0.7rem;

    &:hover {
      cursor: ${({ $showDropdown }) => ($showDropdown ? "pointer" : "default")};
      background-color: ${({ theme }) => theme.colors.accent[2]};
    }
  }

  .custom-select__option--is-selected {
    background-color: ${({ theme }) => theme.colors.accent[1]};
    color: ${({ theme }) => theme.colors.text[0]};
  }
`;

export default function FilterItem({
  name,
  options,
  showDropdown,
  onFilterChange,
}) {
  const [selectValue, setSelectValue] = useState(defaultFilterValues[name]);
  const formattedOptions = options.map((option) => ({
    value: option,
    label: option,
  }));

  const handleChange = (selectedOption) => {
    setSelectValue(selectedOption?.value);
    onFilterChange(name, selectedOption?.value ?? null);
  };

  const selectedOption =
    formattedOptions.find((option) => option.value === selectValue) || null;

  return (
    <StyledSelectWrapper $showDropdown={showDropdown}>
      <Select
        name={name}
        options={formattedOptions}
        value={selectedOption}
        placeholder={name[0].toUpperCase() + name.slice(1)}
        onChange={handleChange}
        isClearable
        classNamePrefix="custom-select"
      />
    </StyledSelectWrapper>
  );
}
