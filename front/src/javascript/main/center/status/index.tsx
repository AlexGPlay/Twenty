import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/button/twenty/Button";

import styles from "./status.module.scss";

const Status: React.FC<{}> = () => {
  return (
    <div className={styles.editStatusContainer}>
      <div className={styles.divContainer}>
        <div className={styles.triangleContainer}>
          <div className={styles.triangle}></div>
        </div>
        <div className={styles.statusContainer}>
          <FontAwesomeIcon icon={faPencilAlt} />
          <input className={styles.input} placeholder="Actualiza tu estado" />
        </div>
      </div>
      <div className={styles.updateTextContainer}>
        <div className={styles.updateText}>
          Última actualización:
          <span className={styles.lastUpdate}>Jejejejeje</span>
        </div>
        <div className={styles.buttonContainer}>
          <Button text="Guardar" buttonType="dark" />
        </div>
      </div>
    </div>
  );
};

export default Status;
