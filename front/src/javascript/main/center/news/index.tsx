import * as React from "react";

import styles from "./news.module.css";

const News: React.FC<{}> = () => {
  return (
    <div className={styles.news}>
      <label className={styles.newsLabel}>Novedades</label>
      <div className={styles.categories}>
        <div className={styles.active}>Amigos</div>
        <div>Páginas</div>
        <div>Sitios</div>
      </div>
    </div>
  );
};

export default News;
