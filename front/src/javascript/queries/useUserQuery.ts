import { UserData } from "./common.d";
import { gql } from "graphql-request";
import { useQuery } from "react-query";
import { client } from "../graphql/client";

export function useUserQuery(id: number) {
  return useQuery<{ user: UserData }>(["user", id], () => {
    return client.request(
      gql`
        query User($id: Float!) {
          user(id: $id) {
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
        }
      `,
      { id }
    );
  });
}
