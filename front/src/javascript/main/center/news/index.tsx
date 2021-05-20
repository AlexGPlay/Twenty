import * as React from "react";

import styles from "./news.module.scss";

const News: React.FC<{}> = () => {
  return (
    <div className={styles.news}>
      <label className={styles.newsLabel}>Novedades de tus amigos</label>
    </div>
  );
};

export default News;
