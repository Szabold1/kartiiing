import styled from "styled-components";
import ReactCountryFlag from "react-country-flag";

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

const StyledName = styled.h4`
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.03rem;
`;

const StyledDistance = styled.span`
  margin-left: auto;
`;

export default function CircuitItem({ locationDenied, ...circuit }) {
  const { short_name, countries, distanceKm } = circuit;

  return (
    <StyledItem>
      <FlagContainer>
        <ReactCountryFlag
          countryCode={countries.code}
          svg
          style={{ height: "100%", width: "100%" }}
        />
      </FlagContainer>

      <StyledName>{short_name}</StyledName>

      <StyledDistance>
        {locationDenied ? "N/A" : distanceKm.toFixed(0)} km
      </StyledDistance>
    </StyledItem>
  );
}
