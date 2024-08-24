import { createContext } from "react";
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
  // Fetch races from Supabase and return data or error
  async function fetchRaces() {
    const { data, error } = await supabase
      .from("races")
      .select(`*, circuits (*, countries (*))`);
    if (error) return { error };
    return { data };
  }

  return (
    <DataProvider
      type="races"
      context={RacesContext}
      fetchData={fetchRaces}
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
