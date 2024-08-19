import styled from "styled-components";
import { IoCalendarOutline } from "react-icons/io5";
import useRaces from "../hooks/useRaces";
// PageHeader
import PageHeader from "../components/PageHeader/PageHeader";
import PageIntro from "../components/PageHeader/PageIntro";
import PageTitle from "../components/PageHeader/PageTitle";
import IntroText from "../components/PageHeader/IntroText";
import Filters from "../components/Filters/Filters";
// RaceList
import RaceList from "../components/Races/RaceList";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 2.6rem 1rem;
  max-width: 1400px;
  margin: 0 auto;

  @media screen and (min-width: 40rem) {
    padding: 2.6rem 2rem;
  }

  @media screen and (min-width: 50rem) {
    padding: 3.2rem 3rem;
  }

  @media screen and (min-width: 60rem) {
    padding: 3.2rem 3.6rem;
  }

  @media screen and (min-width: 70rem) {
    padding: 3.2rem 4.2rem;
  }
`;

export default function CalendarPage() {
  const { filterOptions, fetchedRaces } = useRaces();

  return (
    <StyledContainer>
      <PageHeader>
        <PageIntro>
          <PageTitle>
            <span style={{ paddingBottom: "0.15rem" }}>
              <IoCalendarOutline size="28" />
            </span>
            <h3>Calendar</h3>
          </PageTitle>

          <IntroText>
            Explore our calendar with {fetchedRaces.length || 0} races from{" "}
            {filterOptions.years[0]} to{" "}
            {filterOptions.years[filterOptions.years.length - 1]}, across{" "}
            {filterOptions.championships.length || 0} championships in{" "}
            {filterOptions.countries.length || 0} countries.
          </IntroText>
        </PageIntro>

        <Filters />
      </PageHeader>
      <RaceList />
    </StyledContainer>
  );
}
