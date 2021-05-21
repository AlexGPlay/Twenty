import * as React from "react";
import styles from "./input.module.scss";

type InputProps = {
  extraClasses?: string;
  error?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ extraClasses = [], error = false, ...props }, ref) => {
    const classes = [extraClasses, styles.twentyInput, error && styles.error]
      .filter(Boolean)
      .join(" ");

    return (
      <input
        type={props.type || "text"}
        className={classes}
        {...props}
        ref={ref}
      ></input>
    );
  }
);

export default Input;
