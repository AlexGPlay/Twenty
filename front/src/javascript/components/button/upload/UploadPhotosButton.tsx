import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./upload-photos-button.module.scss";
interface UploadPhotosButtonProps {
  extraClasses?: string[];
}

const UploadPhotosButton: React.FC<UploadPhotosButtonProps> = ({
  extraClasses = [],
}) => {
  const classes = extraClasses.join(" ") + " " + styles.uploadPhotosButton;
  return (
    <button className={classes}>
      Subir fotos <FontAwesomeIcon icon={faArrowUp} className={styles.arrow} />
    </button>
  );
};

export default UploadPhotosButton;
