import styled from "styled-components";
import SectionContainer from "@components/Section/SectionContainer";
import SectionHeader from "@components/Section/SectionHeader";
import SectionContent from "@components/Section/SectionContent";
import BtnDropdown from "@components/Btn/BtnDropdown";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.4rem;

  > :last-child {
    padding-right: 0.15rem;
  }
`;

export default function SectionWithDropdown({
  children,
  title,
  titleSize = "1.5rem",
  items = [],
  btnLabel,
  onItemSelect,
}) {
  return (
    <SectionContainer>
      <StyledHeader>
        <SectionHeader title={title} fontSize={titleSize} sticky={false} />
        <BtnDropdown
          items={items}
          onItemSelect={onItemSelect}
          buttonLabel={btnLabel}
        />
      </StyledHeader>
      <SectionContent>{children}</SectionContent>
    </SectionContainer>
  );
}
