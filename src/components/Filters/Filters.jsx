import styled from "styled-components";
import { useState } from "react";
import { IoOptions } from "react-icons/io5";
import ActiveFilters from "./ActiveFilters";
import FiltersModal from "./FiltersModal";
import ModalBackdrop from "../Modal/ModalBackdrop";

const StyledFilters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;

  @media screen and (min-width: 70rem) {
    flex-direction: row;
  }
`;

const StyledFiltersBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-width: max-content;
  width: 100%;
  padding: 0.6rem 1.5rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.accent[0]};
  color: ${({ theme }) => theme.colors.text[1]};
  font-size: 1.1rem;
  letter-spacing: 0.05rem;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent[1]};
  }

  @media screen and (min-width: 70rem) {
    width: 15rem;
  }
`;

export default function Filters({ context }) {
  const [showFilters, setShowFilters] = useState(false);

  // Show/hide filters
  function handleShowFiltersClick() {
    setShowFilters((prev) => !prev);
  }

  return (
    <StyledFilters>
      <StyledFiltersBar onClick={handleShowFiltersClick}>
        <span>Filter & Sort</span>
        <IoOptions size="20" />
      </StyledFiltersBar>

      <ActiveFilters />

      <ModalBackdrop show={showFilters} onClose={handleShowFiltersClick}>
        <FiltersModal
          showFilters={showFilters}
          onShowFiltersClick={handleShowFiltersClick}
          context={context}
        />
      </ModalBackdrop>
    </StyledFilters>
  );
}
