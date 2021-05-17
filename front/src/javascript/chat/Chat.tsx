import * as React from "react";
import styles from "./chat.module.css";
import { useOpenChats } from "../context/ChatContext";
import ConnectionCircle from "../main/right/chat/connectionCircle";
import { socket } from "../util/socket";
import { useMeQuery } from "../queries/useMeQuery";

const Chat = () => {
  const { openChats, setOpenChats } = useOpenChats();
  const { data } = useMeQuery("id");

  const [messages, setMessages] = React.useState<
    Record<number, { senderId: number; receiverId: number; content: string }[]>
  >({});
  const [texts, setTexts] = React.useState<Record<number, string>>({});

  React.useEffect(() => {
    socket.on("chatMessage", (msgData) => {
      const toAssignChat =
        msgData.senderId === data.me.id ? msgData.receiverId : msgData.senderId;
      const newMessages = { ...messages };
      newMessages[toAssignChat] = [
        ...(newMessages[toAssignChat] || []),
        msgData,
      ];
      setMessages(newMessages);
    });
    return () => {
      socket.off("chatMessage");
    };
  });

  const handleFormSubmit = (
    evt:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.FormEvent<HTMLFormElement>,
    chatId: number
  ) => {
    evt.preventDefault();
    socket.emit("chatMessage", {
      toId: chatId,
      message: texts[chatId],
    });
    setTexts((curTexts) => ({ ...curTexts, [chatId]: "" }));
  };

  return (
    <div className={styles.chatContainer}>
      {openChats.map((chat) => (
        <div
          className={styles.imgContainer + " " + (chat.open ? styles.open : "")}
        >
          {chat.open && (
            <div className={styles.chatTab}>
              <div className={styles.chatHeader}>
                <div className={styles.chatUser}>
                  <ConnectionCircle />
                  <div>{chat.name + " " + chat.surname}</div>
                </div>
                <div className={styles.controls}>
                  <div
                    onClick={() =>
                      setOpenChats?.((curChats) =>
                        curChats.map((chat) => ({ ...chat, open: false }))
                      )
                    }
                  >
                    -
                  </div>
                  <div
                    onClick={() => {
                      setOpenChats?.((curChats) =>
                        curChats.filter((c) => c.id !== chat.id)
                      );
                    }}
                  >
                    x
                  </div>
                </div>
              </div>
              <div className={styles.conversation}>
                {(messages[chat.id] || []).map((message) => (
                  <div className={styles.message}>
                    <p
                      className={
                        styles.sender +
                        " " +
                        (message.senderId === chat.id
                          ? styles.friend
                          : styles.me)
                      }
                    >
                      {message.senderId === chat.id ? chat.name : "Yo"}:
                    </p>
                    <p>{message.content}</p>
                  </div>
                ))}
              </div>
              <div className={styles.input}>
                <form onSubmit={(evt) => handleFormSubmit(evt, chat.id)}>
                  <textarea
                    value={texts[chat.id]}
                    onChange={(evt) =>
                      setTexts((curData) => ({
                        ...curData,
                        [chat.id]: evt.target.value,
                      }))
                    }
                    onKeyPress={(evt) =>
                      evt.code === "Enter" && handleFormSubmit(evt, chat.id)
                    }
                  ></textarea>
                </form>
                <div className={styles.inputDecorator}></div>
              </div>
            </div>
          )}
          <img
            className={styles.img}
            src="/img/camera.png"
            title={chat.name + " " + chat.surname}
            onClick={() =>
              setOpenChats?.((curState) =>
                curState.map((c) => ({ ...c, open: c.id === chat.id }))
              )
            }
          />
        </div>
      ))}
    </div>
  );
};

export default Chat;
