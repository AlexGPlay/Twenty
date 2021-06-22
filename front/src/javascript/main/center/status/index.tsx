import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/button/twenty/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { biggestDateDiff, dateDiffAsString } from "../../../util/dates";

import styles from "./status.module.scss";
import { useStatusQuery } from "../../../queries/useStatusQuery";
import { useStatusMutation } from "../../../queries/useStatusMutation";
import TalkBubble from "../../../components/talkBubble/TalkBubble";

const Status: React.FC<{}> = () => {
  const { data, isLoading, isError } = useStatusQuery();
  const { register, handleSubmit, reset } = useForm<{ status: string }>();
  const statusMutation = useStatusMutation();

  const onSubmit: SubmitHandler<{ status: string }> = ({ status }) => {
    if (!status) return;
    reset();
    statusMutation.mutateAsync({ status });
  };

  const dateDiff = useMemo(() => {
    if (!data || !data.currentStatus || !data.currentStatus.status) return;
    return dateDiffAsString(new Date(), new Date(parseInt(data?.currentStatus?.status.createdAt)));
  }, [data]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.editStatusContainer}>
        <TalkBubble>
          <FontAwesomeIcon icon={faPencilAlt} />
          <input
            {...register("status", { required: true })}
            className={styles.input}
            placeholder="Actualiza tu estado"
            disabled={isLoading || statusMutation.isLoading}
          />
        </TalkBubble>
        <div className={styles.updateTextContainer}>
          {(isLoading || isError || !data.currentStatus.status) && null}
          {data?.currentStatus?.status && (
            <div className={styles.updateText}>
              Última actualización:
              <span className={styles.lastUpdate}>
                {data.currentStatus.status.status}
                {dateDiff && <span className={styles.updatedAgo}>{" " + dateDiff}</span>}
              </span>
            </div>
          )}
          <div className={styles.buttonContainer}>
            <Button
              text="Guardar"
              type="submit"
              buttonType="dark"
              disabled={isLoading || statusMutation.isLoading}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Status;
