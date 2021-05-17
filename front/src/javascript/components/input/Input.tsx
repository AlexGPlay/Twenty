import * as React from "react";
import styles from "./input.module.css";

type InputProps = {
  extraClasses?: string[];
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ extraClasses = [], ...props }) => {
  const classes = extraClasses.join(" ") + " " + styles.twentyInput;

  return (
    <input type={props.type || "text"} className={classes} {...props}></input>
  );
};

export default Input;
