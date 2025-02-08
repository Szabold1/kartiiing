import styled from "styled-components";

const StyledSummaryItem = styled.div`
  display: grid;
  grid-template-columns: 2rem 1fr;
  align-items: center;
  padding: 0rem 0.7rem;
  font-size: 1.05rem;

  &:first-child {
    margin-top: 0.2rem;
  }

  &:last-child {
    margin-bottom: 0.3rem;
  }
`;

const StyledIconContainer = styled.span`
  color: ${({ theme, $color }) => theme.colors[$color][0]};
`;

const StyledSummaryText = styled.span`
  display: flex;
  gap: 0.3rem;
  flex-wrap: wrap;
  line-height: 1.05;
  padding: 0.55rem 0;
  width: fit-content;
  cursor: ${({ $onClick }) => ($onClick ? "pointer" : "text")};

  &:hover {
    color: ${({ $onClick, theme, $color }) =>
      $onClick ? theme.colors[$color][0] : theme.colors.text[0]};
  }
`;

export default function SummaryItem({
  icon: Icon,
  onClick,
  color = "blue",
  children,
}) {
  return (
    <StyledSummaryItem>
      {Icon && (
        <StyledIconContainer $color={color}>
          <Icon size={22} />
        </StyledIconContainer>
      )}

      <StyledSummaryText $onClick={onClick} onClick={onClick} $color={color}>
        {children}
      </StyledSummaryText>
    </StyledSummaryItem>
  );
}
