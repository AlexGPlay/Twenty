import React from "react";
import Category from "../../../components/category/Category";
import Button from "../../../components/button/twenty/Button";
import * as Yup from "yup";

import Input from "../../../components/input/Input";
import styles from "./invite.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMeQuery } from "../../../queries/useMeQuery";
import Loading from "../../../components/loading";
import { useInvitationMutation } from "../../../queries/useInvitationMutation";
import { useForm } from "react-hook-form";
import { InvitationFields } from "../../../queries/invitationMutation";

const Invite: React.FC<{}> = () => {
  const { isLoading, data } = useMeQuery();

  const inviteSchema = Yup.object().shape({
    email: Yup.string()
      .email("Introduce un email válido")
      .required("Introduce un email"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InvitationFields>({
    resolver: yupResolver(inviteSchema),
  });

  const invitationMutation = useInvitationMutation();

  if (isLoading) {
    return <Loading />;
  }

  const handleFormSubmit = async (data) => {
    if (pendingInvitations <= 0) return;
    await invitationMutation.mutateAsync(data);
  };

  const { pendingInvitations }: { pendingInvitations: Number } = data.me;

  return (
    <Category title="Invita a tus amigos">
      <div className={styles.textContainer}>
        <span className={styles.textCount}>{pendingInvitations}</span>{" "}
        invitaciones
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className={styles.inviteContainer}>
          <Input
            {...register("email")}
            defaultValue=""
            placeholder="Email"
            error={!!errors.email}
            extraClasses={styles.input}
          />
          <Button
            text="Invitar"
            buttonType="dark"
            type="submit"
            loading={invitationMutation.isLoading}
            disabled={pendingInvitations <= 0}
          />
        </div>
        {errors.email && (
          <div className={styles.errorMsg}>{errors.email.message}</div>
        )}
      </form>
    </Category>
  );
};

export default Invite;
