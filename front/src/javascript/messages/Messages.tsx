import styles from "./messages.module.scss";

import { Link, useHistory } from "react-router-dom";
import CommonPanel from "../components/left/CommonPanel";
import SimpleButton from "../components/button/simple/SimpleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Category from "../components/category/Category";
import { useMemo } from "react";

const Messages = () => {
  const history = useHistory();

  const options = useMemo(
    () => [
      { text: "Bandeja de entrada", path: "/messages/received" },
      { text: "Enviados", path: "/messages/sent" },
      { text: "De desconocidos", path: "/messages/anonymous" },
    ],
    []
  );

  return (
    <div className={styles.messagesContainer}>
      <CommonPanel>
        <div className={styles.btnContainer}>
          <SimpleButton
            icon={<FontAwesomeIcon icon={faEnvelope} />}
            iconBackground="var(--orange-1)"
            iconColor="var(--white-1)"
            onClick={() => history.push("/messages/new")}
          >
            Escribir nuevo mensaje
          </SimpleButton>
        </div>
        <div className={styles.linksContainer}>
          {options.map((option) => (
            <Link
              to={option.path}
              className={window.location.pathname.includes(option.path) ? styles.selected : ""}
            >
              {option.text}
            </Link>
          ))}
        </div>
      </CommonPanel>
      <Category title="Bandeja de entrada"></Category>
    </div>
  );
};

export default Messages;
