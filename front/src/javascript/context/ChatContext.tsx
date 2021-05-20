import * as React from "react";
import { useState, useContext, createContext } from "react";
import type { FriendData } from "../types/chat";

export type OpenChatData = FriendData & { open: boolean };
export type ChatMessage = {
  senderId: number;
  receiverId: number;
  content: string;
  read: boolean;
};
export type ChatMessagesData = Record<number, ChatMessage[]>;

const ChatContext = createContext<{
  connectedFriends: FriendData[];
  setConnectedFriends: React.Dispatch<
    React.SetStateAction<FriendData[]>
  > | null;
  openChats: OpenChatData[];
  setOpenChats: React.Dispatch<React.SetStateAction<OpenChatData[]>> | null;
  messages: ChatMessagesData;
  setMessages: React.Dispatch<React.SetStateAction<ChatMessagesData>> | null;
}>({
  connectedFriends: [],
  setConnectedFriends: null,
  openChats: [],
  setOpenChats: null,
  messages: {},
  setMessages: null,
});

export function ChatProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [connectedFriends, setConnectedFriends] = useState<FriendData[]>([]);
  const [openChats, setOpenChats] = useState<OpenChatData[]>([]);
  const [messages, setMessages] = useState<ChatMessagesData>({});

  return (
    <ChatContext.Provider
      value={{
        connectedFriends,
        setConnectedFriends,
        openChats,
        setOpenChats,
        messages,
        setMessages,
      }}
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

export const useMessages = () => ({
  messages: useContext(ChatContext).messages,
  setMessages: useContext(ChatContext).setMessages,
});
