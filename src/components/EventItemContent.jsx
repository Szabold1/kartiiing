import styled from "styled-components";

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
`;

const FlagContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 2.3rem;

  & span {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 0.3rem;
    box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.1);
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > span:nth-child(1) {
    text-transform: uppercase;
    letter-spacing: 0.02rem;
  }

  > span:nth-child(2) {
    margin-top: 1rem;
    font-weight: 600;
    font-size: 1.25rem;
    text-align: center;
  }

  > span:nth-child(3) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    flex-wrap: wrap;

    letter-spacing: -0.01rem;
    line-height: 0.9;
    margin-top: 0.4rem;
  }
`;

export default function EventItemContent({ name, location }) {
  const flagClass = `fi fi-${location.countryCode.toLowerCase()}`;

  return (
    <StyledContent>
      <FlagContainer>
        <span className={flagClass}></span>
      </FlagContainer>

      <TextContainer>
        <span>{location.circuit}</span>
        <span>{name.type}</span>
        <span>
          {name.category.map((c, index) => (
            <span key={index}>
              {c + (index < name.category.length - 1 ? " | " : "")}
            </span>
          ))}
        </span>
      </TextContainer>
    </StyledContent>
  );
}
