import styles from "./simpleButton.module.scss";

type SimpleButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  icon?: JSX.Element;
  iconColor?: string;
  iconBackground?: string;
  fontSize?: number;
  padding?: number;
};

const SimpleButton: React.FC<SimpleButtonProps> = ({
  children,
  icon,
  iconColor,
  iconBackground,
  fontSize = 14,
  padding = 5,
  style,
  ...props
}) => {
  return (
    <button className={styles.button} style={{ fontSize, ...style }} {...props}>
      <div className={styles.buttonContainer}>
        {icon && (
          <div
            className={styles.iconDiv}
            style={{ color: iconColor, backgroundColor: iconBackground }}
          >
            {icon}
          </div>
        )}
        <div className={styles.textContainer} style={{ padding }}>
          {children}
        </div>
      </div>
    </button>
  );
};

export default SimpleButton;
