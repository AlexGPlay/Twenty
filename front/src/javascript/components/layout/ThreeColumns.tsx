import styles from "./threeColumns.module.scss";

const ThreeColumns = ({ children }) => {
  return <div className={styles.threeColumns}>{children}</div>;
};

export default ThreeColumns;
