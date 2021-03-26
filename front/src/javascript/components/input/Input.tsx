import * as React from "react";
import styles from "./input.module.css";

interface InputProps {
  type?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = (props: InputProps) => {
  return (
    <input
      type={props.type || "text"}
      className={styles.twentyInput}
      placeholder={props.placeholder}
    ></input>
  );
};

export default Input;
