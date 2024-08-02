import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import FilterItem from "./FilterItem";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const StyledSlideInWrapper = styled.div`
  z-index: 130;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(0.1rem);
  transition: visibility 0.15s ease-in-out, opacity 0.15s ease-in-out;
  pointer-events: ${({ $show }) => ($show ? "auto" : "none")};
  visibility: ${({ $show }) => ($show ? "visible" : "hidden")};
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  display: flex;
  justify-content: flex-end;
`;

const StyledSlideIn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 34.5rem;
  min-height: 100vh;
  height: 100%;
  background-color: ${({ theme }) =>
    theme.name === "dark" ? "rgba(0, 0, 0, 0.3)" : "rgba(241, 241, 241, 0.9)"};
  backdrop-filter: blur(10rem);
  -webkit-backdrop-filter: blur(10rem);
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  animation: ${({ $show }) => ($show ? slideIn : slideOut)} 0.4s forwards;
`;

const StyledFiltersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.5rem 1.8rem;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.2);

  > h4 {
    font-size: 2rem;
    font-weight: 500;
    letter-spacing: 0.1rem;
  }

  > svg {
    cursor: pointer;
    padding: 0.6rem;
    background-color: ${({ theme }) =>
      theme.name === "dark"
        ? "rgba(241, 241, 241, 0.25)"
        : "rgba(0, 0, 0, 0.1)"};
    border-radius: 0.6rem;

    transition: all 0.15s ease-in-out;

    &:hover {
      background-color: rgba(241, 241, 241, 0.4);
      background-color: ${({ theme }) =>
        theme.name === "dark"
          ? "rgba(241, 241, 241, 0.4)"
          : "rgba(0, 0, 0, 0.2)"};
    }
  }

  @media screen and (min-width: 28rem) {
    padding: 1.6rem 2.2rem;
  }
`;

const StyledFiltersContent = styled.div`
  max-height: 100vh;
  padding: 1rem 1.8rem 8.4rem 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  overflow-y: auto;
  flex-grow: 1;

  @media screen and (min-width: 28rem) {
    padding: 1rem 2.2rem 8.4rem 2.2rem;
  }
`;

const StyledFiltersFooter = styled.div`
  z-index: 130;
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  gap: 1.2rem;
  padding: 1.6rem;
  flex-shrink: 0;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bg[3]};
  backdrop-filter: blur(10rem);
  -webkit-backdrop-filter: blur(10rem);
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.2);

  > button {
    letter-spacing: 0.05rem;
    cursor: pointer;
    width: 100%;
    padding: 0.7rem;
    font-size: 1.2rem;
    border: 2px solid transparent;
    background-color: ${({ theme }) =>
      theme.name === "dark" && "rgba(241, 241, 241, 0.8)"};
    border-radius: 0.6rem;
    transition: all 0.15s ease-in-out;
    box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.2);

    &:nth-child(1):hover {
      background-color: ${({ theme }) =>
        theme.name === "dark" ? "rgba(241, 241, 241, 0.55)" : "inherit"};
      border-color: ${({ theme }) => theme.colors.accent[0]};
    }

    &:nth-child(2) {
      background-color: ${({ theme }) => theme.colors.accent[0]};
      color: rgb(241, 241, 241);

      &:hover {
        background-color: ${({ theme }) => theme.colors.accent[1]};
      }
    }
  }

  @media screen and (min-width: 28rem) {
    padding: 1.8rem 2.2rem;
    gap: 1.6rem;
  }
`;

export default function FiltersSlideIn({
  showFilters,
  onShowFiltersClick,
  filterOptions,
  onFilterChange,
}) {
  const [resetFilters, setResetFilters] = useState(false);

  function handleResetClick() {
    setResetFilters(true);
    setTimeout(() => setResetFilters(false), 0);
  }

  return (
    <StyledSlideInWrapper $show={showFilters}>
      <StyledSlideIn $show={showFilters}>
        <StyledFiltersHeader>
          <h4>Filter & Sort</h4>
          <IoClose size="50" onClick={onShowFiltersClick} />
        </StyledFiltersHeader>

        <StyledFiltersContent>
          {Object.keys(filterOptions).map((filterName) => (
            <FilterItem
              key={filterName}
              name={filterName}
              options={filterOptions[filterName]}
              onFilterChange={onFilterChange}
              reset={resetFilters}
            />
          ))}
        </StyledFiltersContent>

        <StyledFiltersFooter>
          <button onClick={handleResetClick}>Reset</button>
          <button onClick={onShowFiltersClick}>Apply</button>
        </StyledFiltersFooter>
      </StyledSlideIn>
    </StyledSlideInWrapper>
  );
}
