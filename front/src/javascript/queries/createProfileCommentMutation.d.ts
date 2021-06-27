import { ProfileComment } from "./profileComment";

export type CreateProfileCommentRequest = {
  commentedToId: number;
  comment: string;
  replyToId?: number;
};

export type CreateProfileCommentResponse = {
  createProfileComment: {
    profileComment?: ProfileComment;
    error?: string;
  };
};
