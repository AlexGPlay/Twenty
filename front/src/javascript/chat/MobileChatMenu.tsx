import React from "react";
import { useConnectedFriends, useMessages } from "../context/ChatContext";
import ConnectionCircle from "../main/right/chat/connectionCircle";

import styles from "./mobileChatMenu.module.scss";

interface MobileChatMenuProps {
  handleOpenConversation: (id: number) => void;
}

const MobileChatMenu: React.VFC<MobileChatMenuProps> = ({
  handleOpenConversation,
}) => {
  const { connectedFriends } = useConnectedFriends();
  const { messages } = useMessages();

  return (
    <div className={styles.mobileChat}>
      {connectedFriends.length === 0 && <div>No tienes amigos conectados</div>}
      {connectedFriends.map((f) => (
        <div
          key={f.id}
          className={styles.friend}
          onClick={() => handleOpenConversation(f.id)}
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
  );
};

export default MobileChatMenu;
