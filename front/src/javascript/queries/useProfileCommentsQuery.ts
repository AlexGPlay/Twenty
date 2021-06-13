import { ProfileComment } from "./../../../../server/src/entities/ProfileComment";
import { gql } from "graphql-request";
import { useQuery } from "react-query";
import { client } from "../graphql/client";

import { MeData } from "./meData";

export function useProfileCommentsQuery(userId: number) {
  return useQuery<{ getProfileComments: ProfileComment[] }>(["profileComments", userId], () => {
    return client.request(
      gql`
        query GetProfileComments($userId: Float!) {
          getProfileComments(userId: $userId) {
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
              }
            }
          }
        }
      `,
      { userId }
    );
  });
}
