import React from "react";

import styles from "./category.module.scss";

interface CategoryProps {
  title: string;
}

const Category: React.FC<CategoryProps> = ({ title, children }) => {
  return (
    <div className={styles.categoryContainer}>
      <span className={styles.title}>{title}</span>
      <hr />
      <div className={styles.childrenContainer}>{children}</div>
    </div>
  );
};

export default Category;
