import { RacesProvider } from "./RacesContext";
import { CircuitsProvider } from "./CircuitsContext";
import {
  raceFilterKeys,
  defaultRaceFilterValues,
  circuitFilterKeys,
  defaultCircuitFilterValues,
} from "../data";

// Provider for both races and circuits
function DataProviders({ children }) {
  return (
    <RacesProvider
      filterKeys={raceFilterKeys}
      defaultFilterValues={defaultRaceFilterValues}
    >
      <CircuitsProvider
        filterKeys={circuitFilterKeys}
        defaultFilterValues={defaultCircuitFilterValues}
      >
        {children}
      </CircuitsProvider>
    </RacesProvider>
  );
}

export { DataProviders };
