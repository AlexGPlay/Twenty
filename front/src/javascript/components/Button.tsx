import * as React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  style?: Object;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <button
      className="twenty-button"
      onClick={props.onClick}
      style={props.style}
    >
      {props.text}
    </button>
  );
};

export default Button;
