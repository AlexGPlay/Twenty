import * as React from "react";
import styles from "./chat.module.scss";
import { useConnectedFriends, useOpenChats } from "../context/ChatContext";
import ConnectionCircle from "../main/right/chat/connectionCircle";
import { socket } from "../util/socket";
import { useMeQuery } from "../queries/useMeQuery";

const Chat = () => {
  const { connectedFriends } = useConnectedFriends();
  const { openChats, setOpenChats } = useOpenChats();
  const { data } = useMeQuery("id");

  const [messages, setMessages] = React.useState<
    Record<
      number,
      { senderId: number; receiverId: number; content: string; read: boolean }[]
    >
  >({});
  const [texts, setTexts] = React.useState<Record<number, string>>({});

  React.useEffect(() => {
    socket.on("chatMessage", (msgData) => {
      const toAssignChat =
        msgData.senderId === data.me.id ? msgData.receiverId : msgData.senderId;
      if (!openChats.find((chat) => chat.id === toAssignChat)) {
        const toOpenChat = connectedFriends.find((f) => f.id === toAssignChat);
        toOpenChat &&
          setOpenChats?.([...openChats, { ...toOpenChat, open: false }]);
      }
      const newMessages = { ...messages };
      newMessages[toAssignChat] = [
        ...(newMessages[toAssignChat] || []),
        {
          ...msgData,
          read: toAssignChat === openChats.find((c) => c.open)?.id,
        },
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
    if (!texts[chatId] || texts[chatId].length === 0) return;

    socket.emit("chatMessage", {
      toId: chatId,
      message: texts[chatId],
    });
    setTexts((curTexts) => ({ ...curTexts, [chatId]: "" }));
  };

  return (
    <div className={styles.chatContainer}>
      {openChats.map((chat, idx) => (
        <div
          className={styles.imgContainer + " " + (chat.open ? styles.open : "")}
          key={chat.id + "_" + idx}
        >
          {chat.open && (
            <div className={styles.chatTab}>
              <div className={styles.chatHeader}>
                <div className={styles.chatUser}>
                  <ConnectionCircle
                    status={
                      connectedFriends.find((cf) => cf.id === chat.id)
                        ? "connected"
                        : "disconnected"
                    }
                  />
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
                    disabled={!connectedFriends.find((cf) => cf.id === chat.id)}
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
          {messages[chat.id]?.filter((m) => !m.read).length > 0 && (
            <div className={styles.unreadMessages}>
              {messages[chat.id]?.filter((m) => !m.read).length}
            </div>
          )}
          <img
            className={styles.img}
            src="/img/camera.png"
            title={chat.name + " " + chat.surname}
            onClick={() => {
              setOpenChats?.((curState) =>
                curState.map((c) => ({ ...c, open: c.id === chat.id }))
              );
              setMessages((curMessages) => ({
                ...curMessages,
                [chat.id]: curMessages[chat.id].map((msg) => ({
                  ...msg,
                  read: true,
                })),
              }));
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Chat;
