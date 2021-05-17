export type ConnectedFriendsData = {
  status: 'ownConnection' | 'connected' | 'disconnected',
  data: FriendData[];
}

export type FriendData = {
  id: number;
  name: string;
  surname: string;
} 