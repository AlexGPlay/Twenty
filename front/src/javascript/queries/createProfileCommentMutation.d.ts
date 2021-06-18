import { ProfileComment } from "./profileComment";

export type CreateProfileCommentRequest = {
  commentedToId: number;
  comment: string;
  reployToId?: number;
};

export type CreateProfileCommentResponse = {
  createProfileComment: {
    profileComment?: ProfileComment;
    error?: string;
  };
};
