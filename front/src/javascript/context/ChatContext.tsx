import * as React from "react";
import { useState, useContext, createContext } from "react";
import type { FriendData } from "../types/chat";

export type OpenChatData = FriendData & { open: boolean };

const ChatContext = createContext<{
  connectedFriends: FriendData[];
  setConnectedFriends: React.Dispatch<
    React.SetStateAction<FriendData[]>
  > | null;
  openChats: OpenChatData[];
  setOpenChats: React.Dispatch<React.SetStateAction<OpenChatData[]>> | null;
}>({
  connectedFriends: [],
  setConnectedFriends: null,
  openChats: [],
  setOpenChats: null,
});

export function ChatProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [connectedFriends, setConnectedFriends] = useState<FriendData[]>([]);
  const [openChats, setOpenChats] = useState<OpenChatData[]>([]);

  return (
    <ChatContext.Provider
      value={{ connectedFriends, setConnectedFriends, openChats, setOpenChats }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useConnectedFriends = () => ({
  connectedFriends: useContext(ChatContext).connectedFriends,
  setConnectedFriends: useContext(ChatContext).setConnectedFriends,
});

export const useOpenChats = () => ({
  openChats: useContext(ChatContext).openChats,
  setOpenChats: useContext(ChatContext).setOpenChats,
});
