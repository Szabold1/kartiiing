import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";
import SectionContent from "./SectionContent";

export default function Section({ children, title, titleSize = "1.5rem" }) {
  return (
    <SectionContainer>
      <SectionHeader title={title} fontSize={titleSize} />
      <SectionContent>{children}</SectionContent>
    </SectionContainer>
  );
}
