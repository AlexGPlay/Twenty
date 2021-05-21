import * as React from "react";
import Input from "../input/Input";
import UploadPhotosButton from "../button/upload/UploadPhotosButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faUserAlt,
  faEnvelope,
  faUserFriends,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./navbar.module.scss";
import { useHistory } from "react-router";

interface NavbarProps {
  containerClass: string;
  contentClass: string;
}

const Navbar: React.FC<NavbarProps> = ({ containerClass, contentClass }) => {
  const checkboxRef = React.useRef();
  const history = useHistory();

  const handleMenuClick = (evt) => {
    (checkboxRef.current as HTMLInputElement).checked = false;
    const path = evt.currentTarget.dataset.path;
    if (!path) return;
    history.push(path);
  };

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
          <div
            className={styles.active}
            data-path="/"
            onClick={handleMenuClick}
          >
            <div className={styles.navbarIcon}>
              <FontAwesomeIcon icon={faHome} />
            </div>
            <a className={styles.navbarText}>Inicio</a>
          </div>
          <div>
            <div className={styles.navbarIcon}>
              <FontAwesomeIcon icon={faUserAlt} />
            </div>
            <a className={styles.navbarText}>Perfil</a>
          </div>
          <div>
            <div className={styles.navbarIcon}>
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <a className={styles.navbarText}>Mensajes</a>
          </div>
          <div>
            <div className={styles.navbarIcon}>
              <FontAwesomeIcon icon={faUserFriends} />
            </div>
            <a className={styles.navbarText}>Gente</a>
          </div>
          <div>
            <div className={styles.navbarIcon}>
              <FontAwesomeIcon icon={faVideo} />
            </div>
            <a className={styles.navbarText}>Videos</a>
          </div>
          <Input
            name="searchbar"
            placeholder="Buscar..."
            extraClasses={styles.elementsHeight}
          />
          <UploadPhotosButton
            extraClasses={styles.elementsHeight}
            name="uploadphotos"
          />
        </div>
        <div className={styles.navbarAccount}>
          <div>Mi cuenta</div>
          <div>Salir</div>
        </div>
        <div className={styles.menu}>
          <label htmlFor="mobilemenu">
            <FontAwesomeIcon icon={faBars} />
          </label>
          <input
            type="checkbox"
            id="mobilemenu"
            className={styles.mobileMenuInput}
            ref={checkboxRef}
          />
          <div className={styles.mobileMenuContainer}>
            <div data-path="/?chat=1" onClick={handleMenuClick}>
              Chat
            </div>
            <div onClick={handleMenuClick}>Mi cuenta</div>
            <div onClick={handleMenuClick}>Cerrar Sesión</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
