import styles from "./talkBubble.module.scss";

type TalkBubbleProps = {
  mode?: "light" | "dark";
  className?: string;
};

const TalkBubble: React.FC<TalkBubbleProps> = ({ mode = "light", className = "", children }) => {
  return (
    <div className={styles.divContainer + " " + className}>
      <div className={styles.triangleContainer}>
        <div className={styles.triangle + " " + styles[mode]}></div>
      </div>
      <div className={styles.statusContainer + " " + styles[mode]}>{children}</div>
    </div>
  );
};

export default TalkBubble;
