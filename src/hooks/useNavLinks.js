import useCircuits from "@hooks/useCircuits";
import useRaces from "@hooks/useRaces";

export default function useNavLinks() {
  const { resetFilters: resetCircuitFilters } = useCircuits();
  const { resetFilters: resetRacesFilters } = useRaces();

  return [
    {
      path: "/",
      label: "Home",
      resetFilters: () => resetCircuitFilters("toDefault"),
    },
    {
      path: "/races",
      label: "Races",
      resetFilters: () => resetRacesFilters("toDefault"),
    },
    {
      path: "/circuits",
      label: "Circuits",
      resetFilters: () => resetCircuitFilters("toDefault"),
    },
    // { path: "/results", label: "Results" },
    // { path: "/engines-categories", label: "Engines & Categories" },
    // { path: "/championships", label: "Championships" },
    // { path: "/teams", label: "Teams" },
  ];
}
