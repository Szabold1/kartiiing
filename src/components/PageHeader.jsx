import styled from "styled-components";
import { IoCalendarOutline } from "react-icons/io5";
import Filters from "./Filters/Filters";

const StyledPageHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2.4rem 0 2rem 0;
  color: ${({ theme }) => theme.colors.text[0]};

  @media screen and (min-width: 70rem) {
    flex-direction: row;
    justify-content: space-between;
    padding: 3.2rem 1.5rem 2rem 1.5rem;
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

export default function PageHeader({ filterOptions, onFilterChange, races }) {
  return (
    <StyledPageHeader>
      <StyledTitleContainer>
        <IoCalendarOutline size="28" />
        <h3>Calendar</h3>
      </StyledTitleContainer>

      <Filters
        filterOptions={filterOptions}
        onFilterChange={onFilterChange}
        races={races}
      />
    </StyledPageHeader>
  );
}
