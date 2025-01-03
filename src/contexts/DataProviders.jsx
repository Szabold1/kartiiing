import { RacesProvider } from "@contexts/RacesContext";
import { CircuitsProvider } from "@contexts/CircuitsContext";
import { LocationProvider } from "@contexts/LocationContext";
import data from "@data/index";

// Provider for races, circuits and locations
function DataProviders({ children }) {
  return (
    <RacesProvider
      filterKeys={data.races.filterKeys}
      defaultFilterValues={data.races.defaultValues}
    >
      <LocationProvider>
        <CircuitsProvider
          filterKeys={data.circuits.filterKeys}
          defaultFilterValues={data.circuits.defaultValues}
        >
          {children}
        </CircuitsProvider>
      </LocationProvider>
    </RacesProvider>
  );
}

export { DataProviders };
