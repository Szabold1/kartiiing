import styled from "styled-components";
import { useEffect, useState } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import StyledMessage from "@components/styled/StyledMessage";
import { openGoogleMaps } from "@utils/location";
import useElementWidth from "@hooks/useElementWidth";
import { WidthProvider } from "@contexts/WidthContext";

const StyledWrapper = styled.div`
  position: relative;
  height: 20rem;
  width: 100vw;
  background: linear-gradient(
    to bottom right,
    ${({ theme }) => theme.colors.bg[0]},
    ${({ theme }) => theme.colors.bg[2]} 50%
  );

  @media screen and (min-width: 40rem) {
    height: 22rem;
  }

  @media screen and (min-width: 50rem) {
    height: 25rem;
  }

  @media screen and (min-width: 60rem) {
    height: 27rem;
  }

  @media screen and (min-width: 70rem) {
    height: 30rem;
  }
`;

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
  bottom: 0.5rem;
  left: 50%;
  transform: translate(-50%, 0);

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

  @media screen and (min-width: 55rem) {
    bottom: 2.25rem;
  }
`;

export default function MapImg({
  latitude,
  longitude,
  locationSearchName,
  children,
}) {
  const [mapSrc, setMapSrc] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, width: containerWidth } = useElementWidth();

  // Get map image from mapbox API based on coordinates of the circuit
  useEffect(() => {
    const width = containerWidth > 1200 ? 1200 : containerWidth;
    const height = 420;
    const mapStyle = import.meta.env.VITE_MAPBOX_STYLE;
    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
    const zoom = 6;

    if (latitude && longitude) {
      const adjustedLatitude = latitude + (width < 800 ? 0.46 : 0.37);
      const url = `https://api.mapbox.com/styles/v1/${mapStyle}/static/pin-s+FA3200(${longitude},${latitude})/${longitude},${adjustedLatitude},${zoom}/${width}x${height}@2x?access_token=${mapboxToken}`;
      setMapSrc(url);
    } else {
      const url = `https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/static/0,0,0/${width}x${height}@2x?access_token=${mapboxToken}`;
      setMapSrc(url);
    }
  }, [latitude, longitude, containerWidth]);

  return (
    <StyledWrapper>
      <WidthProvider width={containerWidth}>
        <StyledContainer ref={ref}>
          {!isLoaded && <StyledMsg>Loading...</StyledMsg>}

          <StyledImg
            alt={"Map for " + locationSearchName}
            src={mapSrc}
            onLoad={() => setIsLoaded(true)}
            $isLoaded={isLoaded}
          />

          <StyledMapBtn onClick={() => openGoogleMaps(locationSearchName)}>
            Google Maps
            <span style={{ marginRight: "-0.15rem", display: "flex" }}>
              <IoArrowForwardOutline />
            </span>
          </StyledMapBtn>
        </StyledContainer>
      </WidthProvider>

      {children}
    </StyledWrapper>
  );
}
