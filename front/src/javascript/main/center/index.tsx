import * as React from "react";
import Status from "./status";

import styles from "./center-content.module.css";
import News from "./news";

const CenterContent: React.FC<{}> = () => {
  return (
    <div className={styles.centerContent}>
      <Status />
      <News />
    </div>
  );
};

export default CenterContent;
