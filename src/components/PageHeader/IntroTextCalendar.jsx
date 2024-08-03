import styled from "styled-components";

const StyledIntroTextCalendar = styled.p`
  font-size: 1.2rem;
  line-height: 1.7rem;
  letter-spacing: 0.04rem;
  text-align: center;
`;

export default function IntroTextCalendar({ races, filterOptions }) {
  return (
    <StyledIntroTextCalendar>
      Explore our calendar with {races.length || 0} races from{" "}
      {filterOptions.years[filterOptions.years.length - 1]} to{" "}
      {filterOptions.years[0]}, across {filterOptions.championships.length || 0}{" "}
      championships in {filterOptions.countries.length || 0} countries.
    </StyledIntroTextCalendar>
  );
}
