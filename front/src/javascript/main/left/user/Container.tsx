import React from "react";
import { Link } from "react-router-dom";
import EmptyContainer from "../../../components/left/emptyContainer/EmptyContainer";
import Loading from "../../../components/loading";
import Image from "../../../components/user/image/Image";
import { useMeQuery } from "../../../queries/useMeQuery";

import styles from "./container.module.scss";

const Container: React.FC<{}> = () => {
  const { isLoading, data } = useMeQuery();

  if (isLoading) {
    return <Loading />;
  }

  const { name, surname, visits }: { name: string; surname: string; visits: Number } = data.me;

  return (
    <EmptyContainer padding>
      <div className={styles.dataContainer}>
        <div>
          <Image src={data?.me?.profileImage || "/img/camera.png"} border />
        </div>
        <div>
          <Link to={"/profile/" + data.me.id} className={styles.username}>
            {name + " " + surname}
          </Link>
          <div className={styles.visitsContainer}>
            <img src="/img/visits.svg" className={styles.visitsImage} />
            <div className={styles.visitCountText}>
              <span className={styles.visitCount}>{visits.toLocaleString("es-ES")}</span> visitas a
              tu perfil
            </div>
          </div>
        </div>
      </div>
    </EmptyContainer>
  );
};

export default Container;
