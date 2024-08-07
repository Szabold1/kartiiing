import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";

export default function useFetchRaces() {
  const [races, setRaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRaces() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("races")
        .select(`*, circuits (*, countries (*))`);
      if (error) {
        console.error("Error fetching races", error);
      } else {
        console.log("Races fetched successfully", data);
        setRaces(data);
      }
      setIsLoading(false);
    }
    fetchRaces();
  }, []);

  return { races, isLoading };
}
