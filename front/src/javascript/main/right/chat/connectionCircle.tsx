import * as React from "react";
import styles from "./connectionCircle.module.scss";

interface ConnectionCircleProps {
  status?: "connected" | "disconnected";
}

const ConnectionCircle: React.VFC<ConnectionCircleProps> = ({
  status = "connected",
}) => {
  return (
    <div
      className={
        styles.connectionCircle +
        " " +
        (status === "connected" ? "" : styles.disconnected)
      }
    ></div>
  );
};

export default ConnectionCircle;
