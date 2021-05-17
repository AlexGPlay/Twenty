import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faCircle } from "@fortawesome/free-solid-svg-icons";

import styles from "./chat.module.css";

const Chat: React.FC<{}> = () => {
  return (
    <div className={styles.categoryContainer}>
      <div className={styles.headerContainer}>
        <span className={styles.title}>
          <FontAwesomeIcon icon={faCircle} className={styles.chatStatus} />
          Chat
        </span>
        <div className={styles.settings}>
          <FontAwesomeIcon icon={faCog} />
          Ajustes
        </div>
      </div>
      <div className={styles.chatContainer}></div>
    </div>
  );
};

export default Chat;
