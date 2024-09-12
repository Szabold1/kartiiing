import styled from "styled-components";
import { useEffect, useState } from "react";
import StyledMessage from "../styled/StyledMessage";
import { openGoogleMaps } from "../../helpers/mapHelpers";
import { IoArrowForwardOutline } from "react-icons/io5";
import useElementWidth from "../../hooks/useElementWidth";
import { WidthProvider } from "../../contexts/WidthContext";

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
  filter: ${({ theme }) =>
    theme.name === "dark" ? "brightness(0.6)" : "brightness(0.9)"};
  transition: all 0.3s ease-in-out;
  visibility: ${({ $isLoaded }) => ($isLoaded ? "visible" : "hidden")};
  opacity: ${({ $isLoaded }) => ($isLoaded ? 1 : 0)};
`;

const StyledMapBtn = styled.button`
  position: absolute;
  bottom: 2.25rem;
  right: 0.25rem;

  background-color: rgba(0, 0, 0, 0.25);
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.2);
  padding: 0.3rem 0.8rem;
  backdrop-filter: blur(0.15rem);
  -webkit-backdrop-filter: blur(0.15rem);
  color: ${({ theme }) =>
    theme.name === "dark" ? "rgba(241,241,241,0.85)" : "rgb(248, 248, 248)"};
  border: none;
  border-radius: 0.2rem;
  cursor: pointer;
  letter-spacing: -0.02rem;
  font-size: 0.85rem;

  display: flex;
  align-items: center;
  gap: 0.3rem;

  @media screen and (min-width: 70rem) {
    right: 0.5rem;
    bottom: 0.5rem;
  }
`;

export default function RaceEventImg({ ...race }) {
  const { circuits, series, end_date } = race;
  const { latitude, longitude } = circuits;
  const [mapSrc, setMapSrc] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, width: containerWidth } = useElementWidth();

  // Get map image from mapbox API based on coordinates of the circuit
  useEffect(() => {
    const width = containerWidth > 1200 ? 1200 : containerWidth;
    const height = 420;
    const mapStyle = "streets-v12";
    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

    if (latitude && longitude) {
      const adjustedLatitude = latitude + 0.4;
      const zoom = 6;
      const url = `https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/static/pin-s+FA3200(${longitude},${latitude})/${longitude},${adjustedLatitude},${zoom}/${width}x${height}@2x?access_token=${mapboxToken}`;
      setMapSrc(url);
    } else {
      const url = `https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/static/0,0,0/${width}x${height}@2x?access_token=${mapboxToken}`;
      setMapSrc(url);
    }
  }, [latitude, longitude, containerWidth]);

  return (
    <WidthProvider width={containerWidth}>
      <StyledContainer ref={ref}>
        {!isLoaded && <StyledMsg>Loading...</StyledMsg>}

        <StyledImg
          alt={"Map for " + series[0] + " " + end_date}
          src={mapSrc}
          onLoad={() => setIsLoaded(true)}
          $isLoaded={isLoaded}
        />

        <StyledMapBtn
          onClick={() =>
            openGoogleMaps(`${circuits.long_name}, ${circuits.countries.name}`)
          }
        >
          Google Maps
          <span style={{ marginRight: "-0.15rem", display: "flex" }}>
            <IoArrowForwardOutline />
          </span>
        </StyledMapBtn>
      </StyledContainer>
    </WidthProvider>
  );
}
