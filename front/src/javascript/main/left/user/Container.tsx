import React from "react";
import Loading from "../../../components/loading";
import Image from "../../../components/user/image/Image";
import { useMeQuery } from "../../../queries/useMeQuery";

import styles from "./container.module.scss";

const Container: React.FC<{}> = () => {
  const { isLoading, data } = useMeQuery("name", "surname", "visits");

  if (isLoading) {
    return <Loading />;
  }

  const {
    name,
    surname,
    visits,
  }: { name: string; surname: string; visits: Number } = data.me;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.dataContainer}>
        <div>
          <Image src="/img/camera.png" />
        </div>
        <div>
          <div className={styles.username}>{name + " " + surname}</div>
          <div className={styles.visitsContainer}>
            <img src="/img/visits.svg" className={styles.visitsImage} />
            <div className={styles.visitCountText}>
              <span className={styles.visitCount}>
                {visits.toLocaleString("es-ES")}
              </span>{" "}
              visitas a tu perfil
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
