import React from "react";
import Invite from "../invite/Invite";
import Container from "../user/Container";
import styles from "./left-panel.module.css";

const LeftPanel: React.FC<{}> = () => {
  return (
    <div className={styles.leftPanel}>
      <Container />
      <Invite />
    </div>
  );
};

export default LeftPanel;
