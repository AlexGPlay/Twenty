import React from "react";
import { useConnectedFriends, useMessages } from "../context/ChatContext";
import styles from "./mobileConversation.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/button/twenty/Button";
import { socket } from "../util/socket";

interface MobileConversationProps {
  id: number;
  handleConversationChange: (id: null) => void;
}

const MobileConversation: React.VFC<MobileConversationProps> = ({
  id,
  handleConversationChange,
}) => {
  const [text, setText] = React.useState("");
  const { connectedFriends } = useConnectedFriends();
  const { messages, setMessages } = useMessages();
  const selectedFriend = connectedFriends.find((f) => f.id === id);
  const selectedFriendMessages = messages[id] || [];

  const handleSubmit = (
    evt:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.FormEvent<HTMLFormElement>
  ) => {
    evt.preventDefault();
    if (!text || text.length === 0) return;

    socket.emit("chatMessage", {
      toId: id,
      message: text,
    });

    setText("");
  };

  React.useEffect(() => {
    const needsToMarkAsRead = (messages[id] || []).find((m) => !m.read);
    if (!needsToMarkAsRead) return;

    const currentMessages = (messages[id] || []).map((m) => ({
      ...m,
      read: true,
    }));
    setMessages((curMessages) => ({ ...curMessages, [id]: currentMessages }));
  }, [messages]);

  return (
    <div className={styles.mobileConversation}>
      <div className={styles.header}>
        <div onClick={() => handleConversationChange(null)}>
          <FontAwesomeIcon icon={faArrowCircleLeft} />
        </div>
        <div>{selectedFriend.name + " " + selectedFriend.surname}</div>
      </div>
      <div className={styles.content}>
        {selectedFriendMessages.map((message, idx) => (
          <div className={styles.message} key={idx}>
            <p
              className={
                styles.sender +
                " " +
                (message.senderId === id ? styles.friend : styles.me)
              }
            >
              {message.senderId === id ? selectedFriend.name : "Yo"}:
            </p>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <form className={styles.textAreaContainer} onSubmit={handleSubmit}>
        <textarea onChange={(evt) => setText(evt.target.value)} value={text} />
        <div className={styles.buttonContainer}>
          <Button text="Enviar" buttonType="dark" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default MobileConversation;
