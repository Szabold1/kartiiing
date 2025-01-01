import useCircuits from "../hooks/useCircuits";
import StyledWrapper from "../components/styled/StyledWrapper";
// PageHeader
import PageHeader from "../components/PageHeader/PageHeader";
import PageIntro from "../components/PageHeader/PageIntro";
import PageTitle from "../components/PageHeader/PageTitle";
import IntroText from "../components/PageHeader/IntroText";
import Filters from "../components/Filters/Filters";
// CircuitList
import CircuitList from "../components/Circuits/CircuitList";
import { CircuitsContext } from "../contexts/CircuitsContext";

export default function CircuitsPage() {
  const { appliedFilters, data, filteredData, isFetching } = useCircuits();
  return (
    <StyledWrapper>
      <PageHeader>
        <PageIntro>
          <PageTitle>
            <h3>Circuits</h3>
          </PageTitle>

          <IntroText>
            Discover {data.length || 0} karting circuits with key details,
            locations, and races hosted.
          </IntroText>
        </PageIntro>

        <Filters context={CircuitsContext} appliedFilters={appliedFilters} />
      </PageHeader>

      <CircuitList
        appliedFilters={appliedFilters}
        circuits={filteredData}
        isFetching={isFetching}
      />
    </StyledWrapper>
  );
}
