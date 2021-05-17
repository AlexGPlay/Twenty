import * as React from "react";
import AddFriends from "./addFriends";
import Chat from "./chat";

const RightContent: React.FC<{}> = () => {
  return (
    <div>
      <AddFriends />
      <Chat />
    </div>
  );
};

export default RightContent;
