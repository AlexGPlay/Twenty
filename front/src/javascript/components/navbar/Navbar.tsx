import * as React from "react";
import Input from "../input/Input";
import UploadPhotosButton from "../button/upload/UploadPhotosButton";
import styles from "./navbar.module.scss";

interface NavbarProps {
  containerClass: string;
  contentClass: string;
}

const Navbar: React.FC<NavbarProps> = ({ containerClass, contentClass }) => {
  return (
    <div className={`${styles.navbarContainer} ${containerClass}`}>
      <div className={`${styles.navbar} ${contentClass}`}>
        <div className={styles.navbarLogo}>
          <img
            src="img/logo.png"
            alt="Twenty logo"
            className={styles.elementsHeight + " " + styles.logoSpacing}
          />
          <img
            src="img/text.png"
            alt="Twenty name"
            className={styles.elementsHeight}
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
          <Input
            placeholder="Buscar..."
            extraClasses={[styles.elementsHeight]}
          />
          <UploadPhotosButton extraClasses={[styles.elementsHeight]} />
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
