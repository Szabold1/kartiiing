import styled from "styled-components";
import { IoCalendarOutline } from "react-icons/io5";
import { IoOptions } from "react-icons/io5";

const StyledPageHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 6.3rem 0 2rem 0;
  color: ${({ theme }) => theme.colors.text[0]};

  @media screen and (min-width: 70rem) {
    flex-direction: row;
    justify-content: space-between;
    padding: 8rem 1.5rem 2rem 1.5rem;
  }
`;

const StyledTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  > h3 {
    font-size: 1.8rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
  }

  @media screen and (min-width: 70rem) {
    > h3 {
      font-size: 2.2rem;
    }
  }
`;

const StyledFiltersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
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

export default function PageHeader() {
  return (
    <StyledPageHeader>
      <StyledTitleContainer>
        <IoCalendarOutline size="28" />
        <h3>Calendar</h3>
      </StyledTitleContainer>
      <StyledFiltersContainer>
        <span>All filters</span>
        <IoOptions size="20" />
      </StyledFiltersContainer>
    </StyledPageHeader>
  );
}
