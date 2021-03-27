import * as React from "react";
import styles from "./input.module.css";

interface InputProps {
  type?: string;
  placeholder?: string;
  extraClasses?: string[];
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  extraClasses = [],
}) => {
  const classes = extraClasses.join(" ") + " " + styles.twentyInput;

  return (
    <input
      type={type || "text"}
      className={classes}
      placeholder={placeholder}
    ></input>
  );
};

export default Input;
