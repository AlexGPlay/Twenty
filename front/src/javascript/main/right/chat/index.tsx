import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

import styles from "./chat.module.scss";
import {
  useConnectedFriends,
  useMessages,
  useOpenChats,
} from "../../../context/ChatContext";
import ConnectionCircle from "./connectionCircle";

const Chat: React.FC<{}> = () => {
  const { connectedFriends } = useConnectedFriends();
  const { setMessages, messages } = useMessages();
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
            onClick={() => {
              setOpenChats?.((curChats) => {
                const existsChat = curChats.find((c) => c.id === f.id);
                if (!existsChat)
                  return [
                    ...curChats.map((c) => ({ ...c, open: false })),
                    { ...f, open: true },
                  ];
                return curChats.map((c) => ({ ...c, open: c.id === f.id }));
              });
              setMessages?.((curMessages) => ({
                ...curMessages,
                [f.id]: (curMessages[f.id] || []).map((msg) => ({
                  ...msg,
                  read: true,
                })),
              }));
            }}
          >
            <ConnectionCircle />
            <p>{f.name + " " + f.surname}</p>
            {(messages[f.id] || []).filter((m) => !m.read).length > 0 && (
              <div className={styles.unreadMessages}>
                {(messages[f.id] || []).filter((m) => !m.read).length}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
