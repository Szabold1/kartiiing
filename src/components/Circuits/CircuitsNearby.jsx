import styled from "styled-components";
import { useState, useEffect } from "react";
import useCircuits from "../../hooks/useCircuits";
import Section from "../Section/Section";
import StyledMessage from "../styled/StyledMessage";
import CircuitItem from "./CircuitItem";

const StyledItems = styled.ol`
  max-height: 19.6rem; /* 1 item is 2.8rem */
  overflow-y: hidden;

  @media screen and (min-width: 67rem) {
    max-height: 42rem;
  }
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.accent[0]};
  padding: 0.6rem 0 0.5rem 0;
  text-align: center;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  margin-top: auto;

  &:hover {
    color: ${({ theme }) => theme.colors.accent[1]};
  }
`;

// Haversine formula to calculate distance between two coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

// Get location name from latitude and longitude
async function getLocationName(lat, lon) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    const response = await fetch(url);
    const data = await response.json();
    return (
      data.address.city ||
      data.address.town ||
      data.address.village ||
      data.address.county
    );
  } catch (e) {
    console.error("Error getting location name:", e);
  }
}

// Get coordinates and city name from IP
async function getLocationFromIP() {
  try {
    const response = await fetch("https://freeipapi.com/api/json");
    const data = await response.json();
    return {
      lat: data.latitude,
      lon: data.longitude,
      city: data.cityName,
    };
  } catch (e) {
    console.error("Error getting location from IP:", e);
  }
}

export default function CircuitsNearby() {
  const { fetchedData: circuits, isFetching } = useCircuits();
  const [userLocation, setUserLocation] = useState(null);
  const [locationName, setLocationName] = useState("nowhere");
  const [locationDenied, setLocationDenied] = useState(false);
  const [circuitsWithDistance, setCircuitsWithDistance] = useState([]);

  // Handle location fetching and updating
  useEffect(() => {
    if (navigator.geolocation) {
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
        },
        // if user denied location access, get location from IP
        async (error) => {
          console.error("Error getting location:", error);
          const ipLocation = await getLocationFromIP();
          if (ipLocation) {
            setUserLocation({ lat: ipLocation.lat, lon: ipLocation.lon });
            setLocationName(ipLocation.city);
          } else {
            setLocationDenied(true);
          }
        }
      );
    } else {
      setLocationDenied(true);
    }
  }, []);

  // Calculate the distance for each circuit
  useEffect(() => {
    if (userLocation && circuits.length > 0) {
      const circuitsWithDistances = circuits.map((circuit) => {
        const distanceKm = calculateDistance(
          userLocation.lat,
          userLocation.lon,
          circuit.latitude,
          circuit.longitude
        );
        return { ...circuit, distanceKm };
      });
      setCircuitsWithDistance(circuitsWithDistances);
    }
  }, [userLocation, circuits]);

  const sortedCircuits = locationDenied
    ? circuits
    : circuitsWithDistance
        .sort((a, b) => a.distanceKm - b.distanceKm)
        .slice(0, 15);

  return (
    <Section
      title={locationDenied ? "Circuits" : `Circuits near ${locationName}`}
      titleSize={"1.25rem"}
      stickyHeader={false}
    >
      {isFetching && (
        <StyledMessage style={{ margin: "8rem 0", fontSize: "1.25rem" }}>
          Loading...
        </StyledMessage>
      )}

      {!isFetching && (
        <StyledItems>
          {sortedCircuits?.map((circuit) => (
            <CircuitItem
              key={circuit.id}
              {...circuit}
              locationDenied={locationDenied}
            />
          ))}
        </StyledItems>
      )}

      <StyledLink onClick={() => console.log("View all")}>View all</StyledLink>
    </Section>
  );
}
