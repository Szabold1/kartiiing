import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 2.6rem 1rem;
  max-width: 1400px;
  margin: 0 auto;

  @media screen and (min-width: 40rem) {
    padding: 2.6rem 2rem;
  }

  @media screen and (min-width: 50rem) {
    padding: 3.2rem 3rem;
  }

  @media screen and (min-width: 60rem) {
    padding: 3.2rem 3.6rem;
  }

  @media screen and (min-width: 70rem) {
    padding: 3.2rem 4.2rem;
  }
`;

export default StyledWrapper;
