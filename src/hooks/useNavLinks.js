import useCircuits from "./useCircuits";
import useRaces from "./useRaces";

export default function useNavLinks() {
  const { resetFilters: resetCircuitFilters } = useCircuits();
  const { resetFilters: resetRacesFilters } = useRaces();

  return [
    {
      path: "/calendar",
      label: "Calendar",
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
