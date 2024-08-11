import styled from "styled-components";
import ReactCountryFlag from "react-country-flag";
import React, { useContext } from "react";
import { WidthContext } from "../../contexts/WidthContext";

const StyledContent = styled.div`
  display: flex;
  flex-direction: ${({ cWidth }) => (cWidth < 600 ? "column" : "row")};
  gap: ${({ cWidth }) => (cWidth < 600 ? "0.3rem" : "0.5rem")};
  width: 100%;

  .separator {
    color: ${({ theme }) => theme.colors.accent[0]};
  }
`;

const StyledRaceName = styled.h4`
  order: ${({ cWidth }) => (cWidth < 600 ? "1" : "2")};
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.04rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;

  > span {
    display: ${({ cWidth }) => (cWidth < 850 ? "none" : "flex")};
  }

  > span:first-of-type {
    display: flex;
  }
`;

const StyledLocation = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ cWidth }) => (cWidth < 600 ? "0.4rem" : "0.5rem")};
  order: ${({ cWidth }) => (cWidth < 600 ? "2" : "1")};
  font-size: ${({ cWidth }) => (cWidth < 600 ? "0.9rem" : "1rem")};

  > span {
    text-transform: uppercase;
    letter-spacing: 0.02rem;
  }
`;

const FlagContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  width: ${({ cWidth }) => (cWidth < 600 ? "1.2rem" : "1.6rem")};
  height: max-content;

  & img {
    border-radius: 0.15rem;
    box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.1);
  }
`;

const StyledCategories = styled.div`
  display: ${({ cWidth }) => (cWidth < 750 ? "none" : "flex")};
  align-items: center;
  gap: 0.3rem;
  order: 100;
  margin-left: auto;
  margin-right: 0.5rem;
`;

function renderSortedArray(arr) {
  if (!arr) return null;
  return (
    <>
      {arr.sort().map((item, index) => (
        <React.Fragment key={index}>
          <span>{item}</span>
          {index < arr.length - 1 ? <span className="separator">|</span> : ""}
        </React.Fragment>
      ))}
    </>
  );
}

export default function RaceItemContent({ ...race }) {
  const { circuits, series, engine_type } = race;
  const containerWidth = useContext(WidthContext);

  return (
    <StyledContent cWidth={containerWidth}>
      <StyledRaceName cWidth={containerWidth}>
        {renderSortedArray(series)}
      </StyledRaceName>

      <StyledLocation cWidth={containerWidth}>
        <FlagContainer cWidth={containerWidth}>
          <ReactCountryFlag
            countryCode={circuits.countries.code}
            svg
            style={{ height: "100%", width: "100%" }}
          />
        </FlagContainer>
        <span>{circuits.short_name}</span>
      </StyledLocation>

      <StyledCategories cWidth={containerWidth}>
        {renderSortedArray(engine_type)}
      </StyledCategories>
    </StyledContent>
  );
}
