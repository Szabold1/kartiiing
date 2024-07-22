import styled from "styled-components";

const StyledSelect = styled.select`
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border: none;
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.1);
  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.colors.bg[3]};
  color: ${({ theme }) => theme.colors.text[0]};
  font-weight: 500;

  @media screen and (min-width: 80rem) {
    min-width: 8rem;
  }
`;

export default function FilterItem({ name, options, onFilterChange }) {
  return (
    <StyledSelect
      name={name}
      id={name}
      onChange={(e) => onFilterChange(name, e.target.value)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </StyledSelect>
  );
}
