import React from "react";

import styles from "./image.module.scss";

interface ImageProps {
  src: string;
  size?: "small" | "big" | "auto";
  border?: boolean;
  className?: string;
  withoutPadding?: boolean;
}

const Image: React.FC<ImageProps> = ({
  src,
  className = "",
  size = "small",
  border = false,
  withoutPadding = false,
}) => {
  return (
    <div
      className={[styles.image, className, styles[size], border ? styles.withBorder : ""].join(" ")}
    >
      <div
        className={
          styles.imageFrame + " " + (withoutPadding ? styles.withoutPadding : styles.padding)
        }
      >
        <img className={styles.img} src={src} />
      </div>
    </div>
  );
};

export default Image;
