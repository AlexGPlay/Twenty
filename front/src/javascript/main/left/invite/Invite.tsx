import React from "react";
import Category from "../../../components/category/Category";
import Button from "../../../components/button/twenty/Button";
import Input from "../../../components/input/Input";

import styles from "./invite.module.css";
import { useMeQuery } from "../../../queries/useMeQuery";
import Loading from "../../../components/loading";

const Invite: React.FC<{}> = () => {
  const { isLoading, data } = useMeQuery('pendingInvitations');

  if(isLoading){
    return <Loading />;
  }

  const { pendingInvitations }: { pendingInvitations: Number } = data.me;

  return (
    <Category title="Invita a tus amigos">
      <div className={styles.textContainer}>
        <span className={styles.textCount}>{pendingInvitations}</span> invitaciones
      </div>
      <div className={styles.inviteContainer}>
        <Input placeholder="Email" extraClasses={[styles.input]} />
        <Button text="Invitar" buttonType="dark" />
      </div>
    </Category>
  );
};

export default Invite;
