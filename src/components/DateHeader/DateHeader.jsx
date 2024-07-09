import styles from "./DateHeader.module.css";

function formatDate(date) {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleDateString("en-US", { month: "short" });
  return { day, month };
}

export default function DateHeader({ date }) {
  const { day: dayStart, month: monthStart } = formatDate(date.start);
  const { day: dayEnd, month: monthEnd } = formatDate(date.end);

  return (
    <div className={styles.date}>
      <div className={styles.dateStart}>
        <span className={styles.month}>{monthStart}</span>
        <span className={styles.day}>{dayStart}</span>
      </div>

      <span className={styles.separator}>-</span>

      <div className={styles.dateEnd}>
        {monthStart !== monthEnd && (
          <span className={styles.month}>{monthEnd}</span>
        )}
        <span className={styles.day}>{dayEnd}</span>
      </div>
    </div>
  );
}
