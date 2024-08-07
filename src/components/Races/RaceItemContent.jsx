import styled from "styled-components";
import ReactCountryFlag from "react-country-flag";
import React from "react";

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  @media screen and (min-width: 70rem) {
    flex-direction: row;
    flex-grow: 1;
    justify-content: flex-start;
    gap: 0.6rem;
  }
`;

const FlagContainer = styled.div`
  width: 3.2rem;

  & img {
    border-radius: 0.3rem;
    box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.1);
  }

  @media screen and (min-width: 70rem) {
    width: 2rem;

    & img {
      border-radius: 0.2rem;
    }
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  > div:nth-child(1) {
    text-transform: uppercase;
    letter-spacing: 0.02rem;
  }

  > div:nth-child(2),
  div:nth-child(3) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    flex-wrap: wrap;
    letter-spacing: -0.01rem;
    line-height: 0.9;
  }

  > div:nth-child(2) {
    margin-top: 1rem;
    font-weight: 500;
    font-size: 1.2rem;
  }

  > div:nth-child(3) {
    margin-top: 0.5rem;
  }

  @media screen and (min-width: 70rem) {
    flex-direction: row;
    flex-grow: 1;
    gap: 0.6rem;
    text-align: left;
    font-size: 1rem;

    > div:nth-child(2),
    div:nth-child(3) {
      margin-top: 0;
    }

    > div:nth-child(3) {
      margin-left: auto;
    }
  }
`;

function renderSortedArray(arr) {
  if (!arr) return null;
  return (
    <div>
      {arr.sort().map((item, index) => (
        <React.Fragment key={index}>
          <span>{item}</span>
          {index < arr.length - 1 ? <span>|</span> : ""}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function RaceItemContent({ location, name, engine_type }) {
  return (
    <StyledContent>
      <FlagContainer>
        <ReactCountryFlag
          countryCode={location.countries.code}
          svg
          style={{ height: "100%", width: "100%" }}
        />
      </FlagContainer>

      <TextContainer>
        <div>{location.short_name}</div>
        {renderSortedArray(name)}
        {renderSortedArray(engine_type)}
      </TextContainer>
    </StyledContent>
  );
}
