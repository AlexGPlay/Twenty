import * as React from "react";
import Input from "../input/Input";
import UploadPhotosButton from "../button/upload/UploadPhotosButton";
import styles from "./navbar.module.css";

const Navbar: React.FC<{}> = () => {
  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.navbarLogo}>
          <img
            src="img/logo.png"
            alt="Twenty logo"
            className={styles.logoImg}
          />
          <img
            src="img/text.png"
            alt="Twenty name"
            className={styles.logoText}
          />
        </div>
        <div className={styles.navbarLinks}>
          <div className={styles.active}>
            <a>Inicio</a>
          </div>
          <div>
            <a>Perfil</a>
          </div>
          <div>
            <a>Mensajes</a>
          </div>
          <div>
            <a>Gente</a>
          </div>
          <div>
            <a>Videos</a>
          </div>
          <Input placeholder="Buscar..." />
          <UploadPhotosButton />
        </div>
        <div className={styles.navbarAccount}>
          <div>Mi cuenta</div>
          <div>Salir</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
