import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useRaces from "@hooks/useRaces";
import Section from "@components/Section/Section";
import RaceItem from "@components/Races/RaceItem/RaceItem";
import StyledMessage from "@components/styled/StyledMessage";

const StyledLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.accent[0]};
  padding: 0.6rem 0 0.5rem 0;
  text-align: center;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.accent[1]};
  }
`;

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
        races?.map((race) => <RaceItem key={race.id} {...race} />)}

      <StyledLink onClick={() => handleViewAllClick(title)}>
        View all
      </StyledLink>
    </Section>
  );
}
