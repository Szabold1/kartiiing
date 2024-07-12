import styled from "styled-components";

const Btn = styled.button`
  border: 2px solid ${({ theme }) => theme.colors.accent[0]};
  color: ${({ theme }) => theme.colors.accent[0]};
  background-color: ${({ theme }) => theme.colors.bg[1]};
  background-color: inherit;

  padding: 0.5rem 1rem;
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  font-size: 1rem;
  letter-spacing: -0.01rem;
  transition: transform 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text[1]};
    background-color: ${({ theme }) => theme.colors.accent[0]};
  }

  &:active {
    ${"" /* box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.1); */}
  }

  &:disabled,
  &:disabled:hover,
  &:disabled:active {
    cursor: not-allowed;
    opacity: 0.55;
    box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.1);
    transform: scale(1);
  }
`;

Btn.defaultProps = {
  color: `${({ theme }) => theme.colors.text[0]}`,
  bgColor: `${({ theme }) => theme.colors.bg[0]}`,
  borderColor: `${({ theme }) => theme.colors.bg[0]}`,
};

export default Btn;
