import React from "react";
import Image from "../../../components/user/image/Image";

import styles from "./container.module.css";

const Container: React.FC<{}> = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.dataContainer}>
        <div>
          <Image src="/img/camera.png" />
        </div>
        <div>
          <div className={styles.username}>Nombre y apellidos de prueba</div>
          <div className={styles.visitsContainer}>
            <img src="/img/visits.svg" className={styles.visitsImage} />
            <div className={styles.visitCountText}>
              <span className={styles.visitCount}>0</span> visitas a tu perfil
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
