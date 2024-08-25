import { IoCalendarOutline } from "react-icons/io5";
import useRaces from "../hooks/useRaces";
import StyledWrapper from "../components/styled/StyledWrapper";
// PageHeader
import PageHeader from "../components/PageHeader/PageHeader";
import PageIntro from "../components/PageHeader/PageIntro";
import PageTitle from "../components/PageHeader/PageTitle";
import IntroText from "../components/PageHeader/IntroText";
import Filters from "../components/Filters/Filters";
// RaceList
import RaceList from "../components/Races/RaceList";
import { RacesContext } from "../contexts/RacesContext";

export default function CalendarPage() {
  const { filterOptions, fetchedData: races } = useRaces();

  return (
    <StyledWrapper>
      <PageHeader>
        <PageIntro>
          <PageTitle>
            <span style={{ paddingBottom: "0.15rem" }}>
              <IoCalendarOutline size="28" />
            </span>
            <h3>Calendar</h3>
          </PageTitle>

          <IntroText>
            Explore our calendar with {races.length || 0} races from{" "}
            {filterOptions.years[0]} to{" "}
            {filterOptions.years[filterOptions.years.length - 1]}, across{" "}
            {filterOptions.championships.length || 0} championships in{" "}
            {filterOptions.countries.length || 0} countries.
          </IntroText>
        </PageIntro>

        <Filters context={RacesContext} />
      </PageHeader>
      <RaceList />
    </StyledWrapper>
  );
}
