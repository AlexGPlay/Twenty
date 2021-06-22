import React from "react";

import styles from "./image.module.scss";

type ImageProps = {
  src: string;
  size?: "small" | "big" | "auto";
  border?: boolean;
  className?: string;
  withoutPadding?: boolean;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Image: React.FC<ImageProps> = ({
  src,
  className = "",
  size = "small",
  border = false,
  withoutPadding = false,
  children,
  ...props
}) => {
  return (
    <div
      className={[styles.image, className, styles[size], border ? styles.withBorder : ""].join(" ")}
      {...props}
    >
      <div
        className={
          styles.imageFrame + " " + (withoutPadding ? styles.withoutPadding : styles.padding)
        }
      >
        <img className={styles.img} src={src} />
        {children}
      </div>
    </div>
  );
};

export default Image;
