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

export default function Calendar() {
  const { filterOptions, fetchedRaces } = useRaces();

  return (
    <>
      <PageHeader>
        <PageIntro>
          <PageTitle>
            <IoCalendarOutline size="28" />
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
    </>
  );
}
