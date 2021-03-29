import React from "react";
import PanelSubmenu from "../panel-submenu/PanelSubmenu";
import Button from "../../../components/button/twenty/Button";
import Input from "../../../components/input/Input";

import styles from "./invite.module.css";

const Invite: React.FC<{}> = () => {
  return (
    <PanelSubmenu title="Invita a tus amigos">
      <div className={styles.textContainer}>
        <span className={styles.textCount}>10</span> invitaciones
      </div>
      <div className={styles.inviteContainer}>
        <Input placeholder="Email" extraClasses={[styles.input]} />
        <Button text="Invitar" buttonType="dark" />
      </div>
    </PanelSubmenu>
  );
};

export default Invite;
