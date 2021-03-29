import React from "react";

import styles from "./panel-submenu.module.css";

interface PanelSubmenuProps {
  title: string;
}

const PanelSubmenu: React.FC<PanelSubmenuProps> = ({ title, children }) => {
  return (
    <div className={styles.panelSubmenuContainer}>
      <span className={styles.title}>{title}</span>
      <hr />
      <div className={styles.childrenContainer}>{children}</div>
    </div>
  );
};

export default PanelSubmenu;
