import styled from "styled-components";

const StyledSubHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.accent[0]};

  span {
    border: 1px solid ${({ theme }) => theme.colors.accent[0]};
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
  }
`;

const StyledNbRaces = styled.div`
  margin-left: 0.5rem;
`;

export default function SubHeader({ filters, races }) {
  return (
    <StyledSubHeader>
      {Object.values(filters).map((filter) =>
        filter ? <span key={filter}>{filter}</span> : null
      )}
      <StyledNbRaces>
        {races.length === 1 ? "1 Race" : `${races.length} Races`}
      </StyledNbRaces>
    </StyledSubHeader>
  );
}
