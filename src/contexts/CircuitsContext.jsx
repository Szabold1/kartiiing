import { createContext, useEffect, useState } from "react";
import { DataProvider } from "./DataContext";
import supabase from "../config/supabaseClient";
import {
  extractCircuitsFilterOptions,
  applyCircuitsFilters,
} from "../helpers/circuitsFilterHelpers";
import { calculateDistance } from "../helpers/locationHelpers";
import useLocation from "../hooks/useLocation";

// Context for circuits
const CircuitsContext = createContext();

// Provider for circuits
function CircuitsProvider({ children, filterKeys, defaultFilterValues }) {
  const [circuits, setCircuits] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const { userLocation } = useLocation();

  useEffect(() => {
    async function fetchAndEnrichCircuits() {
      setIsFetching(true);

      // Fetch circuits from Supabase
      const { data, error } = await supabase
        .from("circuits")
        .select(`*, countries (*)`);
      if (error) {
        console.error("Error fetching circuits:", error);
        setCircuits([]);
        setIsFetching(false);
        return;
      }

      // Add distances if user location is available
      const enrichedCircuits = userLocation
        ? data.map((circuit) => {
            const distanceKm = calculateDistance(
              userLocation.lat,
              userLocation.lon,
              circuit.latitude,
              circuit.longitude
            );
            return { ...circuit, distanceKm };
          })
        : data;

      setCircuits(enrichedCircuits);
      setIsFetching(false);
    }

    fetchAndEnrichCircuits();
  }, [userLocation]);

  return (
    <DataProvider
      type="circuits"
      context={CircuitsContext}
      data={circuits}
      isFetching={isFetching}
      extractFilterOptions={extractCircuitsFilterOptions}
      applyFilters={applyCircuitsFilters}
      filterKeys={filterKeys}
      defaultFilterValues={defaultFilterValues}
    >
      {children}
    </DataProvider>
  );
}

export { CircuitsContext, CircuitsProvider };
