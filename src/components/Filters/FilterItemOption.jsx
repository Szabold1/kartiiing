import styled from "styled-components";
import { IoArrowUpOutline, IoArrowDownOutline } from "react-icons/io5";

const StyledOption = styled.span`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 0.85rem;
  border-radius: 0.5rem;
  border: 1.5px solid ${({ theme }) => theme.colors.accent[1]};
  font-size: 1.1rem;
  letter-spacing: 0.05rem;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  min-width: max-content;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent[2]};
  }

  &.chosen {
    background-color: ${({ theme }) => theme.colors.accent[1]};
  }
`;

export default function FilterItemOption({
  optionName,
  optionValue,
  selectedValues,
  onOptionClick,
}) {
  const sortingValue = optionValue.slice(0, optionValue.indexOf(" "));

  return (
    <StyledOption
      onClick={() => onOptionClick(optionValue)}
      className={selectedValues.includes(optionValue) ? "chosen" : ""}
    >
      {optionName !== "sorting" && optionValue}
      {optionName === "sorting" && sortingValue}
      {optionName === "sorting" && (
        <span style={{ marginRight: "-0.15rem", display: "flex" }}>
          {optionValue.includes("ascending") ? (
            <IoArrowUpOutline />
          ) : (
            <IoArrowDownOutline />
          )}
        </span>
      )}
    </StyledOption>
  );
}
