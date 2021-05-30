import React from "react";

import styles from "./category.module.scss";

interface CategoryProps {
  title: string;
  paddingRight?: boolean;
}

const Category: React.FC<CategoryProps> = ({ title, children, paddingRight = false }) => {
  return (
    <div className={styles.categoryContainer + " " + (paddingRight ? styles.paddingRight : "")}>
      <span className={styles.title}>{title}</span>
      <hr />
      <div className={styles.childrenContainer}>{children}</div>
    </div>
  );
};

export default Category;
