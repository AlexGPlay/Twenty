import * as React from "react";
import styles from "./button.module.css";

const Button: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { text: string }
> = ({ text, ...props }) => {
  return (
    <button
      className={styles.twentyButton}
      onClick={props.onClick}
      style={props.style}
    >
      {text}
    </button>
  );
};

export default Button;
