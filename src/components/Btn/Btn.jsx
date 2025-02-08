import styled from "styled-components";

const StyledBtn = styled.button`
  border: 1.5px solid ${({ $color, theme }) => theme.colors[$color][0]};
  color: ${({ $color, theme }) => theme.colors[$color][0]};
  background-color: ${({ theme }) => theme.colors.bg[1]};

  padding: 0.5rem 0.9rem;
  min-width: max-content;
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  font-size: 1rem;
  letter-spacing: 0.02rem;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  font-weight: 500;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  &:hover {
    color: ${({ theme }) => theme.colors.text[1]};
    background-color: ${({ $color, theme }) => theme.colors[$color][0]};
  }

  &:disabled,
  &:disabled:hover,
  &:disabled:active {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;

export default function Btn({ children, onClick, color = "blue" }) {
  return (
    <StyledBtn $color={color} onClick={onClick}>
      {children}
    </StyledBtn>
  );
}
