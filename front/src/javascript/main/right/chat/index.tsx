import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

import styles from "./chat.module.scss";
import {
  useConnectedFriends,
  useOpenChats,
} from "../../../context/ChatContext";
import ConnectionCircle from "./connectionCircle";

const Chat: React.FC<{}> = () => {
  const { connectedFriends } = useConnectedFriends();
  const { setOpenChats } = useOpenChats();

  return (
    <div className={styles.categoryContainer}>
      <div className={styles.headerContainer}>
        <span className={styles.title}>
          <ConnectionCircle />
          <div className={styles.chatTitle}>
            Chat ({connectedFriends.length})
          </div>
        </span>
        <div className={styles.settings}>
          <FontAwesomeIcon icon={faCog} />
          Ajustes
        </div>
      </div>
      <div className={styles.chatContainer}>
        {connectedFriends.length === 0 && <p>No tienes amigos conectados</p>}
        {connectedFriends.map((f) => (
          <div
            className={styles.connectedFriend}
            key={f.id}
            onClick={() =>
              setOpenChats?.((curChats) => {
                const existsChat = curChats.find((c) => c.id === f.id);
                if (!existsChat)
                  return [
                    ...curChats.map((c) => ({ ...c, open: false })),
                    { ...f, open: true },
                  ];
                return curChats.map((c) => ({ ...c, open: c.id === f.id }));
              })
            }
          >
            <ConnectionCircle />
            <p>{f.name + " " + f.surname}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
