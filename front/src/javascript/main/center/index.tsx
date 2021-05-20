import * as React from "react";
import { useQueryParams } from "../../util/hooks/useQueryParams";
import Status from "./status";

import styles from "./center-content.module.scss";
import News from "./news";
import MobileChat from "../../chat/MobileChat";

const CenterContent: React.FC<{}> = () => {
  const params = useQueryParams();

  return (
    <div className={styles.centerContent}>
      {params.get("chat") && <MobileChat />}
      <Status />
      <News />
    </div>
  );
};

export default CenterContent;
