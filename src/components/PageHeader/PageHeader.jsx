import styled from "styled-components";
import PageIntro from "@components/PageHeader/PageIntro";
import PageTitle from "@components/PageHeader/PageTitle";
import IntroText from "@components/PageHeader/IntroText";

const StyledPageHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1.6rem;
  color: ${({ theme }) => theme.colors.text[0]};
`;

export default function PageHeader({ title, introText, children }) {
  return (
    <StyledPageHeader>
      <PageIntro>
        <PageTitle>
          <h3>{title}</h3>
        </PageTitle>

        <IntroText>{introText}</IntroText>
      </PageIntro>

      {children}
    </StyledPageHeader>
  );
}
