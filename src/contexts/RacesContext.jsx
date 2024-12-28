import { createContext, useEffect, useState } from "react";
import { DataProvider } from "./DataContext";
import supabase from "../config/supabaseClient";
import {
  extractRacesFilterOptions,
  applyRacesFilters,
} from "../helpers/racesFilterHelpers";

// Context for races
const RacesContext = createContext();

// Provider for races
function RacesProvider({ children, filterKeys, defaultFilterValues }) {
  const [races, setRaces] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function fetchRaces() {
      setIsFetching(true);

      // Fetch races from Supabase
      const { data, error } = await supabase
        .from("races")
        .select(`*, circuits (*, countries (*))`);

      if (error) {
        console.error("Error fetching races:", error);
        setRaces([]);
        setIsFetching(false);
        return;
      }

      setRaces(data);
      setIsFetching(false);
    }

    fetchRaces();
  }, []);

  return (
    <DataProvider
      type="races"
      context={RacesContext}
      data={races}
      isFetching={isFetching}
      extractFilterOptions={extractRacesFilterOptions}
      applyFilters={applyRacesFilters}
      filterKeys={filterKeys}
      defaultFilterValues={defaultFilterValues}
    >
      {children}
    </DataProvider>
  );
}

export { RacesContext, RacesProvider };
