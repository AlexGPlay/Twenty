import React from "react";
import Navbar from "../navbar/Navbar";
import styles from "./template.module.css";
import Chat from "../../chat/Chat";

const Template: React.FC<{}> = ({ children }) => {
  return (
    <>
      <Navbar
        containerClass={styles.contentContainer}
        contentClass={styles.content}
      />
      <div
        className={
          styles.contentContainer + " " + styles.contentContainerHeight
        }
      >
        <div className={styles.content}>{children}</div>
      </div>
      <Chat />
    </>
  );
};

export default Template;
