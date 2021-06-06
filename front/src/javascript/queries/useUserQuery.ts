import { ProfileData } from "./userQueryData.d";
import { gql } from "graphql-request";
import { useQuery } from "react-query";
import { client } from "../graphql/client";

export function useUserQuery(id: number) {
  return useQuery<{ user: ProfileData }>(["user", id], () => {
    return client.request(
      gql`
        query User($id: Float!) {
          user(id: $id) {
            user {
              id
              createdAt
              updatedAt
              email
              name
              surname
              birthday
              city
              country
              gender
              connected
            }
            status {
              id
              createdAt
              updatedAt
              userId
              status
            }
            friendship
            isMyself
          }
        }
      `,
      { id }
    );
  });
}
