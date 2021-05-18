import React from "react";

import styles from "./infoImg.module.scss";

interface InfoImgTypes {
  imgPath: string;
  title: string;
  description: string;
}

const InfoImg: React.FC<InfoImgTypes> = (props) => {
  return (
    <div className={styles.infoImg}>
      <div className={styles.imgContainer}>
        <img src={props.imgPath} className={styles.img}></img>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.description}>{props.description}</div>
      </div>
    </div>
  );
};

export default InfoImg;
