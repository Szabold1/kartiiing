import useCircuits from "@hooks/useCircuits";
import StyledWrapper from "@components/styled/StyledWrapper";
import PageHeader from "@components/PageHeader/PageHeader";
import Filters from "@components/Filters/Filters";
import CircuitList from "@pages/CircuitsPage/components/CircuitList";
import { CircuitsContext } from "@contexts/CircuitsContext";

export default function CircuitsPage() {
  const { appliedFilters, data, filteredData, isFetching } = useCircuits();

  const introText = `Discover ${
    data.length || 0
  } karting circuits with key details, locations, and races hosted.`;

  return (
    <StyledWrapper>
      <PageHeader title="Circuits" introText={introText}>
        <Filters
          context={CircuitsContext}
          appliedFilters={appliedFilters}
          color="green"
        />
      </PageHeader>

      <CircuitList
        appliedFilters={appliedFilters}
        circuits={filteredData}
        isFetching={isFetching}
      />
    </StyledWrapper>
  );
}
