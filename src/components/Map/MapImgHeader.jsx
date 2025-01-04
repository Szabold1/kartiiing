import styled from "styled-components";
import PageTitle from "@components/PageHeader/PageTitle";
import RenderArray from "@components/RenderArray";

const StyledHeader = styled.header`
  position: absolute;
  transform: translate(-50%, 0);
  top: 0%;
  left: 50%;
  width: 100%;
  max-width: 55rem;
  height: fit-content;
  background-color: rgba(0, 0, 0, 0.25);
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.2);
  padding: 0.7rem 1rem;
  backdrop-filter: blur(0.15rem);
  -webkit-backdrop-filter: blur(0.15rem);
  color: ${({ theme }) =>
    theme.name === "dark" ? "rgba(241,241,241,0.85)" : "rgb(248, 248, 248)"};

  @media screen and (min-width: 40rem) {
    padding: 1rem 2rem;
  }

  @media screen and (min-width: 55rem) {
    border-radius: 1rem;
    top: 1rem;
    padding: 1rem 1.6rem;
  }
`;

const StyledTitle = styled.h3`
  line-height: 1.25;

  .separator {
    color: ${({ theme }) => theme.colors.accent[1]};
  }
`;

export default function MapImgHeader({ titleAsArray = ["Title"], children }) {
  return (
    <StyledHeader>
      <PageTitle size={["1.6rem", "1.8rem"]}>
        <StyledTitle>
          <RenderArray array={titleAsArray} sort />
        </StyledTitle>
      </PageTitle>

      {children}
    </StyledHeader>
  );
}
