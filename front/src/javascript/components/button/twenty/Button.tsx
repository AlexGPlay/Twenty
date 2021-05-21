import * as React from "react";
import styles from "./button.module.scss";
import Loading from "../../loading";

type ButtonType = "light" | "dark";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { text: string; buttonType?: ButtonType; loading?: boolean };

const Button: React.FC<ButtonProps> = ({
  text,
  loading = false,
  buttonType = "light",
  ...props
}) => {
  const cssClasses = styles.twentyButton + " " + styles[buttonType];
  const handleClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    !loading && props.onClick?.(evt);

  return (
    <button
      className={cssClasses}
      onClick={handleClick}
      style={props.style}
      {...props}
    >
      {loading ? <Loading /> : text}
    </button>
  );
};

export default Button;
