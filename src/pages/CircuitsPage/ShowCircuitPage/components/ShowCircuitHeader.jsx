import styled from "styled-components";
import ReactCountryFlag from "react-country-flag";
import MapImg from "@components/Map/MapImg";
import MapImgHeader from "@components/Map/MapImgHeader";

const FlagContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 1.6rem;
  height: max-content;

  & img {
    border-radius: 0.15rem;
    box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.1);
  }
`;

const StyledLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  font-size: 1.2rem;
  letter-spacing: 0.02rem;
  margin: 0.3rem 0 0.2rem 0;
`;

export default function ShowCircuitHeader({ circuit }) {
  const {
    circuit_name,
    location_name,
    countries: country,
    latitude,
    longitude,
  } = circuit;

  return (
    <MapImg
      latitude={latitude}
      longitude={longitude}
      locationSearchName={`${circuit_name}, ${location_name}`}
    >
      <MapImgHeader titleAsArray={[circuit_name]}>
        <StyledLocation>
          <FlagContainer>
            <ReactCountryFlag
              countryCode={country.code}
              svg
              style={{ height: "100%", width: "100%" }}
            />
          </FlagContainer>
          <span>
            {location_name}, {country.name}
          </span>
        </StyledLocation>
      </MapImgHeader>
    </MapImg>
  );
}
