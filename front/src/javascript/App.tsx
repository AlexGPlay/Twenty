import * as React from "react";
import Template from "./components/template/Template";
import { Switch, Route } from "react-router-dom";
import Main from "./main/Main";
import { socket } from "./util/socket";
import "./app.scss";
import { ConnectedFriendsData } from "./types/chat";
import { useConnectedFriends, useMessages, useOpenChats } from "./context/ChatContext";
import Profile from "./profile/Profile";

const App = () => {
  const { connectedFriends, setConnectedFriends } = useConnectedFriends();
  const { openChats, setOpenChats } = useOpenChats();
  const { messages, setMessages } = useMessages();

  React.useEffect(() => {
    socket.on("connectedFriends", (data: ConnectedFriendsData) => {
      if (data.status === "ownConnection") setConnectedFriends?.(data.data);
      else if (data.status === "connected")
        setConnectedFriends?.((curData) => [
          ...curData,
          ...data.data.filter((friend) => !curData.map((c) => c.id).includes(friend.id)),
        ]);
      else if (data.status === "disconnected")
        setConnectedFriends?.((curData) =>
          curData.filter((friend) => !data.data.map((d) => d.id).includes(friend.id))
        );
    });
  }, []);

  React.useEffect(() => {
    socket.on("chatMessage", (msgData) => {
      const toAssignChat = connectedFriends.find(
        (cf) => cf.id === msgData.senderId || cf.id === msgData.receiverId
      )?.id;
      if (!openChats.find((chat) => chat.id === toAssignChat)) {
        const toOpenChat = connectedFriends.find((f) => f.id === toAssignChat);
        toOpenChat && setOpenChats?.([...openChats, { ...toOpenChat, open: false }]);
      }
      const newMessages = { ...messages };
      newMessages[toAssignChat] = [
        ...(newMessages[toAssignChat] || []),
        {
          ...msgData,
          read: toAssignChat === openChats.find((c) => c.open)?.id,
        },
      ];
      setMessages?.(newMessages);
    });
    return () => socket.off("chatMessage");
  }, [connectedFriends, openChats, messages]);

  return (
    <Template>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/profile/:user" component={Profile} />
      </Switch>
    </Template>
  );
};

export default App;
