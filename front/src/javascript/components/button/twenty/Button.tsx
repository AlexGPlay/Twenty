import * as React from "react";
import styles from "./button.module.css";

type ButtonType = "light" | "dark";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { text: string; buttonType?: ButtonType };

const Button: React.FC<ButtonProps> = ({
  text,
  buttonType = "light",
  ...props
}) => {
  const cssClasses = styles.twentyButton + " " + styles[buttonType];

  return (
    <button className={cssClasses} onClick={props.onClick} style={props.style}>
      {text}
    </button>
  );
};

export default Button;
