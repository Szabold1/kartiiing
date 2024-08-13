import styled from "styled-components";
import PageTitle from "../PageHeader/PageTitle";
import { renderSortedArray } from "../../helpers/helpers";
import ReactCountryFlag from "react-country-flag";

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

export default function RaceEventHeader({ ...race }) {
  const { series, circuits } = race;

  return (
    <header style={{ marginBottom: "2.5rem" }}>
      <PageTitle size={["1.6rem", "1.8rem"]}>
        <StyledTitle style={{ lineHeight: "1.25" }}>
          {renderSortedArray(series)}
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
    </header>
  );
}
