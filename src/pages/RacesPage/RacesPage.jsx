import useRaces from "@hooks/useRaces";
import StyledWrapper from "@components/styled/StyledWrapper";
import PageHeader from "@components/PageHeader/PageHeader";
import Filters from "@components/Filters/Filters";
import RaceList from "@pages/RacesPage/components/RaceList";
import { RacesContext } from "@contexts/RacesContext";

export default function RacesPage() {
  const { filterOptions, appliedFilters, data, groupedData, isFetching } =
    useRaces();

  const introText = `Explore our calendar with ${data.length || 0} races from ${
    filterOptions.years[0]
  } to ${filterOptions.years[filterOptions.years.length - 1]}, across ${
    filterOptions.championships.length || 0
  } championships in ${filterOptions.countries.length || 0} countries.`;

  return (
    <StyledWrapper>
      <PageHeader title="Races" introText={introText}>
        <Filters context={RacesContext} appliedFilters={appliedFilters} />
      </PageHeader>

      <RaceList groupedRaces={groupedData} isFetching={isFetching} />
    </StyledWrapper>
  );
}
