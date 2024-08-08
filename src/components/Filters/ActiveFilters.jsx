import styled from "styled-components";
import useRaces from "../../hooks/useRaces";
import { IoArrowUpOutline, IoArrowDownOutline } from "react-icons/io5";

const StyledActiveFilters = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledActiveOption = styled.span`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.7rem 0.9rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.accent[2]};
  letter-spacing: 0.05rem;
  cursor: default;
  transition: all 0.15s ease-in-out;
  min-width: max-content;
`;

const StyledIcon = styled.span`
  display: flex;
  margin-right: -0.15rem;
`;

export default function ActiveFilters() {
  const { appliedFilters } = useRaces();

  return (
    <StyledActiveFilters>
      {Object.entries(appliedFilters).map(([key, values]) => {
        if (values.length > 0) {
          return values.map((value) => (
            <StyledActiveOption key={key + value}>
              {key !== "sorting" && value}
              {key === "sorting" && value.slice(0, 4)}
              {key === "sorting" && (
                <StyledIcon>
                  {value.includes("ascending") ? (
                    <IoArrowUpOutline />
                  ) : (
                    <IoArrowDownOutline />
                  )}
                </StyledIcon>
              )}
            </StyledActiveOption>
          ));
        }
      })}
    </StyledActiveFilters>
  );
}
