import { useContext } from "react";
import { RacesContext } from "../contexts/RacesContext";

export default function useRaces() {
  const context = useContext(RacesContext);
  if (context === undefined) {
    throw new Error("useRaces must be used within a RacesProvider");
  }
  return context;
}
