import React from "react";

import styles from "./image.module.scss";

interface ImageProps {
  src: string;
  size?: "small" | "big" | "auto";
  border?: boolean;
}

const Image: React.FC<ImageProps> = ({ src, size = "small", border = false }) => {
  return (
    <div className={styles.image + " " + styles[size] + " " + (border ? styles.withBorder : "")}>
      <div className={styles.imageFrame}>
        <img className={styles.img} src={src} />
      </div>
    </div>
  );
};

export default Image;
