import React from "react";
import Events from "../events/events";
import Invite from "../invite/Invite";
import Container from "../user/Container";
import styles from "./left-panel.module.scss";

const LeftPanel: React.FC<{}> = () => {
  return (
    <div className={styles.leftPanel}>
      <Container />
      <Invite />
      <Events />
    </div>
  );
};

export default LeftPanel;
