import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";
import SectionContent from "./SectionContent";

export default function Section({
  children,
  title,
  titleSize = "1.5rem",
  stickyHeader = true,
  color = "blue",
}) {
  return (
    <SectionContainer>
      <SectionHeader title={title} fontSize={titleSize} sticky={stickyHeader} />
      <SectionContent color={color}>{children}</SectionContent>
    </SectionContainer>
  );
}
