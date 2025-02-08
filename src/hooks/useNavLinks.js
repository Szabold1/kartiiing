import useCircuits from "@hooks/useCircuits";
import useRaces from "@hooks/useRaces";

export default function useNavLinks() {
  const { resetFilters: resetCircuitFilters } = useCircuits();
  const { resetFilters: resetRacesFilters } = useRaces();

  return [
    {
      path: "/",
      label: "Home",
      color: "gray",
      resetFilters: () => resetCircuitFilters("toDefault"),
    },
    {
      path: "/races",
      label: "Races",
      color: "blue",
      resetFilters: () => resetRacesFilters("toDefault"),
    },
    {
      path: "/circuits",
      label: "Circuits",
      color: "green",
      resetFilters: () => resetCircuitFilters("toDefault"),
    },
    // { path: "/results", label: "Results" },
    // { path: "/engines-categories", label: "Engines & Categories" },
    // { path: "/championships", label: "Championships" },
    // { path: "/teams", label: "Teams" },
  ];
}
