import styled from "styled-components";
import RaceEventImg from "./RaceEventImg";
import PageTitle from "../PageHeader/PageTitle";
import { renderArray } from "../../helpers/helpers";
import ReactCountryFlag from "react-country-flag";

const StyledContainer = styled.div`
  position: relative;
  height: 20rem;
  width: 100vw;
  background: linear-gradient(
    to bottom right,
    ${({ theme }) => theme.colors.bg[0]},
    ${({ theme }) => theme.colors.accent[2]} 50%
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

const StyledHeader = styled.header`
  position: absolute;
  transform: translate(-50%, 0);
  top: 0%;
  left: 50%;
  width: 100%;
  max-width: 55rem;
  height: fit-content;
  background-color: rgba(0, 0, 0, 0.25);
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.2);
  padding: 0.7rem 1rem;
  backdrop-filter: blur(0.15rem);
  -webkit-backdrop-filter: blur(0.15rem);
  color: ${({ theme }) =>
    theme.name === "dark" ? "rgba(241,241,241,0.85)" : "rgb(248, 248, 248)"};

  @media screen and (min-width: 40rem) {
    padding: 1rem 2rem;
  }

  @media screen and (min-width: 55rem) {
    border-radius: 1rem;
    top: 1rem;
    padding: 1rem 1.6rem;
  }
`;

const StyledTitle = styled.h3`
  .separator {
    color: ${({ theme }) => theme.colors.accent[1]};
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

const StyledLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  font-size: 1.2rem;
  letter-spacing: 0.02rem;
  margin: 0.3rem 0 0.2rem 0;
`;

export default function RaceEventHeader({ ...race }) {
  const { series, circuits } = race;

  return (
    <StyledContainer>
      <RaceEventImg {...race} />

      <StyledHeader>
        <PageTitle size={["1.6rem", "1.8rem"]}>
          <StyledTitle style={{ lineHeight: "1.25" }}>
            {renderArray(series, true)}
          </StyledTitle>
        </PageTitle>

        <StyledLocation>
          <FlagContainer>
            <ReactCountryFlag
              countryCode={circuits.countries.code}
              svg
              style={{ height: "100%", width: "100%" }}
            />
          </FlagContainer>
          <span>{circuits.short_name}</span>
        </StyledLocation>
      </StyledHeader>
    </StyledContainer>
  );
}
