import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/button/twenty/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { biggestDateDiff } from "../../../util/dates";

import styles from "./status.module.scss";
import { useStatusQuery } from "../../../queries/useStatusQuery";
import { useStatusMutation } from "../../../queries/useStatusMutation";

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
    if (!data) return null;
    const diff = biggestDateDiff(
      new Date(),
      new Date(parseInt(data.currentStatus.status.createdAt))
    );
    if (!diff) return "hace unos instantes";
    const { quantity, type } = diff;
    let value;
    if (type === "min")
      value = `${quantity} minuto${quantity === 1 ? "" : "s"}`;
    else if (type === "hour")
      value = `${quantity} hora${quantity === 1 ? "" : "s"}`;
    else if (type === "day")
      value = `${quantity} día${quantity === 1 ? "" : "s"}`;
    else if (type === "month")
      value = `${quantity} ${quantity === 1 ? "mes" : "meses"}`;
    else value = `${quantity} año${quantity === 1 ? "" : "s"}`;

    if (value) return "hace " + value;
    return null;
  }, [data]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.editStatusContainer}>
        <div className={styles.divContainer}>
          <div className={styles.triangleContainer}>
            <div className={styles.triangle}></div>
          </div>
          <div className={styles.statusContainer}>
            <FontAwesomeIcon icon={faPencilAlt} />
            <input
              {...register("status", { required: true })}
              className={styles.input}
              placeholder="Actualiza tu estado"
              disabled={isLoading || statusMutation.isLoading}
            />
          </div>
        </div>
        <div className={styles.updateTextContainer}>
          {(isLoading || isError || !data.currentStatus.status) && null}
          {data?.currentStatus?.status && (
            <div className={styles.updateText}>
              Última actualización:
              <span className={styles.lastUpdate}>
                {data.currentStatus.status.status}
                {dateDiff && (
                  <span className={styles.updatedAgo}>{" " + dateDiff}</span>
                )}
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
