import React from "react";
import Category from "../../../components/category/Category";
import Button from "../../../components/button/twenty/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import styles from "./invite.module.css";
import inputStyles from "../../../components/input/input.module.css";
import { useMeQuery } from "../../../queries/useMeQuery";
import Loading from "../../../components/loading";
import { useInvitationMutation } from "../../../queries/useInvitationMutation";

const Invite: React.FC<{}> = () => {
  const { isLoading, data } = useMeQuery("pendingInvitations");

  const invitationMutation = useInvitationMutation();

  if (isLoading) {
    return <Loading />;
  }

  const inviteSchema = Yup.object().shape({
    email: Yup.string().email("Introduce un email válido"),
  });

  const { pendingInvitations }: { pendingInvitations: Number } = data.me;

  return (
    <Category title="Invita a tus amigos">
      <div className={styles.textContainer}>
        <span className={styles.textCount}>{pendingInvitations}</span>{" "}
        invitaciones
      </div>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values, actions) => {
          await invitationMutation.mutateAsync(values);
          actions.setSubmitting(false);
        }}
        validationSchema={inviteSchema}
      >
        {({ errors, isSubmitting }) => (
          <Form>
            <div className={styles.inviteContainer}>
              <Field
                name="email"
                placeholder="Email"
                className={
                  styles.input +
                  " " +
                  inputStyles.twentyInput +
                  " " +
                  (errors.email ? inputStyles.error : "")
                }
              />
              <Button
                text="Invitar"
                buttonType="dark"
                type="submit"
                loading={isSubmitting}
              />
            </div>
            <ErrorMessage name="email">
              {(msg) => <div className={styles.errorMsg}>{msg}</div>}
            </ErrorMessage>
          </Form>
        )}
      </Formik>
    </Category>
  );
};

export default Invite;
