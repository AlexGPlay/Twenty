import * as React from "react";
import Template from "./components/template/Template";
import { useConnectedFriends } from "./context/ChatContext";
import Main from "./main/Main";
import { socket } from "./util/socket";
import type { ConnectedFriendsData } from "./types/chat";

const App = () => {
  const { setConnectedFriends } = useConnectedFriends();

  React.useEffect(() => {
    socket.connect();
    socket.on("connectedFriends", (data: ConnectedFriendsData) => {
      console.log("connectedFriends", data);
      if (data.status === "ownConnection") setConnectedFriends?.(data.data);
      else if (data.status === "connected")
        setConnectedFriends?.((curData) => [
          ...curData,
          ...data.data.filter(
            (friend) => !curData.map((c) => c.id).includes(friend.id)
          ),
        ]);
      else if (data.status === "disconnected")
        setConnectedFriends?.((curData) =>
          curData.filter(
            (friend) => !data.data.map((d) => d.id).includes(friend.id)
          )
        );
    });
  }, []);

  return (
    <Template>
      <Main />
    </Template>
  );
};

export default App;
