import React from "react";

import CenterContent from "./center";
import LeftPanel from "./left/panel/LeftPanel";

import styles from "./main.module.scss";
import RightContent from "./right";

const Main: React.FC<{}> = () => {
  return (
    <div className={styles.main}>
      <LeftPanel />
      <CenterContent />
      <RightContent />
    </div>
  );
};

export default Main;
