import { eventsData } from "../../data";
import EventItem from "../EventItem/EventItem";
import styles from "./EventList.module.css";

// flatten data then return an array where data is ordered by date
function prepareData(data) {
  let flatData = Object.values(data).flat();

  flatData
    .sort((a, b) => {
      return new Date(a.date?.start) - new Date(b.date?.start);
    })
    .forEach((item, index) => {
      item.id = index + 1;
    });

  return flatData;
}

export default function EventList() {
  const allData = prepareData(eventsData);

  return (
    <ol className={styles.items}>
      {allData.map((data) => (
        <EventItem key={data.id} {...data} />
      ))}
    </ol>
  );
}
