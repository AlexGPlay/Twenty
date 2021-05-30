import React from "react";
import styles from "./emptyContainer.module.scss";

const EmptyContainer: React.FC<{ padding?: boolean }> = ({ children, padding = false }) => {
  return (
    <div className={styles.emptyContainer + " " + (padding ? "" : styles.withoutPadding)}>
      {children}
    </div>
  );
};

export default EmptyContainer;
