import * as React from "react";
import styles from "./input.module.scss";

type InputProps = {
  extraClasses?: string[];
  error?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
  extraClasses = [],
  error = false,
  ...props
}) => {
  const classes =
    extraClasses.join(" ") +
    " " +
    styles.twentyInput +
    " " +
    (error ? styles.error : "");

  return (
    <input type={props.type || "text"} className={classes} {...props}></input>
  );
};

export default Input;
