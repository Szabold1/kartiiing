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

  function kmToMiles(km) {
    return (km * 0.621371).toFixed(2);
  }

  return (
    <Section title="Summary" titleSize="1.25rem" stickyHeader={false}>
      <SummaryItem
        icon={IoLocationOutline}
        onClick={() => openGoogleMaps(`${circuit_name}, ${country.name}`)}
      >
        <span>{circuit_name} -</span> {location_name}, {country.name}
      </SummaryItem>

      {length && (
        <SummaryItem icon={BiRuler}>
          {length} meters ({kmToMiles(length / 1000)} miles)
        </SummaryItem>
      )}

      {website_link && (
        <SummaryItem
          icon={AiOutlineGlobal}
          onClick={() => window.open(website_link)}
        >
          Website
        </SummaryItem>
      )}
    </Section>
  );
}
