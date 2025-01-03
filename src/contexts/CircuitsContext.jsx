import { createContext, useEffect, useState } from "react";
import supabase from "@config/supabaseClient";
import { DataProvider } from "@contexts/DataContext";
import useLocation from "@hooks/useLocation";
import { calculateDistance } from "@utils/location";
import {
  extractCircuitsFilterOptions,
  applyCircuitsFilters,
} from "@utils/circuitsFilter";

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

      // Add distances to circuits
      const enrichedCircuits = data.map((circuit) => {
        const distanceKm = calculateDistance(
          userLocation?.lat,
          userLocation?.lon,
          circuit.latitude,
          circuit.longitude
        );
        return { ...circuit, distanceKm };
      });

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
