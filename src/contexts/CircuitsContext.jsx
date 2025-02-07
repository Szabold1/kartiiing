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

      // For each circuit, add the distances to all other circuits and the distance to the user
      const enrichedCircuits = data.map((circuitA) => {
        const distances = data
          .filter((circuitB) => circuitA.id !== circuitB.id)
          .map((circuitB) => {
            if (circuitA.id === circuitB.id) return {};

            const id = circuitB.id;
            const distanceKm = calculateDistance(
              circuitA.latitude,
              circuitA.longitude,
              circuitB.latitude,
              circuitB.longitude
            );

            return { id, distanceKm };
          })
          .sort((a, b) => a.distanceKm - b.distanceKm);

        const distanceKm = calculateDistance(
          userLocation?.lat,
          userLocation?.lon,
          circuitA.latitude,
          circuitA.longitude
        );

        return { ...circuitA, distanceKm, distancesToOtherCircuits: distances };
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
