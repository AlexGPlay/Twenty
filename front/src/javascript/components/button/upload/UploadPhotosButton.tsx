import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./upload-photos-button.module.scss";
type UploadPhotosButtonProps = {
  extraClasses?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const UploadPhotosButton: React.FC<UploadPhotosButtonProps> = ({
  extraClasses = [],
  ...props
}) => {
  const classes = extraClasses + " " + styles.uploadPhotosButton;
  return (
    <button className={classes} {...props}>
      Subir fotos <FontAwesomeIcon icon={faArrowUp} className={styles.arrow} />
    </button>
  );
};

export default UploadPhotosButton;
