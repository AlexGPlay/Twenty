import { ProfileComment } from "./profileComment";
import { gql } from "graphql-request";
import { useMutation, useQueryClient } from "react-query";
import { client } from "../graphql/client";
import {
  CreateProfileCommentRequest,
  CreateProfileCommentResponse,
} from "./createProfileCommentMutation";

export const useCreateProfileCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateProfileCommentResponse, any, CreateProfileCommentRequest>(
    (commentVariables) => {
      return client.request(
        gql`
          mutation CreateProfileComment(
            $commentedToId: Float!
            $comment: String!
            $replyToId: Float
          ) {
            createProfileComment(
              commentedToId: $commentedToId
              comment: $comment
              replyToId: $replyToId
            ) {
              profileComment {
                id
                createdAt
                updatedAt
                comment
                commentedToId
                commentedById
                commentedBy {
                  id
                  createdAt
                  updatedAt
                  email
                  name
                  surname
                  birthday
                  connected
                  profileImage
                }
                replyToId
                replyTo {
                  id
                  createdAt
                  updatedAt
                  comment
                  commentedBy {
                    id
                    createdAt
                    updatedAt
                    email
                    name
                    surname
                    birthday
                    connected
                    profileImage
                  }
                }
              }
              error
            }
          }
        `,
        commentVariables
      );
    },
    {
      onSuccess: (result, variables) => {
        if (result.createProfileComment.error) return;
        queryClient.setQueryData<{ getProfileComments: ProfileComment[] }>(
          ["profileComments", variables.commentedToId],
          (currentValue) => ({
            getProfileComments: [
              result.createProfileComment.profileComment,
              ...currentValue.getProfileComments,
            ],
          })
        );
      },
    }
  );
};
