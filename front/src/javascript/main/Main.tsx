import React from "react";
import LeftPanel from "./left/panel/LeftPanel";

import styles from "./main.module.css";

const Main: React.FC<{}> = () => {
  return (
    <div className={styles.main}>
      <LeftPanel />
      <div>B</div>
      <div>C</div>
    </div>
  );
};

export default Main;
