import { useContext } from "react";
import { CircuitsContext } from "../contexts/CircuitsContext";

export default function useCircuits() {
  const context = useContext(CircuitsContext);
  if (context === undefined) {
    throw new Error("useCircuits must be used within a CircuitsProvider");
  }
  return context;
}
