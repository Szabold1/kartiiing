import styled from "styled-components";

const StyledPageTitle = styled.div`
  display: flex;
  gap: 0.5rem;

  > h3 {
    font-size: ${({ $size }) => $size[0]};
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.04rem;
    display: flex;
    gap: 0 0.5rem;
    flex-wrap: wrap;
  }

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media screen and (min-width: 70rem) {
    > h3 {
      font-size: ${({ $size }) => $size[1]};
    }
  }
`;

export default function PageTitle({ children, size = ["2rem", "2.2rem"] }) {
  return <StyledPageTitle $size={size}>{children}</StyledPageTitle>;
}
