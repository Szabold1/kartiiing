import { createContext, useEffect, useState } from "react";
import { getLocationName } from "../helpers/locationHelpers";

// Create a context
const LocationContext = createContext();

// Create a provider
function LocationProvider({ children }) {
  const [userLocation, setUserLocation] = useState({
    lat: import.meta.env.VITE_LOCATION_DEFAULT_LATITUDE || 45.4593,
    lon: import.meta.env.VITE_LOCATION_DEFAULT_LONGITUDE || 10.4865,
  });
  const [locationName, setLocationName] = useState(
    import.meta.env.VITE_LOCATION_DEFAULT_NAME || "Lonato del Garda"
  );
  const [locationDenied, setLocationDenied] = useState(true);

  // Handle location fetching and updating
  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported");
      setLocationDenied(true);
      return;
    }

    // Get user location from browser
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };

        const name = await getLocationName(newLocation.lat, newLocation.lon);
        setUserLocation(newLocation);
        setLocationName(name);
        setLocationDenied(false);
      },
      (error) => {
        console.warn("User location denied:", error);
        setLocationDenied(true);
      }
    );
  }, []);

  return (
    <LocationContext.Provider
      value={{
        locationName,
        userLocation,
        locationDenied,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export { LocationContext, LocationProvider };
