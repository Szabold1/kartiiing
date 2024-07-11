import styles from "./Btn.module.css";

export default function Btn({
  children,
  color = "rgb(30, 30, 30)",
  bgColor = "inherit",
}) {
  const btnStyles = {
    backgroundColor: bgColor,
    color: color,
    border: `1px solid ${color}`,
  };

  return (
    <button className={styles.btn} style={btnStyles}>
      {children}
    </button>
  );
}
