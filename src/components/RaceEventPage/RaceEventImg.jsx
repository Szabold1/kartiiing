import styled from "styled-components";
import { useEffect, useState } from "react";
import StyledMessage from "../styled/StyledMessage";

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const StyledMsg = styled(StyledMessage)`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: ${({ theme }) => theme.name === "dark" && "brightness(0.7)"};
  transition: all 0.3s ease-in-out;
  visibility: ${({ $isLoaded }) => ($isLoaded ? "visible" : "hidden")};
  opacity: ${({ $isLoaded }) => ($isLoaded ? 1 : 0)};
`;

export default function RaceEventImg({ ...race }) {
  const { circuits, series, end_date } = race;
  const { latitude, longitude } = circuits;
  const [mapSrc, setMapSrc] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Get map image from mapbox API based on coordinates of the circuit
  useEffect(() => {
    const width = 1280;
    const height = 480;
    const mapStyle = "outdoors-v12";
    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

    if (latitude && longitude) {
      const adjustedLatitude = latitude + 0.3;
      const zoom = 5.5;
      const url = `https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/static/pin-s+FA3200(${longitude},${latitude})/${longitude},${adjustedLatitude},${zoom}/${width}x${height}@2x?access_token=${mapboxToken}`;
      setMapSrc(url);
    } else {
      const url = `https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/static/0,0,0/${width}x${height}@2x?access_token=${mapboxToken}`;
      setMapSrc(url);
    }
  }, [latitude, longitude]);

  return (
    <StyledContainer>
      {!isLoaded && <StyledMsg>Loading...</StyledMsg>}

      <StyledImg
        alt={"Map for " + series[0] + " " + end_date}
        src={mapSrc}
        onLoad={() => setIsLoaded(true)}
        $isLoaded={isLoaded}
      />
    </StyledContainer>
  );
}
