import { useNavigate } from "react-router-dom";
import useRaces from "@hooks/useRaces";
import Section from "@components/Section/Section";
import RaceItem from "@components/Races/RaceItem/RaceItem";
import StyledMessage from "@components/styled/StyledMessage";
import StyledLink from "@components/styled/StyledLink";

export default function RaceOverviewSection({ title, races }) {
  const { isFetching, resetFilters, handleFilterChange } = useRaces();
  const navigate = useNavigate();

  function handleViewAllClick(racesType) {
    if (racesType.toLowerCase().includes("upcoming")) {
      resetFilters();
      handleFilterChange("status", ["Upcoming"]);
      handleFilterChange("sorting", ["Date ascending"]);
    } else if (racesType.toLowerCase().includes("recent")) {
      resetFilters();
      handleFilterChange("status", ["Finished"]);
      handleFilterChange("sorting", ["Date descending"]);
    }

    navigate("/races");
  }

  return (
    <Section title={title} titleSize={"1.25rem"} stickyHeader={false}>
      {isFetching && (
        <StyledMessage style={{ margin: "8rem 0", fontSize: "1.25rem" }}>
          Loading...
        </StyledMessage>
      )}

      {!isFetching &&
        races?.map((race) => <RaceItem key={race.id} race={race} />)}

      <StyledLink onClick={() => handleViewAllClick(title)}>
        View all
      </StyledLink>
    </Section>
  );
}
