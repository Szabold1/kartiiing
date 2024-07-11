import styles from "./DateHeader.module.css";

function formatDate(date) {
  if (!date) return { day: null, month: null };

  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleDateString("en-US", { month: "short" });

  return { day, month };
}

export default function DateHeader({ date }) {
  const { day: dayStart, month: monthStart } = formatDate(date?.start);
  const { day: dayEnd, month: monthEnd } = formatDate(date?.end);

  if (!date) {
    return (
      <div className={styles.date}>
        <span className={styles.day}>TBD</span>
      </div>
    );
  }

  return (
    <div className={styles.date}>
      {dayStart && monthStart && (
        <div className={styles.dateStart}>
          <span className={styles.month}>{monthStart}</span>
          <span className={styles.day}>{dayStart}</span>
        </div>
      )}

      {dayStart && dayEnd && <span className={styles.separator}>-</span>}

      {dayEnd && monthEnd && (
        <div className={styles.dateEnd}>
          {monthStart !== monthEnd && (
            <span className={styles.month}>{monthEnd}</span>
          )}
          <span className={styles.day}>{dayEnd}</span>
        </div>
      )}
    </div>
  );
}
