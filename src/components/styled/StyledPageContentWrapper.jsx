import styled from "styled-components";

const StyledPageContentWrapper = styled.div`
  max-width: 55rem;
  margin: 0 auto;
  margin-top: 0;
  margin-bottom: 2rem;
  padding: 1.3rem 1rem;
  background-color: ${({ theme }) =>
    theme.name === "dark" ? "rgb(0, 17, 27)" : "rgb(240, 244, 244)"};
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.2);
  position: relative;

  @media screen and (min-width: 50rem) {
    padding: 1.6rem;
  }
  @media screen and (min-width: 55rem) {
    margin-top: -2rem;
    border-radius: 1.2rem;
  }
`;

export default StyledPageContentWrapper;
