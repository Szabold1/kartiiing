import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import CircuitItemContent from "@components/Circuits/CircuitItem/CircuitItemContent";

const StyledItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem;
  border-radius: 0.6rem;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg[2]};
  }
`;

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

const StyledNumData = styled.span`
  margin-left: auto;
`;

export default function CircuitItem({
  showLength = false,
  showDistance = false,
  distanceKm,
  circuit,
}) {
  const navigate = useNavigate();
  const { countries, length } = circuit;

  function handleClick() {
    const circuitName = circuit.circuit_name.toLowerCase().replaceAll(" ", "-");
    navigate(`/circuits/${circuitName}`);
  }

  return (
    <StyledItem onClick={handleClick}>
      <FlagContainer>
        <ReactCountryFlag
          countryCode={countries.code}
          svg
          style={{ height: "100%", width: "100%" }}
        />
      </FlagContainer>

      <CircuitItemContent circuit={circuit} />

      {showDistance && (
        <StyledNumData>
          {distanceKm ? distanceKm.toFixed(0) + " km" : "-"}
        </StyledNumData>
      )}

      {showLength && (
        <StyledNumData>{length ? length + " m" : "-"}</StyledNumData>
      )}
    </StyledItem>
  );
}
