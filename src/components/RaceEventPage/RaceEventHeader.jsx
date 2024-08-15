import styled from "styled-components";
import PageTitle from "../PageHeader/PageTitle";
import { renderArray } from "../../helpers/helpers";
import ReactCountryFlag from "react-country-flag";

const StyledHeader = styled.header`
  position: relative;
  margin-bottom: 2.6rem;

  @media screen and (min-width: 50rem) {
    margin-bottom: 3.2rem;
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
  margin-top: 0.3rem;
`;

const StyledLive = styled.div`
  z-index: 2;
  position: absolute;
  top: -1.7rem;
  left: 0;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.02rem;
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.colors.live[0]};
  padding: 0.3rem 0.4rem;
  border-radius: 0.3rem;
  color: ${({ theme }) => theme.colors.text[1]};

  @media screen and (min-width: 70rem) {
    top: -1.9rem;
  }
`;

export default function RaceEventHeader({ ...race }) {
  const { series, circuits, status } = race;

  return (
    <StyledHeader>
      {status === "ongoing" && <StyledLive>live</StyledLive>}

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
  );
}
