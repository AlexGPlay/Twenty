import React from "react";
import Calendar from "../calendar/Calendar";
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
      <Calendar />
    </div>
  );
};

export default LeftPanel;
