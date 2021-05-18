import React from "react";
import Category from "../../../components/category/Category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import styles from "./add-friends.module.scss";

const AddFriends: React.FC<{}> = () => {
  return (
    <Category title="Añadir amigos">
      <label className={styles.text}>¿Amigos en Hotmail, Gmail o Yahoo?</label>
      <button className={styles.button}>
        <div className={styles.buttonContainer}>
          <div className={styles.searchDiv}>
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <div className={styles.textContainer}>Buscar amigos</div>
        </div>
      </button>
    </Category>
  );
};

export default AddFriends;
