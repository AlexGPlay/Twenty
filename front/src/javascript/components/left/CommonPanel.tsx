import styles from "./left-panel.module.scss";

const CommonPanel = ({ children }) => {
  return <div className={styles.leftPanel}>{children}</div>;
};

export default CommonPanel;
