import { createContext } from "react";
import { DataProvider } from "./DataContext";
import supabase from "../config/supabaseClient";
import {
  extractCircuitsFilterOptions,
  applyCircuitsFilters,
} from "../helpers/circuitsFilterHelpers";

// Context for circuits
const CircuitsContext = createContext();

// Provider for circuits
function CircuitsProvider({ children, filterKeys, defaultFilterValues }) {
  // Fetch circuits from Supabase and return data or error
  async function fetchCircuits() {
    const { data, error } = await supabase
      .from("circuits")
      .select(`*, countries (*)`);
    if (error) return { error };
    return { data };
  }

  return (
    <DataProvider
      type="circuits"
      context={CircuitsContext}
      fetchData={fetchCircuits}
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
