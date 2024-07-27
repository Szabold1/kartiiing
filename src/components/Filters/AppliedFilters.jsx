import styled from "styled-components";

const StyledAppliedFilters = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  span {
    border: 1px solid ${({ theme }) => theme.colors.accent[0]};
    color: ${({ theme }) => theme.colors.accent[0]};
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
  }
`;

export default function AppliedFilters({ filters }) {
  return (
    <StyledAppliedFilters>
      {Object.values(filters).map((filter) =>
        filter ? <span key={filter}>{filter}</span> : null
      )}
    </StyledAppliedFilters>
  );
}
