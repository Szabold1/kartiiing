import styled from "styled-components";
import { IoArrowUpOutline, IoArrowDownOutline } from "react-icons/io5";

const StyledOption = styled.span`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export default function FilterItemOption({
  optionName,
  optionValue,
  selectedValues,
  onOptionClick,
}) {
  return (
    <StyledOption
      onClick={() => onOptionClick(optionValue)}
      className={selectedValues.includes(optionValue) ? "chosen" : ""}
    >
      {optionName !== "sorting" && optionValue}
      {optionName === "sorting" && optionValue.slice(0, 5)}
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
