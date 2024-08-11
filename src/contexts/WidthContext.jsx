import { createContext } from "react";

// Create a context with a default value
const WidthContext = createContext(0);

// Create a provider
function WidthProvider({ children, width }) {
  return (
    <WidthContext.Provider value={width}>{children}</WidthContext.Provider>
  );
}

export { WidthContext, WidthProvider };
