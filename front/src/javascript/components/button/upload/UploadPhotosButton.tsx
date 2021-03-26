import * as React from "react";
import styles from "./upload-photos-button.module.css";

const UploadPhotosButton: React.FC<{}> = () => {
  return <button className={styles.uploadPhotosButton}>Subir fotos</button>;
};

export default UploadPhotosButton;
