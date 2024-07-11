import styles from "./EventItem.module.css";
import DateHeader from "../DateHeader/DateHeader";
import Btn from "../Btn/Btn";

export default function EventItem({ name, location, date }) {
  const flagClass = `fi fi-${location.countryCode.toLowerCase()}`;

  return (
    <li className={styles.item}>
      <DateHeader date={date} />

      <div className={styles.info}>
        <div className={styles.flagContainer}>
          <span className={flagClass}></span>
        </div>

        <div className={styles.infoText}>
          <span className={styles.location}>{location.circuit}</span>
          <span className={styles.name}>{name.type}</span>
          <span className={styles.category}>
            {name.category.map((c, index) => (
              <span key={index}>
                {c + (index < name.category.length - 1 ? " | " : "")}
              </span>
            ))}
          </span>
        </div>
      </div>

      <div className={styles.btnContainer}>
        <Btn color="rgb(0, 130, 260)">More Info</Btn>
        {/* <Btn color="rgb(0, 230, 180)">More Info</Btn> */}
      </div>
    </li>
  );
}
