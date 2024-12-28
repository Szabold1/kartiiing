import { RacesProvider } from "./RacesContext";
import { CircuitsProvider } from "./CircuitsContext";
import { LocationProvider } from "./LocationContext";
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
      <LocationProvider>
        <CircuitsProvider
          filterKeys={circuitFilterKeys}
          defaultFilterValues={defaultCircuitFilterValues}
        >
          {children}
        </CircuitsProvider>
      </LocationProvider>
    </RacesProvider>
  );
}

export { DataProviders };
