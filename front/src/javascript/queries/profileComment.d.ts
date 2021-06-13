import { UserData } from "./common.d";

export type ProfileComment = {
  id: number;
  createdAt: string;
  updatedAt: string;
  comment: string;
  commentedTo: UserData;
  commentedToId: number;
  commentedBy: UserData;
  commentedById: number;
  replyTo: ProfileComment;
  replyToId: number;
};
