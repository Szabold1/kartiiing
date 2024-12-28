import { createContext, useEffect, useState } from "react";
import { getLocationName } from "../helpers/locationHelpers";

// Create a context
const LocationContext = createContext();

// Create a provider
function LocationProvider({ children }) {
  const [userLocation, setUserLocation] = useState(null);
  const [locationName, setLocationName] = useState("nowhere");
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

  // Set default location if user denies location access
  useEffect(() => {
    if (locationDenied) {
      const defaultLocation = { lat: 45.4593, lon: 10.4865 }; // Lonato del Garda
      setUserLocation(defaultLocation);
      setLocationName("Lonato del Garda");
    }
  }, [locationDenied]);

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
