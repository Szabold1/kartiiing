import styled, { keyframes } from "styled-components";
import useRaces from "../../hooks/useRaces";
import { IoClose } from "react-icons/io5";
import FilterItem from "./FilterItem";

const slideIn = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

const StyledFiltersModal = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  background-color: ${({ theme }) =>
    theme.name === "dark" ? "rgba(0, 0, 0, 0.3)" : "rgba(241, 241, 241, 0.9)"};
  backdrop-filter: blur(10rem);
  -webkit-backdrop-filter: blur(10rem);
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  animation: ${({ $show }) => ($show ? slideIn : slideOut)} 0.25s forwards;

  @media screen and (min-width: 40rem) {
    border-radius: 1rem;
    width: 80%;
    height: 90vh;
  }

  @media screen and (min-width: 70rem) {
    width: 70%;
    max-width: 65rem;
  }
`;

const StyledFiltersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.2rem;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.2);

  > h4 {
    font-size: 1.7rem;
    font-weight: 500;
    letter-spacing: 0.1rem;
  }

  > svg {
    cursor: pointer;
    transition: all 0.15s ease-in-out;
  }

  @media screen and (min-width: 30rem) {
    padding: 1.2rem 1.8rem;
  }
`;

const StyledFiltersContent = styled.div`
  max-height: 100vh;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
  flex-grow: 1;

  @media screen and (min-width: 30rem) {
    padding: 1.2rem 1.8rem;
  }
`;

const StyledFiltersFooter = styled.div`
  display: flex;
  gap: 1.2rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.bg[3]};
  backdrop-filter: blur(10rem);
  -webkit-backdrop-filter: blur(10rem);
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.2);

  > button {
    cursor: pointer;
    width: 100%;
    padding: 0.8rem;
    font-size: 1.1rem;
    border: 2px solid transparent;
    border-radius: 0.7rem;
    transition: all 0.15s ease-in-out;
    box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.2);

    &:nth-child(1) {
      background-color: rgba(241, 241, 241, 0.7);
      color: ${({ theme }) =>
        theme.name === "dark" ? theme.colors.text[1] : theme.colors.text[0]};

      &:hover {
        background-color: ${({ theme }) =>
          theme.name === "dark" ? "rgba(241, 241, 241, 0.5)" : "inherit"};
        border-color: ${({ theme }) => theme.colors.accent[0]};
      }
    }

    &:nth-child(2) {
      background-color: ${({ theme }) => theme.colors.accent[0]};
      color: rgb(241, 241, 241);

      &:hover {
        background-color: ${({ theme }) => theme.colors.accent[1]};
      }
    }
  }

  @media screen and (min-width: 30rem) {
    padding: 1.2rem 2rem;
    gap: 1.8rem;
  }
`;

export default function FiltersWindow({ showFilters, onShowFiltersClick }) {
  const { filterOptions, filteredRaces, resetFilters } = useRaces();

  // Reset filters to default values
  function handleResetClick() {
    resetFilters("toDefault");
  }

  return (
    <StyledFiltersModal $show={showFilters}>
      <StyledFiltersHeader>
        <h4>Filter & Sort</h4>
        <IoClose size="40" onClick={onShowFiltersClick} />
      </StyledFiltersHeader>

      <StyledFiltersContent>
        {Object.keys(filterOptions).map((filterName) => (
          <FilterItem
            key={filterName}
            name={filterName}
            options={filterOptions[filterName]}
          />
        ))}
      </StyledFiltersContent>

      <StyledFiltersFooter>
        <button onClick={handleResetClick}>Reset</button>
        <button onClick={onShowFiltersClick}>
          Show {filteredRaces.length} races
        </button>
      </StyledFiltersFooter>
    </StyledFiltersModal>
  );
}
