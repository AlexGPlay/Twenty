import React from "react";

import styles from "./image.module.css";

interface ImageProps {
  src: string;
}

const Image: React.FC<ImageProps> = ({ src }) => {
  return (
    <div className={styles.image}>
      <div className={styles.imageFrame}>
        <img className={styles.img} src={src} />
      </div>
    </div>
  );
};

export default Image;
