import { AiOutlineGlobal } from "react-icons/ai";
import { BiRuler } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { openGoogleMaps } from "@utils/location";
import Section from "@components/Section/Section";
import SummaryItem from "@components/General/SummaryItem";

export default function ShowCircuitSummary({ circuit }) {
  const {
    length,
    website_link,
    location_name,
    circuit_name,
    countries: country,
  } = circuit;
  const color = "green";

  function kmToMiles(km) {
    return (km * 0.621371).toFixed(2);
  }

  return (
    <Section
      title="Summary"
      titleSize="1.25rem"
      stickyHeader={false}
      color={color}
    >
      <SummaryItem
        icon={IoLocationOutline}
        onClick={() => openGoogleMaps(`${circuit_name}, ${country.name}`)}
        color={color}
      >
        <span>{circuit_name} -</span> {location_name}, {country.name}
      </SummaryItem>

      {length && (
        <SummaryItem icon={BiRuler} color={color}>
          {length} meters ({kmToMiles(length / 1000)} miles)
        </SummaryItem>
      )}

      {website_link && (
        <SummaryItem
          icon={AiOutlineGlobal}
          onClick={() => window.open(website_link)}
          color={color}
        >
          Website
        </SummaryItem>
      )}
    </Section>
  );
}
